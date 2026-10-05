import React, { useState } from 'react';
import { Play, Code, Check, Copy } from 'lucide-react';

export default function CodePlaygroundEmbed({ defaultCode = "console.log('UniqueDigit Pure Speed!');" }) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    try {
      let logs = [];
      const customConsole = {
        log: (...args) => logs.push(args.join(' ')),
        error: (...args) => logs.push('ERROR: ' + args.join(' '))
      };
      const runFn = new Function('console', code);
      runFn(customConsole);
      setOutput(logs.join('\n') || 'Executed successfully with 0 output.');
    } catch (err) {
      setOutput('Error: ' + err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl my-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white font-mono">Live Interactive JavaScript Playground</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleRun}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
          >
            <Play className="w-3 h-3 fill-current" /> Run Code
          </button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={4}
        className="w-full rounded-xl bg-slate-900/80 border border-slate-800 p-3 font-mono text-xs text-cyan-300 focus:border-cyan-500 focus:outline-none"
      />

      {output && (
        <div className="mt-3 rounded-xl bg-slate-900 p-3 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
          <span className="text-[10px] text-slate-500 uppercase block mb-1">Console Output:</span>
          {output}
        </div>
      )}
    </div>
  );
}
