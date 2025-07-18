export class CarePlanTool {
  async execute(args: {
    nursing_diagnosis: string[];
    patient_goals?: string[];
    interventions_needed?: string[];
  }) {
    const { nursing_diagnosis, patient_goals = [], interventions_needed = [] } = args;
    
    const carePlan = await this.generateCarePlan(nursing_diagnosis, patient_goals, interventions_needed);
    
    return {
      content: [
        {
          type: 'text',
          text: this.formatCarePlan(carePlan)
        }
      ]
    };
  }
  
  private async generateCarePlan(
    nursingDiagnosis: string[],
    patientGoals: string[],
    interventionsNeeded: string[]
  ) {
    const carePlan = {
      diagnosis_analysis: this.analyzeNursingDiagnosis(nursingDiagnosis),
      goals: patientGoals.length > 0 ? patientGoals : this.generateDefaultGoals(nursingDiagnosis),
      interventions: interventionsNeeded.length > 0 ? interventionsNeeded : this.generateDefaultInterventions(nursingDiagnosis),
      rationale: this.generateRationale(nursingDiagnosis),
      evaluation_criteria: this.generateEvaluationCriteria(nursingDiagnosis),
      timeframe: this.generateTimeframe(nursingDiagnosis),
      priority_ranking: this.rankPriorities(nursingDiagnosis)
    };
    
    return carePlan;
  }
  
  private analyzeNursingDiagnosis(diagnoses: string[]): any[] {
    return diagnoses.map(diagnosis => {
      const analysis = this.getNursingDiagnosisInfo(diagnosis);
      return {
        diagnosis,
        category: analysis.category,
        definition: analysis.definition,
        risk_factors: analysis.risk_factors,
        related_factors: analysis.related_factors,
        priority_level: analysis.priority_level
      };
    });
  }
  
  private getNursingDiagnosisInfo(diagnosis: string): any {
    const diagnosisMap: { [key: string]: any } = {
      '급성 통증': {
        category: '신체적 간호진단',
        definition: '조직 손상이나 염증으로 인한 불쾌한 감각적, 정서적 경험',
        risk_factors: ['수술', '외상', '염증', '질병 과정'],
        related_factors: ['조직 손상', '염증 반응', '근육 긴장'],
        priority_level: 'high'
      },
      '감염 위험성': {
        category: '안전 관련 간호진단',
        definition: '병원체 침입으로 인한 감염 발생 가능성',
        risk_factors: ['면역 저하', '침습적 처치', '영양 불량'],
        related_factors: ['면역 체계 저하', '방어 기전 손상'],
        priority_level: 'high'
      },
      '피로': {
        category: '활동/휴식 간호진단',
        definition: '신체적, 정신적 에너지 부족으로 인한 피로감',
        risk_factors: ['질병 과정', '치료 부작용', '수면 부족'],
        related_factors: ['에너지 소모 증가', '산소 공급 부족'],
        priority_level: 'medium'
      },
      '영양 부족': {
        category: '영양/대사 간호진단',
        definition: '신체 요구량보다 적은 영양소 섭취',
        risk_factors: ['식욕 부진', '소화 장애', '치료 부작용'],
        related_factors: ['섭취 부족', '흡수 장애'],
        priority_level: 'medium'
      },
      '낙상 위험성': {
        category: '안전 관련 간호진단',
        definition: '낙상으로 인한 신체적 손상 위험',
        risk_factors: ['고령', '약물 부작용', '환경적 요인'],
        related_factors: ['신체 기능 저하', '인지 장애'],
        priority_level: 'high'
      }
    };
    
    return diagnosisMap[diagnosis] || {
      category: '기타',
      definition: '추가 평가가 필요한 간호진단',
      risk_factors: ['개별 평가 필요'],
      related_factors: ['개별 평가 필요'],
      priority_level: 'medium'
    };
  }
  
  private generateDefaultGoals(diagnoses: string[]): string[] {
    const goals: string[] = [];
    
    diagnoses.forEach(diagnosis => {
      const goalMap: { [key: string]: string } = {
        '급성 통증': '통증 점수 3점 이하로 감소',
        '감염 위험성': '감염 징후 없이 치료 기간 경과',
        '피로': '일상 활동 수행 능력 향상',
        '영양 부족': '적절한 영양 섭취 및 체중 유지',
        '낙상 위험성': '낙상 사고 없이 안전한 환경 유지'
      };
      
      if (goalMap[diagnosis]) {
        goals.push(goalMap[diagnosis]);
      }
    });
    
    return goals;
  }
  
  private generateDefaultInterventions(diagnoses: string[]): string[] {
    const interventions: string[] = [];
    
    diagnoses.forEach(diagnosis => {
      const interventionMap: { [key: string]: string[] } = {
        '급성 통증': [
          '통증 척도를 이용한 정기적 통증 평가',
          '처방된 진통제 투여 및 효과 관찰',
          '비약물적 통증 완화 방법 적용'
        ],
        '감염 위험성': [
          '손 위생 철저히 시행',
          '무균술 적용',
          '감염 징후 관찰 및 보고'
        ],
        '피로': [
          '활동과 휴식의 균형 유지',
          '에너지 보존 기법 교육',
          '점진적 활동 증가 격려'
        ],
        '영양 부족': [
          '영양 상태 평가',
          '선호 식품 확인 및 제공',
          '소량씩 자주 식사 격려'
        ],
        '낙상 위험성': [
          '낙상 위험 평가',
          '안전한 환경 조성',
          '이동 시 보조 및 감시'
        ]
      };
      
      if (interventionMap[diagnosis]) {
        interventions.push(...interventionMap[diagnosis]);
      }
    });
    
    return interventions;
  }
  
  private generateRationale(diagnoses: string[]): string[] {
    const rationales: string[] = [];
    
    diagnoses.forEach(diagnosis => {
      const rationaleMap: { [key: string]: string } = {
        '급성 통증': '적절한 통증 관리는 환자의 편안함을 증진시키고 치료 협조도를 높인다',
        '감염 위험성': '감염 예방은 환자의 회복을 촉진하고 합병증을 예방한다',
        '피로': '에너지 관리는 환자의 기능적 능력을 향상시키고 삶의 질을 개선한다',
        '영양 부족': '적절한 영양 공급은 조직 치유와 면역 기능을 지원한다',
        '낙상 위험성': '낙상 예방은 환자 안전을 보장하고 추가 손상을 방지한다'
      };
      
      if (rationaleMap[diagnosis]) {
        rationales.push(rationaleMap[diagnosis]);
      }
    });
    
    return rationales;
  }
  
  private generateEvaluationCriteria(diagnoses: string[]): string[] {
    const criteria: string[] = [];
    
    diagnoses.forEach(diagnosis => {
      const criteriaMap: { [key: string]: string } = {
        '급성 통증': '통증 점수 감소, 편안함 표현, 활동 참여도 증가',
        '감염 위험성': '정상 체온 유지, 감염 징후 없음, 백혈구 수치 정상',
        '피로': '활동 내성 증가, 피로감 감소, 수면 패턴 개선',
        '영양 부족': '체중 유지 또는 증가, 식욕 개선, 영양 지표 정상',
        '낙상 위험성': '낙상 사고 없음, 안전한 이동, 환경 인식 향상'
      };
      
      if (criteriaMap[diagnosis]) {
        criteria.push(criteriaMap[diagnosis]);
      }
    });
    
    return criteria;
  }
  
  private generateTimeframe(diagnoses: string[]): any {
    const timeframes: { [key: string]: string } = {
      '급성 통증': '단기 목표: 24시간 이내, 장기 목표: 1주일 이내',
      '감염 위험성': '지속적 모니터링, 치료 기간 전반',
      '피로': '단기 목표: 3일 이내, 장기 목표: 2주 이내',
      '영양 부족': '단기 목표: 1주일 이내, 장기 목표: 1개월 이내',
      '낙상 위험성': '즉시 시작, 지속적 유지'
    };
    
    return diagnoses.map(diagnosis => ({
      diagnosis,
      timeframe: timeframes[diagnosis] || '개별 평가 필요'
    }));
  }
  
  private rankPriorities(diagnoses: string[]): any[] {
    const priorityOrder = ['high', 'medium', 'low'];
    
    return diagnoses
      .map(diagnosis => ({
        diagnosis,
        priority: this.getNursingDiagnosisInfo(diagnosis).priority_level
      }))
      .sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
  }
  
  private formatCarePlan(carePlan: any): string {
    return `
# 📋 간호계획서

## 📊 간호진단 분석
${carePlan.diagnosis_analysis.map((d: any, i: number) => `
### ${i + 1}. ${d.diagnosis}
- **범주**: ${d.category}
- **정의**: ${d.definition}
- **위험요인**: ${d.risk_factors.join(', ')}
- **관련요인**: ${d.related_factors.join(', ')}
- **우선순위**: ${d.priority_level}
`).join('\n')}

## 🎯 환자 목표
${carePlan.goals.map((g: string, i: number) => `${i + 1}. ${g}`).join('\n')}

## 🏥 간호중재
${carePlan.interventions.map((i: string, idx: number) => `${idx + 1}. ${i}`).join('\n')}

## 📝 근거/이론적 배경
${carePlan.rationale.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n')}

## 📏 평가 기준
${carePlan.evaluation_criteria.map((c: string, i: number) => `${i + 1}. ${c}`).join('\n')}

## ⏰ 시간계획
${carePlan.timeframe.map((t: any) => `- **${t.diagnosis}**: ${t.timeframe}`).join('\n')}

## 🎯 우선순위 순서
${carePlan.priority_ranking.map((p: any, i: number) => `${i + 1}. ${p.diagnosis} (${p.priority})`).join('\n')}

---
*간호계획 작성 시간: ${new Date().toLocaleString('ko-KR')}*
*다음 평가 예정: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString('ko-KR')}*
`;
  }
}