import { runOrchestrator } from '../agents/orchestrator.js';
import type { OrchestratedAnalysisResult } from '../agents/types.js';
import { getFromCache, makeCacheKey, setInCache } from '../agents/cache.js';
import { env } from '../config/env.js';

export const process = async (text: string): Promise<OrchestratedAnalysisResult> => {
  const key = makeCacheKey('orchestrator', text);
  const cached = getFromCache<OrchestratedAnalysisResult>(key);
  if (cached) return cached;

  try {
    const result = await runOrchestrator(text);
    setInCache(key, result);
    return result;
  } catch (error) {
    if (!env.isProd) {
      // eslint-disable-next-line no-console
      console.error('Orchestrator failed, throwing error', error);
    }
    throw error;
  }
};


