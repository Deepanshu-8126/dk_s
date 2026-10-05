import React from 'react';
import { Home, ShoppingBag, Cpu, Coins, Sparkles, BookOpen } from 'lucide-react';

export default function StickyMobileNav({ activeTab, setActiveTab }) {
  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Deals', icon: ShoppingBag },
    { id: 'gaming', label: 'PC Rig', icon: Cpu },
    { id: 'gold', label: 'Gold', icon: Coins },
    { id: 'ai', label: 'AI Tools', icon: Sparkles },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-md">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-indigo-600 scale-110 transition-transform' : ''} />
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
