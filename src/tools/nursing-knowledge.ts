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
    
    // Check if topic is about medications
    if (topic.includes('약물') || topic.includes('medication') || topic.includes('drug')) {
      return this.handleMedicationQuery(topic);
    }
    
    // Check if topic is about lab values
    if (topic.includes('검사') || topic.includes('lab') || topic.includes('수치')) {
      return this.handleLabValueQuery(topic);
    }
    
    // Check if topic is about nursing diagnoses
    if (topic.includes('간호진단') || topic.includes('diagnosis') || topic.includes('NANDA')) {
      return this.handleNursingDiagnosisQuery(topic);
    }
    
    // Check if topic is about protocols
    if (topic.includes('프로토콜') || topic.includes('protocol') || topic.includes('술기')) {
      return this.handleProtocolQuery(topic);
    }
    
    // Default: search general nursing knowledge
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
  
  private async handleMedicationQuery(topic: string) {
    const medications = this.db.searchMedications(topic);
    
    if (medications.length === 0) {
      return {
        content: [{
          type: 'text',
          text: `❌ "${topic}"에 대한 약물 정보를 찾을 수 없습니다.`
        }]
      };
    }
    
    let response = `# 💊 약물 정보 검색 결과\n\n`;
    
    medications.forEach(med => {
      response += `## ${med.nameKorean} (${med.name})\n\n`;
      response += `**분류**: ${med.categoryKorean}\n`;
      response += `**일반명**: ${med.genericName}\n\n`;
      
      response += `### 적응증\n`;
      med.indications.forEach(ind => response += `- ${ind}\n`);
      
      response += `\n### 용법용량\n`;
      response += `- 성인: ${med.dosage.adult}\n`;
      if (med.dosage.pediatric) response += `- 소아: ${med.dosage.pediatric}\n`;
      if (med.dosage.geriatric) response += `- 노인: ${med.dosage.geriatric}\n`;
      
      response += `\n### 투여경로\n`;
      response += med.route.join(', ') + '\n';
      
      response += `\n### 부작용\n`;
      response += `**흔한 부작용**:\n`;
      med.sideEffects.common.forEach(se => response += `- ${se}\n`);
      response += `\n**심각한 부작용**:\n`;
      med.sideEffects.serious.forEach(se => response += `- ${se}\n`);
      
      response += `\n### 간호 고려사항\n`;
      med.nursingConsiderations.forEach(nc => response += `- ${nc}\n`);
      
      response += `\n### 환자 교육\n`;
      med.patientEducation.forEach(pe => response += `- ${pe}\n`);
      
      response += `\n---\n\n`;
    });
    
    return {
      content: [{
        type: 'text',
        text: response
      }]
    };
  }
  
  private async handleLabValueQuery(topic: string) {
    const labValues = this.db.searchLabValues(topic);
    
    if (labValues.length === 0) {
      return {
        content: [{
          type: 'text',
          text: `❌ "${topic}"에 대한 검사 정보를 찾을 수 없습니다.`
        }]
      };
    }
    
    let response = `# 🔬 검사 수치 정보\n\n`;
    
    labValues.forEach(lab => {
      response += `## ${lab.nameKorean} (${lab.name})\n\n`;
      response += `**분류**: ${lab.category}\n`;
      response += `**단위**: ${lab.unit}\n\n`;
      
      response += `### 정상 범위\n`;
      if (lab.normalRange.adult.general) {
        response += `- 성인: ${lab.normalRange.adult.general}\n`;
      } else {
        if (lab.normalRange.adult.male) response += `- 남성: ${lab.normalRange.adult.male}\n`;
        if (lab.normalRange.adult.female) response += `- 여성: ${lab.normalRange.adult.female}\n`;
      }
      
      response += `\n### 위험 수치\n`;
      if (lab.criticalValues.low) response += `- 낮음: ${lab.criticalValues.low}\n`;
      if (lab.criticalValues.high) response += `- 높음: ${lab.criticalValues.high}\n`;
      
      response += `\n### 임상적 의의\n`;
      response += `**증가 시**:\n`;
      lab.clinicalSignificance.increased.forEach(sig => response += `- ${sig}\n`);
      response += `\n**감소 시**:\n`;
      lab.clinicalSignificance.decreased.forEach(sig => response += `- ${sig}\n`);
      
      response += `\n### 간호 고려사항\n`;
      lab.nursingConsiderations.forEach(nc => response += `- ${nc}\n`);
      
      response += `\n**검체**: ${lab.specimen}\n`;
      response += `**공복 필요**: ${lab.fastingRequired ? '예' : '아니오'}\n`;
      
      response += `\n---\n\n`;
    });
    
    return {
      content: [{
        type: 'text',
        text: response
      }]
    };
  }
  
  private async handleNursingDiagnosisQuery(topic: string) {
    const diagnoses = this.db.searchNursingDiagnoses(topic);
    
    if (diagnoses.length === 0) {
      return {
        content: [{
          type: 'text',
          text: `❌ "${topic}"에 대한 간호진단을 찾을 수 없습니다.`
        }]
      };
    }
    
    let response = `# 🏥 NANDA 간호진단\n\n`;
    
    diagnoses.forEach(diag => {
      response += `## [${diag.code}] ${diag.labelKorean}\n`;
      response += `*${diag.label}*\n\n`;
      response += `**영역**: ${diag.domainKorean} (${diag.domain})\n`;
      response += `**과**: ${diag.classKorean} (${diag.class})\n\n`;
      
      response += `### 정의\n${diag.definition}\n\n`;
      
      response += `### 특성\n`;
      diag.definingCharacteristics.forEach(char => response += `- ${char}\n`);
      
      response += `\n### 관련 요인\n`;
      diag.relatedFactors.forEach(factor => response += `- ${factor}\n`);
      
      if (diag.riskFactors && diag.riskFactors.length > 0) {
        response += `\n### 위험 요인\n`;
        diag.riskFactors.forEach(risk => response += `- ${risk}\n`);
      }
      
      response += `\n### 간호중재\n`;
      response += `**우선순위 중재**:\n`;
      diag.nursingInterventions.priority.forEach(int => response += `- ${int}\n`);
      response += `\n**추가 중재**:\n`;
      diag.nursingInterventions.suggested.forEach(int => response += `- ${int}\n`);
      
      response += `\n### 기대 결과\n`;
      diag.expectedOutcomes.forEach(outcome => response += `- ${outcome}\n`);
      
      response += `\n---\n\n`;
    });
    
    return {
      content: [{
        type: 'text',
        text: response
      }]
    };
  }
  
  private async handleProtocolQuery(topic: string) {
    const protocols = this.db.searchClinicalProtocols(topic);
    
    if (protocols.length === 0) {
      return {
        content: [{
          type: 'text',
          text: `❌ "${topic}"에 대한 프로토콜을 찾을 수 없습니다.`
        }]
      };
    }
    
    let response = `# 📋 임상 프로토콜\n\n`;
    
    protocols.forEach(protocol => {
      response += `## ${protocol.nameKorean} (${protocol.name})\n\n`;
      response += `**분류**: ${protocol.categoryKorean}\n`;
      response += `**목적**: ${protocol.purpose}\n\n`;
      
      response += `### 적응증\n`;
      protocol.indications.forEach(ind => response += `- ${ind}\n`);
      
      response += `\n### 금기사항\n`;
      protocol.contraindications.forEach(contra => response += `- ${contra}\n`);
      
      response += `\n### 필요 장비\n`;
      protocol.equipment.forEach(equip => response += `- ${equip}\n`);
      
      response += `\n### 절차\n`;
      protocol.procedure.forEach(step => {
        response += `**${step.step}단계**: ${step.action}\n`;
        response += `   *근거*: ${step.rationale}\n\n`;
      });
      
      response += `### 합병증\n`;
      protocol.complications.forEach(comp => response += `- ${comp}\n`);
      
      response += `\n### 간호 고려사항\n`;
      protocol.nursingConsiderations.forEach(nc => response += `- ${nc}\n`);
      
      response += `\n### 기록사항\n`;
      protocol.documentation.forEach(doc => response += `- ${doc}\n`);
      
      response += `\n---\n\n`;
    });
    
    return {
      content: [{
        type: 'text',
        text: response
      }]
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