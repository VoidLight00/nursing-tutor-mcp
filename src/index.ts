import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { NursingKnowledgeTool } from './tools/nursing-knowledge.js';
import { ClinicalCaseTool } from './tools/clinical-case.js';
import { CarePlanTool } from './tools/care-plan.js';
import { ObsidianIntegrationTool } from './tools/obsidian-integration.js';
import { ResearchAssistantTool } from './tools/research-assistant.js';

interface PatientInfo {
  age: number;
  gender: 'male' | 'female';
  diagnosis: string;
  stage?: string;
  treatment_protocol?: string;
  genetic_markers?: string[];
}

export class NursingTutorMCPServer {
  private server: Server;
  
  constructor() {
    this.server = new Server({
      name: 'nursing-tutor-mcp',
      version: '1.0.0',
    });
    
    this.setupHandlers();
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      switch (name) {
        case 'get_nursing_knowledge':
          return await new NursingKnowledgeTool().execute(args as any);
        
        case 'analyze_clinical_case':
          return await new ClinicalCaseTool().execute(args as any);
        
        case 'generate_care_plan':
          return await new CarePlanTool().execute(args as any);
        
        case 'obsidian_integration':
          return await new ObsidianIntegrationTool().execute(args as any);
        
        case 'research_assistant':
          return await new ResearchAssistantTool().execute(args as any);
        
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }
    });
    
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
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
                    diagnosis: { type: 'string' },
                    stage: { type: 'string' },
                    treatment_protocol: { type: 'string' },
                    genetic_markers: { type: 'array', items: { type: 'string' } }
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

const server = new NursingTutorMCPServer();
server.start().catch(console.error);