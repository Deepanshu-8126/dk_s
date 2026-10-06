import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Sparkles, Gamepad2, Coins, 
  Newspaper, HeartPulse, Wheat, Image as ImageIcon, Laptop, Cpu
} from 'lucide-react';
import { getRealImage } from '../../utils/getRealImage';

const CATEGORY_ICONS = {
  gaming: Gamepad2,
  finance: Coins,
  bullion: Coins,
  coding: Cpu,
  ai: Sparkles,
  smartphones: ShoppingBag,
  laptops: Laptop,
  health: HeartPulse,
  agriculture: Wheat,
  sarkari: Newspaper,
};

export default function SmartImage({
  src = null,
  keyword = '',
  niche = 'general',
  alt = 'Media visual',
  className = '',
  imgClassName = 'max-h-full max-w-full object-contain',
  aspectRatio = 'aspect-video'
}) {
  const [imgUrl, setImgUrl] = useState(src || null);
  const [status, setStatus] = useState(src ? 'loaded' : 'loading');

  const IconComponent = CATEGORY_ICONS[niche?.toLowerCase()] || ImageIcon;

  useEffect(() => {
    let isMounted = true;
    if (src) {
      setImgUrl(src);
      setStatus('loaded');
      return;
    }

    if (!keyword) {
      setStatus('empty');
      return;
    }

    setStatus('loading');
    getRealImage(keyword, niche)
      .then(url => {
        if (!isMounted) return;
        if (url) {
          setImgUrl(url);
          setStatus('loaded');
        } else {
          setStatus('empty');
        }
      })
      .catch(() => {
        if (isMounted) setStatus('empty');
      });

    return () => {
      isMounted = false;
    };
  }, [src, keyword, niche]);

  if (status === 'empty' || !imgUrl) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-4 rounded-xl border border-slate-100 ${aspectRatio} ${className}`}>
        <div className="p-3 bg-white rounded-2xl shadow-2xs border border-slate-200 mb-1.5">
          <IconComponent size={22} className="text-slate-500" />
        </div>
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
          {niche || 'Live Item'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${aspectRatio} ${className}`}>
      {status === 'loading' && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center rounded-xl">
          <IconComponent size={20} className="text-slate-300" />
        </div>
      )}
      <img
        src={imgUrl}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('empty')}
        className={`${imgClassName} ${status === 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
}
