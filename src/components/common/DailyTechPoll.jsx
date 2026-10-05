import React, { useState, useEffect } from 'react';
import { BarChart2, CheckCircle2, Sparkles, ThumbsUp } from 'lucide-react';

const POLL_DATA = {
  id: 'gta6-gpu-upgrade-2026',
  question: 'GTA 6 PC Specs Reality: Will you upgrade your GPU to 12GB+ VRAM this year?',
  totalVotes: 1482,
  options: [
    { id: 'opt1', text: 'Yes, buying RTX 4070 Super / RX 7800 XT (12GB+)', votes: 840 },
    { id: 'opt2', text: 'Sticking with 8GB card (RTX 3060/4060) on Medium 1080p', votes: 410 },
    { id: 'opt3', text: 'Waiting for PlayStation 5 Pro release instead', votes: 232 },
  ]
};

export default function DailyTechPoll() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(POLL_DATA.options);

  useEffect(() => {
    try {
      const savedVote = localStorage.getItem(`ud_poll_${POLL_DATA.id}`);
      if (savedVote) {
        setSelectedOption(savedVote);
        setHasVoted(true);
      }
    } catch {}
  }, []);

  const handleVote = (optionId) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
    setHasVoted(true);

    setVotes(prev =>
      prev.map(opt => (opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt))
    );

    try {
      localStorage.setItem(`ud_poll_${POLL_DATA.id}`, optionId);
    } catch {}
  };

  const totalVotesCount = votes.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div className="my-8 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl text-slate-100">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BarChart2 size={13} className="text-indigo-400" />
          <span>Daily Community Tech Pulse</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          {totalVotesCount.toLocaleString('en-IN')} votes
        </span>
      </div>

      <h4 className="text-base font-bold text-white mb-4 font-display">
        {POLL_DATA.question}
      </h4>

      <div className="space-y-2.5">
        {votes.map(option => {
          const percent = Math.round((option.votes / totalVotesCount) * 100) || 0;
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full relative overflow-hidden p-3.5 rounded-2xl text-left text-xs transition-all border cursor-pointer ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold'
                  : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700'
              }`}
            >
              {/* Animated Progress Fill Bar */}
              {hasVoted && (
                <div
                  className={`absolute inset-0 transition-all duration-700 pointer-events-none ${
                    isSelected ? 'bg-indigo-600/25' : 'bg-slate-800/40'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {isSelected ? (
                    <CheckCircle2 size={15} className="text-indigo-400 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                  )}
                  <span>{option.text}</span>
                </div>
                {hasVoted && (
                  <span className="font-mono font-bold text-indigo-300 shrink-0">
                    {percent}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
