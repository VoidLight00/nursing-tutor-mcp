interface ProgressRecord {
  learner_id: string;
  module_name: string;
  topic: string;
  start_time: Date;
  end_time?: Date;
  completion_percentage: number;
  time_spent: number; // minutes
  score?: number;
  difficulty_rating: number; // 1-5
  confidence_level: number; // 1-5
  notes?: string;
  resources_used: string[];
  challenges_faced: string[];
  achievements: string[];
}

interface ModuleProgress {
  module_name: string;
  start_date: Date;
  current_progress: number;
  estimated_completion: Date;
  time_spent: number;
  difficulty_rating: number;
  mastery_level: number;
  last_activity: Date;
  topics_completed: string[];
  topics_in_progress: string[];
  topics_remaining: string[];
}

interface DailyActivity {
  date: Date;
  study_duration: number;
  modules_studied: string[];
  concepts_learned: string[];
  questions_answered: number;
  correct_answers: number;
  notes_created: number;
  reflection_notes: string;
  mood_rating: number; // 1-5
  energy_level: number; // 1-5
  focus_level: number; // 1-5
}

interface WeeklySummary {
  week_start: Date;
  week_end: Date;
  total_study_time: number;
  modules_completed: number;
  concepts_mastered: number;
  average_score: number;
  improvement_areas: string[];
  achievements: string[];
  goals_achieved: string[];
  goals_missed: string[];
  next_week_goals: string[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'knowledge' | 'skill' | 'competency' | 'certification';
  target_date: Date;
  completion_date?: Date;
  completion_percentage: number;
  success_criteria: string[];
  evidence: string[];
  reflection: string;
  next_steps: string[];
}

export class ProgressTracker {
  private progressRecords: Map<string, ProgressRecord[]>;
  private moduleProgress: Map<string, Map<string, ModuleProgress>>;
  private dailyActivities: Map<string, DailyActivity[]>;
  private weeklySummaries: Map<string, WeeklySummary[]>;
  private milestones: Map<string, Milestone[]>;
  
  constructor() {
    this.progressRecords = new Map();
    this.moduleProgress = new Map();
    this.dailyActivities = new Map();
    this.weeklySummaries = new Map();
    this.milestones = new Map();
  }
  
  public startLearningSession(learner_id: string, module_name: string, topic: string): void {
    const record: ProgressRecord = {
      learner_id,
      module_name,
      topic,
      start_time: new Date(),
      completion_percentage: 0,
      time_spent: 0,
      difficulty_rating: 3,
      confidence_level: 3,
      resources_used: [],
      challenges_faced: [],
      achievements: []
    };
    
    const records = this.progressRecords.get(learner_id) || [];
    records.push(record);
    this.progressRecords.set(learner_id, records);
    
    this.updateModuleProgress(learner_id, module_name, topic, 'started');
  }
  
  public updateLearningProgress(
    learner_id: string,
    module_name: string,
    topic: string,
    progress: Partial<ProgressRecord>
  ): void {
    const records = this.progressRecords.get(learner_id) || [];
    const record = records.find(r => 
      r.module_name === module_name && 
      r.topic === topic && 
      !r.end_time
    );
    
    if (record) {
      Object.assign(record, progress);
      
      if (progress.completion_percentage === 100) {
        record.end_time = new Date();
        record.time_spent = Math.round((record.end_time.getTime() - record.start_time.getTime()) / (1000 * 60));
        this.updateModuleProgress(learner_id, module_name, topic, 'completed');
      }
      
      this.progressRecords.set(learner_id, records);
    }
  }
  
  public completeLearningSession(
    learner_id: string,
    module_name: string,
    topic: string,
    completion_data: {
      score?: number;
      difficulty_rating: number;
      confidence_level: number;
      notes?: string;
      resources_used: string[];
      challenges_faced: string[];
      achievements: string[];
    }
  ): void {
    const records = this.progressRecords.get(learner_id) || [];
    const record = records.find(r => 
      r.module_name === module_name && 
      r.topic === topic && 
      !r.end_time
    );
    
    if (record) {
      record.end_time = new Date();
      record.time_spent = Math.round((record.end_time.getTime() - record.start_time.getTime()) / (1000 * 60));
      record.completion_percentage = 100;
      Object.assign(record, completion_data);
      
      this.progressRecords.set(learner_id, records);
      this.updateModuleProgress(learner_id, module_name, topic, 'completed');
      this.updateDailyActivity(learner_id, record);
    }
  }
  
  private updateModuleProgress(
    learner_id: string,
    module_name: string,
    topic: string,
    action: 'started' | 'completed'
  ): void {
    const learnerModules = this.moduleProgress.get(learner_id) || new Map();
    const moduleProgress = learnerModules.get(module_name) || this.initializeModuleProgress(module_name);
    
    if (action === 'started') {
      if (!moduleProgress.topics_in_progress.includes(topic)) {
        moduleProgress.topics_in_progress.push(topic);
        moduleProgress.topics_remaining = moduleProgress.topics_remaining.filter((t: string) => t !== topic);
      }
    } else if (action === 'completed') {
      moduleProgress.topics_completed.push(topic);
      moduleProgress.topics_in_progress = moduleProgress.topics_in_progress.filter((t: string) => t !== topic);
      
      // Update progress percentage
      const totalTopics = this.getModuleTopics(module_name).length;
      moduleProgress.current_progress = Math.round((moduleProgress.topics_completed.length / totalTopics) * 100);
      
      // Update mastery level based on recent performance
      moduleProgress.mastery_level = this.calculateMasteryLevel(learner_id, module_name);
    }
    
    moduleProgress.last_activity = new Date();
    learnerModules.set(module_name, moduleProgress);
    this.moduleProgress.set(learner_id, learnerModules);
  }
  
  private initializeModuleProgress(module_name: string): ModuleProgress {
    const allTopics = this.getModuleTopics(module_name);
    
    return {
      module_name,
      start_date: new Date(),
      current_progress: 0,
      estimated_completion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      time_spent: 0,
      difficulty_rating: 3,
      mastery_level: 0,
      last_activity: new Date(),
      topics_completed: [],
      topics_in_progress: [],
      topics_remaining: allTopics
    };
  }
  
  private getModuleTopics(module_name: string): string[] {
    const moduleTopics: { [key: string]: string[] } = {
      'fundamentals': [
        '간호철학', '간호과정', '의사소통', '환자안전', '감염관리',
        '기본간호술', '활력징후', '약물관리', '상처관리', '영양관리'
      ],
      'adult_nursing': [
        '심혈관계', '호흡기계', '소화기계', '신경계', '내분비계',
        '근골격계', '비뇨기계', '생식기계', '혈액계', '면역계'
      ],
      'oncology': [
        '암생물학', '화학요법', '방사선치료', '수술간호', '면역치료',
        '표적치료', '통증관리', '증상관리', '완화간호', '가족지지'
      ],
      'gene_therapy': [
        '유전학기초', '분자생물학', '유전자편집', '벡터시스템', '세포치료',
        '유전상담', '윤리적고려', '안전관리', '모니터링', '부작용관리'
      ],
      'clinical_trial': [
        '연구설계', '프로토콜', '동의과정', '데이터수집', '안전성모니터링',
        '규제준수', '품질관리', '이상반응', '통계분석', '보고서작성'
      ]
    };
    
    return moduleTopics[module_name] || [];
  }
  
  private calculateMasteryLevel(learner_id: string, module_name: string): number {
    const records = this.progressRecords.get(learner_id) || [];
    const moduleRecords = records.filter(r => r.module_name === module_name && r.end_time);
    
    if (moduleRecords.length === 0) return 0;
    
    const avgScore = moduleRecords.reduce((sum, r) => sum + (r.score || 0), 0) / moduleRecords.length;
    const avgConfidence = moduleRecords.reduce((sum, r) => sum + r.confidence_level, 0) / moduleRecords.length;
    const completionRate = moduleRecords.filter(r => r.completion_percentage === 100).length / moduleRecords.length;
    
    return Math.round(((avgScore / 100) * 0.4 + (avgConfidence / 5) * 0.3 + completionRate * 0.3) * 100);
  }
  
  private updateDailyActivity(learner_id: string, record: ProgressRecord): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const activities = this.dailyActivities.get(learner_id) || [];
    let todayActivity = activities.find(a => a.date.getTime() === today.getTime());
    
    if (!todayActivity) {
      todayActivity = {
        date: today,
        study_duration: 0,
        modules_studied: [],
        concepts_learned: [],
        questions_answered: 0,
        correct_answers: 0,
        notes_created: 0,
        reflection_notes: '',
        mood_rating: 3,
        energy_level: 3,
        focus_level: 3
      };
      activities.push(todayActivity);
    }
    
    todayActivity.study_duration += record.time_spent;
    
    if (!todayActivity.modules_studied.includes(record.module_name)) {
      todayActivity.modules_studied.push(record.module_name);
    }
    
    if (!todayActivity.concepts_learned.includes(record.topic)) {
      todayActivity.concepts_learned.push(record.topic);
    }
    
    if (record.notes) {
      todayActivity.notes_created++;
    }
    
    this.dailyActivities.set(learner_id, activities);
  }
  
  public recordDailyReflection(
    learner_id: string,
    reflection: {
      mood_rating: number;
      energy_level: number;
      focus_level: number;
      reflection_notes: string;
      questions_answered?: number;
      correct_answers?: number;
    }
  ): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const activities = this.dailyActivities.get(learner_id) || [];
    const todayActivity = activities.find(a => a.date.getTime() === today.getTime());
    
    if (todayActivity) {
      Object.assign(todayActivity, reflection);
      this.dailyActivities.set(learner_id, activities);
    }
  }
  
  public generateWeeklySummary(learner_id: string): WeeklySummary {
    const now = new Date();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(now);
    weekEnd.setHours(23, 59, 59, 999);
    
    const activities = this.dailyActivities.get(learner_id) || [];
    const weekActivities = activities.filter(a => 
      a.date >= weekStart && a.date <= weekEnd
    );
    
    const records = this.progressRecords.get(learner_id) || [];
    const weekRecords = records.filter(r => 
      r.start_time >= weekStart && r.start_time <= weekEnd
    );
    
    const summary: WeeklySummary = {
      week_start: weekStart,
      week_end: weekEnd,
      total_study_time: weekActivities.reduce((sum, a) => sum + a.study_duration, 0),
      modules_completed: this.countCompletedModules(learner_id, weekStart, weekEnd),
      concepts_mastered: this.countMasteredConcepts(learner_id, weekStart, weekEnd),
      average_score: this.calculateAverageScore(weekRecords),
      improvement_areas: this.identifyImprovementAreas(weekRecords),
      achievements: this.identifyAchievements(weekRecords),
      goals_achieved: this.getGoalsAchieved(learner_id, weekStart, weekEnd),
      goals_missed: this.getGoalsMissed(learner_id, weekStart, weekEnd),
      next_week_goals: this.generateNextWeekGoals(learner_id, weekRecords)
    };
    
    const summaries = this.weeklySummaries.get(learner_id) || [];
    summaries.push(summary);
    this.weeklySummaries.set(learner_id, summaries);
    
    return summary;
  }
  
  private countCompletedModules(learner_id: string, start: Date, end: Date): number {
    const modules = this.moduleProgress.get(learner_id) || new Map();
    let count = 0;
    
    for (const [, progress] of modules) {
      if (progress.current_progress === 100 && 
          progress.last_activity >= start && 
          progress.last_activity <= end) {
        count++;
      }
    }
    
    return count;
  }
  
  private countMasteredConcepts(learner_id: string, start: Date, end: Date): number {
    const records = this.progressRecords.get(learner_id) || [];
    return records.filter(r => 
      r.start_time >= start && 
      r.start_time <= end && 
      r.completion_percentage === 100 &&
      (r.score || 0) >= 80 &&
      r.confidence_level >= 4
    ).length;
  }
  
  private calculateAverageScore(records: ProgressRecord[]): number {
    const scoredRecords = records.filter(r => r.score !== undefined);
    if (scoredRecords.length === 0) return 0;
    
    return Math.round(scoredRecords.reduce((sum, r) => sum + (r.score || 0), 0) / scoredRecords.length);
  }
  
  private identifyImprovementAreas(records: ProgressRecord[]): string[] {
    const areas: string[] = [];
    
    // Low score areas
    const lowScoreRecords = records.filter(r => (r.score || 0) < 70);
    lowScoreRecords.forEach(r => {
      if (!areas.includes(r.module_name)) {
        areas.push(r.module_name);
      }
    });
    
    // High difficulty areas
    const highDifficultyRecords = records.filter(r => r.difficulty_rating >= 4);
    highDifficultyRecords.forEach(r => {
      if (!areas.includes(r.topic)) {
        areas.push(r.topic);
      }
    });
    
    // Low confidence areas
    const lowConfidenceRecords = records.filter(r => r.confidence_level <= 2);
    lowConfidenceRecords.forEach(r => {
      if (!areas.includes(r.topic)) {
        areas.push(r.topic);
      }
    });
    
    return areas;
  }
  
  private identifyAchievements(records: ProgressRecord[]): string[] {
    const achievements: string[] = [];
    
    // High performance
    const highScoreRecords = records.filter(r => (r.score || 0) >= 90);
    if (highScoreRecords.length > 0) {
      achievements.push(`${highScoreRecords.length}개 주제에서 우수한 성과`);
    }
    
    // Consistent study
    const uniqueDays = new Set(records.map(r => r.start_time.toDateString())).size;
    if (uniqueDays >= 5) {
      achievements.push('꾸준한 학습 습관 유지');
    }
    
    // Difficulty challenge
    const challengingRecords = records.filter(r => r.difficulty_rating >= 4 && (r.score || 0) >= 80);
    if (challengingRecords.length > 0) {
      achievements.push('어려운 내용 성공적 학습');
    }
    
    return achievements;
  }
  
  private getGoalsAchieved(learner_id: string, start: Date, end: Date): string[] {
    const milestones = this.milestones.get(learner_id) || [];
    return milestones
      .filter(m => m.completion_date && m.completion_date >= start && m.completion_date <= end)
      .map(m => m.title);
  }
  
  private getGoalsMissed(learner_id: string, start: Date, end: Date): string[] {
    const milestones = this.milestones.get(learner_id) || [];
    return milestones
      .filter(m => m.target_date >= start && m.target_date <= end && !m.completion_date)
      .map(m => m.title);
  }
  
  private generateNextWeekGoals(learner_id: string, weekRecords: ProgressRecord[]): string[] {
    const goals: string[] = [];
    
    // Continue current modules
    const activeModules = new Set(weekRecords.map(r => r.module_name));
    activeModules.forEach(module => {
      goals.push(`${module} 모듈 진행`);
    });
    
    // Improve weak areas
    const weakAreas = this.identifyImprovementAreas(weekRecords);
    weakAreas.slice(0, 2).forEach(area => {
      goals.push(`${area} 영역 집중 학습`);
    });
    
    // Maintain study habit
    goals.push('주 5일 이상 학습 유지');
    
    return goals;
  }
  
  public createMilestone(learner_id: string, milestone: Omit<Milestone, 'id'>): Milestone {
    const newMilestone: Milestone = {
      id: this.generateId(),
      ...milestone,
      completion_percentage: 0,
      evidence: [],
      reflection: '',
      next_steps: []
    };
    
    const milestones = this.milestones.get(learner_id) || [];
    milestones.push(newMilestone);
    this.milestones.set(learner_id, milestones);
    
    return newMilestone;
  }
  
  public updateMilestone(learner_id: string, milestone_id: string, updates: Partial<Milestone>): boolean {
    const milestones = this.milestones.get(learner_id) || [];
    const milestone = milestones.find(m => m.id === milestone_id);
    
    if (!milestone) return false;
    
    Object.assign(milestone, updates);
    
    if (updates.completion_percentage === 100 && !milestone.completion_date) {
      milestone.completion_date = new Date();
    }
    
    this.milestones.set(learner_id, milestones);
    return true;
  }
  
  public getProgressSummary(learner_id: string): any {
    const moduleProgress = this.moduleProgress.get(learner_id) || new Map();
    const recentActivity = this.getRecentActivity(learner_id);
    const milestones = this.milestones.get(learner_id) || [];
    
    const summary = {
      overall_progress: this.calculateOverallProgress(learner_id),
      active_modules: Array.from(moduleProgress.values()).filter(m => m.current_progress > 0 && m.current_progress < 100),
      completed_modules: Array.from(moduleProgress.values()).filter(m => m.current_progress === 100),
      recent_activity: recentActivity,
      upcoming_milestones: milestones.filter(m => !m.completion_date && m.target_date > new Date()),
      completed_milestones: milestones.filter(m => m.completion_date),
      study_streak: this.calculateStudyStreak(learner_id),
      performance_trend: this.calculatePerformanceTrend(learner_id)
    };
    
    return summary;
  }
  
  private calculateOverallProgress(learner_id: string): number {
    const moduleProgress = this.moduleProgress.get(learner_id) || new Map();
    
    if (moduleProgress.size === 0) return 0;
    
    const totalProgress = Array.from(moduleProgress.values())
      .reduce((sum, progress) => sum + progress.current_progress, 0);
    
    return Math.round(totalProgress / moduleProgress.size);
  }
  
  private getRecentActivity(learner_id: string): any {
    const activities = this.dailyActivities.get(learner_id) || [];
    const recentActivities = activities
      .filter(a => a.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    return {
      recent_sessions: recentActivities.slice(0, 7),
      total_study_time: recentActivities.reduce((sum, a) => sum + a.study_duration, 0),
      concepts_learned: recentActivities.reduce((sum, a) => sum + a.concepts_learned.length, 0),
      average_mood: recentActivities.reduce((sum, a) => sum + a.mood_rating, 0) / recentActivities.length || 0
    };
  }
  
  private calculateStudyStreak(learner_id: string): number {
    const activities = this.dailyActivities.get(learner_id) || [];
    const sortedActivities = activities.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    let streak = 0;
    const now = new Date();
    
    for (const activity of sortedActivities) {
      const daysDiff = Math.floor((now.getTime() - activity.date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak && activity.study_duration > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }
  
  private calculatePerformanceTrend(learner_id: string): string {
    const records = this.progressRecords.get(learner_id) || [];
    const recentRecords = records
      .filter(r => r.score !== undefined && r.end_time)
      .sort((a, b) => b.start_time.getTime() - a.start_time.getTime())
      .slice(0, 10);
    
    if (recentRecords.length < 3) return 'insufficient_data';
    
    const firstHalf = recentRecords.slice(0, Math.floor(recentRecords.length / 2));
    const secondHalf = recentRecords.slice(Math.floor(recentRecords.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, r) => sum + (r.score || 0), 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, r) => sum + (r.score || 0), 0) / secondHalf.length;
    
    const difference = firstAvg - secondAvg;
    
    if (difference > 5) return 'improving';
    if (difference < -5) return 'declining';
    return 'stable';
  }
  
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
}