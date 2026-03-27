"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { BarcodeScanner } from "./barcode-scanner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ScanBarcode,
  Package,
  Check,
  X,
  Keyboard,
} from "lucide-react";
type MovementType = "entry" | "exit" | null;

interface ScannedProduct {
  id: number;
  name: string;
  barcode: string;
  category: string;
  current: number;
  unit: string;
}

// Mock barcode-to-product mapping
const barcodeMap: Record<string, ScannedProduct> = {
  "6111234567890": { id: 1, name: "Filet de Hammour", barcode: "6111234567890", category: "Fruits de Mer", current: 45, unit: "kg" },
  "6111234567891": { id: 2, name: "Filaments de Safran", barcode: "6111234567891", category: "Épices", current: 5, unit: "g" },
  "6111234567892": { id: 3, name: "Mélange d'Herbes Fraîches", barcode: "6111234567892", category: "Produits Frais", current: 12, unit: "kg" },
  "6111234567893": { id: 4, name: "Huile d'Argan", barcode: "6111234567893", category: "Huiles", current: 8, unit: "L" },
  "6111234567894": { id: 5, name: "Bœuf Premium", barcode: "6111234567894", category: "Viande", current: 18, unit: "kg" },
  "6111234567895": { id: 6, name: "Citrons Bio", barcode: "6111234567895", category: "Produits Frais", current: 40, unit: "unités" },
  "6111234567896": { id: 7, name: "Huile d'Olive (Premium)", barcode: "6111234567896", category: "Huiles", current: 25, unit: "L" },
  "6111234567897": { id: 8, name: "Couscous", barcode: "6111234567897", category: "Céréales", current: 120, unit: "kg" },
};
interface ScanMovement {
  product: ScannedProduct;
  type: MovementType;
  quantity: number;
  timestamp: Date;
}

interface ScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScanDialog({ open, onOpenChange }: ScanDialogProps) {
  const [step, setStep] = useState<"scan" | "confirm" | "done">("scan");
  const [movementType, setMovementType] = useState<MovementType>(null);
  const [scannedProduct, setScannedProduct] = useState<ScannedProduct | null>(null);
  const [quantity, setQuantity] = useState<string>("1");
  const [manualBarcode, setManualBarcode] = useState("");
  const [useManual, setUseManual] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [movements, setMovements] = useState<ScanMovement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const manualInputRef = useRef<HTMLInputElement>(null);
  // USB barcode scanner support — captures rapid keystrokes
  useEffect(() => {
    if (!open || step !== "scan" || !movementType) return;
    let buffer = "";
    let timeout: NodeJS.Timeout;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (useManual) return;
      if (e.key === "Enter" && buffer.length > 3) {
        lookupBarcode(buffer.trim());
        buffer = "";
        return;
      }
      if (e.key.length === 1) {
        buffer += e.key;
        clearTimeout(timeout);
        timeout = setTimeout(() => { buffer = ""; }, 100);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      clearTimeout(timeout);
    };
  }, [open, step, movementType, useManual]);
  const lookupBarcode = useCallback((barcode: string) => {
    const product = barcodeMap[barcode];
    if (product) {
      setScannedProduct(product);
      setError(null);
      setStep("confirm");
      setScannerActive(false);
    } else {
      setError(`Produit non trouvé pour le code-barres: ${barcode}`);
      setScannedProduct(null);
    }
  }, []);

  const handleCameraScan = useCallback((barcode: string) => {
    lookupBarcode(barcode);
  }, [lookupBarcode]);

  const handleManualSubmit = () => {
    if (manualBarcode.trim().length > 0) {
      lookupBarcode(manualBarcode.trim());
    }
  };

  const handleConfirm = () => {
    if (!scannedProduct || !movementType) return;
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) return;
    const movement: ScanMovement = {
      product: scannedProduct,
      type: movementType,
      quantity: qty,
      timestamp: new Date(),
    };
    setMovements((prev) => [movement, ...prev]);
    setStep("done");
  };

  const handleScanAnother = () => {
    setScannedProduct(null);
    setQuantity("1");
    setManualBarcode("");
    setError(null);
    setStep("scan");
    setScannerActive(true);
  };

  const handleClose = () => {
    setScannerActive(false);
    setStep("scan");
    setMovementType(null);
    setScannedProduct(null);
    setQuantity("1");
    setManualBarcode("");
    setError(null);
    onOpenChange(false);
  };
  const selectMovementType = (type: MovementType) => {
    setMovementType(type);
    setScannerActive(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-stone-900 border-stone-700 text-stone-100 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-stone-100">
            <ScanBarcode className="h-5 w-5 text-amber-400" />
            Scanner Code-Barres — Inventaire
          </DialogTitle>
        </DialogHeader>

        {/* Step 0: Choose movement type */}
        {!movementType && (
          <div className="space-y-4">
            <p className="text-sm text-stone-400">
              Choisissez le type de mouvement de stock :
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => selectMovementType("entry")}
                className="h-24 flex flex-col gap-2 bg-emerald-900/30 border border-emerald-700/50 hover:bg-emerald-900/50 text-emerald-300"
                variant="outline"
              >                <ArrowDownToLine className="h-8 w-8" />
                <span className="text-base font-medium">Entrée</span>
                <span className="text-xs text-emerald-400/70">Réception de stock</span>
              </Button>
              <Button
                onClick={() => selectMovementType("exit")}
                className="h-24 flex flex-col gap-2 bg-red-900/30 border border-red-700/50 hover:bg-red-900/50 text-red-300"
                variant="outline"
              >
                <ArrowUpFromLine className="h-8 w-8" />
                <span className="text-base font-medium">Sortie</span>
                <span className="text-xs text-red-400/70">Utilisation / Perte</span>
              </Button>
            </div>

            {/* Recent movements */}
            {movements.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-stone-500 mb-2 uppercase tracking-wide">Mouvements récents</p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {movements.slice(0, 5).map((m, i) => (
                    <div key={i} className="flex items-center justify-between bg-stone-800/50 rounded-lg px-3 py-2 text-sm">
                      <div className="flex items-center gap-2">
                        {m.type === "entry" ? (
                          <ArrowDownToLine className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (                          <ArrowUpFromLine className="h-3.5 w-3.5 text-red-400" />
                        )}
                        <span className="text-stone-300">{m.product.name}</span>
                      </div>
                      <span className={m.type === "entry" ? "text-emerald-400" : "text-red-400"}>
                        {m.type === "entry" ? "+" : "-"}{m.quantity} {m.product.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Scan barcode */}
        {movementType && step === "scan" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={movementType === "entry" ? "bg-emerald-900/30 text-emerald-300" : "bg-red-900/30 text-red-300"}>
                {movementType === "entry" ? "Entrée de Stock" : "Sortie de Stock"}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => { setMovementType(null); setScannerActive(false); }} className="text-stone-400 text-xs">
                Changer
              </Button>
            </div>
            {/* Camera scanner */}
            {!useManual && (
              <div>
                <BarcodeScanner
                  onScan={handleCameraScan}
                  isActive={scannerActive}
                  onError={() => setUseManual(true)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setUseManual(true); setScannerActive(false); }}
                  className="mt-2 text-stone-400 text-xs w-full"
                >
                  <Keyboard className="h-3.5 w-3.5 mr-1" />
                  Saisie manuelle du code-barres
                </Button>
              </div>
            )}

            {/* Manual input */}
            {useManual && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    ref={manualInputRef}
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}                    placeholder="Entrer le code-barres..."
                    className="bg-stone-800 border-stone-700 text-stone-100 font-mono"
                    autoFocus
                  />
                  <Button onClick={handleManualSubmit} className="bg-amber-600 hover:bg-amber-700">
                    Rechercher
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setUseManual(false); setScannerActive(true); }}
                  className="text-stone-400 text-xs w-full"
                >
                  <Camera className="h-3.5 w-3.5 mr-1" />
                  Utiliser la caméra
                </Button>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <p className="text-xs text-stone-500 text-center">
              Scannez un code-barres avec la caméra, un lecteur USB, ou saisissez-le manuellement
            </p>
          </div>
        )}
        {/* Step 2: Confirm quantity */}
        {movementType && step === "confirm" && scannedProduct && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={movementType === "entry" ? "bg-emerald-900/30 text-emerald-300" : "bg-red-900/30 text-red-300"}>
                {movementType === "entry" ? "Entrée de Stock" : "Sortie de Stock"}
              </Badge>
            </div>

            {/* Product info card */}
            <div className="bg-stone-800/60 rounded-xl p-4 border border-stone-700 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-stone-100">{scannedProduct.name}</h3>
                  <p className="text-sm text-stone-400">{scannedProduct.category}</p>
                </div>
                <Package className="h-6 w-6 text-amber-400" />
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-stone-500">Code-barres: </span>
                  <span className="font-mono text-stone-300">{scannedProduct.barcode}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-stone-500">Stock actuel: </span>
                  <span className="text-stone-100 font-semibold">{scannedProduct.current} {scannedProduct.unit}</span>                </div>
              </div>
            </div>

            {/* Quantity input */}
            <div>
              <label className="text-sm text-stone-400 block mb-2">
                Quantité ({scannedProduct.unit})
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-stone-700 text-stone-300"
                  onClick={() => setQuantity(String(Math.max(1, parseFloat(quantity || "1") - 1)))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-stone-800 border-stone-700 text-stone-100 text-center w-24 text-lg font-semibold"
                  min="0.1"
                  step="0.1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-stone-700 text-stone-300"
                  onClick={() => setQuantity(String(parseFloat(quantity || "1") + 1))}
                >
                  +
                </Button>
              </div>
            </div>
            {/* New stock level preview */}
            <div className="bg-stone-800/40 rounded-lg p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-400">Nouveau stock après {movementType === "entry" ? "entrée" : "sortie"} :</span>
                <span className="text-stone-100 font-semibold">
                  {movementType === "entry"
                    ? scannedProduct.current + parseFloat(quantity || "0")
                    : Math.max(0, scannedProduct.current - parseFloat(quantity || "0"))
                  } {scannedProduct.unit}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleScanAnother}
                className="flex-1 border-stone-700 text-stone-300"
              >
                <X className="h-4 w-4 mr-1" /> Annuler
              </Button>
              <Button
                onClick={handleConfirm}
                className={`flex-1 ${movementType === "entry" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"} text-white`}
              >
                <Check className="h-4 w-4 mr-1" />
                Confirmer {movementType === "entry" ? "l'Entrée" : "la Sortie"}
              </Button>
            </div>
          </div>
        )}
        {/* Step 3: Success */}
        {movementType && step === "done" && scannedProduct && (
          <div className="space-y-4 text-center">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${movementType === "entry" ? "bg-emerald-900/30" : "bg-red-900/30"}`}>
              <Check className={`h-8 w-8 ${movementType === "entry" ? "text-emerald-400" : "text-red-400"}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-stone-100">Mouvement Enregistré</h3>
              <p className="text-sm text-stone-400 mt-1">
                {movementType === "entry" ? "+" : "-"}{quantity} {scannedProduct.unit} de {scannedProduct.name}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleScanAnother}
                className="flex-1 bg-amber-600 hover:bg-amber-700"
              >
                <ScanBarcode className="h-4 w-4 mr-1" />
                Scanner un Autre
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-stone-700 text-stone-300"
              >
                Terminer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}