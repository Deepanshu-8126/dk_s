import React, { useState } from 'react';
import { PenTool, Sparkles, BookOpen, Check, AlertCircle, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { BlogApiClient } from '../../services/geminiRotator';
import WikimediaPicker from './WikimediaPicker';

export default function EditorialStudio({ onArticlePublished, onClose }) {
  const [topic, setTopic] = useState('');
  const [sources, setSources] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingSources, setLoadingSources] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleFetchSources = async () => {
    if (!topic.trim()) return;
    setLoadingSources(true);
    setErrorInfo(null);
    try {
      const data = await BlogApiClient.fetchSources(topic);
      setSources(data.sources || []);
      if (!data.sources?.length) {
        setErrorInfo({
          type: 'NO_SOURCES',
          message: `No public encyclopedia source found for "${topic}". Add a source link or excerpt below.`
        });
      }
    } catch (err) {
      setErrorInfo({ type: 'ERROR', message: err.message });
    } finally {
      setLoadingSources(false);
    }
  };

  const handleGenerateDraft = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setErrorInfo(null);
    try {
      const res = await BlogApiClient.generateDraft({
        topic,
        sources,
        image: selectedImage
      });
      setDraft(res.draft);
    } catch (err) {
      setErrorInfo({
        type: err.code || 'ERROR',
        message: err.message,
        setupHelp: err.setupHelp
      });
    } finally {
      setGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!draft?.id) return;
    setPublishing(true);
    try {
      await BlogApiClient.publishDraft(draft.id);
      if (onArticlePublished) onArticlePublished();
      setDraft(null);
      setTopic('');
      setSources([]);
      setSelectedImage(null);
      if (onClose) onClose();
    } catch (err) {
      setErrorInfo({ type: 'ERROR', message: err.message });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-8">
      {/* Studio Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <PenTool size={16} />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
              Editorial Studio & Fact-Grounded Drafter
            </h3>
            <p className="text-xs text-slate-500">
              Zero fake data: Sources verified first, authentic Wikimedia media, explicit publishing control.
            </p>
          </div>
        </div>
      </div>

      {/* Error / Key Missing State */}
      {errorInfo && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorInfo.type === 'GEMINI_API_KEY_MISSING' ? 'Gemini API Key Required' : 'Action Required'}</span>
          </div>
          <p>{errorInfo.message}</p>
          {errorInfo.setupHelp && (
            <p className="mt-1 text-slate-600 bg-white/80 p-2 rounded border border-amber-200 font-mono text-[11px]">
              {errorInfo.setupHelp}
            </p>
          )}
        </div>
      )}

      {/* Step 1: Topic Input & Source Fetching */}
      <div className="space-y-4 mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          1. Editorial Topic & Fact Grounding
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Chandrayaan-3 Moon Mission, PlayStation 5 Pro Specs..."
            className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleFetchSources}
            disabled={loadingSources || !topic.trim()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <BookOpen size={14} />
            <span>{loadingSources ? 'Fetching...' : 'Fetch Verified Sources'}</span>
          </button>
        </div>

        {/* Sources List */}
        {sources.length > 0 && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              {sources.length} Verified Sources Grounded:
            </span>
            {sources.map((s, idx) => (
              <div key={s.id || idx} className="text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                <span className="font-bold text-purple-700">[{s.title}]: </span>
                <span className="text-slate-600 line-clamp-2">{s.excerpt}</span>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-amber-600 underline block mt-1 truncate">
                  {s.url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step 2: Wikimedia Commons Licensed Media */}
      <div className="space-y-3 mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <ImageIcon size={14} className="text-amber-600" />
          2. Licensed Wikimedia Commons Image
        </label>
        <WikimediaPicker
          defaultQuery={topic}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />
      </div>

      {/* Step 3: Server Gemini Generation */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={handleGenerateDraft}
          disabled={generating || !topic.trim()}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50 shadow-sm"
        >
          {generating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
          <span>{generating ? 'Drafting from Sources...' : 'Generate Fact-Grounded Draft'}</span>
        </button>

        {draft && (
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Check size={14} />
            <span>{publishing ? 'Publishing...' : 'Publish to Live Guides'}</span>
          </button>
        )}
      </div>

      {/* Draft Inspection Card */}
      {draft && (
        <div className="mt-6 p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-200 text-purple-800">
              Draft Ready for Review ({draft.wordCount} words)
            </span>
          </div>
          <h4 className="font-bold text-base text-slate-900">{draft.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed italic">{draft.metaDescription}</p>
          <div className="max-h-48 overflow-y-auto bg-white p-3 rounded-lg border border-purple-100 text-xs text-slate-700 whitespace-pre-wrap">
            {draft.content}
          </div>
        </div>
      )}
    </div>
  );
}
