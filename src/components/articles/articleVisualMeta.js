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
      src: article.imageUrl || 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
    };
  }
  if (text.includes('gold') || text.includes('bullion') || text.includes('rate') || text.includes('price')) {
    return {
      niche: 'gold',
      label: 'Bullion Rate',
      gradient: 'from-amber-950 via-slate-900 to-yellow-950',
      icon: Coins,
      accent: 'text-amber-400',
      src: article.imageUrl || 'https://m.media-amazon.com/images/I/71ZDY57y6QL._SX679_.jpg',
    };
  }
  if (text.includes('chatgpt') || text.includes('gemini') || text.includes('ai') || text.includes('tool')) {
    return {
      niche: 'ai',
      label: 'Frontier AI',
      gradient: 'from-indigo-950 via-slate-900 to-violet-950',
      icon: Sparkles,
      accent: 'text-indigo-400',
      src: article.imageUrl || 'https://m.media-amazon.com/images/I/71ItMeqpN3L._SX679_.jpg',
    };
  }
  if (text.includes('cgl') || text.includes('ssc') || text.includes('sarkari') || text.includes('exam')) {
    return {
      niche: 'sarkari',
      label: 'Govt Exam',
      gradient: 'from-blue-950 via-slate-900 to-slate-900',
      icon: GraduationCap,
      accent: 'text-blue-400',
      src: article.imageUrl || 'https://m.media-amazon.com/images/I/71AYb2AGHBL._SX679_.jpg',
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
