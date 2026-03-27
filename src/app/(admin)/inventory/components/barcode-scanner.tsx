"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CameraOff, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onError?: (error: string) => void;
  isActive: boolean;
}

export function BarcodeScanner({ onScan, onError, isActive }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const containerRef = useRef<string>("barcode-scanner-" + Math.random().toString(36).slice(2));

  const startScanner = useCallback(async () => {
    try {
      const scanner = new Html5Qrcode(containerRef.current);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 300, height: 150 },
          aspectRatio: 1.777,
        },
        (decodedText) => {
          onScan(decodedText);
          // Don't stop - let parent handle via isActive
        },
        () => {
          // Ignore scan failures (expected while aiming)
        }
      );
      setIsScanning(true);
    } catch (err: any) {
      setHasCamera(false);
      onError?.(err?.message || "Impossible d'accéder à la caméra");
    }
  }, [onScan, onError]);
  const stopScanner = useCallback(async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch {
        // Ignore cleanup errors
      }
      scannerRef.current = null;
      setIsScanning(false);
    }
  }, [isScanning]);

  useEffect(() => {
    if (isActive && !isScanning) {
      startScanner();
    } else if (!isActive && isScanning) {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [isActive, isScanning, startScanner, stopScanner]);

  if (!hasCamera) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-stone-800/50 rounded-xl border border-stone-700 space-y-3">
        <CameraOff className="h-10 w-10 text-stone-500" />        <p className="text-stone-400 text-sm text-center">
          Caméra non disponible. Utilisez le champ de saisie manuelle ci-dessous.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        id={containerRef.current}
        className="rounded-xl overflow-hidden border border-stone-700 bg-black"
        style={{ minHeight: "250px" }}
      />
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-[300px] h-[150px]">
            <div className="absolute inset-0 border-2 border-amber-400/60 rounded-lg" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400 animate-pulse" />
          </div>
        </div>
      )}
      {!isScanning && isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900/80 rounded-xl">
          <div className="flex flex-col items-center space-y-2">
            <Camera className="h-8 w-8 text-amber-400 animate-pulse" />
            <p className="text-stone-300 text-sm">Démarrage de la caméra...</p>
          </div>
        </div>
      )}
    </div>
  );
}