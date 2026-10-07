import { DocumentItem, ConfidenceMetric, ReviewFieldItem } from '../types';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Application_Form.pdf',
    type: 'pdf',
    fileFormat: 'PDF',
    size: '2.4 MB',
    date: 'Apr 26, 2025',
    time: '10:32 AM',
    status: 'Processed',
    fieldsCount: 34,
    confidenceScore: 96,
    extractedPreview: {
      'Full Name': 'Elena Vance',
      'Application Type': 'Enterprise Account',
      'Submitted Date': '26/04/2025',
      'Status': 'Approved'
    }
  },
  {
    id: 'doc-2',
    name: 'ID_Proof.jpg',
    type: 'image',
    fileFormat: 'Image',
    size: '1.8 MB',
    date: 'Apr 26, 2025',
    time: '10:28 AM',
    status: 'Processed',
    fieldsCount: 18,
    confidenceScore: 92,
    extractedPreview: {
      'Document Type': 'National Identity Card',
      'ID Number': 'ID-8842-9901',
      'Issue Authority': 'Federal Bureau of Registry',
      'Expiry': '12/2030'
    }
  },
  {
    id: 'doc-3',
    name: 'Resume.pdf',
    type: 'pdf',
    fileFormat: 'PDF',
    size: '3.1 MB',
    date: 'Apr 26, 2025',
    time: '10:24 AM',
    status: 'Processed',
    fieldsCount: 29,
    confidenceScore: 97,
    extractedPreview: {
      'Candidate': 'Marcus Reed',
      'Role': 'Senior Systems Architect',
      'Experience': '8+ Years',
      'Primary Skill': 'Distributed Computing'
    }
  },
  {
    id: 'doc-4',
    name: 'Address_Proof.png',
    type: 'image',
    fileFormat: 'Image',
    size: '2.2 MB',
    date: 'Apr 26, 2025',
    time: '10:20 AM',
    status: 'Processed',
    fieldsCount: 22,
    confidenceScore: 88,
    extractedPreview: {
      'Utility Provider': 'Metropolitan Power & Gas',
      'Service Address': '24 Gandhi Road, Chennai',
      'Billing Period': 'March 2025',
      'Account': 'ENG-4492-91'
    }
  },
  {
    id: 'doc-5',
    name: 'Additional_Doc.pdf',
    type: 'pdf',
    fileFormat: 'PDF',
    size: '1.5 MB',
    date: 'Apr 26, 2025',
    time: '10:15 AM',
    status: 'Processed',
    fieldsCount: 24,
    confidenceScore: 95,
    extractedPreview: {
      'Title': 'Annexure Declaration',
      'Reference Code': 'ANNEX-771',
      'Notarized': 'True',
      'Witness': 'Devi Narayanan'
    }
  }
];

export const CONFIDENCE_METRICS: ConfidenceMetric[] = [
  { id: 'conf-1', name: 'Email', confidence: 99, fieldCount: 14, category: 'contact' },
  { id: 'conf-2', name: 'Name', confidence: 98, fieldCount: 28, category: 'identity' },
  { id: 'conf-3', name: 'Phone Number', confidence: 97, fieldCount: 12, category: 'contact' },
  { id: 'conf-4', name: 'Date of Birth', confidence: 96, fieldCount: 10, category: 'identity' },
  { id: 'conf-5', name: 'Address', confidence: 91, fieldCount: 16, category: 'contact' },
  { id: 'conf-6', name: 'Document Number', confidence: 89, fieldCount: 18, category: 'financial' }
];

export const INITIAL_REVIEW_FIELDS: ReviewFieldItem[] = [
  {
    id: 'rev-1',
    fieldName: 'Address',
    extractedValue: '24 Gandhi Road, Chennai',
    confidence: 82,
    status: 'needs_review',
    documentSource: 'Address_Proof.png'
  },
  {
    id: 'rev-2',
    fieldName: 'Phone Number',
    extractedValue: '9876543210',
    confidence: 76,
    status: 'needs_review',
    documentSource: 'Application_Form.pdf'
  },
  {
    id: 'rev-3',
    fieldName: 'Document Number',
    extractedValue: 'XXXX1234',
    confidence: 79,
    status: 'needs_review',
    documentSource: 'ID_Proof.jpg'
  },
  {
    id: 'rev-4',
    fieldName: 'Tax ID / PAN',
    extractedValue: 'ABCDE1234F',
    confidence: 81,
    status: 'needs_review',
    documentSource: 'Application_Form.pdf'
  },
  {
    id: 'rev-5',
    fieldName: 'Postal Zip Code',
    extractedValue: '600028',
    confidence: 83,
    status: 'needs_review',
    documentSource: 'Address_Proof.png'
  },
  {
    id: 'rev-6',
    fieldName: 'Issue Date',
    extractedValue: '14/08/2021',
    confidence: 84,
    status: 'needs_review',
    documentSource: 'ID_Proof.jpg'
  },
  {
    id: 'rev-7',
    fieldName: 'Branch Identifier',
    extractedValue: 'CHEN-04-NORTH',
    confidence: 78,
    status: 'needs_review',
    documentSource: 'Additional_Doc.pdf'
  },
  {
    id: 'rev-8',
    fieldName: 'Employer Name',
    extractedValue: 'Aegis Tech Labs Pvt Ltd',
    confidence: 85,
    status: 'needs_review',
    documentSource: 'Resume.pdf'
  }
];
