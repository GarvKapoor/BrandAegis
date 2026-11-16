export type Severity = 'critical' | 'warning' | 'info';
export type ViolationCategory = 'text' | 'visual' | 'accessibility' | 'claim';
export type ViolationStatus = 'flagged' | 'accepted' | 'rejected' | 'edited' | 'exempted';

export interface Citation {
  guidelineName: string;
  section: string;
  clause: string;
  ruleText: string;
}

export interface BoundingBox {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  width: number;
  height: number;
  label: string;
  severity: Severity;
}

export interface Violation {
  id: string;
  category: ViolationCategory;
  severity: Severity;
  title: string;
  description: string;
  citation: Citation;
  flaggedSpan?: string;
  suggestedFix?: string;
  originalTextSpan?: string;
  status: ViolationStatus;
  userComment?: string;
  boundingBox?: BoundingBox;
}

export interface ColorToken {
  name: string;
  hex: string;
  pantone?: string;
  isPrimary?: boolean;
  rgb: [number, number, number];
}

export interface ClaimRegistryItem {
  id: string;
  claim: string;
  category: string;
  legalSLA: string;
  certifiedClause: string;
  approvedVariants: string[];
  forbiddenPhrasing: string[];
}

export interface BrandBrainData {
  id: string;
  name: string;
  version: string;
  updatedAt: string;
  description: string;
  voicePillars: {
    attribute: string;
    description: string;
    doExample: string;
    dontExample: string;
  }[];
  forbiddenWords: {
    term: string;
    reason: string;
    alternative: string;
  }[];
  claimRegistry: ClaimRegistryItem[];
  colorPalette: ColorToken[];
  logoRules: {
    minClearanceRatio: number; // e.g. 0.25 (25% of logo height around logo)
    minResolutionDpi: number;
    approvedFormats: string[];
    misuseExamples: string[];
  };
  accessibilityRules: {
    minContrastNormal: number; // 4.5:1
    minContrastLarge: number;  // 3.0:1
    altTextMandatory: boolean;
    inclusiveLanguageMandatory: boolean;
  };
}

export interface VisualAnalysisData {
  extractedPalette: { hex: string; percentage: number; deltaE: number; closestApproved: string; isMatch: boolean }[];
  logoDetection: {
    found: boolean;
    clearspaceMarginPx: number;
    requiredMarginPx: number;
    hasBreach: boolean;
    box: BoundingBox;
  };
  accessibility: {
    measuredContrast: number;
    targetRatio: number;
    passesWCAG: boolean;
    altTextPresent: boolean;
    generatedAltText?: string;
  };
  resolution: {
    width: number;
    height: number;
    estimatedDpi: number;
    isPrintReady: boolean;
  };
}

export interface TierRecord {
  title: string;
  assignedRole: 'creator' | 'brand_manager' | 'legal';
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  signedBy?: string;
  timestamp?: string;
  comments?: string;
}

export interface ApprovalWorkflowState {
  currentTier: 'creator' | 'brand_manager' | 'legal';
  overallStatus: 'draft' | 'under_review' | 'approved' | 'rejected';
  tiers: {
    creator: TierRecord;
    brand_manager: TierRecord;
    legal: TierRecord;
  };
  auditHash: string;
  version: number;
}

export interface ContentDraft {
  id: string;
  title: string;
  channel: 'social' | 'blog' | 'ad_creative' | 'press_release' | 'figma_frame';
  author: string;
  rawText: string;
  resolvedText: string;
  imagePreviewUrl?: string;
  visualData?: VisualAnalysisData;
  violations: Violation[];
  approvalWorkflow: ApprovalWorkflowState;
  score: {
    overall: number; // 0 - 100
    voiceFidelity: number;
    visualCompliance: number;
    accessibility: number;
    legalSafety: number;
  };
  createdAt: string;
}

export type UserRole = 'creator' | 'brand_manager' | 'legal';
