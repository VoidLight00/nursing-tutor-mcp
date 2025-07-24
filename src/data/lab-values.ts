// 실제 임상에서 사용되는 검사 수치 데이터베이스
export interface LabValue {
  id: string;
  name: string;
  nameKorean: string;
  category: string;
  normalRange: {
    adult: {
      male?: string;
      female?: string;
      general?: string;
    };
    pediatric?: string;
    geriatric?: string;
  };
  unit: string;
  criticalValues: {
    low?: string;
    high?: string;
  };
  clinicalSignificance: {
    increased: string[];
    decreased: string[];
  };
  nursingConsiderations: string[];
  specimen: string;
  fastingRequired: boolean;
}

export class LabValuesDatabase {
  private labValues: Map<string, LabValue>;

  constructor() {
    this.labValues = new Map();
    this.initializeLabValues();
  }

  private initializeLabValues(): void {
    // 일반혈액검사 (CBC)
    this.labValues.set('hemoglobin', {
      id: 'hemoglobin',
      name: 'Hemoglobin',
      nameKorean: '헤모글로빈',
      category: 'CBC',
      normalRange: {
        adult: {
          male: '13.5-17.5 g/dL',
          female: '12.0-16.0 g/dL'
        },
        pediatric: '11.0-16.0 g/dL',
        geriatric: '12.0-17.0 g/dL'
      },
      unit: 'g/dL',
      criticalValues: {
        low: '<7.0 g/dL',
        high: '>20.0 g/dL'
      },
      clinicalSignificance: {
        increased: ['탈수', '다혈구증', '만성폐쇄성폐질환', '고지대 거주'],
        decreased: ['빈혈', '출혈', '혈액희석', '영양결핍', '만성질환']
      },
      nursingConsiderations: [
        '빈혈 증상 관찰 (피로, 창백, 호흡곤란)',
        '출혈 징후 확인',
        '수혈 필요성 평가',
        '영양상태 사정'
      ],
      specimen: '전혈 (EDTA)',
      fastingRequired: false
    });

    this.labValues.set('wbc', {
      id: 'wbc',
      name: 'White Blood Cell Count',
      nameKorean: '백혈구 수',
      category: 'CBC',
      normalRange: {
        adult: {
          general: '4,500-11,000 cells/μL'
        },
        pediatric: '5,000-15,000 cells/μL',
        geriatric: '4,000-10,000 cells/μL'
      },
      unit: 'cells/μL',
      criticalValues: {
        low: '<2,000 cells/μL',
        high: '>30,000 cells/μL'
      },
      clinicalSignificance: {
        increased: ['감염', '백혈병', '스트레스', '흡연', '알레르기', '조직괴사'],
        decreased: ['골수억제', '화학요법', '방사선치료', '비장기능항진', '자가면역질환']
      },
      nursingConsiderations: [
        '감염 징후 모니터링',
        '호중구감소증 시 역격리 고려',
        '발열 시 즉시 보고',
        '감염 예방 교육'
      ],
      specimen: '전혈 (EDTA)',
      fastingRequired: false
    });

    this.labValues.set('platelet', {
      id: 'platelet',
      name: 'Platelet Count',
      nameKorean: '혈소판 수',
      category: 'CBC',
      normalRange: {
        adult: {
          general: '150,000-400,000/μL'
        }
      },
      unit: '/μL',
      criticalValues: {
        low: '<50,000/μL',
        high: '>1,000,000/μL'
      },
      clinicalSignificance: {
        increased: ['골수증식질환', '출혈', '철결핍', '염증', '악성종양'],
        decreased: ['골수억제', 'ITP', 'DIC', '간경변', '화학요법']
      },
      nursingConsiderations: [
        '출혈 경향 관찰 (점상출혈, 자반)',
        '혈소판 <50,000 시 출혈 주의',
        '침습적 시술 전 확인',
        '혈전 위험 평가'
      ],
      specimen: '전혈 (EDTA)',
      fastingRequired: false
    });

    // 전해질
    this.labValues.set('sodium', {
      id: 'sodium',
      name: 'Sodium',
      nameKorean: '나트륨',
      category: 'Electrolytes',
      normalRange: {
        adult: {
          general: '136-145 mEq/L'
        }
      },
      unit: 'mEq/L',
      criticalValues: {
        low: '<120 mEq/L',
        high: '>160 mEq/L'
      },
      clinicalSignificance: {
        increased: ['탈수', '요붕증', '고알도스테론증', '과도한 나트륨 섭취'],
        decreased: ['SIADH', '심부전', '간경변', '신부전', '구토/설사']
      },
      nursingConsiderations: [
        '신경학적 증상 관찰',
        '의식수준 변화 모니터링',
        '수분섭취량 및 배설량 측정',
        '급격한 교정 피하기 (central pontine myelinolysis 위험)'
      ],
      specimen: '혈청',
      fastingRequired: false
    });

    this.labValues.set('potassium', {
      id: 'potassium',
      name: 'Potassium',
      nameKorean: '칼륨',
      category: 'Electrolytes',
      normalRange: {
        adult: {
          general: '3.5-5.0 mEq/L'
        }
      },
      unit: 'mEq/L',
      criticalValues: {
        low: '<2.5 mEq/L',
        high: '>6.5 mEq/L'
      },
      clinicalSignificance: {
        increased: ['신부전', '칼륨보전이뇨제', '대사성산증', '조직손상', 'ACE억제제'],
        decreased: ['이뇨제', '구토/설사', '인슐린치료', '영양결핍']
      },
      nursingConsiderations: [
        'EKG 변화 모니터링',
        '근력 평가',
        '심장리듬 관찰',
        '고칼륨혈증 시 calcium gluconate 준비',
        'IV 칼륨 투여 시 희석농도 및 속도 준수'
      ],
      specimen: '혈청',
      fastingRequired: false
    });

    // 신기능 검사
    this.labValues.set('creatinine', {
      id: 'creatinine',
      name: 'Creatinine',
      nameKorean: '크레아티닌',
      category: 'Renal Function',
      normalRange: {
        adult: {
          male: '0.7-1.3 mg/dL',
          female: '0.6-1.1 mg/dL'
        },
        geriatric: '0.7-1.4 mg/dL'
      },
      unit: 'mg/dL',
      criticalValues: {
        high: '>7.0 mg/dL'
      },
      clinicalSignificance: {
        increased: ['급성/만성 신부전', '탈수', '요로폐색', '근육손상'],
        decreased: ['근육량 감소', '임신', '간질환']
      },
      nursingConsiderations: [
        '신기능 모니터링',
        '약물 용량 조절 필요성 평가',
        '수분 상태 평가',
        '투석 필요성 고려'
      ],
      specimen: '혈청',
      fastingRequired: false
    });

    this.labValues.set('bun', {
      id: 'bun',
      name: 'Blood Urea Nitrogen',
      nameKorean: '혈중요소질소',
      category: 'Renal Function',
      normalRange: {
        adult: {
          general: '8-20 mg/dL'
        }
      },
      unit: 'mg/dL',
      criticalValues: {
        high: '>100 mg/dL'
      },
      clinicalSignificance: {
        increased: ['신부전', '탈수', '고단백식이', '위장관출혈', '심부전'],
        decreased: ['간질환', '영양결핍', '과수화']
      },
      nursingConsiderations: [
        'BUN/Cr 비율 평가',
        '수분상태 평가',
        '단백질 섭취량 확인',
        '요독증 증상 관찰'
      ],
      specimen: '혈청',
      fastingRequired: false
    });

    // 간기능 검사
    this.labValues.set('alt', {
      id: 'alt',
      name: 'Alanine Aminotransferase',
      nameKorean: 'ALT',
      category: 'Liver Function',
      normalRange: {
        adult: {
          male: '10-40 U/L',
          female: '10-35 U/L'
        }
      },
      unit: 'U/L',
      criticalValues: {
        high: '>1000 U/L'
      },
      clinicalSignificance: {
        increased: ['급성간염', '간경변', '간독성약물', '지방간', '알코올성간질환'],
        decreased: ['임상적 의미 없음']
      },
      nursingConsiderations: [
        '간독성 약물 확인',
        '알코올 섭취력 확인',
        '황달 징후 관찰',
        '복부 통증 평가'
      ],
      specimen: '혈청',
      fastingRequired: false
    });

    // 심장 표지자
    this.labValues.set('troponin', {
      id: 'troponin',
      name: 'Troponin I/T',
      nameKorean: '트로포닌',
      category: 'Cardiac Markers',
      normalRange: {
        adult: {
          general: '<0.04 ng/mL'
        }
      },
      unit: 'ng/mL',
      criticalValues: {
        high: '>0.04 ng/mL'
      },
      clinicalSignificance: {
        increased: ['급성심근경색', '불안정협심증', '심근염', '폐색전증', '신부전'],
        decreased: ['임상적 의미 없음']
      },
      nursingConsiderations: [
        '흉통 평가',
        'EKG 모니터링',
        '연속적 troponin 측정',
        '심장약물 투여 준비'
      ],
      specimen: '혈청',
      fastingRequired: false
    });

    // 응고 검사
    this.labValues.set('pt', {
      id: 'pt',
      name: 'Prothrombin Time',
      nameKorean: '프로트롬빈시간',
      category: 'Coagulation',
      normalRange: {
        adult: {
          general: '11-13 seconds'
        }
      },
      unit: 'seconds',
      criticalValues: {
        high: '>30 seconds'
      },
      clinicalSignificance: {
        increased: ['와파린 치료', '간질환', '비타민K 결핍', 'DIC', '응고인자 결핍'],
        decreased: ['임상적 의미 없음']
      },
      nursingConsiderations: [
        'INR 함께 확인',
        '출혈 징후 관찰',
        '와파린 용량 조절',
        '비타민K 준비'
      ],
      specimen: '혈장 (Citrate)',
      fastingRequired: false
    });

    this.labValues.set('inr', {
      id: 'inr',
      name: 'International Normalized Ratio',
      nameKorean: 'INR',
      category: 'Coagulation',
      normalRange: {
        adult: {
          general: '0.8-1.2 (치료목표: 2.0-3.0)'
        }
      },
      unit: 'ratio',
      criticalValues: {
        high: '>5.0'
      },
      clinicalSignificance: {
        increased: ['와파린 과다', '간질환', '비타민K 결핍'],
        decreased: ['와파린 부족', '비타민K 섭취']
      },
      nursingConsiderations: [
        '와파린 치료 모니터링',
        '목표 INR 범위 확인',
        '출혈 위험 평가',
        '식이 교육 (비타민K 함유 음식)'
      ],
      specimen: '혈장 (Citrate)',
      fastingRequired: false
    });

    // 당뇨 관련
    this.labValues.set('glucose', {
      id: 'glucose',
      name: 'Blood Glucose',
      nameKorean: '혈당',
      category: 'Metabolic',
      normalRange: {
        adult: {
          general: '70-110 mg/dL (공복), <140 mg/dL (식후 2시간)'
        }
      },
      unit: 'mg/dL',
      criticalValues: {
        low: '<50 mg/dL',
        high: '>500 mg/dL'
      },
      clinicalSignificance: {
        increased: ['당뇨병', '스트레스', '스테로이드', '급성질환', '췌장염'],
        decreased: ['인슐린 과다', '간질환', '부신기능부전', '알코올']
      },
      nursingConsiderations: [
        '저혈당 증상 관찰',
        '의식수준 확인',
        '식사시간과 관련성 확인',
        '인슐린 투여 시간 조정'
      ],
      specimen: '혈장',
      fastingRequired: true
    });

    this.labValues.set('hba1c', {
      id: 'hba1c',
      name: 'Hemoglobin A1c',
      nameKorean: '당화혈색소',
      category: 'Metabolic',
      normalRange: {
        adult: {
          general: '<5.7% (정상), 5.7-6.4% (당뇨전단계), ≥6.5% (당뇨)'
        }
      },
      unit: '%',
      criticalValues: {
        high: '>14%'
      },
      clinicalSignificance: {
        increased: ['조절되지 않는 당뇨', '만성 고혈당'],
        decreased: ['빈혈', '용혈', '최근 수혈']
      },
      nursingConsiderations: [
        '3개월간 평균 혈당 반영',
        '당뇨 관리 상태 평가',
        '치료 계획 조정',
        '환자 교육 강화'
      ],
      specimen: '전혈 (EDTA)',
      fastingRequired: false
    });

    // 갑상선 기능
    this.labValues.set('tsh', {
      id: 'tsh',
      name: 'Thyroid Stimulating Hormone',
      nameKorean: '갑상선자극호르몬',
      category: 'Endocrine',
      normalRange: {
        adult: {
          general: '0.4-4.5 mIU/L'
        }
      },
      unit: 'mIU/L',
      criticalValues: {
        low: '<0.1 mIU/L',
        high: '>10 mIU/L'
      },
      clinicalSignificance: {
        increased: ['갑상선기능저하증', '하시모토갑상선염'],
        decreased: ['갑상선기능항진증', '그레이브스병']
      },
      nursingConsiderations: [
        '갑상선 증상 평가',
        '약물 복용 확인',
        '심박수, 체중 변화 모니터링',
        'Free T4와 함께 해석'
      ],
      specimen: '혈청',
      fastingRequired: false
    });

    // 감염 지표
    this.labValues.set('crp', {
      id: 'crp',
      name: 'C-Reactive Protein',
      nameKorean: 'C-반응단백',
      category: 'Inflammatory Markers',
      normalRange: {
        adult: {
          general: '<3.0 mg/L'
        }
      },
      unit: 'mg/L',
      criticalValues: {
        high: '>100 mg/L'
      },
      clinicalSignificance: {
        increased: ['급성감염', '염증성질환', '조직손상', '악성종양', '심근경색'],
        decreased: ['임상적 의미 없음']
      },
      nursingConsiderations: [
        '감염 징후 관찰',
        '항생제 반응 모니터링',
        'ESR과 함께 평가',
        '치료 효과 판정'
      ],
      specimen: '혈청',
      fastingRequired: false
    });

    // 종양 표지자
    this.labValues.set('cea', {
      id: 'cea',
      name: 'Carcinoembryonic Antigen',
      nameKorean: '암배아항원',
      category: 'Tumor Markers',
      normalRange: {
        adult: {
          general: '<3.0 ng/mL (비흡연자), <5.0 ng/mL (흡연자)'
        }
      },
      unit: 'ng/mL',
      criticalValues: {
        high: '>20 ng/mL'
      },
      clinicalSignificance: {
        increased: ['대장암', '폐암', '유방암', '췌장암', '간경변', '흡연'],
        decreased: ['치료 반응 양호']
      },
      nursingConsiderations: [
        '암 진단보다는 치료 모니터링 용도',
        '흡연력 확인',
        '다른 종양표지자와 함께 평가',
        '정기적 추적검사'
      ],
      specimen: '혈청',
      fastingRequired: false
    });
  }

  getLabValue(id: string): LabValue | undefined {
    return this.labValues.get(id);
  }

  searchLabValues(query: string): LabValue[] {
    const results: LabValue[] = [];
    const searchTerm = query.toLowerCase();

    this.labValues.forEach(lab => {
      if (
        lab.name.toLowerCase().includes(searchTerm) ||
        lab.nameKorean.includes(searchTerm) ||
        lab.category.toLowerCase().includes(searchTerm)
      ) {
        results.push(lab);
      }
    });

    return results;
  }

  getLabValuesByCategory(category: string): LabValue[] {
    const results: LabValue[] = [];
    
    this.labValues.forEach(lab => {
      if (lab.category.toLowerCase() === category.toLowerCase()) {
        results.push(lab);
      }
    });

    return results;
  }

  interpretValue(labId: string, value: number, gender?: 'male' | 'female'): string {
    const lab = this.labValues.get(labId);
    if (!lab) return '검사 정보를 찾을 수 없습니다.';

    // Parse normal range
    const range = lab.normalRange.adult.general || 
                  (gender && lab.normalRange.adult[gender]) || 
                  '';
    
    const rangeMatch = range.match(/(\d+\.?\d*)-(\d+\.?\d*)/);
    if (!rangeMatch) return '정상 범위를 확인할 수 없습니다.';

    const low = parseFloat(rangeMatch[1]);
    const high = parseFloat(rangeMatch[2]);

    if (value < low) {
      return `낮음 (정상: ${range})`;
    } else if (value > high) {
      return `높음 (정상: ${range})`;
    } else {
      return `정상 (${range})`;
    }
  }

  getCriticalAlerts(labId: string, value: number): string[] {
    const lab = this.labValues.get(labId);
    if (!lab) return [];

    const alerts: string[] = [];

    if (lab.criticalValues.low) {
      const criticalLow = parseFloat(lab.criticalValues.low.match(/(\d+\.?\d*)/)?.[1] || '0');
      if (value < criticalLow) {
        alerts.push(`⚠️ 위험: ${lab.nameKorean} 수치가 매우 낮습니다 (${value} ${lab.unit})`);
      }
    }

    if (lab.criticalValues.high) {
      const criticalHigh = parseFloat(lab.criticalValues.high.match(/(\d+\.?\d*)/)?.[1] || '0');
      if (value > criticalHigh) {
        alerts.push(`⚠️ 위험: ${lab.nameKorean} 수치가 매우 높습니다 (${value} ${lab.unit})`);
      }
    }

    return alerts;
  }
}