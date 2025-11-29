import { runOrchestrator } from '../agents/orchestrator';
import type { OrchestratedAnalysisResult } from '../agents/types';
import { getFromCache, makeCacheKey, setInCache } from '../agents/cache';
import { env } from '../config/env';

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


