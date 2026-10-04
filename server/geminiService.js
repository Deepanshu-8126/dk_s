/**
 * Server-Side Gemini Article Generation Engine
 * Strictly drafts ONLY from supplied, verified source material.
 * Zero hallucination: Every claim must be traceable to provided sources.
 */

export async function generateGroundedDraft({ topic, sources = [], image = null }) {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  if (!apiKey) {
    return {
      error: 'GEMINI_API_KEY_MISSING',
      message: 'GEMINI_API_KEY is not configured in the server environment. Set GEMINI_API_KEY in your Antigravity Secrets or server environment.',
      setupHelp: 'To configure: Add GEMINI_API_KEY=your_key to your local .env or configure it in Antigravity IDE Secrets.'
    };
  }

  if (!sources || sources.length === 0) {
    return {
      error: 'NEEDS_SOURCES',
      message: 'No reliable source material available for this topic. Every statement must be grounded in verified source excerpts.',
    };
  }

  const sourcesContext = sources.map((s, idx) => 
    `[Source ${idx + 1}] ID: ${s.id}\nTitle: ${s.title}\nURL: ${s.url}\nExcerpt: ${s.excerpt}`
  ).join('\n\n---\n\n');

  const systemInstruction = `You are a meticulous editorial journalist for UniqueDigit.
STRICT FACTUAL GROUNDING RULES:
1. You may ONLY draft from the provided source excerpts below.
2. DO NOT introduce outside facts, dates, specifications, or figures not present in the excerpts.
3. If an important question cannot be answered from the sources, explicitly write "Information not verified in primary sources" instead of guessing.
4. Output MUST be valid JSON conforming to the schema below without markdown code block backticks.`;

  const prompt = `Topic: "${topic}"

VERIFIED SOURCE MATERIAL:
${sourcesContext}

Write a comprehensive, balanced editorial article strictly summarizing and explaining the above source material.

Required JSON format:
{
  "title": "Clean, descriptive editorial headline based on sources",
  "metaDescription": "1-2 sentence summary under 155 characters",
  "content": "Full article formatted in clean markdown (use ### for subheadings, - for bullet points, **for bold text**). Never use raw HTML. Reference sources naturally.",
  "citations": [
    {
      "sourceId": "Source ID from provided list",
      "sourceUrl": "Source URL from provided list",
      "factualSummary": "Brief summary of fact from source"
    }
  ]
}`;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 18000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      let parsedErr = 'API error';
      try { parsedErr = JSON.parse(errText).error?.message || errText; } catch {}
      throw new Error(`Gemini API returned ${res.status}: ${parsedErr}`);
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('Gemini API returned empty candidate content');
    }

    let parsed;
    try {
      parsed = JSON.parse(candidateText.trim());
    } catch {
      const match = candidateText.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else throw new Error('Failed to parse structured JSON from Gemini response');
    }

    // Validate citations: ensure cited sources exist in supplied list
    const validSourceIds = new Set(sources.map(s => s.id));
    const validatedCitations = (parsed.citations || []).filter(c => validSourceIds.has(c.sourceId));

    const wordCount = (parsed.content || '').split(/\s+/).filter(Boolean).length;
    const slug = (topic || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return {
      success: true,
      draft: {
        id: `draft-${Date.now()}`,
        slug,
        title: parsed.title,
        metaDescription: parsed.metaDescription,
        content: parsed.content,
        wordCount,
        sources,
        citations: validatedCitations,
        image: image || null,
        createdAt: new Date().toISOString(),
        status: 'draft'
      }
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Gemini API request timed out (18s limit)');
    }
    throw err;
  }
}
