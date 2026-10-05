import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  const languages = [
    { code: 'hi-en', label: 'Hinglish' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' }
  ];

  return (
    <div className="flex items-center gap-1 rounded-xl bg-slate-900 border border-slate-800 p-1">
      <div className="flex items-center gap-1 px-1.5 text-slate-400">
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
      </div>
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLanguage(l.code)}
          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
            language === l.code
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
