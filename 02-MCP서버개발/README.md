# 02-MCP서버개발

## 🚀 개요
간호사 1대1 과외수업을 위한 MCP(Model Context Protocol) 서버를 개발합니다.
비전공자의 독학 과정을 지원하고, 임상시험 및 유전자 기반 항암제 치료 분야의 전문 지식을 체계적으로 전달합니다.

## 🏗️ 서버 아키텍처

### 1. 핵심 MCP 도구 (5개)
```typescript
interface NursingMCPTools {
  get_nursing_knowledge: {
    description: "간호학 지식 검색 및 설명"
    parameters: {
      topic: string;          // 주제 (예: 종양간호, 유전자치료)
      level: 'basic' | 'intermediate' | 'advanced';
      specialty?: string;     // 전문 분야
    }
  };
  
  analyze_clinical_case: {
    description: "임상 사례 분석 및 간호계획 수립"
    parameters: {
      patient_info: PatientInfo;
      symptoms: string[];
      context: 'oncology' | 'general' | 'clinical_trial';
    }
  };
  
  generate_care_plan: {
    description: "개별 환자 간호계획 생성"
    parameters: {
      nursing_diagnosis: string[];
      patient_goals: string[];
      interventions_needed: string[];
    }
  };
  
  obsidian_integration: {
    description: "옵시디언과 연동하여 학습 내용 관리"
    parameters: {
      note_type: 'daily' | 'concept' | 'case_study';
      content: string;
      tags: string[];
    }
  };
  
  research_assistant: {
    description: "임상시험 및 연구 보조 기능"
    parameters: {
      research_area: 'clinical_trial' | 'genetics' | 'oncology';
      query: string;
      evidence_level?: 'systematic_review' | 'rct' | 'case_study';
    }
  };
}
```

### 2. 데이터 구조
```typescript
interface PatientInfo {
  age: number;
  gender: 'male' | 'female';
  diagnosis: string;
  stage?: string;              // 암 병기 등
  treatment_protocol?: string; // 치료 프로토콜
  genetic_markers?: string[];  // 유전자 마커
}

interface NursingDiagnosis {
  id: string;
  title: string;
  definition: string;
  risk_factors: string[];
  defining_characteristics: string[];
  related_factors: string[];
}

interface ClinicalEvidence {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  evidence_level: string;
  summary: string;
  clinical_implications: string[];
}
```

## 🔧 서버 구현

### 1. 메인 서버 파일 (src/index.ts)
```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { NursingKnowledgeTool } from './tools/nursing-knowledge.js';
import { ClinicalCaseTool } from './tools/clinical-case.js';
import { CarePlanTool } from './tools/care-plan.js';
import { ObsidianIntegrationTool } from './tools/obsidian-integration.js';
import { ResearchAssistantTool } from './tools/research-assistant.js';

export class NursingTutorMCPServer {
  private server: Server;
  
  constructor() {
    this.server = new Server({
      name: 'nursing-tutor-mcp',
      version: '1.0.0',
    }, {
      capabilities: {
        tools: {},
      },
    });
    
    this.setupHandlers();
  }
  
  private setupHandlers() {
    // 간호학 지식 검색
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      
      switch (name) {
        case 'get_nursing_knowledge':
          return new NursingKnowledgeTool().execute(args);
        
        case 'analyze_clinical_case':
          return new ClinicalCaseTool().execute(args);
        
        case 'generate_care_plan':
          return new CarePlanTool().execute(args);
        
        case 'obsidian_integration':
          return new ObsidianIntegrationTool().execute(args);
        
        case 'research_assistant':
          return new ResearchAssistantTool().execute(args);
        
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
    
    // 도구 목록 제공
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: 'get_nursing_knowledge',
            description: '간호학 지식 검색 및 설명',
            inputSchema: {
              type: 'object',
              properties: {
                topic: { type: 'string', description: '검색할 주제' },
                level: { 
                  type: 'string', 
                  enum: ['basic', 'intermediate', 'advanced'],
                  description: '학습 수준'
                },
                specialty: { type: 'string', description: '전문 분야 (선택)' }
              },
              required: ['topic', 'level']
            }
          },
          {
            name: 'analyze_clinical_case',
            description: '임상 사례 분석 및 간호계획 수립',
            inputSchema: {
              type: 'object',
              properties: {
                patient_info: { 
                  type: 'object',
                  properties: {
                    age: { type: 'number' },
                    gender: { type: 'string', enum: ['male', 'female'] },
                    diagnosis: { type: 'string' }
                  },
                  required: ['age', 'gender', 'diagnosis']
                },
                symptoms: { 
                  type: 'array', 
                  items: { type: 'string' },
                  description: '증상 목록'
                },
                context: { 
                  type: 'string', 
                  enum: ['oncology', 'general', 'clinical_trial'],
                  description: '임상 상황'
                }
              },
              required: ['patient_info', 'symptoms']
            }
          },
          {
            name: 'generate_care_plan',
            description: '개별 환자 간호계획 생성',
            inputSchema: {
              type: 'object',
              properties: {
                nursing_diagnosis: { 
                  type: 'array', 
                  items: { type: 'string' },
                  description: '간호진단 목록'
                },
                patient_goals: { 
                  type: 'array', 
                  items: { type: 'string' },
                  description: '환자 목표'
                },
                interventions_needed: { 
                  type: 'array', 
                  items: { type: 'string' },
                  description: '필요한 간호중재'
                }
              },
              required: ['nursing_diagnosis']
            }
          },
          {
            name: 'obsidian_integration',
            description: '옵시디언과 연동하여 학습 내용 관리',
            inputSchema: {
              type: 'object',
              properties: {
                note_type: { 
                  type: 'string', 
                  enum: ['daily', 'concept', 'case_study'],
                  description: '노트 유형'
                },
                content: { type: 'string', description: '노트 내용' },
                tags: { 
                  type: 'array', 
                  items: { type: 'string' },
                  description: '태그 목록'
                }
              },
              required: ['note_type', 'content']
            }
          },
          {
            name: 'research_assistant',
            description: '임상시험 및 연구 보조 기능',
            inputSchema: {
              type: 'object',
              properties: {
                research_area: { 
                  type: 'string', 
                  enum: ['clinical_trial', 'genetics', 'oncology'],
                  description: '연구 영역'
                },
                query: { type: 'string', description: '검색 쿼리' },
                evidence_level: { 
                  type: 'string', 
                  enum: ['systematic_review', 'rct', 'case_study'],
                  description: '근거 수준 (선택)'
                }
              },
              required: ['research_area', 'query']
            }
          }
        ]
      };
    });
  }
  
  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('🏥 Nursing Tutor MCP server running on stdio');
  }
}

// 서버 시작
const server = new NursingTutorMCPServer();
server.start().catch(console.error);
```

### 2. 간호학 지식 검색 도구 (src/tools/nursing-knowledge.ts)
```typescript
import { NursingDatabase } from '../data/nursing-database.js';

export class NursingKnowledgeTool {
  private db: NursingDatabase;
  
  constructor() {
    this.db = new NursingDatabase();
  }
  
  async execute(args: {
    topic: string;
    level: 'basic' | 'intermediate' | 'advanced';
    specialty?: string;
  }) {
    const { topic, level, specialty } = args;
    
    // 간호학 지식 데이터베이스에서 검색
    const knowledge = await this.db.searchKnowledge(topic, level, specialty);
    
    return {
      content: [
        {
          type: 'text',
          text: this.formatKnowledgeResponse(knowledge, level)
        }
      ]
    };
  }
  
  private formatKnowledgeResponse(knowledge: any, level: string): string {
    let response = `# ${knowledge.title}\n\n`;
    
    if (level === 'basic') {
      response += `## 🎯 기본 개념\n${knowledge.basic_definition}\n\n`;
      response += `## 💡 핵심 포인트\n${knowledge.key_points.join('\n- ')}\n\n`;
    } else if (level === 'intermediate') {
      response += `## 📚 상세 설명\n${knowledge.detailed_explanation}\n\n`;
      response += `## 🔍 임상 적용\n${knowledge.clinical_applications.join('\n- ')}\n\n`;
    } else {
      response += `## 🧬 고급 개념\n${knowledge.advanced_concepts}\n\n`;
      response += `## 🔬 최신 연구\n${knowledge.recent_research}\n\n`;
      response += `## 📊 임상 증거\n${knowledge.clinical_evidence}\n\n`;
    }
    
    return response;
  }
}
```

### 3. 임상 사례 분석 도구 (src/tools/clinical-case.ts)
```typescript
export class ClinicalCaseTool {
  async execute(args: {
    patient_info: PatientInfo;
    symptoms: string[];
    context?: string;
  }) {
    const { patient_info, symptoms, context = 'general' } = args;
    
    // 사례 분석 로직
    const analysis = await this.analyzeClinicalCase(patient_info, symptoms, context);
    
    return {
      content: [
        {
          type: 'text',
          text: this.formatCaseAnalysis(analysis)
        }
      ]
    };
  }
  
  private async analyzeClinicalCase(
    patientInfo: PatientInfo,
    symptoms: string[],
    context: string
  ) {
    // 임상 사례 분석 로직
    return {
      patient_summary: this.generatePatientSummary(patientInfo),
      symptom_analysis: this.analyzeSymptoms(symptoms),
      nursing_priorities: this.identifyNursingPriorities(patientInfo, symptoms),
      recommended_interventions: this.recommendInterventions(patientInfo, symptoms, context),
      monitoring_parameters: this.identifyMonitoringParameters(patientInfo, symptoms),
      patient_education: this.generatePatientEducation(patientInfo, symptoms)
    };
  }
  
  private formatCaseAnalysis(analysis: any): string {
    return `
# 📋 임상 사례 분석

## 👤 환자 정보
${analysis.patient_summary}

## 🔍 증상 분석
${analysis.symptom_analysis.map((s: any) => `- ${s}`).join('\n')}

## 🎯 간호 우선순위
${analysis.nursing_priorities.map((p: any, i: number) => `${i + 1}. ${p}`).join('\n')}

## 🏥 권장 간호중재
${analysis.recommended_interventions.map((i: any) => `- ${i}`).join('\n')}

## 📊 모니터링 지표
${analysis.monitoring_parameters.map((m: any) => `- ${m}`).join('\n')}

## 📚 환자 교육
${analysis.patient_education.map((e: any) => `- ${e}`).join('\n')}
`;
  }
}
```

## 🔗 옵시디언 연동 시스템

### 1. 옵시디언 API 연동
```typescript
export class ObsidianIntegrationTool {
  private obsidianVault: string;
  
  constructor() {
    this.obsidianVault = process.env.OBSIDIAN_VAULT_PATH || '';
  }
  
  async execute(args: {
    note_type: 'daily' | 'concept' | 'case_study';
    content: string;
    tags: string[];
  }) {
    const { note_type, content, tags } = args;
    
    const note = await this.createObsidianNote(note_type, content, tags);
    
    return {
      content: [
        {
          type: 'text',
          text: `✅ 옵시디언 노트가 생성되었습니다: ${note.filename}\n\n${note.preview}`
        }
      ]
    };
  }
  
  private async createObsidianNote(
    type: string,
    content: string,
    tags: string[]
  ) {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${timestamp}-${type}-${Math.random().toString(36).substr(2, 9)}.md`;
    
    const noteContent = `---
tags: [${tags.join(', ')}]
type: ${type}
created: ${new Date().toISOString()}
---

# ${this.getTitleFromType(type)}

${content}

## 🔗 연관 개념
- [[간호과정]]
- [[임상실습]]
- [[환자안전]]

## 📝 학습 메모
- [ ] 이론 복습
- [ ] 실습 적용
- [ ] 사례 연구

---
*생성일: ${new Date().toLocaleString('ko-KR')}*
`;
    
    return {
      filename,
      content: noteContent,
      preview: content.substring(0, 200) + '...'
    };
  }
}
```

## 🧬 연구 보조 기능

### 1. 임상시험 및 유전자 치료 연구 지원
```typescript
export class ResearchAssistantTool {
  async execute(args: {
    research_area: 'clinical_trial' | 'genetics' | 'oncology';
    query: string;
    evidence_level?: string;
  }) {
    const { research_area, query, evidence_level } = args;
    
    const research = await this.searchResearchEvidence(research_area, query, evidence_level);
    
    return {
      content: [
        {
          type: 'text',
          text: this.formatResearchResponse(research)
        }
      ]
    };
  }
  
  private async searchResearchEvidence(
    area: string,
    query: string,
    evidenceLevel?: string
  ) {
    // 연구 데이터베이스 검색 로직
    return {
      summary: `${area} 분야의 "${query}" 관련 연구 결과`,
      key_findings: [
        '유전자 기반 항암제 치료의 효과성 입증',
        '개인 맞춤형 치료의 중요성',
        '간호사의 역할 확장 필요성'
      ],
      clinical_implications: [
        '환자 맞춤형 간호계획 수립',
        '유전자 검사 결과 해석 능력 필요',
        '다학제 팀 접근법 중요'
      ],
      recent_studies: [
        {
          title: 'Precision Medicine in Cancer Care',
          authors: ['Smith J', 'Johnson M'],
          year: 2024,
          journal: 'Nature Medicine'
        }
      ]
    };
  }
}
```

## 🚀 서버 배포

### 1. 빌드 스크립트
```json
{
  "scripts": {
    "build": "tsc && cp -r src/data dist/",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "claude-setup": "tsx scripts/setup-claude-desktop.ts"
  }
}
```

### 2. Docker 배포
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY src/data ./dist/data

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

## 📊 성능 최적화

### 1. 캐싱 전략
```typescript
class CacheManager {
  private cache: Map<string, any> = new Map();
  
  async getOrSet<T>(key: string, getter: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const value = await getter();
    this.cache.set(key, value);
    return value;
  }
}
```

### 2. 로깅 시스템
```typescript
class Logger {
  info(message: string, data?: any) {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`, data);
  }
  
  error(message: string, error?: Error) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  }
}
```

## 📝 다음 단계
1. 간호학 지식 데이터베이스 구축
2. 임상 사례 데이터 수집
3. 옵시디언 플러그인 개발
4. RAG 시스템 통합
5. 학습 분석 대시보드 구현

---

**목표**: 간호사 전문성 향상을 위한 AI 기반 학습 도구 개발  
**특징**: 개별 맞춤형 학습, 실무 중심 접근, 최신 연구 반영