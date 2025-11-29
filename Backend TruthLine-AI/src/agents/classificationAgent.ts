import Groq from 'groq-sdk';
import { env } from '../config/env';
import { getFromCache, makeCacheKey, setInCache } from './cache';
import type { ClassificationResult, ContentLabel } from './types';

const getGroqClient = (): Groq | null => {
  if (!process.env.GROQ_API_KEY) return null;
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

const parseLabel = (raw: string): ContentLabel => {
  const normalized = raw.toLowerCase().trim();
  if (normalized.includes('phishing')) return 'phishing';
  if (normalized.includes('spam')) return 'spam';
  if (normalized.includes('dark')) return 'dark-pattern';
  if (normalized.includes('legit')) return 'legitimate';
  return 'unknown';
};

export const runClassificationAgent = async (
  text: string
): Promise<ClassificationResult> => {
  const key = makeCacheKey('classification', text);
  const cached = getFromCache<ClassificationResult>(key);
  if (cached) return cached;

  try {
    const client = getGroqClient();
    if (!client) throw new Error('Groq API key missing');

    const prompt = `Classify the following content into one of:
- phishing
- spam
- dark-pattern
- legitimate

Respond in JSON with:
{ "label": "...", "confidence": 0-1, "reasons": ["..."] }

Content:
${text}`;

    const completion = await client.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    });

    const content = completion.choices[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(typeof content === 'string' ? content : String(content));

    const label = parseLabel(parsed.label ?? '');
    const result: ClassificationResult = {
      label,
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.6,
      reasons: Array.isArray(parsed.reasons) ? parsed.reasons : []
    };

    setInCache(key, result);
    return result;
  } catch (error) {
    if (!env.isProd) {
      // eslint-disable-next-line no-console
      console.warn('Classification agent failed, using fallback', error);
    }

    const fallback: ClassificationResult = {
      label: 'unknown',
      confidence: 0.3,
      reasons: ['Model unavailable; using heuristic fallback.']
    };
    setInCache(key, fallback);
    return fallback;
  }
};


