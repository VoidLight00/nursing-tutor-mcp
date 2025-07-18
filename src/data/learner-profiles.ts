interface LearnerProfile {
  personal_info: {
    id: string;
    name: string;
    email: string;
    created_at: Date;
    last_active: Date;
  };
  
  background: {
    education_level: 'high_school' | 'bachelor' | 'master' | 'phd';
    previous_major: string;
    healthcare_experience: number;
    nursing_experience: number;
    language_proficiency: LanguageProficiency;
  };
  
  learning_preferences: {
    preferred_learning_style: LearningStyle[];
    study_schedule: StudySchedule;
    difficulty_preference: 'gradual' | 'challenging' | 'mixed';
    interaction_type: 'self_paced' | 'guided' | 'collaborative';
  };
  
  career_goals: {
    target_specialty: string[];
    work_setting: 'hospital' | 'clinic' | 'research' | 'education';
    timeline: Date;
    certification_goals: string[];
  };
  
  current_status: {
    overall_progress: number;
    active_modules: string[];
    completed_modules: string[];
    struggling_areas: string[];
    strength_areas: string[];
  };
}

interface LearningStyle {
  visual_learner: {
    preference_score: number;
    effective_materials: string[];
    recommended_tools: string[];
  };
  
  auditory_learner: {
    preference_score: number;
    effective_materials: string[];
    recommended_tools: string[];
  };
  
  kinesthetic_learner: {
    preference_score: number;
    effective_materials: string[];
    recommended_tools: string[];
  };
  
  reading_writing_learner: {
    preference_score: number;
    effective_materials: string[];
    recommended_tools: string[];
  };
}

interface StudySchedule {
  preferred_time_slots: TimeSlot[];
  session_duration: number;
  break_intervals: number;
  weekly_hours: number;
  flexibility: 'rigid' | 'flexible' | 'adaptive';
}

interface TimeSlot {
  day: string;
  start_time: string;
  end_time: string;
  effectiveness_rating: number;
}

interface LanguageProficiency {
  native_language: string;
  english_level: 'beginner' | 'intermediate' | 'advanced' | 'native';
  medical_terminology: number; // 1-10
  korean_level?: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

export { LearnerProfile, LearningStyle, StudySchedule, TimeSlot, LanguageProficiency };

export class LearnerProfileManager {
  private profiles: Map<string, LearnerProfile>;
  private learningStyleDatabase: Map<string, any>;
  
  constructor() {
    this.profiles = new Map();
    this.learningStyleDatabase = new Map();
    this.initializeLearningStyles();
  }
  
  private initializeLearningStyles(): void {
    this.learningStyleDatabase.set('visual', {
      indicators: [
        "다이어그램과 차트를 선호",
        "색상과 하이라이트 사용",
        "마인드맵 작성",
        "시각적 메모리 우수",
        "그림과 도표로 이해"
      ],
      recommendations: [
        "해부학 다이어그램 활용",
        "플로우차트로 간호과정 학습",
        "색상별 노트 분류",
        "비디오 강의 시청",
        "인포그래픽 제작"
      ],
      effective_materials: [
        "해부학 아틀라스",
        "간호과정 플로우차트",
        "의학 삽화집",
        "시각적 참고서",
        "온라인 비디오 강의"
      ],
      recommended_tools: [
        "마인드맵 소프트웨어",
        "디지털 노트 앱",
        "색상 코딩 시스템",
        "시각적 암기 카드",
        "3D 해부학 앱"
      ]
    });
    
    this.learningStyleDatabase.set('auditory', {
      indicators: [
        "설명을 듣는 것을 선호",
        "토론 참여 선호",
        "음성 녹음 활용",
        "리듬감 있는 암기법",
        "구술 설명 선호"
      ],
      recommendations: [
        "음성 강의 듣기",
        "스터디 그룹 참여",
        "자신만의 설명 녹음",
        "의학 용어 노래로 암기",
        "토론식 학습"
      ],
      effective_materials: [
        "팟캐스트 강의",
        "오디오북",
        "녹음된 강의",
        "토론 자료",
        "음성 가이드"
      ],
      recommended_tools: [
        "음성 녹음 앱",
        "팟캐스트 플레이어",
        "음성 인식 소프트웨어",
        "온라인 토론 플랫폼",
        "오디오 편집 도구"
      ]
    });
    
    this.learningStyleDatabase.set('kinesthetic', {
      indicators: [
        "실습과 체험 선호",
        "움직이며 학습",
        "손으로 만지며 이해",
        "실제 경험 중시",
        "시뮬레이션 선호"
      ],
      recommendations: [
        "실습 중심 학습",
        "시뮬레이션 참여",
        "실제 케이스 스터디",
        "체험형 워크숍",
        "실물 모형 활용"
      ],
      effective_materials: [
        "실습 매뉴얼",
        "시뮬레이션 가이드",
        "케이스 스터디",
        "실물 모형",
        "체험 키트"
      ],
      recommended_tools: [
        "가상 시뮬레이터",
        "실습 도구",
        "모형 및 마네킹",
        "체험형 앱",
        "VR/AR 도구"
      ]
    });
    
    this.learningStyleDatabase.set('reading_writing', {
      indicators: [
        "읽기와 쓰기 선호",
        "노트 필기 중시",
        "텍스트 분석",
        "요약 작성",
        "리스트 만들기"
      ],
      recommendations: [
        "상세한 노트 작성",
        "요약 정리",
        "키워드 추출",
        "개념 정리",
        "체계적 필기"
      ],
      effective_materials: [
        "전문 서적",
        "학술 논문",
        "가이드라인",
        "매뉴얼",
        "체계적 교재"
      ],
      recommended_tools: [
        "디지털 노트 앱",
        "워드 프로세서",
        "개념 정리 도구",
        "온라인 라이브러리",
        "텍스트 분석 도구"
      ]
    });
  }
  
  public createProfile(profileData: Partial<LearnerProfile>): LearnerProfile {
    const profile: LearnerProfile = {
      personal_info: {
        id: profileData.personal_info?.id || this.generateId(),
        name: profileData.personal_info?.name || '',
        email: profileData.personal_info?.email || '',
        created_at: new Date(),
        last_active: new Date()
      },
      background: {
        education_level: profileData.background?.education_level || 'bachelor',
        previous_major: profileData.background?.previous_major || '',
        healthcare_experience: profileData.background?.healthcare_experience || 0,
        nursing_experience: profileData.background?.nursing_experience || 0,
        language_proficiency: profileData.background?.language_proficiency || {
          native_language: 'Korean',
          english_level: 'intermediate',
          medical_terminology: 3
        }
      },
      learning_preferences: {
        preferred_learning_style: profileData.learning_preferences?.preferred_learning_style || [],
        study_schedule: profileData.learning_preferences?.study_schedule || {
          preferred_time_slots: [],
          session_duration: 60,
          break_intervals: 15,
          weekly_hours: 20,
          flexibility: 'flexible'
        },
        difficulty_preference: profileData.learning_preferences?.difficulty_preference || 'gradual',
        interaction_type: profileData.learning_preferences?.interaction_type || 'self_paced'
      },
      career_goals: {
        target_specialty: profileData.career_goals?.target_specialty || ['oncology'],
        work_setting: profileData.career_goals?.work_setting || 'hospital',
        timeline: profileData.career_goals?.timeline || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        certification_goals: profileData.career_goals?.certification_goals || []
      },
      current_status: {
        overall_progress: 0,
        active_modules: [],
        completed_modules: [],
        struggling_areas: [],
        strength_areas: []
      }
    };
    
    this.profiles.set(profile.personal_info.id, profile);
    return profile;
  }
  
  public getProfile(id: string): LearnerProfile | undefined {
    return this.profiles.get(id);
  }
  
  public updateProfile(id: string, updates: Partial<LearnerProfile>): boolean {
    const profile = this.profiles.get(id);
    if (!profile) return false;
    
    const updatedProfile = this.deepMerge(profile, updates);
    updatedProfile.personal_info.last_active = new Date();
    
    this.profiles.set(id, updatedProfile);
    return true;
  }
  
  public assessLearningStyle(responses: any[]): LearningStyle {
    const scores = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0,
      reading_writing: 0
    };
    
    responses.forEach(response => {
      if (response.style === 'visual') scores.visual += response.score;
      if (response.style === 'auditory') scores.auditory += response.score;
      if (response.style === 'kinesthetic') scores.kinesthetic += response.score;
      if (response.style === 'reading_writing') scores.reading_writing += response.score;
    });
    
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    
    const learningStyle: LearningStyle = {
      visual_learner: {
        preference_score: Math.round((scores.visual / totalScore) * 100),
        effective_materials: this.learningStyleDatabase.get('visual')?.effective_materials || [],
        recommended_tools: this.learningStyleDatabase.get('visual')?.recommended_tools || []
      },
      auditory_learner: {
        preference_score: Math.round((scores.auditory / totalScore) * 100),
        effective_materials: this.learningStyleDatabase.get('auditory')?.effective_materials || [],
        recommended_tools: this.learningStyleDatabase.get('auditory')?.recommended_tools || []
      },
      kinesthetic_learner: {
        preference_score: Math.round((scores.kinesthetic / totalScore) * 100),
        effective_materials: this.learningStyleDatabase.get('kinesthetic')?.effective_materials || [],
        recommended_tools: this.learningStyleDatabase.get('kinesthetic')?.recommended_tools || []
      },
      reading_writing_learner: {
        preference_score: Math.round((scores.reading_writing / totalScore) * 100),
        effective_materials: this.learningStyleDatabase.get('reading_writing')?.effective_materials || [],
        recommended_tools: this.learningStyleDatabase.get('reading_writing')?.recommended_tools || []
      }
    };
    
    return learningStyle;
  }
  
  public generatePersonalizedRecommendations(profile: LearnerProfile): any {
    const recommendations = {
      study_materials: this.recommendStudyMaterials(profile),
      study_schedule: this.recommendStudySchedule(profile),
      learning_strategies: this.recommendLearningStrategies(profile),
      tools_and_resources: this.recommendTools(profile),
      career_guidance: this.recommendCareerGuidance(profile)
    };
    
    return recommendations;
  }
  
  private recommendStudyMaterials(profile: LearnerProfile): string[] {
    const materials: string[] = [];
    
    // 학습 스타일 기반 추천
    profile.learning_preferences.preferred_learning_style.forEach(style => {
      if (style.visual_learner.preference_score > 70) {
        materials.push(...style.visual_learner.effective_materials);
      }
      if (style.auditory_learner.preference_score > 70) {
        materials.push(...style.auditory_learner.effective_materials);
      }
      if (style.kinesthetic_learner.preference_score > 70) {
        materials.push(...style.kinesthetic_learner.effective_materials);
      }
      if (style.reading_writing_learner.preference_score > 70) {
        materials.push(...style.reading_writing_learner.effective_materials);
      }
    });
    
    // 전문 분야 기반 추천
    if (profile.career_goals.target_specialty.includes('oncology')) {
      materials.push(
        '종양간호학 전문서적',
        '암환자 간호 케이스 스터디',
        '화학요법 가이드라인',
        '종양학 저널 논문'
      );
    }
    
    if (profile.career_goals.target_specialty.includes('gene_therapy')) {
      materials.push(
        '유전학 기초 교재',
        '유전자 치료 최신 연구',
        '분자생물학 참고서',
        '유전상담 가이드'
      );
    }
    
    return [...new Set(materials)];
  }
  
  private recommendStudySchedule(profile: LearnerProfile): any {
    const schedule = profile.learning_preferences.study_schedule;
    const recommendations = {
      optimal_session_duration: this.calculateOptimalSessionDuration(profile),
      recommended_break_intervals: this.calculateBreakIntervals(profile),
      weekly_distribution: this.calculateWeeklyDistribution(profile),
      peak_performance_times: this.identifyPeakTimes(profile)
    };
    
    return recommendations;
  }
  
  private recommendLearningStrategies(profile: LearnerProfile): string[] {
    const strategies: string[] = [];
    
    // 배경 기반 전략
    if (profile.background.healthcare_experience > 0) {
      strategies.push(
        '기존 경험과 새로운 지식 연결',
        '실무 경험 기반 사례 분석',
        '멘토링 프로그램 참여'
      );
    }
    
    // 학습 선호도 기반 전략
    if (profile.learning_preferences.difficulty_preference === 'gradual') {
      strategies.push(
        '기초부터 단계별 학습',
        '충분한 연습 시간 확보',
        '반복 학습 활용'
      );
    }
    
    if (profile.learning_preferences.interaction_type === 'collaborative') {
      strategies.push(
        '스터디 그룹 참여',
        '동료와 지식 공유',
        '토론식 학습'
      );
    }
    
    return strategies;
  }
  
  private recommendTools(profile: LearnerProfile): string[] {
    const tools: string[] = [];
    
    // 기본 도구
    tools.push(
      '옵시디언 노트 앱',
      '스케줄 관리 도구',
      '진도 추적 앱',
      '플래시카드 앱'
    );
    
    // 학습 스타일 기반 도구
    profile.learning_preferences.preferred_learning_style.forEach(style => {
      if (style.visual_learner.preference_score > 70) {
        tools.push(...style.visual_learner.recommended_tools);
      }
      if (style.auditory_learner.preference_score > 70) {
        tools.push(...style.auditory_learner.recommended_tools);
      }
      if (style.kinesthetic_learner.preference_score > 70) {
        tools.push(...style.kinesthetic_learner.recommended_tools);
      }
      if (style.reading_writing_learner.preference_score > 70) {
        tools.push(...style.reading_writing_learner.recommended_tools);
      }
    });
    
    return [...new Set(tools)];
  }
  
  private recommendCareerGuidance(profile: LearnerProfile): any {
    const guidance = {
      specialty_preparation: this.getSpecialtyPreparation(profile.career_goals.target_specialty),
      certification_roadmap: this.getCertificationRoadmap(profile.career_goals.certification_goals),
      networking_opportunities: this.getNetworkingOpportunities(profile.career_goals.work_setting),
      skill_development: this.getSkillDevelopment(profile.career_goals.target_specialty)
    };
    
    return guidance;
  }
  
  private getSpecialtyPreparation(specialties: string[]): string[] {
    const preparation: string[] = [];
    
    specialties.forEach(specialty => {
      switch (specialty) {
        case 'oncology':
          preparation.push(
            '종양간호사 자격증 취득',
            '화학요법 교육 이수',
            '종양학 학회 참석',
            '암센터 실습 경험'
          );
          break;
        case 'gene_therapy':
          preparation.push(
            '유전학 추가 교육',
            '임상시험 교육 이수',
            '유전상담 교육 참여',
            '바이오 기업 인턴십'
          );
          break;
        case 'clinical_trial':
          preparation.push(
            'GCP 교육 이수',
            '임상시험 코디네이터 자격증',
            '연구 방법론 교육',
            '제약회사 인턴십'
          );
          break;
      }
    });
    
    return preparation;
  }
  
  private getCertificationRoadmap(certifications: string[]): any {
    const roadmap: any = {};
    
    certifications.forEach(cert => {
      roadmap[cert] = {
        prerequisites: this.getCertificationPrerequisites(cert),
        timeline: this.getCertificationTimeline(cert),
        study_resources: this.getCertificationResources(cert)
      };
    });
    
    return roadmap;
  }
  
  private getCertificationPrerequisites(certification: string): string[] {
    const prerequisites: { [key: string]: string[] } = {
      'oncology_nurse': ['간호사 면허', '종양학 병동 1년 경력'],
      'clinical_research_nurse': ['간호사 면허', 'GCP 교육 이수'],
      'genetic_counselor': ['유전학 학사 학위', '유전상담 석사 과정']
    };
    
    return prerequisites[certification] || [];
  }
  
  private getCertificationTimeline(certification: string): string {
    const timelines: { [key: string]: string } = {
      'oncology_nurse': '6-12개월',
      'clinical_research_nurse': '3-6개월',
      'genetic_counselor': '2-3년'
    };
    
    return timelines[certification] || '6-12개월';
  }
  
  private getCertificationResources(certification: string): string[] {
    const resources: { [key: string]: string[] } = {
      'oncology_nurse': ['OCN 시험 가이드', '종양간호학 교재', '온라인 강의'],
      'clinical_research_nurse': ['GCP 교육 자료', '임상시험 매뉴얼', '연구 윤리 교육'],
      'genetic_counselor': ['유전학 교재', '유전상담 실습', '임상 경험']
    };
    
    return resources[certification] || [];
  }
  
  private getNetworkingOpportunities(workSetting: string): string[] {
    const opportunities: { [key: string]: string[] } = {
      'hospital': ['병원 간호사회', '전문 간호사 모임', '의료진 컨퍼런스'],
      'clinic': ['클리닉 운영진 모임', '지역 의료진 네트워크', '환자 안전 위원회'],
      'research': ['연구 간호사 협회', '임상시험 학회', '바이오 헬스케어 네트워크'],
      'education': ['간호 교육자 협회', '학술 세미나', '교육 혁신 포럼']
    };
    
    return opportunities[workSetting] || [];
  }
  
  private getSkillDevelopment(specialties: string[]): string[] {
    const skills: string[] = [];
    
    specialties.forEach(specialty => {
      switch (specialty) {
        case 'oncology':
          skills.push('화학요법 관리', '통증 관리', '가족 상담', '완화 간호');
          break;
        case 'gene_therapy':
          skills.push('유전상담', '분자생물학', '바이오인포매틱스', '윤리적 판단');
          break;
        case 'clinical_trial':
          skills.push('프로토콜 관리', '데이터 수집', '규제 준수', '환자 교육');
          break;
      }
    });
    
    return [...new Set(skills)];
  }
  
  private calculateOptimalSessionDuration(profile: LearnerProfile): number {
    const base = profile.learning_preferences.study_schedule.session_duration;
    const experienceAdjustment = profile.background.healthcare_experience > 0 ? 15 : 0;
    const styleAdjustment = this.calculateStyleAdjustment(profile);
    
    return Math.max(30, Math.min(120, base + experienceAdjustment + styleAdjustment));
  }
  
  private calculateBreakIntervals(profile: LearnerProfile): number {
    const base = profile.learning_preferences.study_schedule.break_intervals;
    const sessionDuration = this.calculateOptimalSessionDuration(profile);
    
    return Math.max(5, Math.min(30, Math.round(sessionDuration / 4)));
  }
  
  private calculateWeeklyDistribution(profile: LearnerProfile): any {
    const totalHours = profile.learning_preferences.study_schedule.weekly_hours;
    const flexibility = profile.learning_preferences.study_schedule.flexibility;
    
    const distribution: any = {
      total_hours: totalHours,
      sessions_per_week: Math.ceil(totalHours / 2),
      rest_days: flexibility === 'rigid' ? 1 : 2,
      intensive_days: flexibility === 'adaptive' ? 2 : 1
    };
    
    return distribution;
  }
  
  private identifyPeakTimes(profile: LearnerProfile): string[] {
    const preferredSlots = profile.learning_preferences.study_schedule.preferred_time_slots;
    
    if (preferredSlots.length > 0) {
      return preferredSlots
        .filter(slot => slot.effectiveness_rating > 7)
        .map(slot => `${slot.day} ${slot.start_time}-${slot.end_time}`);
    }
    
    return ['오전 9-11시', '오후 2-4시', '저녁 7-9시'];
  }
  
  private calculateStyleAdjustment(profile: LearnerProfile): number {
    let adjustment = 0;
    
    profile.learning_preferences.preferred_learning_style.forEach(style => {
      if (style.kinesthetic_learner.preference_score > 70) {
        adjustment += 10; // 체험 학습은 더 긴 시간 필요
      }
      if (style.reading_writing_learner.preference_score > 70) {
        adjustment += 5; // 읽기/쓰기는 약간 더 긴 시간 필요
      }
    });
    
    return adjustment;
  }
  
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
  
  private deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }
}