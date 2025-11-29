/**
 * Placeholder AI service functions.
 * Replace with real AI integrations when the models are ready.
 */

export const analyzeText = async (input: string): Promise<Record<string, unknown>> => {
  return {
    summary: 'AI analysis placeholder',
    inputLength: input.length,
    sentiment: 'neutral',
    confidence: 0.5
  };
};

export const detectSpam = async (input: string): Promise<Record<string, unknown>> => {
  return {
    verdict: 'clean',
    score: 0.1,
    matchedRules: [],
    notes: 'Spam detection placeholder'
  };
};

export const extractEntities = async (input: string): Promise<Record<string, unknown>> => {
  return {
    entities: [],
    meta: {
      placeholder: true,
      inputSample: input.slice(0, 50)
    }
  };
};

export const detectDarkPatterns = async (
  input: string
): Promise<Record<string, unknown>> => {
  return {
    inputSample: input.slice(0, 120),
    detected: false,
    patterns: [],
    notes: 'Dark-pattern detection placeholder'
  };
};

export const generateReport = async (
  context: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  return {
    title: 'TruthLine_AI analysis report',
    generatedAt: new Date().toISOString(),
    sections: [],
    context
  };
};

