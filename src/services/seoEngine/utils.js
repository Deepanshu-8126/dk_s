/**
 * SEO Engine Quality & Utility Helpers
 */

export const DEFAULT_AUTHOR = {
  name: "Vikramaditya Rathore",
  role: "Senior Tech & Financial Markets Analyst",
  bio: "Tech journalist with 8+ years analyzing Indian consumer hardware, bullion rates, and AI benchmarks. Former contributor to leading national market columns.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikramaditya&backgroundColor=f1f5f9",
  expertise: ["PC Hardware", "Bullion Markets", "AI Models", "Public Exams"],
};

export function countWords(str) {
  return (str || '').trim().split(/\s+/).filter(Boolean).length;
}

export function calculateJaccardSimilarity(text1, text2) {
  if (!text1 || !text2) return 0;
  const set1 = new Set(text1.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3));
  const set2 = new Set(text2.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3));
  if (set1.size === 0 || set2.size === 0) return 0;

  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

export function hasContinuousNgramOverlap(text1, text2, n = 5) {
  if (!text1 || !text2) return false;

  const BOILERPLATE_TERMS = [
    'verdict', 'lena', 'chahiye', 'ya', 'nahi', 'and', 'kyu',
    'key', 'technical', 'specifications', 'verified', 'details',
    'fayda', 'savdhani', 'ground', 'reality', 'price', 'breakdown',
    'expert', 'observations'
  ];

  const stripStructure = (t) =>
    t
      .split('\n')
      .filter((line) => {
        const l = line.trim().toLowerCase();
        return !l.startsWith('#') && !l.startsWith('- **') && !l.startsWith('key technical') && !l.startsWith('**verdict');
      })
      .join(' ')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, ' ') // ignore internal anchor texts
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

  const tokens1 = stripStructure(text1);
  const tokens2 = stripStructure(text2);
  if (tokens1.length < n || tokens2.length < n) return false;

  const ngrams = new Set();
  for (let i = 0; i <= tokens1.length - n; i++) {
    const p = tokens1.slice(i, i + n).join(' ');
    const words = p.split(' ');
    const isBoilerplate = words.filter(w => BOILERPLATE_TERMS.includes(w)).length >= 3;
    if (!isBoilerplate) {
      ngrams.add(p);
    }
  }

  for (let j = 0; j <= tokens2.length - n; j++) {
    const phrase = tokens2.slice(j, j + n).join(' ');
    const words = phrase.split(' ');
    const isBoilerplate = words.filter(w => BOILERPLATE_TERMS.includes(w)).length >= 3;
    if (!isBoilerplate && ngrams.has(phrase)) {
      return true;
    }
  }
  return false;
}
