interface LearningRecord {
  learner_id: string;
  area: string;
  topic: string;
  level: 'foundation' | 'intermediate' | 'advanced';
  start_time: Date;
  completion_time?: Date;
  score?: number;
  attempts: number;
  time_spent: number; // minutes
  difficulty_rating: number; // 1-5
  confidence_level: number; // 1-5
}

interface LearningPath {
  learner_id: string;
  recommended_sequence: string[];
  current_position: number;
  completion_percentage: number;
  estimated_completion_time: number; // weeks
  adaptive_adjustments: string[];
}

interface LearningAnalytics {
  overall_progress: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  next_steps: string[];
  study_patterns: StudyPattern[];
}

interface StudyPattern {
  pattern_type: 'time_preference' | 'content_preference' | 'difficulty_preference';
  pattern_data: any;
  confidence_score: number;
}

export class LearningAnalyticsEngine {
  private learningRecords: Map<string, LearningRecord[]>;
  private learningPaths: Map<string, LearningPath>;
  
  constructor() {
    this.learningRecords = new Map();
    this.learningPaths = new Map();
  }
  
  public recordLearningActivity(record: LearningRecord): void {
    const existingRecords = this.learningRecords.get(record.learner_id) || [];
    existingRecords.push(record);
    this.learningRecords.set(record.learner_id, existingRecords);
  }
  
  public analyzeLearningProgress(learner_id: string): LearningAnalytics {
    const records = this.learningRecords.get(learner_id) || [];
    
    if (records.length === 0) {
      return this.getDefaultAnalytics();
    }
    
    const overallProgress = this.calculateOverallProgress(records);
    const strengths = this.identifyStrengths(records);
    const weaknesses = this.identifyWeaknesses(records);
    const recommendations = this.generateRecommendations(records);
    const nextSteps = this.determineNextSteps(records);
    const studyPatterns = this.analyzeStudyPatterns(records);
    
    return {
      overall_progress: overallProgress,
      strengths,
      weaknesses,
      recommendations,
      next_steps: nextSteps,
      study_patterns: studyPatterns
    };
  }
  
  private calculateOverallProgress(records: LearningRecord[]): number {
    if (records.length === 0) return 0;
    
    const completedRecords = records.filter(r => r.completion_time !== undefined);
    const totalTopics = this.getTotalTopicsCount();
    const completedTopics = new Set(completedRecords.map(r => `${r.area}_${r.topic}`)).size;
    
    return Math.round((completedTopics / totalTopics) * 100);
  }
  
  private getTotalTopicsCount(): number {
    return 50; // 추정치, 실제로는 데이터베이스에서 계산
  }
  
  private identifyStrengths(records: LearningRecord[]): string[] {
    const strengths: string[] = [];
    const areaPerformance = this.calculateAreaPerformance(records);
    
    Object.entries(areaPerformance).forEach(([area, performance]) => {
      if (performance.avgScore > 85) {
        strengths.push(`${area} 영역에서 우수한 성과`);
      }
      if (performance.avgTimeSpent < performance.expectedTime) {
        strengths.push(`${area} 영역에서 빠른 학습 속도`);
      }
      if (performance.avgConfidence > 4) {
        strengths.push(`${area} 영역에 대한 높은 자신감`);
      }
    });
    
    return strengths.length > 0 ? strengths : ['학습 데이터 분석 중'];
  }
  
  private identifyWeaknesses(records: LearningRecord[]): string[] {
    const weaknesses: string[] = [];
    const areaPerformance = this.calculateAreaPerformance(records);
    
    Object.entries(areaPerformance).forEach(([area, performance]) => {
      if (performance.avgScore < 70) {
        weaknesses.push(`${area} 영역에서 추가 학습 필요`);
      }
      if (performance.avgTimeSpent > performance.expectedTime * 1.5) {
        weaknesses.push(`${area} 영역에서 학습 시간 과다 소요`);
      }
      if (performance.avgConfidence < 3) {
        weaknesses.push(`${area} 영역에 대한 자신감 부족`);
      }
      if (performance.avgAttempts > 2) {
        weaknesses.push(`${area} 영역에서 반복 학습 필요`);
      }
    });
    
    return weaknesses.length > 0 ? weaknesses : ['전반적으로 양호한 학습 진행'];
  }
  
  private calculateAreaPerformance(records: LearningRecord[]): { [area: string]: any } {
    const areaGroups: { [area: string]: LearningRecord[] } = {};
    
    records.forEach(record => {
      if (!areaGroups[record.area]) {
        areaGroups[record.area] = [];
      }
      areaGroups[record.area].push(record);
    });
    
    const performance: { [area: string]: any } = {};
    
    Object.entries(areaGroups).forEach(([area, areaRecords]) => {
      const scores = areaRecords.filter(r => r.score !== undefined).map(r => r.score!);
      const timeSpent = areaRecords.map(r => r.time_spent);
      const attempts = areaRecords.map(r => r.attempts);
      const confidence = areaRecords.map(r => r.confidence_level);
      
      performance[area] = {
        avgScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
        avgTimeSpent: timeSpent.reduce((a, b) => a + b, 0) / timeSpent.length,
        avgAttempts: attempts.reduce((a, b) => a + b, 0) / attempts.length,
        avgConfidence: confidence.reduce((a, b) => a + b, 0) / confidence.length,
        expectedTime: this.getExpectedTime(area),
        recordCount: areaRecords.length
      };
    });
    
    return performance;
  }
  
  private getExpectedTime(area: string): number {
    const expectedTimes: { [area: string]: number } = {
      'fundamentals': 120,
      'adult_nursing': 150,
      'oncology': 180,
      'pediatric': 140,
      'maternal': 130,
      'mental_health': 140,
      'community': 110,
      'gene_therapy': 200,
      'clinical_trial': 160
    };
    
    return expectedTimes[area] || 120;
  }
  
  private generateRecommendations(records: LearningRecord[]): string[] {
    const recommendations: string[] = [];
    const areaPerformance = this.calculateAreaPerformance(records);
    
    Object.entries(areaPerformance).forEach(([area, performance]) => {
      if (performance.avgScore < 70) {
        recommendations.push(`${area} 영역의 기본 개념 복습 권장`);
      }
      if (performance.avgTimeSpent > performance.expectedTime * 1.5) {
        recommendations.push(`${area} 영역에서 학습 전략 조정 필요`);
      }
      if (performance.avgConfidence < 3) {
        recommendations.push(`${area} 영역에서 추가 연습 문제 풀이 권장`);
      }
    });
    
    if (recommendations.length === 0) {
      recommendations.push('현재 학습 패턴을 유지하면서 점진적 발전 도모');
    }
    
    return recommendations;
  }
  
  private determineNextSteps(records: LearningRecord[]): string[] {
    const nextSteps: string[] = [];
    const completedAreas = new Set(records.filter(r => r.completion_time).map(r => r.area));
    const currentAreas = new Set(records.filter(r => !r.completion_time).map(r => r.area));
    
    if (completedAreas.has('fundamentals') && !currentAreas.has('adult_nursing')) {
      nextSteps.push('성인간호학 학습 시작');
    }
    
    if (completedAreas.has('adult_nursing') && !currentAreas.has('oncology')) {
      nextSteps.push('종양간호학 전문 영역 진입');
    }
    
    if (completedAreas.has('oncology') && !currentAreas.has('gene_therapy')) {
      nextSteps.push('유전자 치료 간호 고급 과정 시작');
    }
    
    if (completedAreas.has('gene_therapy') && !currentAreas.has('clinical_trial')) {
      nextSteps.push('임상시험 간호 전문 과정 진입');
    }
    
    if (nextSteps.length === 0) {
      nextSteps.push('현재 학습 영역 심화 과정 진행');
    }
    
    return nextSteps;
  }
  
  private analyzeStudyPatterns(records: LearningRecord[]): StudyPattern[] {
    const patterns: StudyPattern[] = [];
    
    // 시간 선호도 분석
    const timePattern = this.analyzeTimePreference(records);
    if (timePattern) {
      patterns.push(timePattern);
    }
    
    // 콘텐츠 선호도 분석
    const contentPattern = this.analyzeContentPreference(records);
    if (contentPattern) {
      patterns.push(contentPattern);
    }
    
    // 난이도 선호도 분석
    const difficultyPattern = this.analyzeDifficultyPreference(records);
    if (difficultyPattern) {
      patterns.push(difficultyPattern);
    }
    
    return patterns;
  }
  
  private analyzeTimePreference(records: LearningRecord[]): StudyPattern | null {
    const timeSpentData = records.map(r => r.time_spent);
    const avgTimeSpent = timeSpentData.reduce((a, b) => a + b, 0) / timeSpentData.length;
    
    let preference = '';
    if (avgTimeSpent < 30) {
      preference = '짧은 학습 세션 선호';
    } else if (avgTimeSpent < 60) {
      preference = '중간 길이 학습 세션 선호';
    } else {
      preference = '긴 학습 세션 선호';
    }
    
    return {
      pattern_type: 'time_preference',
      pattern_data: { preference, avgTimeSpent },
      confidence_score: 0.8
    };
  }
  
  private analyzeContentPreference(records: LearningRecord[]): StudyPattern | null {
    const areaFrequency: { [area: string]: number } = {};
    
    records.forEach(record => {
      areaFrequency[record.area] = (areaFrequency[record.area] || 0) + 1;
    });
    
    const preferredAreas = Object.entries(areaFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([area]) => area);
    
    return {
      pattern_type: 'content_preference',
      pattern_data: { preferredAreas },
      confidence_score: 0.7
    };
  }
  
  private analyzeDifficultyPreference(records: LearningRecord[]): StudyPattern | null {
    const difficultyData = records.map(r => r.difficulty_rating);
    const avgDifficulty = difficultyData.reduce((a, b) => a + b, 0) / difficultyData.length;
    
    let preference = '';
    if (avgDifficulty < 2.5) {
      preference = '기초 수준 선호';
    } else if (avgDifficulty < 3.5) {
      preference = '중급 수준 선호';
    } else {
      preference = '고급 수준 선호';
    }
    
    return {
      pattern_type: 'difficulty_preference',
      pattern_data: { preference, avgDifficulty },
      confidence_score: 0.6
    };
  }
  
  private getDefaultAnalytics(): LearningAnalytics {
    return {
      overall_progress: 0,
      strengths: ['학습 시작 준비 완료'],
      weaknesses: ['학습 데이터 부족'],
      recommendations: ['기본간호학부터 체계적 학습 시작'],
      next_steps: ['간호학 기초 개념 학습'],
      study_patterns: []
    };
  }
  
  public generateLearningPath(learner_id: string, preferences: any): LearningPath {
    const existingPath = this.learningPaths.get(learner_id);
    if (existingPath) {
      return existingPath;
    }
    
    const recommendedSequence = this.generateRecommendedSequence(preferences);
    const estimatedTime = this.calculateEstimatedTime(recommendedSequence);
    
    const newPath: LearningPath = {
      learner_id,
      recommended_sequence: recommendedSequence,
      current_position: 0,
      completion_percentage: 0,
      estimated_completion_time: estimatedTime,
      adaptive_adjustments: []
    };
    
    this.learningPaths.set(learner_id, newPath);
    return newPath;
  }
  
  private generateRecommendedSequence(preferences: any): string[] {
    const baseSequence = [
      'fundamentals',
      'adult_nursing',
      'oncology',
      'gene_therapy',
      'clinical_trial'
    ];
    
    if (preferences.specialty === 'pediatric') {
      baseSequence.splice(2, 0, 'pediatric');
    }
    
    if (preferences.specialty === 'maternal') {
      baseSequence.splice(2, 0, 'maternal');
    }
    
    if (preferences.specialty === 'mental_health') {
      baseSequence.splice(2, 0, 'mental_health');
    }
    
    if (preferences.specialty === 'community') {
      baseSequence.push('community');
    }
    
    return baseSequence;
  }
  
  private calculateEstimatedTime(sequence: string[]): number {
    const timeEstimates: { [area: string]: number } = {
      'fundamentals': 8,
      'adult_nursing': 12,
      'oncology': 16,
      'pediatric': 10,
      'maternal': 10,
      'mental_health': 10,
      'community': 8,
      'gene_therapy': 12,
      'clinical_trial': 10
    };
    
    return sequence.reduce((total, area) => total + (timeEstimates[area] || 8), 0);
  }
  
  public updateLearningPath(learner_id: string, completed_area: string): void {
    const path = this.learningPaths.get(learner_id);
    if (!path) return;
    
    const currentIndex = path.recommended_sequence.indexOf(completed_area);
    if (currentIndex !== -1) {
      path.current_position = currentIndex + 1;
      path.completion_percentage = Math.round((path.current_position / path.recommended_sequence.length) * 100);
    }
    
    this.learningPaths.set(learner_id, path);
  }
}