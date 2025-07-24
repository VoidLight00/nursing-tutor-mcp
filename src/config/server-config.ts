// Nursing Tutor MCP Server Configuration
export const ServerConfig = {
  // Server Information
  server: {
    name: 'nursing-tutor-mcp',
    version: '2.0.0',
    description: '한국 간호사를 위한 임상 실무 지원 MCP 서버',
    author: 'Nursing Education Team'
  },

  // Language Settings
  language: {
    primary: 'ko-KR',
    secondary: 'en-US',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss'
  },

  // Database Settings
  database: {
    // Enable/disable specific databases
    medications: true,
    labValues: true,
    nursingDiagnoses: true,
    protocols: true,
    clinicalCases: true,
    
    // Update intervals (in hours)
    updateInterval: 24,
    
    // Cache settings
    cacheEnabled: true,
    cacheExpiry: 3600 // seconds
  },

  // Obsidian Integration
  obsidian: {
    defaultVaultPath: '~/Documents/NursingTutorVault',
    noteTemplates: {
      daily: true,
      concept: true,
      case_study: true,
      medication: true,
      protocol: true
    },
    autoTag: true,
    linkFormat: 'wiki' // 'wiki' or 'markdown'
  },

  // Clinical Decision Support
  clinicalSupport: {
    // Alert thresholds
    criticalValueAlerts: true,
    drugInteractionCheck: true,
    
    // Evidence levels
    includeReferences: true,
    evidenceLevels: ['systematic_review', 'rct', 'cohort', 'case_control', 'expert_opinion'],
    
    // Localization
    useKoreanGuidelines: true,
    internationalGuidelines: ['WHO', 'CDC', 'JCI']
  },

  // Safety Features
  safety: {
    doubleCheckMedications: true,
    requireVerification: ['high_alert_meds', 'blood_products', 'chemotherapy'],
    
    // Risk assessment
    fallRiskAssessment: true,
    pressureUlcerRisk: true,
    infectionRisk: true
  },

  // Educational Features
  education: {
    includeRationales: true,
    provideLearningObjectives: true,
    generateQuizzes: false,
    trackProgress: true
  },

  // Export Options
  export: {
    formats: ['markdown', 'pdf', 'html'],
    includeImages: true,
    includeReferences: true
  },

  // API Settings
  api: {
    rateLimit: 100, // requests per minute
    timeout: 30000, // milliseconds
    retryAttempts: 3
  },

  // Logging
  logging: {
    level: 'info', // 'debug', 'info', 'warn', 'error'
    logFile: './logs/nursing-tutor.log',
    maxFileSize: '10MB',
    maxFiles: 5
  },

  // Feature Flags
  features: {
    aiRecommendations: true,
    collaborativeNotes: false,
    offlineMode: true,
    voiceInput: false,
    imageRecognition: false
  },

  // Specialty Modules
  specialties: {
    medical: true,
    surgical: true,
    pediatric: true,
    obstetric: true,
    psychiatric: true,
    emergency: true,
    critical_care: true,
    oncology: true,
    geriatric: true,
    community: true
  },

  // Quality Indicators
  qualityIndicators: {
    CAUTI: true,      // 도뇨관 관련 요로감염
    CLABSI: true,     // 중심정맥관 관련 혈류감염
    falls: true,      // 낙상
    pressure_ulcers: true, // 욕창
    medication_errors: true // 투약오류
  },

  // Integration Options
  integrations: {
    ehr: false,
    pharmacy: false,
    laboratory: false,
    radiology: false
  }
};

// Validation function
export function validateConfig(config: typeof ServerConfig): boolean {
  // Check required fields
  if (!config.server.name || !config.server.version) {
    throw new Error('Server name and version are required');
  }

  // Check language settings
  if (!['ko-KR', 'en-US'].includes(config.language.primary)) {
    throw new Error('Invalid primary language');
  }

  // Check safety settings
  if (config.safety.requireVerification.length === 0) {
    console.warn('No verification requirements set - this may be unsafe');
  }

  return true;
}

// Get specialty-specific configuration
export function getSpecialtyConfig(specialty: string) {
  const specialtyConfigs: { [key: string]: any } = {
    oncology: {
      additionalDatabases: ['chemotherapy_protocols', 'tumor_staging'],
      requiredAssessments: ['pain', 'nausea', 'neutropenia_risk'],
      specialProtocols: ['central_line_care', 'chemotherapy_administration']
    },
    pediatric: {
      additionalDatabases: ['growth_charts', 'vaccination_schedules'],
      requiredAssessments: ['developmental_milestones', 'pain_scales_pediatric'],
      specialProtocols: ['pediatric_dosing', 'family_centered_care']
    },
    critical_care: {
      additionalDatabases: ['ventilator_settings', 'vasoactive_drugs'],
      requiredAssessments: ['sedation_scales', 'delirium_screening'],
      specialProtocols: ['rapid_response', 'code_blue', 'therapeutic_hypothermia']
    }
  };

  return specialtyConfigs[specialty] || {};
}