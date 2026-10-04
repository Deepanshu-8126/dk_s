import { Gamepad2, Coins, Sparkles, GraduationCap, FileText } from 'lucide-react';

export function getArticleVisualMeta(article) {
  const text = `${article.keyword || ''} ${article.title || ''}`.toLowerCase();
  if (text.includes('gta') || text.includes('gaming') || text.includes('pc build') || text.includes('specs')) {
    return {
      niche: 'gaming',
      label: 'Gaming Rig',
      gradient: 'from-cyan-950 via-slate-900 to-blue-950',
      icon: Gamepad2,
      accent: 'text-cyan-400',
      src: article.imageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    };
  }
  if (text.includes('gold') || text.includes('bullion') || text.includes('rate') || text.includes('price')) {
    return {
      niche: 'gold',
      label: 'Bullion Rate',
      gradient: 'from-amber-950 via-slate-900 to-yellow-950',
      icon: Coins,
      accent: 'text-amber-400',
      src: article.imageUrl || 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    };
  }
  if (text.includes('chatgpt') || text.includes('gemini') || text.includes('ai') || text.includes('tool')) {
    return {
      niche: 'ai',
      label: 'Frontier AI',
      gradient: 'from-indigo-950 via-slate-900 to-violet-950',
      icon: Sparkles,
      accent: 'text-indigo-400',
      src: article.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    };
  }
  if (text.includes('cgl') || text.includes('ssc') || text.includes('sarkari') || text.includes('exam')) {
    return {
      niche: 'sarkari',
      label: 'Govt Exam',
      gradient: 'from-blue-950 via-slate-900 to-slate-900',
      icon: GraduationCap,
      accent: 'text-blue-400',
      src: article.imageUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    };
  }
  return {
    niche: 'general',
    label: 'Market Verdict',
    gradient: 'from-slate-900 via-slate-800 to-slate-900',
    icon: FileText,
    accent: 'text-emerald-400',
    src: article.imageUrl || null,
  };
}
