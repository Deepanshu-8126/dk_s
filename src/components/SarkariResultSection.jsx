import React, { useState } from 'react';
import { ExternalLink, Clock, Users, CheckCircle, FileText, Sparkles, Radio, Award, AlertTriangle, Newspaper, Train, Ticket, Briefcase, CreditCard, Car, Landmark } from 'lucide-react';
import { SARKARI_JOBS, QUICK_LINKS } from '../data/sarkariJobs';
import { REAL_SARKARI_DATA, isDataStale, STALE_BADGE_TEXT } from '../data/realData';

const BADGE_CONFIG = {
  result:       { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.3)', icon: CheckCircle },
  admit:        { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.3)', icon: FileText },
  new:          { bg: 'rgba(99, 102, 241, 0.15)', text: '#818CF8', border: 'rgba(99, 102, 241, 0.3)', icon: Sparkles },
  live:         { bg: 'rgba(244, 63, 94, 0.15)', text: '#FB7185', border: 'rgba(244, 63, 94, 0.3)', icon: Radio },
  result_final: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.3)', icon: Award },
};

const QUICK_LINK_ICONS = {
  "PNR Status": Train,
  "IRCTC Login": Ticket,
  "EPFO Passbook": Briefcase,
  "Aadhaar Update": CreditCard,
  "DL/RC Status": Car,
  "Pan Card Status": Landmark,
};

export default function SarkariResultSection({ searchQuery }) {
  const [filter, setFilter] = useState('all');

  const FILTERS = [
    { id: 'all', label: 'All Jobs' },
    { id: 'result', label: 'Results' },
    { id: 'new', label: 'New Jobs' },
    { id: 'admit', label: 'Admit Cards' },
    { id: 'live', label: 'Live Tracker' },
  ];

  const filtered = SARKARI_JOBS.filter(j => {
    const matchFilter = filter === 'all' || j.badgeType === filter || j.urgency === filter;
    const q = (searchQuery || '').toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.org.toLowerCase().includes(q) || (j.category && j.category.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });

  const isStale = isDataStale(REAL_SARKARI_DATA.lastUpdated);

  return (
    <section className="fade-up mb-8 text-slate-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Newspaper className="text-emerald-400" size={17} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight font-display">
            Sarkari Result & Jobs 2026
          </h2>
          <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Official Portals Verified
          </span>
          {isStale && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1">
              <AlertTriangle size={11} />
              {STALE_BADGE_TEXT}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Last updated: {REAL_SARKARI_DATA.displayUpdated}
        </span>
      </div>

      {/* Quick Links Row */}
      <div className="flex gap-2 mb-4 pb-1 overflow-x-auto">
        {QUICK_LINKS.map((lnk, i) => {
          const Icon = QUICK_LINK_ICONS[lnk.label] || Newspaper;
          return (
            <a
              key={i}
              href={lnk.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all shadow-md font-display"
            >
              <Icon size={14} className="text-indigo-400" />
              <span>{lnk.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-950 text-slate-400 border border-slate-800">
                {lnk.volume}
              </span>
            </a>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-xs py-1.5 px-3.5 rounded-full font-bold transition-all cursor-pointer ${
              filter === f.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900 bg-slate-950 border border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Job Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800">
          <p className="text-slate-400 font-display">
            No results found for "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((job) => {
            const badgeCfg = BADGE_CONFIG[job.badgeType] || BADGE_CONFIG.new;
            const BadgeIcon = badgeCfg.icon;

            return (
              <article key={job.id} className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800 hover:border-emerald-500/30 shadow-lg flex flex-col justify-between gap-3.5 transition-all">
                {/* Top row */}
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 font-display"
                      style={{ background: badgeCfg.bg, color: badgeCfg.text, border: `1px solid ${badgeCfg.border}` }}
                    >
                      <BadgeIcon size={11} />
                      {job.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base leading-snug text-white font-display">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{job.org}</p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-2 py-1 text-xs">
                  {job.posts && job.posts !== 'N/A' && (
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Users size={12} className="text-slate-400" />
                      <span className="font-bold font-mono">{job.posts} Posts</span>
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold font-mono text-emerald-400">
                        {job.salary}
                      </span>
                    </div>
                  )}
                  {job.category && (
                    <div className="text-slate-400">
                      {job.category}
                    </div>
                  )}
                  {job.searchVolume && (
                    <div className="font-bold text-indigo-400 font-mono">
                      {job.searchVolume} Searches
                    </div>
                  )}
                </div>

                {/* Dates & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock size={12} />
                    <span>Last Date: <strong className="text-slate-200">{job.lastDate}</strong></span>
                  </div>
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 hover:border-emerald-500 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>{job.ctaText}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
