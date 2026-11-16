import { BrandBrainData } from './types';

export const defaultBrandBrain: BrandBrainData = {
  id: 'brain_apex_enterprise_2026',
  name: 'Apex Global Enterprises Brand Kit & Governance Registry',
  version: 'v4.2.1',
  updatedAt: '2026-11-10T14:30:00Z',
  description: 'Enterprise master brand guidelines, verified legal claim registry, design tokens, and multimodal rules for omni-channel publishing.',
  
  voicePillars: [
    {
      attribute: 'Objective & Measured',
      description: 'Communicate with professional composure. Back claims with concrete data. Avoid hyperbolic fluff, unsubstantiated superlatives, and breathless exclamation.',
      doExample: 'Our architecture achieves 99.9% operational availability under heavy enterprise load.',
      dontExample: 'Our revolutionary AI engine guarantees 100% zero-latency performance and offers the world’s most bulletproof data encryption!'
    },
    {
      attribute: 'Precise & Direct',
      description: 'State facts plainly. Use approved product terminology rather than colloquial buzzwords.',
      doExample: 'Autonomous brand governance powered by multimodal retrieval-augmented generation.',
      dontExample: 'Magical AI secret sauce that magically fixes your marketing mess.'
    },
    {
      attribute: 'Inclusive & Accessible',
      description: 'Ensure phrasing respects diverse audiences. Avoid gendered, exclusionary, or ableist idioms.',
      doExample: 'Our team will review your submission promptly.',
      dontExample: 'Our guys will sanity-check your copy.'
    }
  ],

  forbiddenWords: [
    {
      term: 'world\'s most',
      reason: 'Unsubstantiated superlative prohibited by FTC marketing guidelines and Brand Voice Clause 2.1.',
      alternative: 'leading'
    },
    {
      term: 'bulletproof',
      reason: 'Misleading cybersecurity claim. No technology is impervious to all attack vectors (Legal SLA Clause 4.3).',
      alternative: 'enterprise-grade'
    },
    {
      term: 'guarantees 100%',
      reason: 'Strict liability violation. Contractual SLA guarantees 99.9% availability, not 100% (Claim Registry Sec. B).',
      alternative: 'targets 99.9% availability'
    },
    {
      term: 'unhackable',
      reason: 'Prohibited by Corporate Compliance Rule 8. No absolute security claims are permitted.',
      alternative: 'fortified with zero-trust architecture'
    },
    {
      term: 'zero latency',
      reason: 'Physically impossible claim; creates deceptive marketing liability under FTC guidelines.',
      alternative: 'ultra-low latency'
    },
    {
      term: 'insanely fast',
      reason: 'Colloquial and dissonant with executive enterprise B2B tone.',
      alternative: 'high-throughput'
    }
  ],

  claimRegistry: [
    {
      id: 'claim_sla_uptime',
      claim: 'Infrastructure Availability & SLA',
      category: 'Technical SLA',
      legalSLA: 'Contractual uptime target is 99.9% measured on a rolling 30-day calendar basis.',
      certifiedClause: 'Clause 3.1: Service Level Targets & Exclusions (Enterprise Master Agreement)',
      approvedVariants: [
        'Delivers 99.9% enterprise uptime SLA',
        'Backed by a 99.9% availability commitment',
        'High-availability cloud infrastructure with 99.9% uptime SLA'
      ],
      forbiddenPhrasing: [
        '100% zero downtime guaranteed',
        'Never goes down',
        'Completely infallible infrastructure'
      ]
    },
    {
      id: 'claim_encryption_security',
      claim: 'Data Protection & Encryption Standard',
      category: 'Security & Compliance',
      legalSLA: 'FIPS 140-3 validated AES-256 at rest, TLS 1.3 in transit with per-tenant customer managed keys (CMEK).',
      certifiedClause: 'Clause 7.4: Data Protection Mandates & Security Certifications',
      approvedVariants: [
        'Enterprise-grade AES-256 data encryption and tenant isolation',
        'End-to-end encryption with tenant data segregation',
        'Hardware-accelerated AES-256 encryption across all stored assets'
      ],
      forbiddenPhrasing: [
        'World’s most bulletproof data encryption',
        'Unhackable quantum vault',
        'Zero chance of data compromise'
      ]
    },
    {
      id: 'claim_regulatory_compliance',
      claim: 'Regulatory Certifications',
      category: 'Regulatory Certifications',
      legalSLA: 'Certified SOC-2 Type II, ISO 27001:2022, GDPR & HIPAA BAA compliant.',
      certifiedClause: 'Clause 9.2: Compliance Certification Matrix',
      approvedVariants: [
        'Independently audited SOC 2 Type II and ISO 27001 certified',
        'Compliant with GDPR, HIPAA, and CCPA standards'
      ],
      forbiddenPhrasing: [
        'Exempt from government regulation',
        'The only certified platform in existence'
      ]
    }
  ],

  colorPalette: [
    {
      name: 'Apex Midnight Navy (Primary Dark)',
      hex: '#0B132B',
      pantone: 'PMS 289 C',
      isPrimary: true,
      rgb: [11, 19, 43]
    },
    {
      name: 'Apex Royal Blue (Primary Accent)',
      hex: '#1D4ED8',
      pantone: 'PMS 2175 C',
      isPrimary: true,
      rgb: [29, 78, 216]
    },
    {
      name: 'Apex Cyan (Digital Highlight)',
      hex: '#06B6D4',
      pantone: 'PMS 3115 C',
      isPrimary: false,
      rgb: [6, 182, 212]
    },
    {
      name: 'Apex Clean Slate (Background Light)',
      hex: '#F8FAFC',
      pantone: 'Cool Gray 1 C',
      isPrimary: false,
      rgb: [248, 250, 252]
    },
    {
      name: 'Apex Neutral Muted',
      hex: '#64748B',
      pantone: 'PMS 430 C',
      isPrimary: false,
      rgb: [100, 116, 139]
    }
  ],

  logoRules: {
    minClearanceRatio: 0.25, // Minimum clear space equal to 25% of logo height around perimeter
    minResolutionDpi: 72,     // 72 DPI minimum for digital, 300 for print
    approvedFormats: ['SVG', 'EPS', 'PNG (Transparent, 3000px min width)'],
    misuseExamples: [
      'Do not rotate or distort logo aspect ratio',
      'Do not place logo on unapproved low-contrast backgrounds',
      'Do not violate clearspace zone (minimum 32px or 0.25h boundary)',
      'Do not apply unapproved drop shadows or neon glows'
    ]
  },

  accessibilityRules: {
    minContrastNormal: 4.5,
    minContrastLarge: 3.0,
    altTextMandatory: true,
    inclusiveLanguageMandatory: true
  }
};
