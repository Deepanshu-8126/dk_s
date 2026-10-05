import React, { useState } from 'react';
import { Camera, ThumbsUp, Trophy, Sparkles, Upload } from 'lucide-react';

const COMMUNITY_SETUPS = [
  {
    id: 'setup-1',
    author: 'Aman Sharma',
    city: 'Bengaluru',
    title: 'Minimalist Cyberpunk AM5 Battlestation',
    specs: 'Ryzen 7 7800X3D + RTX 4080 Super + Alienware 34" QD-OLED',
    votes: 142,
    badge: '🏆 Setup of the Week',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'setup-2',
    author: 'Rohan Verma',
    city: 'Delhi NCR',
    title: 'Clean Whiteout Coding & Streaming Rig',
    specs: 'Intel Core i7-14700K + RTX 4070 Ti Super + Dual 4K LG Displays',
    votes: 98,
    badge: '⚡ Community Favorite',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80'
  }
];

export default function CommunityShowcase() {
  const [setups, setSetups] = useState(COMMUNITY_SETUPS);
  const [votedMap, setVotedMap] = useState({});

  const handleVote = (id) => {
    if (votedMap[id]) return;
    setVotedMap((prev) => ({ ...prev, [id]: true }));
    setSetups((prev) =>
      prev.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s))
    );
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 md:p-8 shadow-2xl backdrop-blur-xl my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 mb-2">
            <Trophy className="h-3.5 w-3.5" /> UniqueDigit Community Battlestations
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-outfit text-white">
            Community Desk Setup & Rig Showcase
          </h3>
          <p className="text-xs text-slate-400">Share your gaming setup or workspace to win featured creator spotlight</p>
        </div>

        <button
          type="button"
          onClick={() => alert('Community upload submission portal is open! Email your high-res setup photos to community@uniquedigit.com to be featured in the next weekly drop.')}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/20 hover:bg-purple-500 transition-all"
        >
          <Upload className="w-3.5 h-3.5" /> Submit Setup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {setups.map((setup) => (
          <div key={setup.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg hover:border-purple-500/40 transition-all">
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={setup.image}
                alt={setup.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                {setup.badge}
              </span>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-white font-outfit">{setup.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">by {setup.author} • {setup.city}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleVote(setup.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    votedMap[setup.id]
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> {setup.votes}
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-slate-950/80 p-3 border border-slate-800/80 text-xs text-slate-300 font-mono">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Hardware Specs:</span>
                {setup.specs}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
