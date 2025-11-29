import { env } from '../config/env.js';
import { getFromCache, makeCacheKey, setInCache } from './cache.js';
import type { SummaryResult } from './types.js';

// Use HuggingFace free text summarization models (e.g. distilbart-cnn-12-6) via REST API.

const HF_MODEL = 'sshleifer/distilbart-cnn-12-6';

const getHfHeaders = () => {
  if (!process.env.HF_API_TOKEN) return undefined;
  return {
    Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
    'Content-Type': 'application/json'
  };
};

export const runSummaryAgent = async (text: string): Promise<SummaryResult> => {
  const key = makeCacheKey('summary', text);
  const cached = getFromCache<SummaryResult>(key);
  if (cached) return cached;

  try {
    const headers = getHfHeaders();
    if (!headers) throw new Error('HF token missing');

    const endpoint = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
      throw new Error(`HF inference error: ${response.status}`);
    }

    const data = (await response.json()) as Array<{ summary_text: string }>;
    const summaryText = Array.isArray(data) && data[0]?.summary_text
      ? data[0].summary_text
      : text.slice(0, 280);

    const result: SummaryResult = { summary: summaryText };
    setInCache(key, result);
    return result;
  } catch (error) {
    if (!env.isProd) {
      // eslint-disable-next-line no-console
      console.warn('Summary agent failed, using truncated text', error);
    }
    const fallback: SummaryResult = { summary: text.slice(0, 280) };
    setInCache(key, fallback);
    return fallback;
  }
};


