interface LearningProgression {
  foundation_level: {
    duration: number;
    objectives: string[];
    assessments: string[];
    milestones: string[];
  };
  intermediate_level: {
    duration: number;
    objectives: string[];
    assessments: string[];
    milestones: string[];
  };
  advanced_level: {
    duration: number;
    objectives: string[];
    assessments: string[];
    milestones: string[];
  };
}

interface NursingAreaContent {
  title: string;
  description: string;
  core_concepts: string[];
  learning_objectives: string[];
  clinical_applications: string[];
  assessment_methods: string[];
  related_areas: string[];
  specialized_knowledge?: string[];
}

export class NursingCoreAreasDatabase {
  private nursingAreas: Map<string, NursingAreaContent>;
  private learningProgressions: Map<string, LearningProgression>;
  private simulationScenarios: Map<string, any>;
  
  constructor() {
    this.nursingAreas = new Map();
    this.learningProgressions = new Map();
    this.simulationScenarios = new Map();
    this.initializeDatabase();
  }
  
  private initializeDatabase(): void {
    this.initializeFundamentalNursing();
    this.initializeAdultNursing();
    this.initializeOncologyNursing();
    this.initializePediatricNursing();
    this.initializeMaternalNursing();
    this.initializeMentalHealthNursing();
    this.initializeCommunityNursing();
    this.initializeGeneTherapyNursing();
    this.initializeClinicalTrialNursing();
    this.initializeLearningProgressions();
    this.initializeSimulationScenarios();
  }
  
  private initializeFundamentalNursing(): void {
    this.nursingAreas.set('fundamentals', {
      title: '기본간호학',
      description: '간호의 기본 개념과 원리, 핵심 간호술을 학습하는 영역',
      core_concepts: [
        '간호철학과 간호이론',
        '간호과정 (사정, 진단, 계획, 수행, 평가)',
        '치료적 의사소통',
        '환자안전과 감염관리',
        '기본 간호술',
        '간호윤리와 법적 이슈'
      ],
      learning_objectives: [
        '간호의 본질과 전문직관 이해',
        '체계적인 간호과정 적용',
        '효과적인 의사소통 기술 습득',
        '안전한 간호 환경 조성',
        '기본 간호술 정확히 수행',
        '윤리적 간호 실무 수행'
      ],
      clinical_applications: [
        '활력징후 측정 및 해석',
        '무균술 적용',
        '약물 투여 및 관리',
        '상처 관리',
        '환자 이동 및 체위 변경',
        '영양 및 배설 관리'
      ],
      assessment_methods: [
        '이론 시험',
        '실습 평가',
        '사례 분석',
        '시뮬레이션',
        '포트폴리오'
      ],
      related_areas: ['성인간호학', '아동간호학', '모성간호학', '정신간호학', '지역사회간호학']
    });
  }
  
  private initializeAdultNursing(): void {
    this.nursingAreas.set('adult_nursing', {
      title: '성인간호학',
      description: '성인 환자의 건강 문제와 간호를 다루는 영역',
      core_concepts: [
        '성인기 발달과 건강',
        '신체계통별 간호',
        '급성 및 만성 질환 간호',
        '수술 간호',
        '중환자 간호',
        '재활 간호'
      ],
      learning_objectives: [
        '성인의 건강 문제 파악',
        '신체계통별 간호 수행',
        '급성기 환자 간호',
        '만성 질환 관리',
        '수술 전후 간호',
        '중환자 모니터링'
      ],
      clinical_applications: [
        '심혈관계 환자 간호',
        '호흡기계 환자 간호',
        '소화기계 환자 간호',
        '신경계 환자 간호',
        '내분비계 환자 간호',
        '근골격계 환자 간호'
      ],
      assessment_methods: [
        '사례 연구',
        '임상 시뮬레이션',
        '간호계획 수립',
        '실습 평가',
        '구두 시험'
      ],
      related_areas: ['기본간호학', '종양간호학', '중환자간호학']
    });
  }
  
  private initializeOncologyNursing(): void {
    this.nursingAreas.set('oncology', {
      title: '종양간호학',
      description: '암 환자와 가족을 위한 전문 간호 영역',
      core_concepts: [
        '암 생물학과 병태생리',
        '항암 치료 (화학요법, 방사선치료, 수술)',
        '면역치료와 표적치료',
        '증상 관리',
        '완화 간호',
        '환자 및 가족 교육'
      ],
      learning_objectives: [
        '암의 발생과 진행 과정 이해',
        '다양한 항암 치료법 파악',
        '치료 부작용 관리',
        '통증 및 증상 완화',
        '심리사회적 지지 제공',
        '삶의 질 향상 도모'
      ],
      clinical_applications: [
        '화학요법 투여 및 관리',
        '방사선치료 환자 간호',
        '조혈모세포 이식 간호',
        '통증 관리',
        '감염 예방 및 관리',
        '영양 관리'
      ],
      assessment_methods: [
        '임상 사례 분석',
        '간호계획 수립',
        '시뮬레이션 실습',
        '연구 논문 분석',
        '전문 발표'
      ],
      related_areas: ['성인간호학', '유전자치료', '임상시험간호', '완화간호학'],
      specialized_knowledge: [
        '유전자 기반 암 치료',
        '정밀의료와 간호',
        '임상시험 관리',
        'CAR-T 세포 치료',
        '종양 면역학'
      ]
    });
  }
  
  private initializePediatricNursing(): void {
    this.nursingAreas.set('pediatric', {
      title: '아동간호학',
      description: '신생아부터 청소년까지의 건강 관리 영역',
      core_concepts: [
        '성장발달 단계별 특성',
        '아동의 건강 사정',
        '가족 중심 간호',
        '발달 단계별 질환',
        '예방 접종',
        '놀이 치료'
      ],
      learning_objectives: [
        '발달 단계별 특성 이해',
        '아동 건강 문제 파악',
        '가족 참여 간호 수행',
        '발달에 적합한 간호 제공',
        '예방적 건강 관리',
        '치료적 놀이 적용'
      ],
      clinical_applications: [
        '신생아 간호',
        '영유아 간호',
        '학령기 아동 간호',
        '청소년 간호',
        '소아 응급 간호',
        '만성 질환 아동 간호'
      ],
      assessment_methods: [
        '발달 평가',
        '사례 연구',
        '가족 교육 계획',
        '놀이 치료 적용',
        '실습 평가'
      ],
      related_areas: ['기본간호학', '모성간호학', '유전간호학']
    });
  }
  
  private initializeMaternalNursing(): void {
    this.nursingAreas.set('maternal', {
      title: '모성간호학',
      description: '여성의 생식 건강과 임신, 출산, 산후 간호 영역',
      core_concepts: [
        '여성 생식 건강',
        '임신 과정과 간호',
        '분만 과정과 간호',
        '산후 회복 간호',
        '모유 수유 지원',
        '가족 계획'
      ],
      learning_objectives: [
        '여성 생식 건강 이해',
        '임신 기간 건강 관리',
        '안전한 분만 지원',
        '산후 회복 촉진',
        '모유 수유 성공 지원',
        '가족 계획 상담'
      ],
      clinical_applications: [
        '산전 간호',
        '분만 간호',
        '산후 간호',
        '신생아 간호',
        '모유 수유 교육',
        '고위험 임신 관리'
      ],
      assessment_methods: [
        '임상 사례 분석',
        '간호계획 수립',
        '교육 자료 개발',
        '실습 평가',
        '상담 기술 평가'
      ],
      related_areas: ['기본간호학', '아동간호학', '유전상담'],
      specialized_knowledge: [
        '유전 검사와 상담',
        '산전 진단',
        '고위험 임신 관리',
        '불임 치료 간호'
      ]
    });
  }
  
  private initializeMentalHealthNursing(): void {
    this.nursingAreas.set('mental_health', {
      title: '정신간호학',
      description: '정신 건강과 정신 질환 간호 영역',
      core_concepts: [
        '정신 건강 개념',
        '치료적 관계 형성',
        '정신 상태 사정',
        '주요 정신 질환',
        '치료적 의사소통',
        '위기 중재'
      ],
      learning_objectives: [
        '정신 건강 개념 이해',
        '치료적 관계 형성',
        '정신 상태 정확히 사정',
        '정신 질환별 간호 수행',
        '효과적 의사소통',
        '위기 상황 대처'
      ],
      clinical_applications: [
        '불안 장애 간호',
        '우울 장애 간호',
        '조현병 간호',
        '물질 남용 간호',
        '자살 예방 간호',
        '집단 치료 참여'
      ],
      assessment_methods: [
        '사례 연구',
        '역할 연기',
        '치료적 의사소통 평가',
        '간호계획 수립',
        '실습 평가'
      ],
      related_areas: ['기본간호학', '성인간호학', '지역사회간호학']
    });
  }
  
  private initializeCommunityNursing(): void {
    this.nursingAreas.set('community', {
      title: '지역사회간호학',
      description: '지역사회 건강 증진과 질병 예방 영역',
      core_concepts: [
        '공중보건 개념',
        '지역사회 건강 사정',
        '건강 증진',
        '질병 예방',
        '환경 보건',
        '보건 정책'
      ],
      learning_objectives: [
        '공중보건 개념 이해',
        '지역사회 건강 문제 파악',
        '건강 증진 프로그램 기획',
        '질병 예방 활동 수행',
        '환경 보건 관리',
        '보건 정책 이해'
      ],
      clinical_applications: [
        '건강 교육',
        '예방 접종',
        '건강 검진',
        '만성 질환 관리',
        '감염병 관리',
        '보건소 업무'
      ],
      assessment_methods: [
        '지역사회 진단',
        '건강 교육 계획',
        '프로그램 평가',
        '실습 보고서',
        '프로젝트 발표'
      ],
      related_areas: ['기본간호학', '모든 간호 영역']
    });
  }
  
  private initializeGeneTherapyNursing(): void {
    this.nursingAreas.set('gene_therapy', {
      title: '유전자치료간호학',
      description: '유전자 치료와 관련된 전문 간호 영역',
      core_concepts: [
        '유전학 기초',
        '유전자 치료 원리',
        '유전자 편집 기술',
        '유전상담',
        '윤리적 고려사항',
        '환자 모니터링'
      ],
      learning_objectives: [
        '유전학 기본 원리 이해',
        '유전자 치료 방법 파악',
        '유전자 편집 기술 이해',
        '유전상담 기술 습득',
        '윤리적 이슈 인식',
        '환자 안전 관리'
      ],
      clinical_applications: [
        'CRISPR 기반 치료',
        '유전자 벡터 치료',
        '세포 치료',
        '유전자 검사',
        '가족력 분석',
        '부작용 모니터링'
      ],
      assessment_methods: [
        '이론 시험',
        '사례 분석',
        '윤리 토론',
        '연구 논문 리뷰',
        '전문 발표'
      ],
      related_areas: ['종양간호학', '임상시험간호', '모성간호학'],
      specialized_knowledge: [
        'CRISPR-Cas9 기술',
        '염기 편집',
        '프라임 편집',
        '유전자 벡터 시스템',
        '세포 치료법'
      ]
    });
  }
  
  private initializeClinicalTrialNursing(): void {
    this.nursingAreas.set('clinical_trial', {
      title: '임상시험간호학',
      description: '임상시험과 연구 관련 전문 간호 영역',
      core_concepts: [
        '임상시험 설계',
        '연구 윤리',
        '프로토콜 관리',
        '데이터 수집',
        '피험자 안전',
        '규제 준수'
      ],
      learning_objectives: [
        '임상시험 과정 이해',
        '연구 윤리 적용',
        '프로토콜 정확히 수행',
        '데이터 정확성 확보',
        '피험자 안전 보장',
        '규제 요구사항 준수'
      ],
      clinical_applications: [
        '피험자 등록',
        '동의서 과정',
        '치료 프로토콜 수행',
        '이상 반응 모니터링',
        '데이터 수집 관리',
        '규제 기관 대응'
      ],
      assessment_methods: [
        '프로토콜 이해도 평가',
        '사례 연구',
        '데이터 관리 평가',
        '규제 지식 시험',
        '실습 평가'
      ],
      related_areas: ['종양간호학', '유전자치료', '연구방법론'],
      specialized_knowledge: [
        'Good Clinical Practice (GCP)',
        '임상시험 단계별 특성',
        '규제 요구사항',
        '데이터 무결성',
        '품질 관리'
      ]
    });
  }
  
  private initializeLearningProgressions(): void {
    this.learningProgressions.set('fundamentals', {
      foundation_level: {
        duration: 4,
        objectives: [
          "간호철학과 간호과정 이해",
          "기본 간호술 습득",
          "환자안전 원칙 적용"
        ],
        assessments: ["이론 시험", "실습 평가", "사례 분석"],
        milestones: ["기본 개념 이해", "술기 습득", "안전 간호 수행"]
      },
      intermediate_level: {
        duration: 6,
        objectives: [
          "복잡한 간호 상황 대처",
          "의사소통 기술 향상",
          "윤리적 딜레마 해결"
        ],
        assessments: ["사례 연구", "시뮬레이션", "포트폴리오"],
        milestones: ["임상적 판단력", "의사소통 능력", "윤리적 사고"]
      },
      advanced_level: {
        duration: 4,
        objectives: [
          "리더십 역량 개발",
          "교육자 역할 수행",
          "연구 참여 능력"
        ],
        assessments: ["연구 프로젝트", "교육 계획", "리더십 평가"],
        milestones: ["전문성 인정", "교육 능력", "연구 참여"]
      }
    });
    
    this.learningProgressions.set('oncology', {
      foundation_level: {
        duration: 6,
        objectives: [
          "암 생물학 기초 이해",
          "항암 치료 원리 파악",
          "환자 사정 능력 개발"
        ],
        assessments: ["이론 시험", "사례 분석", "임상 관찰"],
        milestones: ["기본 지식 습득", "치료 이해", "환자 사정"]
      },
      intermediate_level: {
        duration: 8,
        objectives: [
          "복잡한 암 치료 이해",
          "부작용 관리 능력",
          "가족 지원 제공"
        ],
        assessments: ["임상 사례", "간호계획", "가족 교육"],
        milestones: ["치료 지식", "부작용 관리", "가족 지원"]
      },
      advanced_level: {
        duration: 6,
        objectives: [
          "유전자 치료 이해",
          "임상시험 참여",
          "연구 간호사 역할"
        ],
        assessments: ["연구 프로젝트", "전문 발표", "논문 작성"],
        milestones: ["전문 지식", "연구 능력", "리더십"]
      }
    });
  }
  
  private initializeSimulationScenarios(): void {
    this.simulationScenarios.set('oncology_chemo', {
      title: '화학요법 환자 간호',
      learning_objectives: [
        '화학요법 투여 과정 이해',
        '부작용 조기 발견',
        '응급 상황 대처'
      ],
      patient_background: {
        age: 45,
        gender: 'female',
        diagnosis: '유방암 2기',
        treatment: 'AC-T 화학요법'
      },
      scenario_progression: [
        '화학요법 투여 준비',
        '투여 중 알레르기 반응 발생',
        '응급 처치 및 회복'
      ],
      expected_actions: [
        '투여 전 확인 과정',
        '알레르기 반응 인식',
        '응급 처치 수행',
        '의료진 협력'
      ],
      debriefing_points: [
        '알레르기 반응 징후',
        '응급 처치 순서',
        '의사소통 중요성',
        '예방 방법'
      ]
    });
    
    this.simulationScenarios.set('gene_therapy_consent', {
      title: '유전자 치료 동의 과정',
      learning_objectives: [
        '유전자 치료 설명',
        '동의서 과정 진행',
        '윤리적 고려사항 적용'
      ],
      patient_background: {
        age: 8,
        gender: 'male',
        diagnosis: '선천성 면역결핍증',
        treatment: '유전자 치료 임상시험'
      },
      scenario_progression: [
        '치료 설명 및 상담',
        '가족 질문 및 우려 사항',
        '동의서 작성 과정'
      ],
      expected_actions: [
        '연령에 적합한 설명',
        '가족 교육 제공',
        '윤리적 고려사항 검토',
        '동의서 과정 진행'
      ],
      debriefing_points: [
        '소아 환자 설명 방법',
        '가족 중심 접근',
        '윤리적 딜레마 해결',
        '동의서 법적 요구사항'
      ]
    });
  }
  
  public getNursingArea(area: string): NursingAreaContent | undefined {
    return this.nursingAreas.get(area);
  }
  
  public getLearningProgression(area: string): LearningProgression | undefined {
    return this.learningProgressions.get(area);
  }
  
  public getSimulationScenario(scenario: string): any {
    return this.simulationScenarios.get(scenario);
  }
  
  public getAllNursingAreas(): string[] {
    return Array.from(this.nursingAreas.keys());
  }
  
  public getRelatedAreas(area: string): string[] {
    const nursingArea = this.nursingAreas.get(area);
    return nursingArea?.related_areas || [];
  }
  
  public searchByKeyword(keyword: string): string[] {
    const results: string[] = [];
    
    for (const [area, content] of this.nursingAreas) {
      const searchText = `${content.title} ${content.description} ${content.core_concepts.join(' ')}`.toLowerCase();
      if (searchText.includes(keyword.toLowerCase())) {
        results.push(area);
      }
    }
    
    return results;
  }
}