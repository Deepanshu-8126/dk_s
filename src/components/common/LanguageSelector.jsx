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
    <div className="flex items-center gap-1 rounded-xl bg-slate-100 border border-slate-200 p-1">
      <div className="flex items-center gap-1 px-1.5 text-slate-500">
        <Globe className="w-3.5 h-3.5 text-cyan-600" />
      </div>
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLanguage(l.code)}
          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            language === l.code
              ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
