import React, { useEffect, useRef } from 'react';
import { X, Flame, Coins, Fuel, Gamepad2, Sparkles, Newspaper, PenTool, ShoppingBag } from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose, activeTab, onSelectTab }) {
  const drawerRef = useRef(null);

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    drawerRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const NAV_ITEMS = [
    { id: 'all', label: 'All Hits & Stories', icon: Flame, color: 'text-amber-600' },
    { id: 'products', label: 'Gadgets & Tech Deals', icon: ShoppingBag, color: 'text-amber-600' },
    { id: 'gold', label: 'Gold Rate Today', icon: Coins, color: 'text-amber-500' },
    { id: 'hyperlocal', label: 'Fuel & Mandi Bhav', icon: Fuel, color: 'text-emerald-600' },
    { id: 'gaming', label: 'Gaming & GTA Craze', icon: Gamepad2, color: 'text-cyan-600' },
    { id: 'ai', label: 'Top AI Tools Directory', icon: Sparkles, color: 'text-indigo-600' },
    { id: 'sarkari', label: 'Sarkari Results 2026', icon: Newspaper, color: 'text-rose-600' },
    { id: 'studio', label: 'Editorial Studio & Drafts', icon: PenTool, color: 'text-purple-600' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col focus:outline-none overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white bg-gradient-to-br from-amber-600 to-amber-800">
              UD
            </div>
            <span className="font-black text-base text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Unique<span className="text-amber-600">Digit</span>
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:ring-2 focus:ring-amber-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Editorial Sections
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                } focus:ring-2 focus:ring-amber-500 outline-none`}
              >
                <Icon size={18} className={item.color} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 text-xs text-slate-500 bg-slate-50">
          <p className="font-semibold text-slate-700">UniqueDigit Editorial Hub</p>
          <p className="text-[11px] mt-0.5 text-slate-400">Verified ground intelligence & tools</p>
        </div>
      </div>
    </div>
  );
}
