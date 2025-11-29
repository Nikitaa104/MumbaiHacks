export interface CleaningResult {
  cleanedText: string;
  originalLength: number;
  cleanedLength: number;
}

export type ContentLabel = 'phishing' | 'spam' | 'dark-pattern' | 'legitimate' | 'unknown';

export interface ClassificationResult {
  label: ContentLabel;
  confidence: number;
  reasons: string[];
}

export interface ExtractionResult {
  urls: string[];
  emails: string[];
  entities: Array<{
    type: string;
    value: string;
  }>;
  indicators: string[];
}

export interface SummaryResult {
  summary: string;
}

export interface ReportSection {
  title: string;
  content: string;
}

export interface ReportResult {
  riskScore: number;
  overallLabel: ContentLabel;
  sections: ReportSection[];
}

export interface OrchestratedAnalysisResult {
  cleaning: CleaningResult;
  classification: ClassificationResult;
  extraction: ExtractionResult;
  summary: SummaryResult;
  report: ReportResult;
}


