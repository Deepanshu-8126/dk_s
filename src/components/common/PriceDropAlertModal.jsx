import React, { useState } from 'react';
import { Bell, X, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

export default function PriceDropAlertModal({ isOpen, onClose, product }) {
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState(product ? Math.round(product.price * 0.9) : '');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const alerts = JSON.parse(localStorage.getItem('ud_price_alerts') || '[]');
      alerts.push({
        id: product.id || product.title,
        title: product.title,
        currentPrice: product.price,
        targetPrice,
        email,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ud_price_alerts', JSON.stringify(alerts));
    } catch {}

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 text-slate-100 rounded-3xl p-6 border border-slate-800 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Bell size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-display">Instant Price Drop Alert</h3>
            <span className="text-xs text-slate-400">Never miss a flash deal or discount drop</span>
          </div>
        </div>

        <div className="my-4 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.title} className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0" />
          )}
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate font-display">{product.title}</h4>
            <div className="text-xs text-slate-400 mt-0.5">
              Current Verified Price: <span className="font-mono font-bold text-emerald-400">₹{product.price?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Alert Configured Successfully!</h4>
            <p className="text-xs text-slate-300">We will notify you via email as soon as the price drops below ₹{targetPrice?.toLocaleString('en-IN')}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Target Price Alert (INR)</label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm outline-none focus:border-amber-400"
                placeholder="e.g. 55000"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Your Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                placeholder="you@domain.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Bell size={14} />
              <span>Set Alert Notification</span>
            </button>

            <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck size={12} className="text-emerald-400" /> Zero spam policy. Unsubscribe anytime.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
