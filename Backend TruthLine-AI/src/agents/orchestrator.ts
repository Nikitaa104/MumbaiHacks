import { runCleaningAgent } from './cleaningAgent';
import { runClassificationAgent } from './classificationAgent';
import { runExtractionAgent } from './extractionAgent';
import { runSummaryAgent } from './summaryAgent';
import { runReportAgent } from './reportAgent';
import type { OrchestratedAnalysisResult } from './types';

export const runOrchestrator = async (
  text: string
): Promise<OrchestratedAnalysisResult> => {
  // 1. Clean
  const cleaning = await runCleaningAgent(text);

  // 2. Classify
  const classification = await runClassificationAgent(cleaning.cleanedText);

  // 3. Extract
  const extraction = await runExtractionAgent(cleaning.cleanedText);

  // 4. Summarize
  const summary = await runSummaryAgent(cleaning.cleanedText);

  // 5. Structured report + risk
  const report = await runReportAgent({ classification, extraction, summary });

  return {
    cleaning,
    classification,
    extraction,
    summary,
    report
  };
};


