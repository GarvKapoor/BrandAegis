import { BrandBrainData, ContentDraft, Violation, VisualAnalysisData } from './types';
import { defaultBrandBrain } from './brandBrain';

export function runMultimodalScan(
  inputText: string,
  brain: BrandBrainData = defaultBrandBrain,
  customImageUrl?: string
): ContentDraft {
  const violations: Violation[] = [];
  const lowerText = inputText.toLowerCase();

  // 1. Text & Claim Scanning against Forbidden Terms
  brain.forbiddenWords.forEach((fw, idx) => {
    if (lowerText.includes(fw.term.toLowerCase())) {
      violations.push({
        id: `viol_term_${idx}_${Date.now()}`,
        category: 'text',
        severity: 'critical',
        title: `Prohibited Brand Vocabulary: "${fw.term}"`,
        description: fw.reason,
        flaggedSpan: fw.term,
        suggestedFix: fw.alternative,
        citation: {
          guidelineName: `${brain.name} (v${brain.version})`,
          section: 'Section 3: Prohibited Terminology & Marketing Phrasing',
          clause: `Clause 3.${idx + 1}`,
          ruleText: `The phrase "${fw.term}" is explicitly prohibited. Replace with approved corporate synonym: "${fw.alternative}".`
        },
        status: 'flagged'
      });
    }
  });

  // 2. Claim Registry Verification
  brain.claimRegistry.forEach((claim, idx) => {
    claim.forbiddenPhrasing.forEach((forbidden) => {
      if (lowerText.includes(forbidden.toLowerCase())) {
        violations.push({
          id: `viol_claim_${idx}_${Date.now()}`,
          category: 'claim',
          severity: 'critical',
          title: `Uncertified Promotional Claim: "${forbidden}"`,
          description: `Violates contractual and regulatory parameters for "${claim.claim}". SLA limit: ${claim.legalSLA}`,
          flaggedSpan: forbidden,
          suggestedFix: claim.approvedVariants[0] || 'approved contractual phrasing',
          citation: {
            guidelineName: 'Certified Enterprise Claim Registry',
            section: claim.category,
            clause: claim.certifiedClause,
            ruleText: `Unsubstantiated claim detected. Mandatory approved variant: "${claim.approvedVariants[0]}".`
          },
          status: 'flagged'
        });
      }
    });
  });

  // 3. Inclusive Language & Accessibility Checks
  const inclusiveChecks = [
    { bad: 'our guys', good: 'our team', reason: 'Gendered idiom in corporate communications.' },
    { bad: 'sanity check', good: 'review', reason: 'Colloquial ableist idiom.' },
    { bad: 'crazy fast', good: 'high-throughput', reason: 'Informal slang dissonant with executive voice.' }
  ];

  inclusiveChecks.forEach((chk, idx) => {
    if (lowerText.includes(chk.bad)) {
      violations.push({
        id: `viol_a11y_${idx}_${Date.now()}`,
        category: 'accessibility',
        severity: 'warning',
        title: `Non-Inclusive Phrasing: "${chk.bad}"`,
        description: chk.reason,
        flaggedSpan: chk.bad,
        suggestedFix: chk.good,
        citation: {
          guidelineName: 'Corporate Inclusivity & Diversity Handbook',
          section: 'Global Communication Guidelines',
          clause: 'Clause 4.3 (Inclusive Phrasing)',
          ruleText: `Replace informal or exclusionary terms ("${chk.bad}") with neutral, professional language ("${chk.good}").`
        },
        status: 'flagged'
      });
    }
  });

  // Calculate Scores
  const criticalCount = violations.filter(v => v.severity === 'critical').length;
  const warningCount = violations.filter(v => v.severity === 'warning').length;

  const voiceFidelity = Math.max(20, 100 - (criticalCount * 25 + warningCount * 10));
  const legalSafety = Math.max(15, 100 - (criticalCount * 35));
  const accessibility = Math.max(30, 100 - (warningCount * 15));
  const visualCompliance = customImageUrl ? 80 : 95;
  const overall = Math.round((voiceFidelity * 0.35) + (legalSafety * 0.35) + (accessibility * 0.15) + (visualCompliance * 0.15));

  // Compute non-destructive auto-resolved copy
  let resolvedCopy = inputText;
  violations.forEach(v => {
    if (v.flaggedSpan && v.suggestedFix) {
      const regex = new RegExp(v.flaggedSpan, 'gi');
      resolvedCopy = resolvedCopy.replace(regex, v.suggestedFix);
    }
  });

  // Generate simulated visual analysis data if an image is provided
  const visualData: VisualAnalysisData = {
    extractedPalette: [
      { hex: '#0B132B', percentage: 40, deltaE: 0.4, closestApproved: 'Apex Midnight Navy (#0B132B)', isMatch: true },
      { hex: '#1D4ED8', percentage: 35, deltaE: 0.6, closestApproved: 'Apex Royal Blue (#1D4ED8)', isMatch: true },
      { hex: '#F8FAFC', percentage: 25, deltaE: 0.2, closestApproved: 'Apex Clean Slate (#F8FAFC)', isMatch: true }
    ],
    logoDetection: {
      found: true,
      clearspaceMarginPx: 36,
      requiredMarginPx: 32,
      hasBreach: false,
      box: { x: 4, y: 4, width: 18, height: 10, label: 'Apex Logo Glyph', severity: 'info' }
    },
    accessibility: {
      measuredContrast: 7.8,
      targetRatio: 4.5,
      passesWCAG: true,
      altTextPresent: true,
      generatedAltText: 'Apex enterprise promotional graphic with brand logo and technology overview.'
    },
    resolution: {
      width: 1920,
      height: 1080,
      estimatedDpi: 72,
      isPrintReady: false
    }
  };

  // Generate SHA-256 style mock hash
  const hashSeed = `${inputText}-${Date.now()}`;
  let pseudoHash = '';
  for (let i = 0; i < 64; i++) {
    pseudoHash += '0123456789abcdef'[Math.floor(Math.random() * 16)];
  }

  return {
    id: `draft_${Date.now()}`,
    title: 'Custom Pre-Publication Draft Scan',
    channel: 'ad_creative',
    author: 'Content Creator',
    rawText: inputText,
    resolvedText: resolvedCopy,
    imagePreviewUrl: customImageUrl,
    visualData: customImageUrl ? visualData : undefined,
    violations,
    score: {
      overall,
      voiceFidelity,
      visualCompliance,
      accessibility,
      legalSafety
    },
    approvalWorkflow: {
      currentTier: 'creator',
      overallStatus: overall >= 85 ? 'under_review' : 'draft',
      tiers: {
        creator: { title: 'Content Creator', assignedRole: 'creator', status: 'pending' },
        brand_manager: { title: 'Brand Manager', assignedRole: 'brand_manager', status: 'pending' },
        legal: { title: 'Legal Counsel', assignedRole: 'legal', status: 'pending' }
      },
      auditHash: pseudoHash,
      version: 1
    },
    createdAt: new Date().toISOString()
  };
}
