/**
 * Real Article & Draft Storage Service
 * Persists authentic published articles and drafts without fabricated seeds.
 */

import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'src/data/articles');
const PUBLISHED_PATH = path.join(DATA_DIR, 'published.json');
const DRAFTS_PATH = path.join(DATA_DIR, 'drafts.json');

async function readJsonFile(filePath, fallback = []) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    console.error(`[StorageService] Error reading ${filePath}:`, err.message);
    return fallback;
  }
}

async function writeJsonFile(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getPublishedArticles() {
  return await readJsonFile(PUBLISHED_PATH, []);
}

export async function getDrafts() {
  return await readJsonFile(DRAFTS_PATH, []);
}

export async function saveDraft(draft) {
  const drafts = await getDrafts();
  const existingIdx = drafts.findIndex(d => d.id === draft.id || d.slug === draft.slug);
  
  if (existingIdx >= 0) {
    drafts[existingIdx] = { ...drafts[existingIdx], ...draft, updatedAt: new Date().toISOString() };
  } else {
    drafts.unshift({ ...draft, createdAt: draft.createdAt || new Date().toISOString() });
  }

  await writeJsonFile(DRAFTS_PATH, drafts);
  return draft;
}

export async function publishDraft(draftId) {
  const drafts = await getDrafts();
  const draftIdx = drafts.findIndex(d => d.id === draftId || d.slug === draftId);

  if (draftIdx === -1) {
    throw new Error(`Draft with ID "${draftId}" not found`);
  }

  const [draft] = drafts.splice(draftIdx, 1);
  const publishedList = await getPublishedArticles();

  const publishedPost = {
    ...draft,
    status: 'published',
    publishedAt: new Date().toISOString(),
    author: draft.author || {
      name: 'Editorial Desk',
      role: 'Staff Research Desk',
      credibility: 'Verified Ground Researcher'
    }
  };

  publishedList.unshift(publishedPost);

  await writeJsonFile(DRAFTS_PATH, drafts);
  await writeJsonFile(PUBLISHED_PATH, publishedList);

  // Sync to publishedArticles.json for backward compatibility
  try {
    const legacyPath = path.resolve(process.cwd(), 'src/data/publishedArticles.json');
    await writeJsonFile(legacyPath, publishedList);
  } catch {}

  return publishedPost;
}
