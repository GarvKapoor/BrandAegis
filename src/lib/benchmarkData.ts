import { ContentDraft } from './types';

export const benchmarkTestCases: ContentDraft[] = [
  {
    id: 'case_1_fintech_claim_drift',
    title: 'FinTech Cloud Launch Copy (Claims & Tone Drift)',
    channel: 'ad_creative',
    author: 'Digital Agency (Vanguard Creatives)',
    rawText: `Our revolutionary AI platform guarantees 100% zero-latency performance and offers the world's most bulletproof data encryption. Sign up now and experience insanely fast analytics with zero chance of downtime. Our guys will sanity-check your integration in 5 minutes!`,
    resolvedText: `Our enterprise AI platform delivers ultra-low latency performance engineered with hardware-accelerated AES-256 data encryption. Get started today and experience high-throughput analytics backed by our 99.9% uptime SLA. Our engineering team will review your integration promptly.`,
    createdAt: '2026-11-15T11:20:00Z',
    score: {
      overall: 48,
      voiceFidelity: 40,
      visualCompliance: 90,
      accessibility: 65,
      legalSafety: 25
    },
    approvalWorkflow: {
      currentTier: 'creator',
      overallStatus: 'draft',
      tiers: {
        creator: { title: 'Content Creator (Agency)', assignedRole: 'creator', status: 'pending' },
        brand_manager: { title: 'Brand Custodian', assignedRole: 'brand_manager', status: 'pending' },
        legal: { title: 'Legal & Regulatory Counsel', assignedRole: 'legal', status: 'pending' }
      },
      auditHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      version: 1
    },
    violations: [
      {
        id: 'viol_1_1',
        category: 'claim',
        severity: 'critical',
        title: 'Unsupported Performance Guarantee & Zero Latency Claim',
        description: 'Copy promises "guarantees 100% zero-latency" which violates contract SLA limits and risks regulatory sanctions under FTC deceptive advertising rules.',
        flaggedSpan: 'guarantees 100% zero-latency performance',
        suggestedFix: 'delivers ultra-low latency performance',
        citation: {
          guidelineName: 'Apex Legal Claim Registry v4.2',
          section: 'Section B: Technical SLAs & Latency Disclosure',
          clause: 'Clause 3.1',
          ruleText: 'Never state "zero latency" or "100% guarantee". Permitted language: "delivers ultra-low latency performance backed by enterprise SLA".'
        },
        status: 'flagged'
      },
      {
        id: 'viol_1_2',
        category: 'claim',
        severity: 'critical',
        title: 'Misleading Cybersecurity Superlative ("Bulletproof")',
        description: 'Claiming "world\'s most bulletproof data encryption" is an unsubstantiated superlative and creates strict liability exposure.',
        flaggedSpan: "offers the world's most bulletproof data encryption",
        suggestedFix: 'engineered with hardware-accelerated AES-256 data encryption',
        citation: {
          guidelineName: 'Data Security Compliance Standard',
          section: 'Section 7: Encryption & Cryptographic Claims',
          clause: 'Clause 7.4',
          ruleText: 'Superlatives like "bulletproof" or "unhackable" are prohibited. Use certified phrasing: "hardware-accelerated AES-256 data encryption".'
        },
        status: 'flagged'
      },
      {
        id: 'viol_1_3',
        category: 'text',
        severity: 'warning',
        title: 'Colloquial Tone Dissonance ("insanely fast")',
        description: 'The phrase "insanely fast" violates the executive, objective tone required for enterprise B2B communications.',
        flaggedSpan: 'insanely fast',
        suggestedFix: 'high-throughput',
        citation: {
          guidelineName: 'Apex Brand Voice Guide',
          section: 'Pillar 1: Objective & Measured Tone',
          clause: 'Page 18, Clause 2.1',
          ruleText: 'Avoid hyperbole and consumer slang. Replace colloquial terms with clear, quantifiable technical benefits.'
        },
        status: 'flagged'
      },
      {
        id: 'viol_1_4',
        category: 'accessibility',
        severity: 'warning',
        title: 'Non-Inclusive Phrasing ("Our guys will sanity-check")',
        description: 'Contains gender-exclusive ("guys") and ableist ("sanity-check") language.',
        flaggedSpan: 'Our guys will sanity-check',
        suggestedFix: 'Our engineering team will review',
        citation: {
          guidelineName: 'Corporate Inclusivity & Diversity Handbook',
          section: 'Global Communication Guidelines',
          clause: 'Clause 4.3 (Inclusive Phrasing)',
          ruleText: 'Use neutral, welcoming terminology. Replace gendered idioms and mental-health metaphors with descriptive verbs.'
        },
        status: 'flagged'
      }
    ]
  },

  {
    id: 'case_2_figma_visual_clearspace',
    title: 'Product Banner Graphic (Logo Clearspace & Palette Drift)',
    channel: 'figma_frame',
    author: 'Lead Visual Designer',
    rawText: `ApexCloud: Seamless Autonomous Infrastructure. Experience real-time observability across all multi-cloud clusters.`,
    resolvedText: `ApexCloud: Seamless Autonomous Infrastructure. Experience real-time observability across all multi-cloud clusters.`,
    createdAt: '2026-11-15T14:10:00Z',
    score: {
      overall: 58,
      voiceFidelity: 92,
      visualCompliance: 42,
      accessibility: 60,
      legalSafety: 95
    },
    approvalWorkflow: {
      currentTier: 'creator',
      overallStatus: 'draft',
      tiers: {
        creator: { title: 'Designer (Figma)', assignedRole: 'creator', status: 'pending' },
        brand_manager: { title: 'Brand Custodian', assignedRole: 'brand_manager', status: 'pending' },
        legal: { title: 'Legal Counsel', assignedRole: 'legal', status: 'pending' }
      },
      auditHash: '4a6f9c2d1e8b7a3f5c0e2d4a6f8b0d2e4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e',
      version: 1
    },
    visualData: {
      extractedPalette: [
        { hex: '#3B82F6', percentage: 48, deltaE: 8.6, closestApproved: '#1D4ED8 (Apex Royal Blue)', isMatch: false },
        { hex: '#0F172A', percentage: 32, deltaE: 1.2, closestApproved: '#0B132B (Apex Midnight Navy)', isMatch: true },
        { hex: '#F1F5F9', percentage: 20, deltaE: 0.8, closestApproved: '#F8FAFC (Apex Clean Slate)', isMatch: true }
      ],
      logoDetection: {
        found: true,
        clearspaceMarginPx: 10,
        requiredMarginPx: 32,
        hasBreach: true,
        box: { x: 5, y: 4, width: 22, height: 12, label: 'Apex Logo Glyph', severity: 'critical' }
      },
      accessibility: {
        measuredContrast: 5.2,
        targetRatio: 4.5,
        passesWCAG: true,
        altTextPresent: false,
        generatedAltText: 'ApexCloud promotional graphic showing autonomous cloud architecture with telemetry graph.'
      },
      resolution: {
        width: 1920,
        height: 1080,
        estimatedDpi: 72,
        isPrintReady: false
      }
    },
    violations: [
      {
        id: 'viol_2_1',
        category: 'visual',
        severity: 'critical',
        title: 'Logo Clearspace Margin Breach (10px detected vs 32px required)',
        description: 'The vector logo glyph is positioned only 10px from the canvas edge. Brand rules require minimum 32px (or 25% logo height) padding on all 4 sides.',
        citation: {
          guidelineName: 'Apex Brand Identity & Logo Guidelines',
          section: 'Section 2: Clearspace & Isolation Zone',
          clause: 'Clause 2.3',
          ruleText: 'Maintain an exclusion perimeter equal to at least 25% of the logo height (32px minimum at standard display scaling).'
        },
        boundingBox: { x: 5, y: 4, width: 22, height: 12, label: 'Logo Clearspace Breach (10px < 32px)', severity: 'critical' },
        status: 'flagged',
        suggestedFix: 'Auto-pad logo position to top: 32px, left: 32px'
      },
      {
        id: 'viol_2_2',
        category: 'visual',
        severity: 'warning',
        title: 'Off-Palette Primary Blue Drift (Delta-E = 8.6)',
        description: 'Background graphic utilizes #3B82F6 (Generic Tailwind Blue) instead of the certified enterprise token #1D4ED8 (Apex Royal Blue).',
        citation: {
          guidelineName: 'Apex Design Tokens & Color Specifications',
          section: 'Palette Specifications: Primary Accents',
          clause: 'Clause 1.2 (CIELAB Tolerances)',
          ruleText: 'Primary brand hues must adhere to #1D4ED8 with a maximum allowable color difference of Delta-E < 2.0.'
        },
        status: 'flagged',
        suggestedFix: 'Replace fill token #3B82F6 with approved brand token #1D4ED8'
      },
      {
        id: 'viol_2_3',
        category: 'accessibility',
        severity: 'warning',
        title: 'Missing Image Alternative Text (Alt-Text)',
        description: 'Exported Figma graphic asset lacks accessibility alternative text for screen readers.',
        citation: {
          guidelineName: 'WCAG 2.1 AA Compliance Standard',
          section: 'Guideline 1.1: Text Alternatives',
          clause: 'Criteria 1.1.1 (Non-text Content)',
          ruleText: 'All informative raster or vector graphic exports must specify meaningful alternative text.'
        },
        status: 'flagged',
        suggestedFix: 'Apply AI-generated alt-text: "ApexCloud promotional graphic showing autonomous cloud architecture with telemetry graph."'
      }
    ]
  },

  {
    id: 'case_3_accessibility_social',
    title: 'Social Media Carousel (Low Contrast & Alt-Text Gap)',
    channel: 'social',
    author: 'Social Media Coordinator',
    rawText: `Are you ready to unlock limitless enterprise productivity? Our cloud suite is the cheapest option on the market today. Join 10,000+ businesses winning with Apex!`,
    resolvedText: `Are you ready to unlock scalable enterprise productivity? Our cloud suite offers the most cost-effective total cost of ownership (TCO) for modern infrastructure. Join 10,000+ businesses scaling with Apex.`,
    createdAt: '2026-11-15T15:45:00Z',
    score: {
      overall: 52,
      voiceFidelity: 45,
      visualCompliance: 70,
      accessibility: 40,
      legalSafety: 60
    },
    approvalWorkflow: {
      currentTier: 'creator',
      overallStatus: 'draft',
      tiers: {
        creator: { title: 'Social Team', assignedRole: 'creator', status: 'pending' },
        brand_manager: { title: 'Brand Manager', assignedRole: 'brand_manager', status: 'pending' },
        legal: { title: 'Legal Counsel', assignedRole: 'legal', status: 'pending' }
      },
      auditHash: '8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c',
      version: 1
    },
    violations: [
      {
        id: 'viol_3_1',
        category: 'text',
        severity: 'critical',
        title: 'Cheap/Commodity Positioning Violation ("cheapest option")',
        description: 'Brand Positioning Guideline forbids using the word "cheapest" which damages premium enterprise positioning.',
        flaggedSpan: 'cheapest option on the market',
        suggestedFix: 'most cost-effective total cost of ownership (TCO)',
        citation: {
          guidelineName: 'Apex Brand Strategy & Value Proposition',
          section: 'Section 4: Pricing & Value Messaging',
          clause: 'Clause 4.1',
          ruleText: 'Never position Apex as a "budget" or "cheapest" solution. Frame value around ROI, scalability, and lower TCO.'
        },
        status: 'flagged'
      },
      {
        id: 'viol_3_2',
        category: 'accessibility',
        severity: 'critical',
        title: 'WCAG Text Contrast Failure (2.4:1 detected vs 4.5:1 required)',
        description: 'Subtitle copy uses muted gray text (#94A3B8) on a white card background, yielding a contrast ratio of only 2.4:1.',
        citation: {
          guidelineName: 'Accessibility Standards (WCAG 2.1 AA)',
          section: 'Contrast (Minimum)',
          clause: 'Success Criterion 1.4.3',
          ruleText: 'Visual presentation of text must have a contrast ratio of at least 4.5:1 against the background for standard text sizes.'
        },
        status: 'flagged',
        suggestedFix: 'Darken text color token from #94A3B8 to #0F172A to achieve 9.8:1 contrast'
      }
    ]
  },

  {
    id: 'case_4_compliant_verified',
    title: 'Enterprise Technical Whitepaper Summary (Fully Compliant)',
    channel: 'blog',
    author: 'Principal Technical Evangelist',
    rawText: `ApexCloud provides enterprise cloud governance delivering a certified 99.9% uptime SLA. The platform implements hardware-accelerated AES-256 encryption at rest and TLS 1.3 in transit with dedicated tenant isolation. Independently audited under SOC 2 Type II and ISO 27001 standards, our architecture empowers organizations to automate policy enforcement while maintaining full regulatory compliance.`,
    resolvedText: `ApexCloud provides enterprise cloud governance delivering a certified 99.9% uptime SLA. The platform implements hardware-accelerated AES-256 encryption at rest and TLS 1.3 in transit with dedicated tenant isolation. Independently audited under SOC 2 Type II and ISO 27001 standards, our architecture empowers organizations to automate policy enforcement while maintaining full regulatory compliance.`,
    createdAt: '2026-11-15T16:00:00Z',
    score: {
      overall: 98,
      voiceFidelity: 99,
      visualCompliance: 96,
      accessibility: 98,
      legalSafety: 100
    },
    approvalWorkflow: {
      currentTier: 'brand_manager',
      overallStatus: 'under_review',
      tiers: {
        creator: { title: 'Author (Self-Scan)', assignedRole: 'creator', status: 'approved', signedBy: 'P. Evangelist', timestamp: '2026-11-15T16:05:00Z' },
        brand_manager: { title: 'Brand Manager', assignedRole: 'brand_manager', status: 'approved', signedBy: 'Elena Vance (Brand VP)', timestamp: '2026-11-15T16:15:00Z' },
        legal: { title: 'Legal Counsel', assignedRole: 'legal', status: 'approved', signedBy: 'Marcus Brody (Lead Counsel)', timestamp: '2026-11-15T16:22:00Z' }
      },
      auditHash: '9f8e7d6c5b4a39281726354453627182930495867a1b2c3d4e5f6a7b8c9d0e1f',
      version: 1
    },
    violations: []
  }
];
