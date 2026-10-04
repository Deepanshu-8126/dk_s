import React, { useEffect } from 'react';

/**
 * AdSlot Component
 * 
 * Non-intrusive, CLS-safe ad placeholder ready for Google AdSense or direct affiliate banners.
 * When AdSense is approved, set VITE_ADSENSE_CLIENT_ID in .env and add your slot ID.
 */
export default function AdSlot({
  id = 'default-ad',
  slotType = 'leaderboard', // 'leaderboard' | 'in-feed' | 'rectangle'
  adClient = import.meta.env?.VITE_ADSENSE_CLIENT_ID,
  adSlot = null,
  className = '',
}) {
  useEffect(() => {
    // If real AdSense is configured, trigger adsbygoogle push
    if (adClient && adSlot && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Safe catch
      }
    }
  }, [adClient, adSlot]);

  // Size styling per slot type
  const typeStyles = {
    leaderboard: 'w-full min-h-[90px] py-2',
    'in-feed': 'w-full min-h-[120px] py-4',
    rectangle: 'w-full max-w-[336px] min-h-[280px]',
  };

  // If no AdSense client ID is configured, render nothing to avoid empty placeholder boxes
  if (!adClient) {
    return null;
  }

  return (
    <div
      id={id}
      className={`my-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-3 text-center transition-all ${
        typeStyles[slotType] || typeStyles.leaderboard
      } ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot || ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
