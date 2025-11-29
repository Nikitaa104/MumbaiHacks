import { getFromCache, makeCacheKey, setInCache } from './cache';
import type { ExtractionResult } from './types';
import { env } from '../config/env';

// For extraction we keep it lightweight and local (regex-based) to stay free-tier friendly.

const urlRegex =
  /\bhttps?:\/\/[^\s/$.?#].[^\s"]*/gi;
const emailRegex =
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

export const runExtractionAgent = async (text: string): Promise<ExtractionResult> => {
  const key = makeCacheKey('extraction', text);
  const cached = getFromCache<ExtractionResult>(key);
  if (cached) return cached;

  try {
    const urls = Array.from(text.match(urlRegex) ?? []);
    const emails = Array.from(text.match(emailRegex) ?? []);

    const entities: ExtractionResult['entities'] = [];
    urls.forEach((u) => entities.push({ type: 'url', value: u }));
    emails.forEach((e) => entities.push({ type: 'email', value: e }));

    const indicators: string[] = [];
    const lowered = text.toLowerCase();
    if (lowered.includes('password')) indicators.push('Mentions password');
    if (lowered.includes('bank')) indicators.push('Mentions bank');
    if (lowered.includes('urgent')) indicators.push('Uses urgency language');

    const result: ExtractionResult = { urls, emails, entities, indicators };
    setInCache(key, result);
    return result;
  } catch (error) {
    if (!env.isProd) {
      // eslint-disable-next-line no-console
      console.warn('Extraction agent failed, returning empty', error);
    }
    const fallback: ExtractionResult = { urls: [], emails: [], entities: [], indicators: [] };
    setInCache(key, fallback);
    return fallback;
  }
};


