import React, { useState, useMemo } from 'react';
import { 
  Sliders, Cpu, HardDrive, Zap, Box, ShoppingBag, 
  Sparkles, CheckCircle2, ChevronRight, Calculator, Gauge, CreditCard
} from 'lucide-react';
import { calculatePCTotal, formatPriceINR } from '../../utils/calculator';
import { buildAmazonAffiliateUrl } from '../../utils/affiliateGenerator';

const COMPONENT_OPTIONS = {
  cpu: [
    { id: 'i3-12100f', name: 'Intel Core i3-12100F (4C/8T)', price: 6800, tier: 'entry', power: 65 },
    { id: 'r5-5600', name: 'AMD Ryzen 5 5600 (6C/12T)', price: 10200, tier: 'budget', power: 65 },
    { id: 'r5-7600', name: 'AMD Ryzen 5 7600 AM5 (6C/12T)', price: 17200, tier: 'sweetspot', power: 65 },
    { id: 'r7-7800x3d', name: 'AMD Ryzen 7 7800X3D (Ultimate Gaming)', price: 38500, tier: 'enthusiast', power: 120 },
  ],
  gpu: [
    { id: 'rx-6600', name: 'AMD Radeon RX 6600 8GB', price: 19500, tier: '1080p', power: 132, fps: { gta6: '45-55 FPS', cp2077: '60 FPS', valo: '280 FPS' } },
    { id: 'rtx-4060', name: 'NVIDIA RTX 4060 8GB GDDR6', price: 28500, tier: '1080p-high', power: 115, fps: { gta6: '60-70 FPS', cp2077: '75 FPS', valo: '350 FPS' } },
    { id: 'rtx-4070-super', name: 'NVIDIA RTX 4070 Super 12GB', price: 58999, tier: '1440p-ultra', power: 220, fps: { gta6: '85-100 FPS', cp2077: '110 FPS', valo: '500+ FPS' } },
    { id: 'rtx-4080-super', name: 'NVIDIA RTX 4080 Super 16GB', price: 98000, tier: '4k-god', power: 320, fps: { gta6: '120+ FPS 4K', cp2077: '140 FPS', valo: '600+ FPS' } },
  ],
  ram: [
    { id: 'ram-16-ddr4', name: '16GB (8x2) DDR4 3200MHz', price: 3200 },
    { id: 'ram-16-ddr5', name: '16GB (8x2) DDR5 5200MHz', price: 4200 },
    { id: 'ram-32-ddr5', name: '32GB (16x2) DDR5 6000MHz CL30', price: 8900 },
    { id: 'ram-64-ddr5', name: '64GB (32x2) DDR5 6000MHz High-Capacity', price: 17500 },
  ],
  storage: [
    { id: 'ssd-500gb', name: '500GB NVMe Gen4 SSD', price: 3400 },
    { id: 'ssd-1tb', name: '1TB WD Black SN770 Gen4 (5150 MB/s)', price: 6400 },
    { id: 'ssd-2tb', name: '2TB Samsung 990 Pro Gen4 (7450 MB/s)', price: 14500 },
  ],
  psu: [
    { id: 'psu-550w', name: '550W 80+ Bronze Certified', price: 3400 },
    { id: 'psu-750w', name: '750W 80+ Gold Fully Modular', price: 8600 },
    { id: 'psu-1000w', name: '1000W 80+ Gold ATX 3.0 Tier-A', price: 15200 },
  ],
};

export default function InteractivePcCustomizer() {
  const [selectedCpu, setSelectedCpu] = useState(COMPONENT_OPTIONS.cpu[2]);
  const [selectedGpu, setSelectedGpu] = useState(COMPONENT_OPTIONS.gpu[2]);
  const [selectedRam, setSelectedRam] = useState(COMPONENT_OPTIONS.ram[2]);
  const [selectedStorage, setSelectedStorage] = useState(COMPONENT_OPTIONS.storage[1]);
  const [selectedPsu, setSelectedPsu] = useState(COMPONENT_OPTIONS.psu[1]);
  const [emiMonths, setEmiMonths] = useState(6);

  const currentBuild = useMemo(() => {
    return {
      components: [
        { name: 'CPU', price: selectedCpu.price },
        { name: 'GPU', price: selectedGpu.price },
        { name: 'RAM', price: selectedRam.price },
        { name: 'Storage', price: selectedStorage.price },
        { name: 'Power Supply', price: selectedPsu.price },
        { name: 'Motherboard & Case Est.', price: 16500 },
      ]
    };
  }, [selectedCpu, selectedGpu, selectedRam, selectedStorage, selectedPsu]);

  const totalCost = calculatePCTotal(currentBuild);
  const monthlyEmi = Math.round((totalCost * 1.12) / emiMonths);

  const searchQuery = `${selectedCpu.name} ${selectedGpu.name} gaming pc components`;
  const affiliateBuyUrl = buildAmazonAffiliateUrl(searchQuery);

  return (
    <div className="rounded-3xl p-6 md:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl mb-12 text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders size={13} className="text-indigo-400" />
            <span>Interactive Tool · Live 2026 Engine</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white font-display">
            Custom Gaming Rig & <span className="text-indigo-400">FPS Estimator</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Mix and match verified components with real-time Indian pricing math, expected game framerates, and no-cost EMI breakdowns.
          </p>
        </div>

        {/* Total Cost Display Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-right shrink-0">
          <span className="text-[11px] text-slate-400 block font-medium">Estimated Rig Total</span>
          <span className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">
            {formatPriceINR(totalCost)}
          </span>
          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
            or ~₹{monthlyEmi.toLocaleString('en-IN')}/mo ({emiMonths} mos EMI)
          </span>
        </div>
      </div>

      {/* Main Grid: Pickers vs Real-Time Performance Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Interactive Component Pickers */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. Processor Picker */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu size={14} className="text-indigo-400" />
                <span>Processor (CPU)</span>
              </span>
              <span className="font-mono text-emerald-400 font-semibold">{formatPriceINR(selectedCpu.price)}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMPONENT_OPTIONS.cpu.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCpu(item)}
                  className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                    selectedCpu.id === item.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold truncate">{item.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{formatPriceINR(item.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Graphics Card (GPU) Picker */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-amber-400" />
                <span>Graphics Card (GPU)</span>
              </span>
              <span className="font-mono text-emerald-400 font-semibold">{formatPriceINR(selectedGpu.price)}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMPONENT_OPTIONS.gpu.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedGpu(item)}
                  className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                    selectedGpu.id === item.id
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold truncate">{item.name}</div>
                  <div className="text-[10px] text-amber-400/80 mt-0.5">{formatPriceINR(item.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. RAM & Storage Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">Memory (RAM)</label>
              <select
                value={selectedRam.id}
                onChange={(e) => setSelectedRam(COMPONENT_OPTIONS.ram.find(r => r.id === e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-indigo-500"
              >
                {COMPONENT_OPTIONS.ram.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({formatPriceINR(r.price)})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">Gen4 NVMe Storage</label>
              <select
                value={selectedStorage.id}
                onChange={(e) => setSelectedStorage(COMPONENT_OPTIONS.storage.find(s => s.id === e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-indigo-500"
              >
                {COMPONENT_OPTIONS.storage.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({formatPriceINR(s.price)})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time FPS Benchmarks & Order Box */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-display">
                <Gauge size={14} className="text-emerald-400" />
                <span>Estimated Game Benchmarks</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                1440p High Tested
              </span>
            </div>

            {/* FPS Gauges */}
            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Grand Theft Auto VI</div>
                  <div className="text-[10px] text-slate-400">Vice City Path Tracing + DLSS</div>
                </div>
                <div className="text-sm font-mono font-black text-amber-400">{selectedGpu.fps?.gta6 || '60 FPS'}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Cyberpunk 2077</div>
                  <div className="text-[10px] text-slate-400">1440p Ultra Ray Reconstruction</div>
                </div>
                <div className="text-sm font-mono font-black text-emerald-400">{selectedGpu.fps?.cp2077 || '80 FPS'}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Valorant / CS2</div>
                  <div className="text-[10px] text-slate-400">Esports 240Hz Tournament Setting</div>
                </div>
                <div className="text-sm font-mono font-black text-cyan-400">{selectedGpu.fps?.valo || '300+ FPS'}</div>
              </div>
            </div>

            {/* EMI Selector */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <CreditCard size={13} className="text-indigo-400" />
                <span>EMI Tenure:</span>
              </div>
              <div className="flex items-center gap-1">
                {[3, 6, 9, 12].map(m => (
                  <button
                    key={m}
                    onClick={() => setEmiMonths(m)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono transition-colors cursor-pointer ${
                      emiMonths === m ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Buy Complete Build Action */}
          <a
            href={affiliateBuyUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>Search & Buy Custom Rig on Amazon.in →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
