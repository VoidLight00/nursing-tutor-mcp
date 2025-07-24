// NANDA 간호진단 데이터베이스
export interface NursingDiagnosis {
  id: string;
  code: string;
  label: string;
  labelKorean: string;
  domain: string;
  domainKorean: string;
  class: string;
  classKorean: string;
  definition: string;
  definingCharacteristics: string[];
  relatedFactors: string[];
  riskFactors?: string[];
  associatedConditions?: string[];
  nursingInterventions: {
    priority: string[];
    suggested: string[];
  };
  expectedOutcomes: string[];
  evaluationCriteria: string[];
}

export class NursingDiagnosesDatabase {
  private diagnoses: Map<string, NursingDiagnosis>;

  constructor() {
    this.diagnoses = new Map();
    this.initializeDiagnoses();
  }

  private initializeDiagnoses(): void {
    // Domain 2: Nutrition
    this.diagnoses.set('00002', {
      id: '00002',
      code: '00002',
      label: 'Imbalanced Nutrition: Less Than Body Requirements',
      labelKorean: '영양불균형: 신체요구량보다 적음',
      domain: 'Nutrition',
      domainKorean: '영양',
      class: 'Ingestion',
      classKorean: '섭취',
      definition: '신체의 대사요구를 충족시키기에 불충분한 영양소 섭취',
      definingCharacteristics: [
        '체중이 이상체중의 20% 이상 감소',
        '음식 섭취량 부족',
        '복통',
        '근육량 감소',
        '피로감',
        '창백한 점막',
        '탈모'
      ],
      relatedFactors: [
        '음식 섭취 불능',
        '식욕부진',
        '오심/구토',
        '연하곤란',
        '흡수장애',
        '대사요구 증가'
      ],
      nursingInterventions: {
        priority: [
          '영양상태 사정 (체중, BMI, 알부민 수치)',
          '칼로리 및 단백질 섭취량 모니터링',
          '소량씩 자주 식사 제공',
          '고칼로리, 고단백 식이 제공',
          '식사 시 편안한 환경 조성'
        ],
        suggested: [
          '영양사 협진',
          '경관영양 또는 정맥영양 고려',
          '식욕증진제 투여',
          '구강간호 제공',
          '가족 참여 격려'
        ]
      },
      expectedOutcomes: [
        '목표 체중 유지 또는 증가',
        '적절한 칼로리 섭취',
        '알부민 수치 정상화',
        '근력 증가',
        '피로감 감소'
      ],
      evaluationCriteria: [
        '체중 변화 추이',
        '식사 섭취량',
        '영양 관련 검사 수치',
        '활동 수준',
        '피부 및 점막 상태'
      ]
    });

    // Domain 3: Elimination and Exchange
    this.diagnoses.set('00011', {
      id: '00011',
      code: '00011',
      label: 'Constipation',
      labelKorean: '변비',
      domain: 'Elimination and Exchange',
      domainKorean: '배설과 교환',
      class: 'Gastrointestinal Function',
      classKorean: '위장관 기능',
      definition: '배변 횟수 감소와 함께 단단하고 건조한 대변의 배출곤란',
      definingCharacteristics: [
        '주 3회 미만의 배변',
        '단단한 대변',
        '배변 시 긴장',
        '불완전한 배변감',
        '복부 팽만',
        '복통'
      ],
      relatedFactors: [
        '불충분한 수분 섭취',
        '불충분한 섬유질 섭취',
        '활동 부족',
        '약물 부작용 (마약성 진통제, 항콜린제)',
        '배변 억제',
        '환경 변화'
      ],
      nursingInterventions: {
        priority: [
          '배변 양상 사정 (횟수, 양, 굳기)',
          '수분 섭취량 증가 (2-3L/일)',
          '섬유질이 풍부한 식이 제공',
          '규칙적인 배변 습관 형성',
          '활동량 증가 격려'
        ],
        suggested: [
          '복부 마사지',
          '온열요법',
          '완하제 투여 (의사 처방)',
          '프라이버시 보장',
          '좌욕'
        ]
      },
      expectedOutcomes: [
        '규칙적인 배변 (주 3회 이상)',
        '부드러운 대변',
        '배변 시 불편감 없음',
        '복부 팽만 감소'
      ],
      evaluationCriteria: [
        '배변 횟수 및 양상',
        '복부 사정 결과',
        '환자의 주관적 편안감',
        '수분 및 섬유질 섭취량'
      ]
    });

    // Domain 4: Activity/Rest
    this.diagnoses.set('00093', {
      id: '00093',
      code: '00093',
      label: 'Fatigue',
      labelKorean: '피로',
      domain: 'Activity/Rest',
      domainKorean: '활동/휴식',
      class: 'Energy Balance',
      classKorean: '에너지 균형',
      definition: '휴식이나 수면으로 완화되지 않는 압도적이고 지속적인 탈진감과 신체적, 정신적 작업 능력의 감소',
      definingCharacteristics: [
        '지속적인 피로감 호소',
        '활동 수준 감소',
        '집중력 저하',
        '무기력',
        '일상활동 수행 곤란',
        '휴식 후에도 회복되지 않음'
      ],
      relatedFactors: [
        '빈혈',
        '영양부족',
        '수면장애',
        '통증',
        '우울',
        '화학요법',
        '만성질환'
      ],
      nursingInterventions: {
        priority: [
          '피로 수준 사정 (0-10 척도)',
          '활동과 휴식의 균형 유지',
          '에너지 보존 기법 교육',
          '우선순위에 따른 활동 계획',
          '충분한 수면 보장'
        ],
        suggested: [
          '점진적 운동 프로그램',
          '영양 상태 개선',
          '스트레스 관리',
          '이완요법',
          '가족 지지체계 활용'
        ]
      },
      expectedOutcomes: [
        '피로 수준 감소',
        '일상활동 수행 능력 향상',
        '수면의 질 개선',
        '에너지 수준 증가'
      ],
      evaluationCriteria: [
        '피로 척도 점수',
        '활동 수행 정도',
        '수면 양상',
        '주관적 피로감 표현'
      ]
    });

    // Domain 11: Safety/Protection
    this.diagnoses.set('00004', {
      id: '00004',
      code: '00004',
      label: 'Risk for Infection',
      labelKorean: '감염 위험성',
      domain: 'Safety/Protection',
      domainKorean: '안전/보호',
      class: 'Infection',
      classKorean: '감염',
      definition: '조직 손상을 일으킬 수 있는 병원체 침입의 위험 증가',
      definingCharacteristics: [],
      relatedFactors: [],
      riskFactors: [
        '면역억제 (호중구 <1000)',
        '침습적 시술',
        '피부 통합성 장애',
        '영양부족',
        '만성질환',
        '항암치료',
        '부적절한 1차 방어기전'
      ],
      nursingInterventions: {
        priority: [
          '감염 징후 모니터링 (발열, WBC)',
          '철저한 손위생',
          '보호격리 시행',
          '무균술 준수',
          '호중구 수치 매일 확인'
        ],
        suggested: [
          '방문객 제한',
          '생화/생과일 제한',
          '구강간호 강화',
          '예방적 항생제 투여',
          '환경 청결 유지'
        ]
      },
      expectedOutcomes: [
        '감염 징후 없음',
        '정상 체온 유지',
        'WBC 정상 범위',
        '배양검사 음성'
      ],
      evaluationCriteria: [
        '활력징후',
        '혈액검사 결과',
        '감염 징후 유무',
        '상처 상태'
      ]
    });

    // Domain 12: Comfort
    this.diagnoses.set('00132', {
      id: '00132',
      code: '00132',
      label: 'Acute Pain',
      labelKorean: '급성 통증',
      domain: 'Comfort',
      domainKorean: '안위',
      class: 'Physical Comfort',
      classKorean: '신체적 안위',
      definition: '실제적이거나 잠재적인 조직 손상과 관련된 불쾌한 감각적, 정서적 경험',
      definingCharacteristics: [
        '통증 호소',
        '통증 척도 점수 상승',
        '얼굴 찡그림',
        '보호적 자세',
        '활력징후 변화',
        '수면장애',
        '식욕부진'
      ],
      relatedFactors: [
        '조직 손상',
        '수술',
        '염증',
        '허혈',
        '신경 압박',
        '화학적 자극'
      ],
      nursingInterventions: {
        priority: [
          '통증 사정 (위치, 강도, 양상, 기간)',
          '통증 척도 사용 (0-10)',
          '진통제 투여 및 효과 평가',
          '편안한 체위 유지',
          '통증 유발 요인 제거'
        ],
        suggested: [
          '비약물적 통증 완화법 (냉/온요법, 마사지)',
          '이완요법',
          '주의전환',
          'PCA 교육',
          '통증일지 작성'
        ]
      },
      expectedOutcomes: [
        '통증 점수 3점 이하',
        '일상활동 수행 가능',
        '수면 양상 개선',
        '진통제 요구 감소'
      ],
      evaluationCriteria: [
        '통증 척도 점수 변화',
        '진통제 사용량',
        '활동 수준',
        '환자 만족도'
      ]
    });

    // Domain 9: Coping/Stress Tolerance
    this.diagnoses.set('00146', {
      id: '00146',
      code: '00146',
      label: 'Anxiety',
      labelKorean: '불안',
      domain: 'Coping/Stress Tolerance',
      domainKorean: '대응/스트레스 내성',
      class: 'Coping Responses',
      classKorean: '대응 반응',
      definition: '불확실한 위협에 대한 막연한 불편감이나 두려움과 자율신경계 반응',
      definingCharacteristics: [
        '불안감 표현',
        '초조',
        '집중력 저하',
        '수면장애',
        '심계항진',
        '발한',
        '떨림',
        '호흡곤란'
      ],
      relatedFactors: [
        '건강상태 변화',
        '죽음 위협',
        '상황적 위기',
        '스트레스',
        '미지의 것에 대한 두려움',
        '통제력 상실'
      ],
      nursingInterventions: {
        priority: [
          '불안 수준 사정',
          '치료적 의사소통',
          '경청과 공감',
          '정확한 정보 제공',
          '안전한 환경 조성'
        ],
        suggested: [
          '이완요법 교육',
          '심호흡 운동',
          '점진적 근육이완법',
          '가족 지지 격려',
          '항불안제 투여'
        ]
      },
      expectedOutcomes: [
        '불안 수준 감소',
        '대처 기전 사용',
        '수면 개선',
        '자율신경계 증상 감소'
      ],
      evaluationCriteria: [
        '불안 척도 점수',
        '활력징후',
        '수면 양상',
        '대처 행동'
      ]
    });

    // Domain 4: Activity/Rest - Risk for Falls
    this.diagnoses.set('00155', {
      id: '00155',
      code: '00155',
      label: 'Risk for Falls',
      labelKorean: '낙상 위험성',
      domain: 'Safety/Protection',
      domainKorean: '안전/보호',
      class: 'Physical Injury',
      classKorean: '신체 손상',
      definition: '신체적 손상을 일으킬 수 있는 낙상의 위험 증가',
      definingCharacteristics: [],
      relatedFactors: [],
      riskFactors: [
        '65세 이상',
        '낙상 과거력',
        '보행 장애',
        '균형감각 저하',
        '근력 약화',
        '의식 수준 변화',
        '시력 장애',
        '기립성 저혈압',
        '다약제 복용',
        '환경적 위험요인'
      ],
      nursingInterventions: {
        priority: [
          '낙상 위험 사정도구 사용',
          '고위험 환자 식별 (팔찌, 표식)',
          '침상 난간 올리기',
          '호출벨 가까이 배치',
          '미끄럼 방지 신발 착용'
        ],
        suggested: [
          '야간 조명 제공',
          '화장실 다녀올 때 도움',
          '규칙적인 라운딩',
          '약물 부작용 모니터링',
          '물리치료 의뢰'
        ]
      },
      expectedOutcomes: [
        '낙상 발생 없음',
        '안전 수칙 준수',
        '보조기구 적절히 사용',
        '환경적 위험요인 제거'
      ],
      evaluationCriteria: [
        '낙상 발생 여부',
        '낙상 위험도 점수',
        '안전 행동 이행',
        '보행 능력'
      ]
    });

    // Domain 2: Nutrition - Fluid Volume Deficit
    this.diagnoses.set('00027', {
      id: '00027',
      code: '00027',
      label: 'Deficient Fluid Volume',
      labelKorean: '체액부족',
      domain: 'Nutrition',
      domainKorean: '영양',
      class: 'Hydration',
      classKorean: '수분',
      definition: '혈관내, 세포간질, 세포내 체액의 감소',
      definingCharacteristics: [
        '피부 탄력성 감소',
        '구강 점막 건조',
        '소변량 감소',
        '비중 증가',
        '빈맥',
        '저혈압',
        '체중 감소',
        '허약감'
      ],
      relatedFactors: [
        '구토/설사',
        '출혈',
        '과도한 발한',
        '불충분한 수분 섭취',
        '이뇨제 사용',
        '발열'
      ],
      nursingInterventions: {
        priority: [
          'I&O 정확히 측정',
          '체중 매일 측정',
          '활력징후 모니터링',
          '피부 탄력성 사정',
          'IV 수액 투여'
        ],
        suggested: [
          '구강 수분 섭취 격려',
          '전해질 수치 모니터링',
          '기립성 저혈압 확인',
          '소변 비중 측정',
          '구강간호'
        ]
      },
      expectedOutcomes: [
        '정상 체액 균형',
        '활력징후 안정',
        '적절한 소변량 (0.5-1ml/kg/hr)',
        '정상 피부 탄력성'
      ],
      evaluationCriteria: [
        'I&O 균형',
        '체중 변화',
        '활력징후',
        '검사 결과 (전해질, Hct)'
      ]
    });

    // Domain 3: Elimination - Diarrhea
    this.diagnoses.set('00013', {
      id: '00013',
      code: '00013',
      label: 'Diarrhea',
      labelKorean: '설사',
      domain: 'Elimination and Exchange',
      domainKorean: '배설과 교환',
      class: 'Gastrointestinal Function',
      classKorean: '위장관 기능',
      definition: '묽은 변을 자주 배출하는 상태',
      definingCharacteristics: [
        '하루 3회 이상의 묽은 변',
        '복부 경련',
        '긴박감',
        '복통',
        '장음 항진'
      ],
      relatedFactors: [
        '감염',
        '약물 부작용',
        '경관영양',
        '스트레스/불안',
        '염증성 장질환',
        '흡수장애'
      ],
      nursingInterventions: {
        priority: [
          '배변 양상 기록 (횟수, 양, 성상)',
          '수분 및 전해질 보충',
          'BRAT 식이 제공',
          '항문 주위 피부 간호',
          '원인 약물 확인'
        ],
        suggested: [
          '대변 배양검사',
          '프로바이오틱스 투여',
          '지사제 투여',
          '저잔사 식이',
          '스트레스 관리'
        ]
      },
      expectedOutcomes: [
        '정상 배변 양상 회복',
        '체액 균형 유지',
        '복부 불편감 감소',
        '피부 통합성 유지'
      ],
      evaluationCriteria: [
        '배변 횟수 및 양상',
        '수분 상태',
        '전해질 수치',
        '체중 변화'
      ]
    });

    // Domain 4: Activity/Rest - Impaired Physical Mobility
    this.diagnoses.set('00085', {
      id: '00085',
      code: '00085',
      label: 'Impaired Physical Mobility',
      labelKorean: '신체 기동성 장애',
      domain: 'Activity/Rest',
      domainKorean: '활동/휴식',
      class: 'Activity/Exercise',
      classKorean: '활동/운동',
      definition: '독립적이고 목적 있는 신체 움직임의 제한',
      definingCharacteristics: [
        '움직임 범위 제한',
        '보행 곤란',
        '체위 변경 곤란',
        '미세 운동 조절 감소',
        '움직임 속도 감소'
      ],
      relatedFactors: [
        '근골격계 손상',
        '신경근육 손상',
        '통증',
        '인지 장애',
        '약물 부작용',
        '활동 제한 처방'
      ],
      nursingInterventions: {
        priority: [
          '기동성 수준 사정',
          'ROM 운동 시행',
          '2시간마다 체위변경',
          '조기 이상 격려',
          '보조기구 사용 교육'
        ],
        suggested: [
          '물리치료 의뢰',
          '근력 강화 운동',
          '낙상 예방 조치',
          '피부 통합성 유지',
          '심부정맥혈전증 예방'
        ]
      },
      expectedOutcomes: [
        '기동성 수준 향상',
        '독립적 활동 증가',
        '합병증 없음',
        '근력 유지'
      ],
      evaluationCriteria: [
        '활동 수준',
        'ROM 범위',
        '보조기구 사용 능력',
        '합병증 유무'
      ]
    });
  }

  getDiagnosis(code: string): NursingDiagnosis | undefined {
    return this.diagnoses.get(code);
  }

  searchDiagnoses(query: string): NursingDiagnosis[] {
    const results: NursingDiagnosis[] = [];
    const searchTerm = query.toLowerCase();

    this.diagnoses.forEach(diagnosis => {
      if (
        diagnosis.label.toLowerCase().includes(searchTerm) ||
        diagnosis.labelKorean.includes(searchTerm) ||
        diagnosis.domain.toLowerCase().includes(searchTerm) ||
        diagnosis.domainKorean.includes(searchTerm) ||
        diagnosis.definition.toLowerCase().includes(searchTerm)
      ) {
        results.push(diagnosis);
      }
    });

    return results;
  }

  getDiagnosesByDomain(domain: string): NursingDiagnosis[] {
    const results: NursingDiagnosis[] = [];
    
    this.diagnoses.forEach(diagnosis => {
      if (diagnosis.domain.toLowerCase() === domain.toLowerCase() ||
          diagnosis.domainKorean === domain) {
        results.push(diagnosis);
      }
    });

    return results;
  }

  suggestDiagnoses(symptoms: string[]): NursingDiagnosis[] {
    const suggestions: Map<string, number> = new Map();

    this.diagnoses.forEach(diagnosis => {
      let score = 0;

      symptoms.forEach(symptom => {
        const symptomLower = symptom.toLowerCase();
        
        // Check defining characteristics
        diagnosis.definingCharacteristics.forEach(char => {
          if (char.toLowerCase().includes(symptomLower)) {
            score += 2;
          }
        });

        // Check related factors
        diagnosis.relatedFactors.forEach(factor => {
          if (factor.toLowerCase().includes(symptomLower)) {
            score += 1;
          }
        });

        // Check risk factors if present
        diagnosis.riskFactors?.forEach(risk => {
          if (risk.toLowerCase().includes(symptomLower)) {
            score += 1;
          }
        });
      });

      if (score > 0) {
        suggestions.set(diagnosis.code, score);
      }
    });

    // Sort by score and return top suggestions
    return Array.from(suggestions.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([code]) => this.diagnoses.get(code)!)
      .filter(d => d !== undefined);
  }

  getAllDiagnoses(): NursingDiagnosis[] {
    return Array.from(this.diagnoses.values());
  }
}