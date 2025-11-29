import type {
  ClassificationResult,
  ExtractionResult,
  ReportResult,
  SummaryResult
} from './types.js';

export const runReportAgent = async (input: {
  classification: ClassificationResult;
  extraction: ExtractionResult;
  summary: SummaryResult;
}): Promise<ReportResult> => {
  const { classification, extraction, summary } = input;

  // Simple risk score heuristic combining classification confidence + indicators.
  let baseScore = classification.confidence;
  if (classification.label === 'phishing' || classification.label === 'dark-pattern') {
    baseScore = Math.max(baseScore, 0.8);
  } else if (classification.label === 'spam') {
    baseScore = Math.max(baseScore, 0.6);
  }

  const indicatorBoost = Math.min(extraction.indicators.length * 0.05, 0.2);
  const riskScore = Math.min(1, baseScore + indicatorBoost);

  const sections: ReportResult['sections'] = [
    {
      title: 'Summary',
      content: summary.summary
    },
    {
      title: 'Classification',
      content: `Label: ${classification.label} (confidence: ${classification.confidence.toFixed(
        2
      )})\nReasons:\n- ${classification.reasons.join('\n- ')}`
    },
    {
      title: 'Indicators & Entities',
      content: `Indicators:\n- ${extraction.indicators.join(
        '\n- '
      )}\n\nURLs:\n- ${extraction.urls.join('\n- ')}`
    }
  ];

  return {
    riskScore,
    overallLabel: classification.label,
    sections
  };
};


