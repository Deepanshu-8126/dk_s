import React, { useState } from 'react';
import { Cpu, Smartphone, ArrowRightLeft, Sparkles, CheckCircle2, ShieldCheck, Zap, Award } from 'lucide-react';

const PRESET_COMPARISONS = {
  smartphones: [
    {
      deviceA: {
        name: 'Samsung Galaxy S24 Ultra',
        price: '₹1,29,999',
        processor: 'Snapdragon 8 Gen 3 for Galaxy',
        camera: '200MP Main + 50MP 5x Periscope',
        battery: '5000 mAh (45W Fast Charging)',
        display: '6.8" QHD+ 120Hz Dynamic AMOLED 2X (2600 nits)',
        antutuScore: '1,950,000',
        highlights: 'S-Pen embedded, Titanium Frame, 7 Years OS Updates',
        scores: { perf: 96, camera: 98, battery: 90, display: 99, value: 85 }
      },
      deviceB: {
        name: 'iPhone 16 Pro Max',
        price: '₹1,44,900',
        processor: 'Apple A18 Pro (3nm)',
        camera: '48MP Fusion + 48MP Ultra-Wide + 12MP 5x Tele',
        battery: '4685 mAh (MagSafe Qi2)',
        display: '6.9" Super Retina XDR OLED (2000 nits)',
        antutuScore: '1,820,000',
        highlights: 'Dedicated Camera Control, Apple Intelligence Ready, ProRes Log',
        scores: { perf: 98, camera: 97, battery: 94, display: 97, value: 82 }
      },
      aiVerdict: 'iPhone 16 Pro Max offers unmatched single-core CPU efficiency and ProRes video fidelity. However, Galaxy S24 Ultra provides greater anti-reflective display clarity, S-Pen versatility, and higher optical zoom reach at ₹15,000 lower initial cost.'
    },
    {
      deviceA: {
        name: 'OnePlus 12 5G',
        price: '₹64,999',
        processor: 'Snapdragon 8 Gen 3',
        camera: '50MP Sony LYT-808 + 64MP 3x Periscope',
        battery: '5400 mAh (100W SUPERVOOC)',
        display: '6.82" 2K 120Hz ProXDR (4500 nits Peak)',
        antutuScore: '2,110,000',
        highlights: '100W in-box charger, Hasselblad Color Calibration',
        scores: { perf: 94, camera: 90, battery: 98, display: 96, value: 95 }
      },
      deviceB: {
        name: 'iQOO 12 5G',
        price: '₹52,999',
        processor: 'Snapdragon 8 Gen 3 + Q1 Chip',
        camera: '50MP Astro Main + 64MP 3x Periscope',
        battery: '5000 mAh (120W FlashCharge)',
        display: '6.78" 1.5K 144Hz LTPO AMOLED (3000 nits)',
        antutuScore: '2,150,000',
        highlights: 'Dedicated Q1 frame interpolation chip for 144FPS gaming',
        scores: { perf: 96, camera: 88, battery: 92, display: 93, value: 97 }
      },
      aiVerdict: 'iQOO 12 wins purely on budget-to-performance ratio for hardcore 144FPS mobile gamers at ₹52,999. OnePlus 12 provides a significantly superior 2K display, larger battery capacity, and wireless charging refinement.'
    }
  ],
  gpus: [
    {
      deviceA: {
        name: 'NVIDIA GeForce RTX 4070 Super',
        price: '₹61,499',
        processor: 'AD104-350 (7,168 CUDA Cores)',
        camera: '12GB GDDR6X (192-bit / 504 GB/s)',
        battery: '220W TGP (16-pin 12VHPWR)',
        display: 'AV1 Dual Encoder + DLSS 3.5 Frame Gen',
        antutuScore: '1440p Ultra: 115 Avg FPS',
        highlights: 'Full Ray Tracing path tracing performance with DLSS 3.5 Ray Reconstruction',
        scores: { perf: 92, camera: 95, battery: 88, display: 98, value: 91 }
      },
      deviceB: {
        name: 'AMD Radeon RX 7800 XT',
        price: '₹51,999',
        processor: 'Navi 32 XT (3,840 Stream Processors)',
        camera: '16GB GDDR6 (256-bit / 624 GB/s)',
        battery: '263W TBP (2x 8-pin PCIe)',
        display: 'DisplayPort 2.1 + FSR 3.1 Frame Gen',
        antutuScore: '1440p Ultra: 108 Avg FPS',
        highlights: 'Extra 4GB VRAM buffer for VRAM-intensive textures and longevity',
        scores: { perf: 88, camera: 82, battery: 84, display: 88, value: 96 }
      },
      aiVerdict: 'RTX 4070 Super is the superior GPU for gamers demanding Ray Tracing, DLSS 3.5 frame gen, and content creation (Blender/CUDA). RX 7800 XT offers massive value with 16GB VRAM at ₹9,500 lower price point for pure raster 1440p gaming.'
    }
  ]
};

export default function SmartSpecMatcher() {
  const [category, setCategory] = useState('smartphones');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activePair = PRESET_COMPARISONS[category][selectedIdx] || PRESET_COMPARISONS[category][0];
  const { deviceA, deviceB, aiVerdict } = activePair;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs my-8 text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800 mb-2 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-cyan-600" /> AI Spec Matcher & Verdict
          </div>
          <h3 className="text-2xl font-bold font-outfit text-slate-900 tracking-tight">
            Smart Side-by-Side Spec Comparison Matrix
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Real-time algorithmic delta scoring & bottleneck comparison (Zero Biased Data)
          </p>
        </div>

        {/* Category Toggles */}
        <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1.5 border border-slate-200">
          <button
            type="button"
            onClick={() => { setCategory('smartphones'); setSelectedIdx(0); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              category === 'smartphones'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Smartphones
          </button>
          <button
            type="button"
            onClick={() => { setCategory('gpus'); setSelectedIdx(0); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              category === 'gpus'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> GPUs / Graphics
          </button>
        </div>
      </div>

      {/* Comparison Selectors */}
      <div className="flex flex-wrap gap-2 my-4">
        {PRESET_COMPARISONS[category].map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              selectedIdx === idx
                ? 'border-cyan-500 bg-cyan-50 text-cyan-800 font-bold shadow-xs'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {item.deviceA.name} vs {item.deviceB.name}
          </button>
        ))}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 relative">
        {/* Device A Card */}
        <div className="rounded-2xl border border-cyan-200 bg-slate-50/60 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-100 text-cyan-800 text-[10px] font-bold rounded-bl-xl border-b border-l border-cyan-200">
            Contender A
          </div>
          <h4 className="text-lg font-bold text-slate-900 font-outfit">{deviceA.name}</h4>
          <div className="text-xl font-bold font-mono text-cyan-700 mt-1 mb-4">{deviceA.price}</div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Processor / Silicon:</span>
              <span className="font-semibold text-slate-900 text-right">{deviceA.processor}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Camera / VRAM:</span>
              <span className="font-semibold text-slate-900 text-right">{deviceA.camera}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Battery / Power:</span>
              <span className="font-semibold text-slate-900 text-right">{deviceA.battery}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Display / Video Engine:</span>
              <span className="font-semibold text-slate-900 text-right">{deviceA.display}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Benchmark Index:</span>
              <span className="font-mono font-bold text-emerald-700">{deviceA.antutuScore}</span>
            </div>
          </div>
        </div>

        {/* Device B Card */}
        <div className="rounded-2xl border border-blue-200 bg-slate-50/60 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-bl-xl border-b border-l border-blue-200">
            Contender B
          </div>
          <h4 className="text-lg font-bold text-slate-900 font-outfit">{deviceB.name}</h4>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1 mb-4">{deviceB.price}</div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Processor / Silicon:</span>
              <span className="font-semibold text-slate-900 text-right">{deviceB.processor}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Camera / VRAM:</span>
              <span className="font-semibold text-slate-900 text-right">{deviceB.camera}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Battery / Power:</span>
              <span className="font-semibold text-slate-900 text-right">{deviceB.battery}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Display / Video Engine:</span>
              <span className="font-semibold text-slate-900 text-right">{deviceB.display}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Benchmark Index:</span>
              <span className="font-mono font-bold text-emerald-700">{deviceB.antutuScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Automated Verdict Box */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 p-5 mt-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              UniqueDigit Automated Verdict
            </h5>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">{aiVerdict}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
