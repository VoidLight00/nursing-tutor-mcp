interface PatientInfo {
  age: number;
  gender: 'male' | 'female';
  diagnosis: string;
  stage?: string;
  treatment_protocol?: string;
  genetic_markers?: string[];
}

import { NursingDatabase } from '../data/nursing-database.js';

export class ClinicalCaseTool {
  private db: NursingDatabase;
  
  constructor() {
    this.db = new NursingDatabase();
  }
  
  async execute(args: {
    patient_info: PatientInfo;
    symptoms: string[];
    context?: string;
  }) {
    const { patient_info, symptoms, context = 'general' } = args;
    
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
    // Get suggested nursing diagnoses based on symptoms
    const suggestedDiagnoses = this.db.suggestNursingDiagnoses(symptoms);
    
    // Get relevant medications based on diagnosis
    const relevantMedications = this.getRelevantMedications(patientInfo, symptoms);
    
    // Get relevant lab values to monitor
    const relevantLabs = this.getRelevantLabs(patientInfo, symptoms);
    
    return {
      patient_summary: this.generatePatientSummary(patientInfo),
      symptom_analysis: this.analyzeSymptoms(symptoms),
      nursing_diagnoses: suggestedDiagnoses,
      nursing_priorities: this.identifyNursingPriorities(patientInfo, symptoms),
      recommended_interventions: this.recommendInterventions(patientInfo, symptoms, context),
      medications: relevantMedications,
      lab_values: relevantLabs,
      monitoring_parameters: this.identifyMonitoringParameters(patientInfo, symptoms),
      patient_education: this.generatePatientEducation(patientInfo, symptoms),
      expected_outcomes: this.defineExpectedOutcomes(patientInfo, symptoms),
      risk_factors: this.identifyRiskFactors(patientInfo, symptoms)
    };
  }
  
  private getRelevantMedications(patientInfo: PatientInfo, symptoms: string[]) {
    const medications: any[] = [];
    
    // Pain management
    if (symptoms.includes('통증') || symptoms.includes('pain')) {
      const morphine = this.db.getMedication('morphine');
      if (morphine) medications.push(morphine);
    }
    
    // Nausea/vomiting
    if (symptoms.includes('오심') || symptoms.includes('구토')) {
      // Add antiemetics (would need to add to medication database)
    }
    
    // Based on diagnosis
    if (patientInfo.diagnosis.includes('암') || patientInfo.diagnosis.includes('cancer')) {
      const cyclophosphamide = this.db.getMedication('cyclophosphamide');
      if (cyclophosphamide) medications.push(cyclophosphamide);
    }
    
    return medications;
  }
  
  private getRelevantLabs(patientInfo: PatientInfo, symptoms: string[]) {
    const labs: any[] = [];
    
    // Basic labs for all patients
    const hemoglobin = this.db.getLabValue('hemoglobin');
    const wbc = this.db.getLabValue('wbc');
    if (hemoglobin) labs.push(hemoglobin);
    if (wbc) labs.push(wbc);
    
    // Dehydration/fluid loss
    if (symptoms.includes('구토') || symptoms.includes('설사')) {
      const sodium = this.db.getLabValue('sodium');
      const potassium = this.db.getLabValue('potassium');
      const bun = this.db.getLabValue('bun');
      const creatinine = this.db.getLabValue('creatinine');
      if (sodium) labs.push(sodium);
      if (potassium) labs.push(potassium);
      if (bun) labs.push(bun);
      if (creatinine) labs.push(creatinine);
    }
    
    // Cancer patients
    if (patientInfo.diagnosis.includes('암') || patientInfo.diagnosis.includes('cancer')) {
      const platelet = this.db.getLabValue('platelet');
      const alt = this.db.getLabValue('alt');
      if (platelet) labs.push(platelet);
      if (alt) labs.push(alt);
    }
    
    return labs;
  }
  
  private generatePatientSummary(patientInfo: PatientInfo): string {
    let summary = `${patientInfo.age}세 ${patientInfo.gender === 'male' ? '남성' : '여성'} 환자`;
    summary += `\n진단: ${patientInfo.diagnosis}`;
    
    if (patientInfo.stage) {
      summary += `\n병기: ${patientInfo.stage}`;
    }
    
    if (patientInfo.treatment_protocol) {
      summary += `\n치료 프로토콜: ${patientInfo.treatment_protocol}`;
    }
    
    if (patientInfo.genetic_markers && patientInfo.genetic_markers.length > 0) {
      summary += `\n유전자 마커: ${patientInfo.genetic_markers.join(', ')}`;
    }
    
    return summary;
  }
  
  private analyzeSymptoms(symptoms: string[]): string[] {
    return symptoms.map(symptom => {
      const analysis = this.getSymptomAnalysis(symptom);
      return `${symptom}: ${analysis}`;
    });
  }
  
  private getSymptomAnalysis(symptom: string): string {
    const symptomMap: { [key: string]: string } = {
      '피로': '에너지 부족, 활동 능력 저하와 관련된 증상',
      '오심': '위장관 불편감, 식욕 부진과 관련된 증상',
      '구토': '위장관 자극, 탈수 위험과 관련된 증상',
      '통증': '신체적 불편감, 삶의 질 저하와 관련된 증상',
      '호흡곤란': '산소 공급 부족, 활동 제한과 관련된 증상',
      '발열': '감염 또는 염증 반응과 관련된 증상',
      '설사': '수분 및 전해질 불균형 위험과 관련된 증상',
      '변비': '장 기능 저하, 불편감과 관련된 증상'
    };
    
    return symptomMap[symptom] || '추가 평가가 필요한 증상';
  }
  
  private identifyNursingPriorities(patientInfo: PatientInfo, symptoms: string[]): string[] {
    const priorities: string[] = [];
    
    if (symptoms.includes('호흡곤란')) {
      priorities.push('기도 확보 및 호흡 양상 모니터링');
    }
    
    if (symptoms.includes('통증')) {
      priorities.push('통증 관리 및 완화');
    }
    
    if (symptoms.includes('구토') || symptoms.includes('설사')) {
      priorities.push('수분 및 전해질 균형 유지');
    }
    
    if (symptoms.includes('피로')) {
      priorities.push('에너지 보존 및 활동 조절');
    }
    
    if (patientInfo.diagnosis.includes('암') || patientInfo.diagnosis.includes('cancer')) {
      priorities.push('감염 예방 및 면역 상태 모니터링');
    }
    
    priorities.push('환자 안전 및 낙상 예방');
    priorities.push('심리적 지지 및 가족 교육');
    
    return priorities;
  }
  
  private recommendInterventions(patientInfo: PatientInfo, symptoms: string[], context: string): string[] {
    const interventions: string[] = [];
    
    if (symptoms.includes('통증')) {
      interventions.push('통증 척도를 이용한 정기적 통증 평가');
      interventions.push('약물적/비약물적 통증 완화 방법 적용');
    }
    
    if (symptoms.includes('오심') || symptoms.includes('구토')) {
      interventions.push('소량씩 자주 식사하도록 격려');
      interventions.push('항구토제 투여 및 효과 관찰');
    }
    
    if (symptoms.includes('피로')) {
      interventions.push('활동과 휴식의 균형 유지');
      interventions.push('에너지 보존 기법 교육');
    }
    
    if (context === 'oncology') {
      interventions.push('화학요법 부작용 모니터링');
      interventions.push('감염 징후 관찰 및 예방');
      interventions.push('영양 상태 평가 및 관리');
    }
    
    if (context === 'clinical_trial') {
      interventions.push('프로토콜 준수 모니터링');
      interventions.push('이상 반응 관찰 및 보고');
      interventions.push('연구 관련 교육 제공');
    }
    
    return interventions;
  }
  
  private identifyMonitoringParameters(patientInfo: PatientInfo, symptoms: string[]): string[] {
    const parameters: string[] = ['활력징후 (혈압, 맥박, 호흡, 체온)'];
    
    if (symptoms.includes('구토') || symptoms.includes('설사')) {
      parameters.push('수분 섭취량 및 배설량');
      parameters.push('전해질 수치 (Na, K, Cl)');
    }
    
    if (symptoms.includes('호흡곤란')) {
      parameters.push('산소포화도 및 호흡양상');
      parameters.push('동맥혈 가스 분석');
    }
    
    if (patientInfo.diagnosis.includes('암')) {
      parameters.push('혈액검사 (WBC, RBC, Platelet)');
      parameters.push('간 기능 검사');
      parameters.push('신장 기능 검사');
    }
    
    parameters.push('통증 점수 (0-10 척도)');
    parameters.push('의식 수준 및 신경학적 상태');
    
    return parameters;
  }
  
  private generatePatientEducation(patientInfo: PatientInfo, symptoms: string[]): string[] {
    const education: string[] = [];
    
    if (symptoms.includes('피로')) {
      education.push('적절한 휴식과 수면의 중요성');
      education.push('점진적 활동 증가 방법');
    }
    
    if (symptoms.includes('오심') || symptoms.includes('구토')) {
      education.push('식사 요령 (소량씩, 자주)');
      education.push('수분 섭취 방법');
    }
    
    if (patientInfo.diagnosis.includes('암')) {
      education.push('감염 예방 수칙');
      education.push('치료 중 주의사항');
      education.push('부작용 발생 시 대처 방법');
    }
    
    education.push('응급 상황 시 연락처');
    education.push('정기 검진 및 추적 관찰의 중요성');
    
    return education;
  }
  
  private defineExpectedOutcomes(patientInfo: PatientInfo, symptoms: string[]): string[] {
    const outcomes: string[] = [];
    
    if (symptoms.includes('통증')) {
      outcomes.push('통증 점수 3점 이하로 감소');
    }
    
    if (symptoms.includes('피로')) {
      outcomes.push('일상 활동 수행 능력 향상');
    }
    
    if (symptoms.includes('오심') || symptoms.includes('구토')) {
      outcomes.push('정상적인 식사 섭취 가능');
    }
    
    outcomes.push('환자 안전 사고 없음');
    outcomes.push('치료 계획 준수');
    outcomes.push('감염 징후 없음');
    
    return outcomes;
  }
  
  private identifyRiskFactors(patientInfo: PatientInfo, symptoms: string[]): string[] {
    const riskFactors: string[] = [];
    
    if (patientInfo.age > 65) {
      riskFactors.push('고령으로 인한 합병증 위험');
    }
    
    if (symptoms.includes('피로') || symptoms.includes('호흡곤란')) {
      riskFactors.push('낙상 위험');
    }
    
    if (symptoms.includes('구토') || symptoms.includes('설사')) {
      riskFactors.push('탈수 및 전해질 불균형 위험');
    }
    
    if (patientInfo.diagnosis.includes('암')) {
      riskFactors.push('면역 억제로 인한 감염 위험');
      riskFactors.push('영양 불량 위험');
    }
    
    return riskFactors;
  }
  
  private formatCaseAnalysis(analysis: any): string {
    let response = `# 📋 임상 사례 분석

## 👤 환자 정보
${analysis.patient_summary}

## 🔍 증상 분석
${analysis.symptom_analysis.map((s: string) => `- ${s}`).join('\n')}
`;

    // Add nursing diagnoses if available
    if (analysis.nursing_diagnoses && analysis.nursing_diagnoses.length > 0) {
      response += `\n## 🏥 간호진단 (NANDA)\n`;
      analysis.nursing_diagnoses.forEach((diag: any, index: number) => {
        response += `### ${index + 1}. [${diag.code}] ${diag.labelKorean}\n`;
        response += `**정의**: ${diag.definition}\n`;
        response += `**우선순위 중재**:\n`;
        diag.nursingInterventions.priority.slice(0, 3).forEach((int: string) => {
          response += `- ${int}\n`;
        });
        response += '\n';
      });
    }

    response += `## 🎯 간호 우선순위
${analysis.nursing_priorities.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

## 🏥 권장 간호중재
${analysis.recommended_interventions.map((i: string) => `- ${i}`).join('\n')}
`;

    // Add medications if available
    if (analysis.medications && analysis.medications.length > 0) {
      response += `\n## 💊 관련 약물\n`;
      analysis.medications.forEach((med: any) => {
        response += `### ${med.nameKorean} (${med.name})\n`;
        response += `- **용법**: ${med.dosage.adult}\n`;
        response += `- **주요 부작용**: ${med.sideEffects.common.slice(0, 3).join(', ')}\n`;
        response += `- **간호 고려사항**: ${med.nursingConsiderations[0]}\n\n`;
      });
    }

    // Add lab values if available
    if (analysis.lab_values && analysis.lab_values.length > 0) {
      response += `\n## 🔬 모니터링 검사\n`;
      analysis.lab_values.forEach((lab: any) => {
        response += `### ${lab.nameKorean}\n`;
        response += `- **정상범위**: ${lab.normalRange.adult.general || lab.normalRange.adult.male || ''}\n`;
        response += `- **간호 고려사항**: ${lab.nursingConsiderations[0]}\n\n`;
      });
    }

    response += `## 📊 모니터링 지표
${analysis.monitoring_parameters.map((m: string) => `- ${m}`).join('\n')}

## 📚 환자 교육
${analysis.patient_education.map((e: string) => `- ${e}`).join('\n')}

## 🎯 기대 결과
${analysis.expected_outcomes.map((o: string) => `- ${o}`).join('\n')}

## ⚠️ 위험 요인
${analysis.risk_factors.map((r: string) => `- ${r}`).join('\n')}

---
*분석 완료 시간: ${new Date().toLocaleString('ko-KR')}*
`;
    return response;
  }
}