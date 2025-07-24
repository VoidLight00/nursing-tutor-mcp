// 실제 간호 실무에서 사용되는 약물 데이터베이스
export interface Medication {
  id: string;
  name: string;
  nameKorean: string;
  genericName: string;
  category: string;
  categoryKorean: string;
  indications: string[];
  contraindications: string[];
  dosage: {
    adult: string;
    pediatric?: string;
    geriatric?: string;
  };
  route: string[];
  sideEffects: {
    common: string[];
    serious: string[];
  };
  nursingConsiderations: string[];
  patientEducation: string[];
  interactions: string[];
  monitoringParameters: string[];
}

export class MedicationDatabase {
  private medications: Map<string, Medication>;

  constructor() {
    this.medications = new Map();
    this.initializeMedications();
  }

  private initializeMedications(): void {
    // 진통제
    this.medications.set('morphine', {
      id: 'morphine',
      name: 'Morphine',
      nameKorean: '모르핀',
      genericName: 'Morphine Sulfate',
      category: 'Opioid Analgesic',
      categoryKorean: '마약성 진통제',
      indications: [
        '중등도에서 심한 통증 관리',
        '암성 통증',
        '급성 심근경색증',
        '폐부종'
      ],
      contraindications: [
        '호흡억제',
        '급성 천식 발작',
        '마비성 장폐색',
        'MAOI 복용 중'
      ],
      dosage: {
        adult: 'IV/IM: 2-10mg q2-4h PRN, PO: 15-30mg q4h PRN',
        pediatric: '0.05-0.1mg/kg q2-4h PRN',
        geriatric: '성인 용량의 50% 감량'
      },
      route: ['IV', 'IM', 'SC', 'PO', 'PR'],
      sideEffects: {
        common: ['졸음', '변비', '오심', '구토', '어지러움'],
        serious: ['호흡억제', '저혈압', '의존성', '혼돈']
      },
      nursingConsiderations: [
        '투여 전 호흡수, 혈압, 통증 정도 평가',
        '호흡수 12회/분 미만 시 투여 보류',
        '날록손(Naloxone) 준비',
        'PCA 사용 시 환자 교육',
        '변비 예방 간호'
      ],
      patientEducation: [
        '졸음, 어지러움 주의 (운전 금지)',
        '음주 금지',
        '변비 예방법 교육',
        '약물 의존성 위험 설명'
      ],
      interactions: ['벤조디아제핀', '알코올', 'MAO 억제제', '삼환계 항우울제'],
      monitoringParameters: ['호흡수', '의식수준', '통증점수', '장운동']
    });

    // 항생제
    this.medications.set('vancomycin', {
      id: 'vancomycin',
      name: 'Vancomycin',
      nameKorean: '반코마이신',
      genericName: 'Vancomycin HCl',
      category: 'Glycopeptide Antibiotic',
      categoryKorean: '글리코펩타이드계 항생제',
      indications: [
        'MRSA 감염',
        '심내막염',
        '골수염',
        'Clostridium difficile 대장염'
      ],
      contraindications: [
        '약물 과민반응'
      ],
      dosage: {
        adult: 'IV: 15-20mg/kg q8-12h (TDM 필요)',
        pediatric: '15mg/kg q6h',
        geriatric: '신기능에 따라 용량 조절'
      },
      route: ['IV', 'PO (C.diff 치료 시)'],
      sideEffects: {
        common: ['Red man syndrome', '정맥염', '오심'],
        serious: ['신독성', '이독성', '호중구감소증']
      },
      nursingConsiderations: [
        '최소 60분 이상 천천히 주입',
        'Red man syndrome 예방 위해 주입속도 조절',
        '정맥염 예방 위해 희석농도 준수',
        'Peak/Trough level 모니터링',
        '신기능 검사 정기 확인'
      ],
      patientEducation: [
        '치료 기간 동안 청력 변화 보고',
        '발진, 가려움증 발생 시 보고',
        '충분한 수분 섭취'
      ],
      interactions: ['아미노글리코사이드', '루프 이뇨제', '신독성 약물'],
      monitoringParameters: ['혈중농도(Trough)', 'BUN/Cr', 'CBC', '청력검사']
    });

    // 항응고제
    this.medications.set('heparin', {
      id: 'heparin',
      name: 'Heparin',
      nameKorean: '헤파린',
      genericName: 'Heparin Sodium',
      category: 'Anticoagulant',
      categoryKorean: '항응고제',
      indications: [
        '심부정맥혈전증(DVT)',
        '폐색전증(PE)',
        '급성관상동맥증후군',
        '혈액투석',
        'DIC'
      ],
      contraindications: [
        '활동성 출혈',
        '심한 혈소판감소증',
        'HIT(헤파린 유발 혈소판감소증)'
      ],
      dosage: {
        adult: 'DVT/PE: 초기 80 units/kg bolus, 이후 18 units/kg/hr 지속주입',
        pediatric: '초기 75 units/kg, 이후 20 units/kg/hr',
        geriatric: '감량 고려'
      },
      route: ['IV', 'SC'],
      sideEffects: {
        common: ['출혈', '멍', '주사부위 통증'],
        serious: ['대량출혈', 'HIT', '골다공증(장기사용)']
      },
      nursingConsiderations: [
        'aPTT 모니터링 (목표: 정상치의 1.5-2.5배)',
        '출혈 징후 관찰',
        '혈소판 수치 모니터링',
        'Protamine sulfate 준비',
        '다른 항응고제와 병용 주의'
      ],
      patientEducation: [
        '출혈 징후 보고 (잇몸출혈, 혈뇨, 흑색변)',
        '부드러운 칫솔 사용',
        '면도기 사용 주의',
        '낙상 예방'
      ],
      interactions: ['아스피린', 'NSAIDs', '와파린', '클로피도그렐'],
      monitoringParameters: ['aPTT', 'PT/INR', 'Hgb/Hct', '혈소판', '잠혈검사']
    });

    // 항고혈압제
    this.medications.set('enalapril', {
      id: 'enalapril',
      name: 'Enalapril',
      nameKorean: '에날라프릴',
      genericName: 'Enalapril Maleate',
      category: 'ACE Inhibitor',
      categoryKorean: 'ACE 억제제',
      indications: [
        '고혈압',
        '심부전',
        '좌심실 기능장애',
        '당뇨병성 신증'
      ],
      contraindications: [
        '임신',
        '양측성 신동맥 협착',
        '혈관부종 병력',
        '고칼륨혈증'
      ],
      dosage: {
        adult: '초기 5mg qd, 최대 40mg/day',
        pediatric: '0.08mg/kg qd',
        geriatric: '초기 2.5mg qd'
      },
      route: ['PO'],
      sideEffects: {
        common: ['마른기침', '어지러움', '피로', '두통'],
        serious: ['혈관부종', '고칼륨혈증', '급성신부전']
      },
      nursingConsiderations: [
        '첫 투여 시 저혈압 주의',
        '기립성 저혈압 평가',
        '칼륨 수치 모니터링',
        '신기능 검사 정기 확인',
        '임신 가능성 확인'
      ],
      patientEducation: [
        '마른기침 발생 가능성',
        '천천히 일어나기',
        '칼륨 보충제 주의',
        '임신 시 즉시 중단'
      ],
      interactions: ['칼륨보전이뇨제', 'NSAIDs', '리튬', '칼륨 보충제'],
      monitoringParameters: ['혈압', 'K+', 'BUN/Cr', 'CBC']
    });

    // 항당뇨제
    this.medications.set('insulin_regular', {
      id: 'insulin_regular',
      name: 'Regular Insulin',
      nameKorean: '속효성 인슐린',
      genericName: 'Insulin Regular',
      category: 'Antidiabetic',
      categoryKorean: '항당뇨제',
      indications: [
        '제1형 당뇨병',
        '제2형 당뇨병',
        '당뇨병성 케톤산증(DKA)',
        '고혈당성 고삼투압 상태(HHS)'
      ],
      contraindications: [
        '저혈당',
        '인슐린 과민반응'
      ],
      dosage: {
        adult: '개별화 용량, DKA: 0.1 units/kg/hr IV',
        pediatric: '0.5-1 units/kg/day 분할투여',
        geriatric: '감량 고려'
      },
      route: ['SC', 'IV', 'IM'],
      sideEffects: {
        common: ['저혈당', '주사부위 지방이영양증', '체중증가'],
        serious: ['심한 저혈당', '알레르기 반응', '저칼륨혈증']
      },
      nursingConsiderations: [
        '식전 30분 투여',
        '혈당 모니터링',
        '주사부위 순환',
        '저혈당 증상 관찰',
        '포도당 준비'
      ],
      patientEducation: [
        '저혈당 증상 및 대처법',
        '규칙적인 식사',
        '혈당 자가측정법',
        '주사부위 순환의 중요성',
        '인슐린 보관법'
      ],
      interactions: ['베타차단제', '알코올', 'MAO 억제제', '경구용 혈당강하제'],
      monitoringParameters: ['혈당', 'HbA1c', 'K+', '체중']
    });

    // 항암제
    this.medications.set('cyclophosphamide', {
      id: 'cyclophosphamide',
      name: 'Cyclophosphamide',
      nameKorean: '사이클로포스파마이드',
      genericName: 'Cyclophosphamide',
      category: 'Alkylating Agent',
      categoryKorean: '알킬화제',
      indications: [
        '백혈병',
        '림프종',
        '유방암',
        '난소암',
        '자가면역질환'
      ],
      contraindications: [
        '심한 골수억제',
        '활동성 감염',
        '임신',
        '방광염'
      ],
      dosage: {
        adult: 'IV: 500-1500mg/m² q2-4주',
        pediatric: '용량 조절 필요',
        geriatric: '신기능에 따라 조절'
      },
      route: ['IV', 'PO'],
      sideEffects: {
        common: ['오심/구토', '탈모', '골수억제', '피로'],
        serious: ['출혈성 방광염', '이차암', '불임', '심독성']
      },
      nursingConsiderations: [
        '충분한 수분공급 (2-3L/day)',
        '메스나(Mesna) 병용',
        '감염 예방 교육',
        '혈구수치 모니터링',
        '항구토제 전처치'
      ],
      patientEducation: [
        '충분한 수분 섭취',
        '자주 배뇨',
        '감염 예방수칙',
        '탈모 대처법',
        '피임의 중요성'
      ],
      interactions: ['알로퓨리놀', '와파린', '생백신'],
      monitoringParameters: ['CBC', '간기능', '신기능', '요검사']
    });

    // 이뇨제
    this.medications.set('furosemide', {
      id: 'furosemide',
      name: 'Furosemide',
      nameKorean: '푸로세마이드',
      genericName: 'Furosemide',
      category: 'Loop Diuretic',
      categoryKorean: '루프 이뇨제',
      indications: [
        '심부전으로 인한 부종',
        '간경변으로 인한 복수',
        '신증후군',
        '고혈압'
      ],
      contraindications: [
        '무뇨',
        '심한 저칼륨혈증',
        '설폰아마이드 과민반응'
      ],
      dosage: {
        adult: 'PO: 20-80mg qd-bid, IV: 20-40mg',
        pediatric: '1-2mg/kg/dose',
        geriatric: '초기 저용량 시작'
      },
      route: ['PO', 'IV', 'IM'],
      sideEffects: {
        common: ['저칼륨혈증', '저나트륨혈증', '탈수', '어지러움'],
        serious: ['이독성', '급성신부전', '심한 전해질 불균형']
      },
      nursingConsiderations: [
        'I&O 모니터링',
        '체중 매일 측정',
        '전해질 수치 확인',
        '기립성 저혈압 평가',
        'IV 투여 시 천천히 (4mg/min 이하)'
      ],
      patientEducation: [
        '칼륨이 풍부한 음식 섭취',
        '천천히 일어나기',
        '체중 변화 모니터링',
        '아침에 복용 권장'
      ],
      interactions: ['디곡신', 'NSAIDs', '리튬', '아미노글리코사이드'],
      monitoringParameters: ['전해질', 'BUN/Cr', '혈압', '체중', 'I&O']
    });
  }

  getMedication(id: string): Medication | undefined {
    return this.medications.get(id);
  }

  searchMedications(query: string): Medication[] {
    const results: Medication[] = [];
    const searchTerm = query.toLowerCase();

    this.medications.forEach(med => {
      if (
        med.name.toLowerCase().includes(searchTerm) ||
        med.nameKorean.includes(searchTerm) ||
        med.category.toLowerCase().includes(searchTerm) ||
        med.categoryKorean.includes(searchTerm)
      ) {
        results.push(med);
      }
    });

    return results;
  }

  getMedicationsByCategory(category: string): Medication[] {
    const results: Medication[] = [];
    
    this.medications.forEach(med => {
      if (med.category.toLowerCase() === category.toLowerCase() ||
          med.categoryKorean === category) {
        results.push(med);
      }
    });

    return results;
  }

  getAllMedications(): Medication[] {
    return Array.from(this.medications.values());
  }
}