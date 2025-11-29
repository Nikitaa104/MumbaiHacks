import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';
import { getFromCache, makeCacheKey, setInCache } from './cache';
import type { CleaningResult } from './types';

const GEMINI_MODEL = 'gemini-1.5-flash';

const getGeminiClient = (): GoogleGenerativeAI | null => {
  if (!process.env.GEMINI_API_KEY) return null;
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

export const runCleaningAgent = async (text: string): Promise<CleaningResult> => {
  const key = makeCacheKey('cleaning', text);
  const cached = getFromCache<CleaningResult>(key);
  if (cached) return cached;

  const originalLength = text.length;

  try {
    const client = getGeminiClient();
    if (!client) throw new Error('Gemini API key missing');

    const model = client.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = `Clean and normalize the following text for security analysis.
- Remove obvious signatures, greetings, and repeated whitespace.
- Keep URLs and email addresses.
- Return ONLY the cleaned text, no explanations.\n\nText:\n${text}`;

    const result = await model.generateContent(prompt);
    const cleanedText = result.response.text().trim();

    const payload: CleaningResult = {
      cleanedText: cleanedText || text,
      originalLength,
      cleanedLength: cleanedText.length || text.length
    };

    setInCache(key, payload);
    return payload;
  } catch {
    const fallback: CleaningResult = {
      cleanedText: text.trim(),
      originalLength,
      cleanedLength: text.trim().length
    };
    if (!env.isProd) {
      // eslint-disable-next-line no-console
      console.warn('Cleaning agent falling back to local logic');
    }
    setInCache(key, fallback);
    return fallback;
  }
};


