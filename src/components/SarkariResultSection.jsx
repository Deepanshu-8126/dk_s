import React, { useState } from 'react';
import { ExternalLink, Clock, Users, CheckCircle, FileText, Sparkles, Radio, Award, AlertTriangle, Newspaper, Train, Ticket, Briefcase, CreditCard, Car, Landmark } from 'lucide-react';
import { SARKARI_JOBS, QUICK_LINKS } from '../data/sarkariJobs';
import { REAL_SARKARI_DATA, isDataStale, STALE_BADGE_TEXT } from '../data/realData';

const BADGE_CONFIG = {
  result:       { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0', icon: CheckCircle },
  admit:        { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A', icon: FileText },
  new:          { bg: '#EEF2FF', text: '#3730A3', border: '#C7D2FE', icon: Sparkles },
  live:         { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA', icon: Radio },
  result_final: { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0', icon: Award },
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
    <section className="fade-up mb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
            <Newspaper className="text-rose-600" size={17} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Sarkari Result & Jobs 2026
          </h2>
          <span className="badge-red text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Official Portals Verified
          </span>
          {isStale && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
              <AlertTriangle size={11} />
              {STALE_BADGE_TEXT}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Last updated: {REAL_SARKARI_DATA.displayUpdated}
        </span>
      </div>

      {/* Quick Links Row (Clean White Pills with Lucide Icons) */}
      <div className="scroll-x flex gap-2 mb-4 pb-1">
        {QUICK_LINKS.map((lnk, i) => {
          const Icon = QUICK_LINK_ICONS[lnk.label] || Newspaper;
          return (
            <a
              key={i}
              href={lnk.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 bg-white border border-[#E5E7EB] hover:border-[#DC2626] text-[#334155] hover:text-[#DC2626] shadow-2xs transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Icon size={14} className="text-[#DC2626]" />
              <span>{lnk.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-[#F1F5F9] text-[#64748B]">
                {lnk.volume}
              </span>
            </a>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="scroll-x flex gap-1.5 mb-5">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`tab-pill text-xs py-1.5 px-3.5 ${filter === f.id ? 'active-red' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Job Cards Grid (Clean White Cards, 16px Radius, 1px Border) */}
      {filtered.length === 0 ? (
        <div className="global-card p-8 text-center bg-white rounded-2xl border border-[#E5E7EB]">
          <p className="text-[#6B7280]" style={{ fontFamily: 'var(--font-display)' }}>
            No results found for "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((job) => {
            const badgeCfg = BADGE_CONFIG[job.badgeType] || BADGE_CONFIG.new;
            const BadgeIcon = badgeCfg.icon;
            const isUrgent = job.urgency === 'urgent';
            const isSoon = job.urgency === 'soon';

            return (
              <article key={job.id} className="global-card niche-red p-5 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#FCA5A5] shadow-xs hover:shadow-md flex flex-col justify-between gap-3.5 transition-all">
                {/* Top row */}
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1"
                      style={{ background: badgeCfg.bg, color: badgeCfg.text, border: `1px solid ${badgeCfg.border}`, fontFamily: 'var(--font-display)' }}
                    >
                      <BadgeIcon size={11} />
                      {job.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base leading-snug text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
                    {job.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">{job.org}</p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-2 py-1 text-xs">
                  {job.posts && job.posts !== 'N/A' && (
                    <div className="flex items-center gap-1.5 text-[#334155]">
                      <Users size={12} className="text-[#64748B]" />
                      <span className="font-bold font-mono">{job.posts} Posts</span>
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold font-mono text-[#059669]">
                        {job.salary}
                      </span>
                    </div>
                  )}
                  {job.category && (
                    <div className="text-[#6B7280]">
                      {job.category}
                    </div>
                  )}
                  {job.searchVolume && (
                    <div className="font-bold text-[#4F46E5] font-mono">
                      🔍 {job.searchVolume}
                    </div>
                  )}
                </div>

                {/* Deadline + Tags */}
                <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-[#F3F4F6]">
                  <div className="flex items-center gap-1.5">
                    {job.daysLeft !== null && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isUrgent ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]' : isSoon ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]' : 'bg-[#F0FDF4] text-[#059669] border border-[#BBF7D0]'
                      }`}>
                        <Clock size={10} />
                        {job.daysLeft <= 0 ? 'Today!' : `${job.daysLeft}d left`}
                      </span>
                    )}
                    {job.tags?.map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] font-mono">
                    Verified {REAL_SARKARI_DATA.lastUpdated}
                  </span>
                </div>

                {/* CTA */}
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red text-xs py-2.5 px-4 text-center flex items-center justify-center gap-1.5 rounded-xl font-bold transition-all shadow-xs"
                >
                  <span>{job.cta}</span>
                  <ExternalLink size={12} />
                </a>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
