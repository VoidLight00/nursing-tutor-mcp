// 실제 임상 사례 예시 데이터베이스
export interface ClinicalCase {
  id: string;
  title: string;
  titleKorean: string;
  category: string;
  patient: {
    age: number;
    gender: 'male' | 'female';
    diagnosis: string;
    medicalHistory: string[];
    currentMedications: string[];
  };
  presentingSymptoms: string[];
  vitalSigns: {
    BP: string;
    HR: number;
    RR: number;
    Temp: number;
    SpO2: number;
    pain: number;
  };
  labResults: {
    [key: string]: {
      value: string | number;
      unit: string;
      interpretation: string;
    };
  };
  clinicalScenario: string;
  nursingAssessment: string[];
  nursingDiagnoses: string[];
  expectedInterventions: string[];
  criticalThinking: string[];
}

export class ClinicalCasesDatabase {
  private cases: Map<string, ClinicalCase>;

  constructor() {
    this.cases = new Map();
    this.initializeCases();
  }

  private initializeCases(): void {
    // Case 1: Post-operative patient with complications
    this.cases.set('postop_pneumonia', {
      id: 'postop_pneumonia',
      title: 'Post-operative Pneumonia',
      titleKorean: '수술 후 폐렴',
      category: 'surgical',
      patient: {
        age: 68,
        gender: 'male',
        diagnosis: '대장암 수술 후 3일째, 폐렴 의심',
        medicalHistory: ['고혈압', '당뇨병', '40갑년 흡연력'],
        currentMedications: ['Enalapril 5mg PO qd', 'Metformin 500mg PO bid', 'Morphine PCA']
      },
      presentingSymptoms: [
        '발열',
        '기침',
        '화농성 객담',
        '호흡곤란',
        '수술부위 통증'
      ],
      vitalSigns: {
        BP: '145/90',
        HR: 102,
        RR: 28,
        Temp: 38.5,
        SpO2: 88,
        pain: 6
      },
      labResults: {
        WBC: {
          value: 15200,
          unit: 'cells/μL',
          interpretation: '증가 (정상: 4,500-11,000)'
        },
        Hemoglobin: {
          value: 10.2,
          unit: 'g/dL',
          interpretation: '감소 (정상: 13.5-17.5)'
        },
        CRP: {
          value: 85,
          unit: 'mg/L',
          interpretation: '증가 (정상: <3.0)'
        },
        Glucose: {
          value: 185,
          unit: 'mg/dL',
          interpretation: '증가 (정상: 70-110)'
        }
      },
      clinicalScenario: '68세 남자 환자가 대장암으로 전신마취 하 복강경 대장절제술을 받은 후 3일째입니다. 오늘 아침부터 38.5도의 발열과 함께 기침, 화농성 객담을 호소하고 있습니다. 호흡수가 증가하고 산소포화도가 떨어져 있으며, 청진 시 우하엽에서 수포음이 들립니다.',
      nursingAssessment: [
        '호흡양상: 빈호흡, 얕은 호흡',
        '객담: 황색 화농성',
        '청진: 우하엽 수포음',
        '의식상태: 명료하나 불안해함',
        '수술부위: 깨끗하고 건조함',
        '기동성: 통증으로 인해 제한적'
      ],
      nursingDiagnoses: [
        '비효율적 호흡양상',
        '감염 위험성',
        '급성 통증',
        '활동 지속성 장애'
      ],
      expectedInterventions: [
        '산소 투여 (목표 SpO2 >92%)',
        '심호흡 및 기침 격려 (incentive spirometer)',
        '체위변경 q2h',
        '조기이상 격려',
        '항생제 투여 및 효과 모니터링',
        '수분섭취 격려 (객담 배출 용이)',
        '흉부물리요법',
        '통증 관리로 심호흡 가능하게 함'
      ],
      criticalThinking: [
        '수술 후 폐렴의 위험요인은?',
        'Incentive spirometer 사용의 중요성은?',
        '조기이상이 폐렴 예방에 미치는 영향은?',
        '통증 관리와 호흡 운동의 관계는?'
      ]
    });

    // Case 2: Diabetic patient with DKA
    this.cases.set('dka', {
      id: 'dka',
      title: 'Diabetic Ketoacidosis',
      titleKorean: '당뇨병성 케톤산증',
      category: 'medical',
      patient: {
        age: 25,
        gender: 'female',
        diagnosis: '제1형 당뇨병, DKA',
        medicalHistory: ['제1형 당뇨병 (15년)'],
        currentMedications: ['Insulin glargine 20U SC qhs', 'Insulin lispro sliding scale']
      },
      presentingSymptoms: [
        '오심',
        '구토',
        '복통',
        '다뇨',
        '갈증',
        '피로감',
        'Kussmaul 호흡'
      ],
      vitalSigns: {
        BP: '98/60',
        HR: 118,
        RR: 32,
        Temp: 37.2,
        SpO2: 98,
        pain: 5
      },
      labResults: {
        Glucose: {
          value: 485,
          unit: 'mg/dL',
          interpretation: '심각한 고혈당'
        },
        pH: {
          value: 7.15,
          unit: '',
          interpretation: '산증 (정상: 7.35-7.45)'
        },
        HCO3: {
          value: 12,
          unit: 'mEq/L',
          interpretation: '감소 (정상: 22-28)'
        },
        Ketones: {
          value: '+++',
          unit: '',
          interpretation: '양성'
        },
        K: {
          value: 5.2,
          unit: 'mEq/L',
          interpretation: '증가 (정상: 3.5-5.0)'
        },
        Na: {
          value: 128,
          unit: 'mEq/L',
          interpretation: '감소 (정상: 136-145)'
        }
      },
      clinicalScenario: '25세 여자 환자가 2일 전부터 감기 증상이 있었고, 인슐린을 제대로 투여하지 않았다고 합니다. 오늘 아침부터 심한 오심, 구토, 복통을 호소하며 응급실에 내원했습니다. 의식은 명료하나 탈수 증상이 뚜렷하고, 깊고 빠른 호흡(Kussmaul)을 보이고 있습니다.',
      nursingAssessment: [
        '피부: 건조하고 탄력성 저하',
        '점막: 구강 건조',
        '호흡: Kussmaul 호흡, 과일 냄새',
        '의식: 명료하나 기면',
        '소변량: 다뇨',
        '체중: 2kg 감소 (2일간)'
      ],
      nursingDiagnoses: [
        '체액부족',
        '불안정한 혈당 수치',
        '지식부족',
        '감염 위험성'
      ],
      expectedInterventions: [
        'IV 수액 공급 (0.9% NS)',
        '인슐린 지속 정맥주입',
        '전해질 모니터링 (특히 K+)',
        '혈당 측정 q1h',
        'I&O 정확히 측정',
        '심전도 모니터링',
        'DKA 유발 요인 확인',
        '당뇨 교육 계획 수립'
      ],
      criticalThinking: [
        'DKA에서 칼륨 수치가 중요한 이유는?',
        '수액 치료의 우선순위는?',
        '뇌부종의 위험성과 예방법은?',
        '환자 교육의 중점 사항은?'
      ]
    });

    // Case 3: Oncology patient with neutropenia
    this.cases.set('neutropenia', {
      id: 'neutropenia',
      title: 'Chemotherapy-induced Neutropenia',
      titleKorean: '항암치료 후 호중구감소증',
      category: 'oncology',
      patient: {
        age: 52,
        gender: 'female',
        diagnosis: '유방암, 항암치료 중',
        medicalHistory: ['유방암 Stage IIIA', 'AC 항암요법 3차 투여 후 10일째'],
        currentMedications: ['Ondansetron 8mg PO prn', 'Filgrastim 300mcg SC qd']
      },
      presentingSymptoms: [
        '발열',
        '오한',
        '피로감',
        '인후통',
        '식욕부진'
      ],
      vitalSigns: {
        BP: '110/70',
        HR: 92,
        RR: 20,
        Temp: 38.3,
        SpO2: 97,
        pain: 2
      },
      labResults: {
        WBC: {
          value: 800,
          unit: 'cells/μL',
          interpretation: '심각한 호중구감소증'
        },
        ANC: {
          value: 320,
          unit: 'cells/μL',
          interpretation: '심각한 감소 (정상: >1500)'
        },
        Hemoglobin: {
          value: 9.8,
          unit: 'g/dL',
          interpretation: '감소'
        },
        Platelet: {
          value: 85000,
          unit: '/μL',
          interpretation: '감소 (정상: 150,000-400,000)'
        }
      },
      clinicalScenario: '52세 여자 환자가 유방암으로 AC 항암요법을 받고 있습니다. 3차 항암치료 후 10일째 되는 날, 38.3도의 발열과 오한을 주소로 응급실에 내원했습니다. 혈액검사 결과 심각한 호중구감소증이 확인되었습니다.',
      nursingAssessment: [
        '전신상태: 피로감, 쇠약감',
        '피부: 창백, 점상출혈 없음',
        '구강: 구내염 없음',
        '호흡음: 깨끗함',
        '복부: 부드러움, 압통 없음',
        '정맥주사 부위: 발적이나 부종 없음'
      ],
      nursingDiagnoses: [
        '감염 위험성',
        '피로',
        '영양불균형: 신체요구량보다 적음',
        '불안'
      ],
      expectedInterventions: [
        '보호격리 시행',
        '철저한 손위생',
        '활력징후 q4h 모니터링',
        '광범위 항생제 투여',
        '혈액배양 검사',
        '매일 CBC 확인',
        '구강간호 q4h',
        '방문객 제한',
        '생과일/생야채 제한',
        'G-CSF 투여 지속'
      ],
      criticalThinking: [
        '호중구감소증 환자의 감염 징후는?',
        '보호격리의 구체적 방법은?',
        'Febrile neutropenia의 응급성은?',
        'G-CSF의 작용기전과 효과는?'
      ]
    });

    // Case 4: Stroke patient
    this.cases.set('stroke', {
      id: 'stroke',
      title: 'Acute Ischemic Stroke',
      titleKorean: '급성 허혈성 뇌졸중',
      category: 'neurological',
      patient: {
        age: 72,
        gender: 'male',
        diagnosis: '좌측 중대뇌동맥 경색',
        medicalHistory: ['고혈압', '심방세동', '이상지질혈증'],
        currentMedications: ['Warfarin 5mg PO qd', 'Atorvastatin 40mg PO qd', 'Amlodipine 5mg PO qd']
      },
      presentingSymptoms: [
        '우측 편마비',
        '실어증',
        '연하곤란',
        '의식저하',
        '안면마비'
      ],
      vitalSigns: {
        BP: '168/95',
        HR: 88,
        RR: 18,
        Temp: 37.0,
        SpO2: 95,
        pain: 0
      },
      labResults: {
        INR: {
          value: 1.2,
          unit: '',
          interpretation: '치료 범위 미달'
        },
        Glucose: {
          value: 156,
          unit: 'mg/dL',
          interpretation: '경도 상승'
        },
        PT: {
          value: 13.5,
          unit: 'seconds',
          interpretation: '정상'
        }
      },
      clinicalScenario: '72세 남자 환자가 2시간 전 갑자기 발생한 우측 편마비와 언어장애로 응급실에 내원했습니다. 심방세동으로 와파린을 복용 중이었으나, 최근 복약 순응도가 떨어졌다고 합니다. CT 상 좌측 중대뇌동맥 영역의 급성 경색이 확인되었습니다.',
      nursingAssessment: [
        'GCS: E3 V2 M5 = 10점',
        '동공: 양측 3mm, 광반사 정상',
        '근력: 우측 상하지 2/5',
        '감각: 우측 감각 저하',
        '언어: 표현성 실어증',
        '연하: 기침 반사 약함'
      ],
      nursingDiagnoses: [
        '신체 기동성 장애',
        '언어소통 장애',
        '연하 장애',
        '낙상 위험성',
        '피부 통합성 장애 위험성'
      ],
      expectedInterventions: [
        '신경학적 상태 q1h 모니터링',
        '두개내압 상승 징후 관찰',
        '혈압 관리 (과도한 하강 피함)',
        '침상머리 30도 상승',
        '연하평가 전 NPO',
        '욕창 예방 (2시간마다 체위변경)',
        '관절운동 범위 유지',
        'DVT 예방',
        '실어증 환자 의사소통 방법',
        '조기 재활 계획'
      ],
      criticalThinking: [
        '급성기 뇌졸중 환자의 혈압 관리 원칙은?',
        '연하곤란 평가의 중요성은?',
        'DVT 예방법은?',
        '재활의 적절한 시작 시기는?'
      ]
    });

    // Case 5: Pediatric asthma
    this.cases.set('pediatric_asthma', {
      id: 'pediatric_asthma',
      title: 'Pediatric Asthma Exacerbation',
      titleKorean: '소아 천식 악화',
      category: 'pediatric',
      patient: {
        age: 8,
        gender: 'male',
        diagnosis: '천식 급성 악화',
        medicalHistory: ['천식', '아토피 피부염', '알레르기 비염'],
        currentMedications: ['Budesonide/Formoterol inhaler', 'Montelukast 5mg PO qd']
      },
      presentingSymptoms: [
        '호흡곤란',
        '기침',
        '천명음',
        '흉부 압박감',
        '운동 시 악화'
      ],
      vitalSigns: {
        BP: '110/70',
        HR: 120,
        RR: 32,
        Temp: 37.5,
        SpO2: 91,
        pain: 0
      },
      labResults: {
        WBC: {
          value: 11500,
          unit: 'cells/μL',
          interpretation: '경도 상승'
        },
        Eosinophil: {
          value: 8,
          unit: '%',
          interpretation: '증가 (정상: 1-4%)'
        }
      },
      clinicalScenario: '8세 남아가 2일 전부터 감기 증상이 있었고, 오늘 오후부터 호흡곤란이 심해져 응급실에 내원했습니다. 말할 때 문장을 끝까지 말하기 어려워하며, 보조근을 사용한 호흡을 보이고 있습니다. 청진 시 양측 폐야에서 천명음이 들립니다.',
      nursingAssessment: [
        '호흡양상: 빈호흡, 보조근 사용',
        '피부: 경도 청색증',
        '의식: 명료하나 불안해함',
        '말하기: 짧은 문장만 가능',
        '자세: 앉은 자세 선호',
        'PEFR: 예측치의 50%'
      ],
      nursingDiagnoses: [
        '비효율적 호흡양상',
        '가스교환 장애',
        '불안',
        '활동 지속성 장애'
      ],
      expectedInterventions: [
        '고농도 산소 투여',
        'Salbutamol 분무요법 q20min x 3',
        'Prednisolone 경구 투여',
        '지속적 SpO2 모니터링',
        '편안한 체위 (fowler\'s position)',
        '수분 섭취 격려',
        '불안 완화 (부모 동반)',
        'Peak flow meter 사용법 교육',
        '유발 요인 확인 및 회피 교육',
        'MDI 사용법 재교육'
      ],
      criticalThinking: [
        '소아 천식의 중증도 평가 방법은?',
        '분무요법의 효과적인 시행법은?',
        '천식 행동 계획의 중요성은?',
        '학교생활에서의 천식 관리는?'
      ]
    });
  }

  getCase(id: string): ClinicalCase | undefined {
    return this.cases.get(id);
  }

  getCasesByCategory(category: string): ClinicalCase[] {
    const results: ClinicalCase[] = [];
    
    this.cases.forEach(caseItem => {
      if (caseItem.category === category) {
        results.push(caseItem);
      }
    });

    return results;
  }

  getAllCases(): ClinicalCase[] {
    return Array.from(this.cases.values());
  }

  searchCases(query: string): ClinicalCase[] {
    const results: ClinicalCase[] = [];
    const searchTerm = query.toLowerCase();

    this.cases.forEach(caseItem => {
      if (
        caseItem.title.toLowerCase().includes(searchTerm) ||
        caseItem.titleKorean.includes(searchTerm) ||
        caseItem.patient.diagnosis.includes(searchTerm) ||
        caseItem.category.includes(searchTerm)
      ) {
        results.push(caseItem);
      }
    });

    return results;
  }
}