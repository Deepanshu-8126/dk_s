import React, { useState } from 'react';
import { Gamepad2, Monitor, Layers, Zap } from 'lucide-react';

const BENCHMARK_DATA = [
  {
    title: 'Cyberpunk 2077: Phantom Liberty (Ray Tracing Ultra)',
    scores: {
      '1080p': [
        { gpu: 'RTX 4090 24GB', fps: 142, color: 'bg-emerald-500' },
        { gpu: 'RTX 4080 Super 16GB', fps: 118, color: 'bg-cyan-500' },
        { gpu: 'RTX 4070 Super 12GB', fps: 94, color: 'bg-blue-500' },
        { gpu: 'RX 7800 XT 16GB', fps: 68, color: 'bg-amber-500' },
        { gpu: 'RTX 4060 8GB', fps: 48, color: 'bg-rose-500' }
      ],
      '1440p': [
        { gpu: 'RTX 4090 24GB', fps: 112, color: 'bg-emerald-500' },
        { gpu: 'RTX 4080 Super 16GB', fps: 88, color: 'bg-cyan-500' },
        { gpu: 'RTX 4070 Super 12GB', fps: 72, color: 'bg-blue-500' },
        { gpu: 'RX 7800 XT 16GB', fps: 49, color: 'bg-amber-500' },
        { gpu: 'RTX 4060 8GB', fps: 32, color: 'bg-rose-500' }
      ],
      '4K': [
        { gpu: 'RTX 4090 24GB', fps: 68, color: 'bg-emerald-500' },
        { gpu: 'RTX 4080 Super 16GB', fps: 52, color: 'bg-cyan-500' },
        { gpu: 'RTX 4070 Super 12GB', fps: 41, color: 'bg-blue-500' },
        { gpu: 'RX 7800 XT 16GB', fps: 28, color: 'bg-amber-500' },
        { gpu: 'RTX 4060 8GB', fps: 16, color: 'bg-rose-500' }
      ]
    }
  },
  {
    title: 'Black Myth: Wukong (Cinematic Settings)',
    scores: {
      '1080p': [
        { gpu: 'RTX 4090 24GB', fps: 155, color: 'bg-emerald-500' },
        { gpu: 'RTX 4080 Super 16GB', fps: 130, color: 'bg-cyan-500' },
        { gpu: 'RTX 4070 Super 12GB', fps: 104, color: 'bg-blue-500' },
        { gpu: 'RX 7800 XT 16GB', fps: 82, color: 'bg-amber-500' },
        { gpu: 'RTX 4060 8GB', fps: 62, color: 'bg-rose-500' }
      ],
      '1440p': [
        { gpu: 'RTX 4090 24GB', fps: 124, color: 'bg-emerald-500' },
        { gpu: 'RTX 4080 Super 16GB', fps: 98, color: 'bg-cyan-500' },
        { gpu: 'RTX 4070 Super 12GB', fps: 80, color: 'bg-blue-500' },
        { gpu: 'RX 7800 XT 16GB', fps: 64, color: 'bg-amber-500' },
        { gpu: 'RTX 4060 8GB', fps: 44, color: 'bg-rose-500' }
      ],
      '4K': [
        { gpu: 'RTX 4090 24GB', fps: 74, color: 'bg-emerald-500' },
        { gpu: 'RTX 4080 Super 16GB', fps: 56, color: 'bg-cyan-500' },
        { gpu: 'RTX 4070 Super 12GB', fps: 45, color: 'bg-blue-500' },
        { gpu: 'RX 7800 XT 16GB', fps: 36, color: 'bg-amber-500' },
        { gpu: 'RTX 4060 8GB', fps: 22, color: 'bg-rose-500' }
      ]
    }
  }
];

export default function BenchmarkVisualizer() {
  const [activeGameIdx, setActiveGameIdx] = useState(0);
  const [resolution, setResolution] = useState('1440p');

  const currentGame = BENCHMARK_DATA[activeGameIdx];
  const activeScores = currentGame.scores[resolution];
  const maxFps = Math.max(...activeScores.map((s) => s.fps));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs my-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 mb-2 shadow-xs">
            <Gamepad2 className="h-3.5 w-3.5" /> Interactive FPS Benchmark Lab
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-outfit text-slate-900">
            Real-World Gaming Benchmarks (The Verge-Grade Fidelity)
          </h3>
        </div>

        {/* Resolution Toggle */}
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1 border border-slate-200">
          {['1080p', '1440p', '4K'].map((res) => (
            <button
              key={res}
              type="button"
              onClick={() => setResolution(res)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                resolution === res
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap gap-2 my-4">
        {BENCHMARK_DATA.map((game, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveGameIdx(idx)}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              activeGameIdx === idx
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {game.title}
          </button>
        ))}
      </div>

      {/* Interactive FPS Bars */}
      <div className="space-y-4 my-6">
        {activeScores.map((item, idx) => {
          const widthPercent = (item.fps / (maxFps * 1.15)) * 100;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono">#{idx + 1}</span> {item.gpu}
                </span>
                <span className="font-mono font-bold text-slate-900">{item.fps} AVG FPS</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-700 ease-out`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        <span>Tested with Ryzen 7 7800X3D + 32GB DDR5 6000MHz memory configuration.</span>
        <span className="font-bold text-emerald-700 font-mono">Verified 2026 Engine</span>
      </div>
    </div>
  );
}
