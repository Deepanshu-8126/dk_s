import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function AccordionFAQ({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Schema.org FAQPage structured data
  const validFaqs = Array.isArray(faqs) ? faqs.filter(Boolean) : [];
  if (validFaqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q || f.question || 'Frequently Asked Question',
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a || f.answer || ''
      }
    }))
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs my-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
        <HelpCircle className="w-5 h-5 text-indigo-600" />
        <h4 className="text-base font-bold font-outfit text-slate-900">Frequently Asked Questions (FAQs)</h4>
      </div>

      <div className="space-y-3">
        {validFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const questionText = faq.q || faq.question || `Question ${idx + 1}`;
          const answerText = faq.a || faq.answer || '';
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 text-left text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <span>{questionText}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                  {answerText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
