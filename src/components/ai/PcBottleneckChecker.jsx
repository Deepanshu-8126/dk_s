import React, { useState } from 'react';
import { Gauge, AlertTriangle, CheckCircle, Cpu, Zap, HelpCircle } from 'lucide-react';

const CPUS = [
  { id: 'i3-12100f', name: 'Intel Core i3-12100F (4C/8T)', tier: 1, maxGpuTier: 2 },
  { id: 'r5-5600', name: 'AMD Ryzen 5 5600 (6C/12T)', tier: 2, maxGpuTier: 3 },
  { id: 'i5-13400f', name: 'Intel Core i5-13400F (10C/16T)', tier: 3, maxGpuTier: 4 },
  { id: 'r5-7600', name: 'AMD Ryzen 5 7600 (6C/12T AM5)', tier: 3.5, maxGpuTier: 4.5 },
  { id: 'r7-7800x3d', name: 'AMD Ryzen 7 7800X3D (8C/16T 3D V-Cache)', tier: 5, maxGpuTier: 5 },
  { id: 'i7-14700k', name: 'Intel Core i7-14700K (20C/28T)', tier: 4.8, maxGpuTier: 5 }
];

const GPUS = [
  { id: 'rx-6600', name: 'AMD Radeon RX 6600 8GB', tier: 1.5, targetRes: '1080p' },
  { id: 'rtx-4060', name: 'NVIDIA RTX 4060 8GB', tier: 2.5, targetRes: '1080p Ultra' },
  { id: 'rx-7700xt', name: 'AMD Radeon RX 7700 XT 12GB', tier: 3.5, targetRes: '1440p' },
  { id: 'rtx-4070super', name: 'NVIDIA RTX 4070 Super 12GB', tier: 4.2, targetRes: '1440p Ultra' },
  { id: 'rtx-4080super', name: 'NVIDIA RTX 4080 Super 16GB', tier: 4.8, targetRes: '4K High' },
  { id: 'rtx-4090', name: 'NVIDIA RTX 4090 24GB', tier: 5.0, targetRes: '4K Ultra RT' }
];

export default function PcBottleneckChecker() {
  const [selectedCpu, setSelectedCpu] = useState(CPUS[3].id); // Ryzen 5 7600
  const [selectedGpu, setSelectedGpu] = useState(GPUS[3].id); // RTX 4070 Super
  const [resolution, setResolution] = useState('1440p');

  const cpuObj = CPUS.find((c) => c.id === selectedCpu) || CPUS[0];
  const gpuObj = GPUS.find((g) => g.id === selectedGpu) || GPUS[0];

  // Calculate resolution factor (Higher res = heavier on GPU, less bottleneck from CPU)
  const resMultiplier = resolution === '1080p' ? 1.0 : resolution === '1440p' ? 0.7 : 0.4;
  
  // Tier difference
  const tierDiff = gpuObj.tier - cpuObj.tier;
  let bottleneckScore = 0;
  let bottleneckSource = 'None';
  let advice = '';

  if (tierDiff > 1.2) {
    bottleneckScore = Math.min(Math.round(tierDiff * 14 * resMultiplier), 38);
    bottleneckSource = 'CPU Bottleneck';
    advice = `At ${resolution}, your ${cpuObj.name} will restrict the full potential of ${gpuObj.name} in high refresh rate esports & CPU-heavy titles. Upgrade CPU to Ryzen 7 7800X3D for maximum frames.`;
  } else if (tierDiff < -1.5) {
    bottleneckScore = Math.min(Math.round(Math.abs(tierDiff) * 12 * (1 / resMultiplier)), 35);
    bottleneckSource = 'GPU Bottleneck';
    advice = `Your CPU is significantly more powerful than the GPU. At ${resolution}, your ${gpuObj.name} will be pinned at 100% load. Consider pairing with a higher-tier graphics card.`;
  } else {
    bottleneckScore = Math.max(Math.round(Math.abs(tierDiff) * 3), 2);
    bottleneckSource = 'Optimal Balance (Zero Bottleneck)';
    advice = `Flawless balance! Your CPU and GPU pairing will utilize 98-100% of both components with smooth frame times at ${resolution}.`;
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 md:p-8 shadow-2xl backdrop-blur-xl my-8">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
          <Gauge className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-outfit text-white">PC Bottleneck & Compatibility Calculator</h3>
          <p className="text-xs text-slate-400">Pure Client-Side Hardware Pairing & Resolution Analyzer</p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Select Processor (CPU)</label>
          <select
            value={selectedCpu}
            onChange={(e) => setSelectedCpu(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
          >
            {CPUS.map((cpu) => (
              <option key={cpu.id} value={cpu.id}>
                {cpu.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Select Graphics Card (GPU)</label>
          <select
            value={selectedGpu}
            onChange={(e) => setSelectedGpu(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
          >
            {GPUS.map((gpu) => (
              <option key={gpu.id} value={gpu.id}>
                {gpu.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Gaming Resolution</label>
          <div className="grid grid-cols-3 gap-1.5">
            {['1080p', '1440p', '4K'].map((res) => (
              <button
                key={res}
                type="button"
                onClick={() => setResolution(res)}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                  resolution === res
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Calculated Index</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-2xl font-black font-mono ${bottleneckScore > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {bottleneckScore}%
              </span>
              <span className="text-xs text-slate-300 font-medium">({bottleneckSource})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bottleneckScore <= 10 ? (
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-400 font-bold">
                <CheckCircle className="w-4 h-4" /> Ideal Match
              </div>
            ) : (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs text-amber-400 font-bold">
                <AlertTriangle className="w-4 h-4" /> Slight Imbalance
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-3 leading-relaxed">
          {advice}
        </p>
      </div>
    </div>
  );
}
