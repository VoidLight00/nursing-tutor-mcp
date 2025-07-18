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
      response += `## 💡 핵심 포인트\n${knowledge.key_points.map((p: string) => `- ${p}`).join('\n')}\n\n`;
    } else if (level === 'intermediate') {
      response += `## 📚 상세 설명\n${knowledge.detailed_explanation}\n\n`;
      response += `## 🔍 임상 적용\n${knowledge.clinical_applications.map((a: string) => `- ${a}`).join('\n')}\n\n`;
    } else {
      response += `## 🧬 고급 개념\n${knowledge.advanced_concepts}\n\n`;
      response += `## 🔬 최신 연구\n${knowledge.recent_research}\n\n`;
      response += `## 📊 임상 증거\n${knowledge.clinical_evidence}\n\n`;
    }
    
    response += `## 📝 학습 포인트\n${knowledge.learning_objectives?.map((o: string) => `- ${o}`).join('\n') || '추가 학습 자료 준비 중'}\n\n`;
    response += `## 🔗 관련 개념\n${knowledge.related_concepts?.map((c: string) => `- [[${c}]]`).join('\n') || '관련 개념 매핑 중'}\n\n`;
    
    return response;
  }
}