import React from 'react';
import { Home, ShoppingBag, Cpu, Coins, Sparkles, BookOpen } from 'lucide-react';

export default function StickyMobileNav({ activeTab, setActiveTab }) {
  const NAV_ITEMS = [
    { id: 'all', label: 'Home', icon: Home },
    { id: 'products', label: 'Deals', icon: ShoppingBag },
    { id: 'gaming', label: 'PC Rig', icon: Cpu },
    { id: 'gold', label: 'Gold', icon: Coins },
    { id: 'ai', label: 'AI Tools', icon: Sparkles },
  ];

  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 py-2 shadow-xl touch-manipulation">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all active:scale-90 cursor-pointer min-w-[56px] min-h-[44px] ${
                isActive
                  ? 'text-indigo-600 font-extrabold bg-indigo-50/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 active:bg-slate-100'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-indigo-600 scale-110 transition-transform' : 'text-slate-500'} />
              <span className="text-[11px] mt-0.5 tracking-tight font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
