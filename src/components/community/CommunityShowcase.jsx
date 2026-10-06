import React, { useState } from 'react';
import { Camera, ThumbsUp, Trophy, Sparkles, Upload } from 'lucide-react';
import SmartImage from '../common/SmartImage';

const COMMUNITY_SETUPS = [
  {
    id: 'setup-1',
    author: 'Aman Sharma',
    city: 'Bengaluru',
    title: 'Minimalist Cyberpunk AM5 Battlestation',
    specs: 'Ryzen 7 7800X3D + RTX 4080 Super + Alienware 34" QD-OLED',
    votes: 142,
    badge: '🏆 Setup of the Week',
  },
  {
    id: 'setup-2',
    author: 'Rohan Verma',
    city: 'Delhi NCR',
    title: 'Clean Whiteout Coding & Streaming Rig',
    specs: 'Intel Core i7-14700K + RTX 4070 Ti Super + Dual 4K Displays',
    votes: 98,
    badge: '⚡ Community Favorite',
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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs my-8 text-slate-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 mb-2">
            <Trophy className="h-3.5 w-3.5" /> UniqueDigit Community Battlestations
          </div>
          <h3 className="text-xl md:text-2xl font-black font-display text-slate-900">
            Community Desk Setup & Rig Showcase
          </h3>
          <p className="text-xs text-slate-500">Share your gaming setup or workspace to win featured creator spotlight</p>
        </div>

        <button
          type="button"
          onClick={() => alert('Community upload submission portal is open! Email your high-res setup photos to community@uniquedigit.com to be featured in the next weekly drop.')}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-purple-700 transition-all cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" /> Submit Setup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {setups.map((setup) => (
          <div key={setup.id} className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs hover:border-purple-300 transition-all">
            <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center">
              <SmartImage
                keyword={setup.title}
                niche="gaming"
                alt={setup.title}
                aspectRatio="h-48 w-full"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-amber-700 border border-amber-200 shadow-xs">
                {setup.badge}
              </span>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">{setup.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">by {setup.author} • {setup.city}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleVote(setup.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${votedMap[setup.id]
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
                    }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> {setup.votes}
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-white p-3 border border-slate-200 text-xs text-slate-700 font-mono">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Hardware Specs:</span>
                {setup.specs}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
