import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 rounded-2xl border border-cyan-500/40 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl animate-fade-in-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black">
            UD
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Install UniqueDigit App</h4>
            <p className="text-[11px] text-slate-400">Offline articles, lightning speed, zero lag.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowBanner(false)}
          className="text-slate-500 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleInstall}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all"
        >
          <Download className="w-3.5 h-3.5" /> Install App
        </button>
        <button
          type="button"
          onClick={() => setShowBanner(false)}
          className="px-3 rounded-xl border border-slate-800 text-xs text-slate-400 hover:bg-slate-900"
        >
          Later
        </button>
      </div>
    </div>
  );
}
