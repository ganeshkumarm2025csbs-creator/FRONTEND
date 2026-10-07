export type ActivePanel = null | 'documents' | 'confidence' | 'review';

export type NavTab = 'dashboard' | 'documents' | 'history' | 'settings';

export interface DocumentItem {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  fileFormat: string;
  size: string;
  date: string;
  time: string;
  status: 'Processed' | 'Processing' | 'Pending';
  fieldsCount: number;
  confidenceScore: number;
  extractedPreview?: {
    [key: string]: string;
  };
}

export interface ConfidenceMetric {
  id: string;
  name: string;
  confidence: number;
  fieldCount: number;
  category: 'identity' | 'contact' | 'financial' | 'metadata';
}

export interface ReviewFieldItem {
  id: string;
  fieldName: string;
  extractedValue: string;
  confidence: number;
  status: 'needs_review' | 'verified';
  documentSource: string;
}
