import React, { useRef, useEffect, useState } from 'react';
import { X, Download, Share2, Sparkles, Check, Flame } from 'lucide-react';
import { buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

export default function SocialDealStoryModal({ isOpen, onClose, product }) {
  const canvasRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !product || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1920;

    canvas.width = width;
    canvas.height = height;

    // 1. Background Obsidian Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#05070c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Cyber grid decorative lines
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.lineWidth = 2;
    for (let x = 0; x < width; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 3. Top Header / Brand Watermark
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('UNIQUE DIGIT', 100, 180);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 28px sans-serif';
    ctx.fillText('VERIFIED TECH INTELLIGENCE · DEALS & BENCHMARKS', 100, 230);

    // 4. Hot Deal Pill Badge
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.roundRect(100, 320, 380, 70, 35);
    ctx.fill();

    ctx.fillStyle = '#022c22';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('🔥 VERIFIED PRICE DROP', 140, 368);

    // 5. Product Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px sans-serif';
    const titleText = product.title || product.name || 'Flagship Hardware Deal';
    
    // Simple wrap
    const words = titleText.split(' ');
    let line = '';
    let y = 490;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 880 && n > 0) {
        ctx.fillText(line, 100, y);
        line = words[n] + ' ';
        y += 80;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 100, y);

    // 6. Price Card Box
    const cardY = y + 80;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(100, cardY, 880, 520, 40);
    ctx.fill();
    ctx.stroke();

    // Price inside box
    const currentPrice = product.priceNumber ? `₹${product.priceNumber.toLocaleString('en-IN')}` : product.price || '₹61,499';
    const mrp = product.originalPrice || '₹74,999';

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 36px sans-serif';
    ctx.fillText('OFFER PRICE:', 160, cardY + 110);

    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 96px sans-serif';
    ctx.fillText(currentPrice, 160, cardY + 220);

    ctx.fillStyle = '#64748b';
    ctx.font = '500 42px sans-serif';
    ctx.fillText(`MRP: ${mrp} (Limited Time Drop)`, 160, cardY + 300);

    // Pros highlights
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`✓ 100% Authentic Indian Stock & Warranty`, 160, cardY + 390);
    ctx.fillText(`✓ Verified Lowest Deal on Amazon India`, 160, cardY + 450);

    // 7. Footer Call to Action
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(100, height - 340, 880, 140, 30);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('🔗 LINK IN BIO · VISIT UNIQUEDIGIT.COM', 160, height - 250);

    // Generate download data URL
    try {
      setDownloadUrl(canvas.toDataURL('image/png'));
    } catch {}
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const currentPrice = product.priceNumber ? `₹${product.priceNumber.toLocaleString('en-IN')}` : product.price || '₹61,499';
  const affiliateLink = getAffiliateLink(product.affiliateUrl || product.link || 'https://amazon.in');
  const shareText = `🔥 Unbelievable Deal Alert: ${product.title || product.name} at only ${currentPrice}! Verified deal tracked by UniqueDigit: https://uniquedigit.com`;

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-cyan-500/30 bg-slate-950 p-6 shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-outfit text-white">Social Deal Story Generator</h3>
              <p className="text-xs text-slate-400">9:16 HD Story Card ready for WhatsApp & Instagram</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Canvas Preview */}
        <div className="flex justify-center my-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-inner">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[260px] h-auto rounded-xl shadow-lg border border-slate-800"
          />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`uniquedigit-deal-${product.id || 'story'}.png`}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-all"
            >
              <Download className="w-4 h-4" /> Download 9:16 PNG
            </a>
          )}

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all"
          >
            <Share2 className="w-4 h-4" /> Share on WhatsApp
          </button>
        </div>

        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={handleCopyLink}
            className="text-xs text-slate-400 hover:text-cyan-400 font-medium inline-flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
            {copied ? 'Deal text copied to clipboard!' : 'Copy viral deal caption'}
          </button>
        </div>
      </div>
    </div>
  );
}
