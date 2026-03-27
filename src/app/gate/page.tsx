"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function GatePage() {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {      setError(true);
      setLoading(false);
    }
  };

  return (
    <html lang="fr">
      <body className="bg-stone-950 text-stone-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          {/* Brand */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/30 mb-6">
              <Lock className="h-7 w-7 text-amber-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              2R <span className="text-amber-400">FUSION</span>
            </h1>
            <div className="h-0.5 w-12 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-4" />
            <p className="text-stone-500 text-sm mt-4 tracking-wide uppercase">
              Accès Restreint
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-stone-500 uppercase tracking-wider block mb-2">
                Code d&apos;Accès
              </label>              <div className="relative">
                <input
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(false); }}
                  placeholder="Entrer le code..."
                  autoFocus
                  className={`w-full bg-stone-900 border ${error ? "border-red-500/60" : "border-stone-700"} rounded-xl px-4 py-3.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all text-lg tracking-wider`}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showCode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2">Code incorrect. Veuillez réessayer.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-all text-sm uppercase tracking-wider"
            >
              {loading ? "Vérification..." : "Accéder"}
            </button>
          </form>
          {/* Footer */}
          <p className="text-center text-stone-700 text-xs mt-12">
            &copy; 2026 2R Fusion. Tous droits réservés.
          </p>
        </div>
      </body>
    </html>
  );
}