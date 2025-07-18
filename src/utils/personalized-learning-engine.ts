import { LearnerProfile } from '../data/learner-profiles.js';
import { LearningAnalyticsEngine } from './learning-analytics.js';
import { ProgressTracker } from './progress-tracker.js';

interface LearningPath {
  learner_id: string;
  path_id: string;
  recommended_sequence: string[];
  current_position: number;
  difficulty_adjustments: DifficultyAdjustment[];
  pacing_recommendations: PacingRecommendations;
  support_resources: SupportResource[];
  checkpoints: Checkpoint[];
  adaptive_adjustments: AdaptiveAdjustment[];
}

interface DifficultyAdjustment {
  module: string;
  original_difficulty: number;
  adjusted_difficulty: number;
  reason: string;
  adjustment_date: Date;
}

interface PacingRecommendations {
  sessions_per_week: number;
  session_duration: number;
  break_frequency: number;
  review_intervals: number[];
  intensive_periods: IntensivePeriod[];
}

interface IntensivePeriod {
  start_date: Date;
  end_date: Date;
  focus_areas: string[];
  additional_resources: string[];
}

interface SupportResource {
  type: 'video' | 'text' | 'interactive' | 'assessment' | 'practice';
  title: string;
  url: string;
  difficulty_level: number;
  estimated_duration: number;
  learning_objectives: string[];
  recommended_for: string[];
}

interface Checkpoint {
  id: string;
  position: number;
  title: string;
  type: 'knowledge_check' | 'skill_assessment' | 'reflection' | 'milestone';
  requirements: string[];
  success_criteria: string[];
  remediation_resources: string[];
}

interface AdaptiveAdjustment {
  adjustment_id: string;
  trigger_condition: string;
  adjustment_type: 'difficulty' | 'pacing' | 'resources' | 'sequence';
  adjustment_details: any;
  applied_date: Date;
  effectiveness_rating?: number;
}

interface LearningRecommendation {
  type: 'content' | 'strategy' | 'resource' | 'schedule';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  rationale: string;
  action_items: string[];
  expected_outcomes: string[];
  timeline: string;
}

export class PersonalizedLearningEngine {
  private learningAnalytics: LearningAnalyticsEngine;
  private progressTracker: ProgressTracker;
  private learningPaths: Map<string, LearningPath>;
  private adaptationRules: Map<string, AdaptationRule>;
  
  constructor() {
    this.learningAnalytics = new LearningAnalyticsEngine();
    this.progressTracker = new ProgressTracker();
    this.learningPaths = new Map();
    this.adaptationRules = new Map();
    this.initializeAdaptationRules();
  }
  
  private initializeAdaptationRules(): void {
    // Performance-based adaptations
    this.adaptationRules.set('low_performance', {
      trigger: (performance: any) => performance.avgScore < 70,
      adjustment: (path: LearningPath) => {
        path.difficulty_adjustments.push({
          module: path.recommended_sequence[path.current_position],
          original_difficulty: 3,
          adjusted_difficulty: 2,
          reason: 'Performance below threshold',
          adjustment_date: new Date()
        });
        return path;
      }
    });
    
    // Time-based adaptations
    this.adaptationRules.set('slow_progress', {
      trigger: (performance: any) => performance.avgTimeSpent > performance.expectedTime * 1.5,
      adjustment: (path: LearningPath) => {
        path.pacing_recommendations.sessions_per_week = Math.max(
          path.pacing_recommendations.sessions_per_week - 1, 3
        );
        return path;
      }
    });
    
    // Confidence-based adaptations
    this.adaptationRules.set('low_confidence', {
      trigger: (performance: any) => performance.avgConfidence < 3,
      adjustment: (path: LearningPath) => {
        path.support_resources.push({
          type: 'practice',
          title: 'Additional Practice Exercises',
          url: '/practice/confidence-building',
          difficulty_level: 2,
          estimated_duration: 30,
          learning_objectives: ['Build confidence through practice'],
          recommended_for: ['low_confidence']
        });
        return path;
      }
    });
  }
  
  public generateLearningPath(learnerProfile: LearnerProfile): LearningPath {
    const currentLevel = this.assessCurrentLevel(learnerProfile);
    const goals = this.identifyLearningGoals(learnerProfile);
    const personalizedPath = this.createPersonalizedPath(learnerProfile, currentLevel, goals);
    
    const learningPath: LearningPath = {
      learner_id: learnerProfile.personal_info.id,
      path_id: this.generatePathId(),
      recommended_sequence: personalizedPath.sequence,
      current_position: 0,
      difficulty_adjustments: [],
      pacing_recommendations: this.generatePacingRecommendations(learnerProfile),
      support_resources: this.recommendSupportResources(learnerProfile),
      checkpoints: this.defineCheckpoints(personalizedPath.sequence),
      adaptive_adjustments: []
    };
    
    this.learningPaths.set(learnerProfile.personal_info.id, learningPath);
    return learningPath;
  }
  
  private assessCurrentLevel(learnerProfile: LearnerProfile): any {
    const level = {
      overall_level: 'beginner',
      domain_levels: {} as any,
      competency_gaps: [] as string[],
      strength_areas: [] as string[]
    };
    
    // Assess based on background
    if (learnerProfile.background.healthcare_experience > 0) {
      level.overall_level = 'intermediate';
      level.strength_areas.push('healthcare_context');
    }
    
    if (learnerProfile.background.nursing_experience > 0) {
      level.overall_level = 'advanced';
      level.strength_areas.push('nursing_fundamentals');
    }
    
    // Assess based on education
    if (learnerProfile.background.education_level === 'master' || 
        learnerProfile.background.education_level === 'phd') {
      level.strength_areas.push('academic_learning');
    }
    
    // Assess based on career goals
    if (learnerProfile.career_goals.target_specialty.includes('gene_therapy')) {
      level.competency_gaps.push('genetics_knowledge');
    }
    
    if (learnerProfile.career_goals.target_specialty.includes('clinical_trial')) {
      level.competency_gaps.push('research_methodology');
    }
    
    return level;
  }
  
  private identifyLearningGoals(learnerProfile: LearnerProfile): any {
    const goals = {
      short_term: [] as string[],
      medium_term: [] as string[],
      long_term: [] as string[],
      career_goals: [] as string[]
    };
    
    // Short-term goals (1-2 months)
    if (learnerProfile.current_status.active_modules.length === 0) {
      goals.short_term.push('Complete fundamentals of nursing');
    }
    
    // Medium-term goals (3-6 months)
    learnerProfile.career_goals.target_specialty.forEach(specialty => {
      goals.medium_term.push(`Develop competency in ${specialty}`);
    });
    
    // Long-term goals (6-12 months)
    goals.long_term.push('Achieve professional nursing competency');
    
    // Career goals (1+ years)
    goals.career_goals.push(`Work in ${learnerProfile.career_goals.work_setting}`);
    
    return goals;
  }
  
  private createPersonalizedPath(
    learnerProfile: LearnerProfile,
    currentLevel: any,
    goals: any
  ): any {
    const basePath = this.getBaseLearningPath();
    const personalizedSequence = this.customizeSequence(basePath, learnerProfile, currentLevel);
    
    return {
      sequence: personalizedSequence,
      estimated_duration: this.calculateEstimatedDuration(personalizedSequence),
      key_milestones: this.identifyKeyMilestones(personalizedSequence),
      success_metrics: this.defineSuccessMetrics(goals)
    };
  }
  
  private getBaseLearningPath(): string[] {
    return [
      'fundamentals',
      'adult_nursing',
      'nursing_assessment',
      'pharmacology',
      'pathophysiology',
      'clinical_skills',
      'patient_safety',
      'healthcare_ethics',
      'communication_skills',
      'specialty_preparation'
    ];
  }
  
  private customizeSequence(
    basePath: string[],
    learnerProfile: LearnerProfile,
    currentLevel: any
  ): string[] {
    let customizedPath = [...basePath];
    
    // Skip modules if learner has advanced background
    if (currentLevel.overall_level === 'advanced') {
      customizedPath = customizedPath.filter(module => module !== 'fundamentals');
    }
    
    // Add specialty modules based on career goals
    learnerProfile.career_goals.target_specialty.forEach((specialty: string) => {
      if (specialty === 'oncology') {
        customizedPath.push('oncology_fundamentals', 'cancer_biology', 'chemotherapy_nursing');
      }
      if (specialty === 'gene_therapy') {
        customizedPath.push('genetics_basics', 'molecular_biology', 'gene_therapy_nursing');
      }
      if (specialty === 'clinical_trial') {
        customizedPath.push('research_methodology', 'clinical_trial_management', 'regulatory_compliance');
      }
    });
    
    // Adjust sequence based on learning preferences
    if (learnerProfile.learning_preferences.difficulty_preference === 'challenging') {
      // Move advanced topics earlier
      const advancedTopics = customizedPath.filter((module: string) => 
        module.includes('advanced') || module.includes('complex')
      );
      customizedPath = customizedPath.filter((module: string) => 
        !advancedTopics.includes(module)
      );
      customizedPath.splice(3, 0, ...advancedTopics);
    }
    
    return customizedPath;
  }
  
  private generatePacingRecommendations(learnerProfile: LearnerProfile): PacingRecommendations {
    const studySchedule = learnerProfile.learning_preferences.study_schedule;
    
    return {
      sessions_per_week: Math.min(studySchedule.weekly_hours / studySchedule.session_duration, 7),
      session_duration: studySchedule.session_duration,
      break_frequency: studySchedule.break_intervals,
      review_intervals: [1, 3, 7, 14, 30], // days
      intensive_periods: this.generateIntensivePeriods(learnerProfile)
    };
  }
  
  private generateIntensivePeriods(learnerProfile: LearnerProfile): IntensivePeriod[] {
    const periods: IntensivePeriod[] = [];
    
    // Create intensive periods for challenging specialties
    learnerProfile.career_goals.target_specialty.forEach((specialty: string) => {
      if (specialty === 'gene_therapy' || specialty === 'clinical_trial') {
        periods.push({
          start_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
          end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
          focus_areas: [specialty],
          additional_resources: [
            'Expert mentorship',
            'Specialized workshops',
            'Industry conferences'
          ]
        });
      }
    });
    
    return periods;
  }
  
  private recommendSupportResources(learnerProfile: LearnerProfile): SupportResource[] {
    const resources: SupportResource[] = [];
    
    // Add resources based on learning style
    learnerProfile.learning_preferences.preferred_learning_style.forEach((style: any) => {
      if (style.visual_learner.preference_score > 70) {
        resources.push({
          type: 'video',
          title: 'Visual Learning Resources',
          url: '/resources/visual-learning',
          difficulty_level: 2,
          estimated_duration: 45,
          learning_objectives: ['Visual concept understanding'],
          recommended_for: ['visual_learners']
        });
      }
      
      if (style.kinesthetic_learner.preference_score > 70) {
        resources.push({
          type: 'interactive',
          title: 'Interactive Simulations',
          url: '/resources/simulations',
          difficulty_level: 3,
          estimated_duration: 60,
          learning_objectives: ['Hands-on practice'],
          recommended_for: ['kinesthetic_learners']
        });
      }
    });
    
    // Add specialty-specific resources
    learnerProfile.career_goals.target_specialty.forEach((specialty: string) => {
      resources.push({
        type: 'text',
        title: `${specialty} Specialized Resources`,
        url: `/resources/${specialty}`,
        difficulty_level: 4,
        estimated_duration: 90,
        learning_objectives: [`${specialty} competency`],
        recommended_for: [specialty]
      });
    });
    
    return resources;
  }
  
  private defineCheckpoints(sequence: string[]): Checkpoint[] {
    const checkpoints: Checkpoint[] = [];
    
    sequence.forEach((module, index) => {
      // Add checkpoint every 2-3 modules
      if (index % 3 === 0 || index === sequence.length - 1) {
        checkpoints.push({
          id: `checkpoint_${index}`,
          position: index,
          title: `Checkpoint: ${module}`,
          type: index === sequence.length - 1 ? 'milestone' : 'knowledge_check',
          requirements: [`Complete ${module} module`],
          success_criteria: ['Score 80% or higher', 'Demonstrate practical application'],
          remediation_resources: ['Review materials', 'Additional practice']
        });
      }
    });
    
    return checkpoints;
  }
  
  private calculateEstimatedDuration(sequence: string[]): number {
    const moduleEstimates: { [key: string]: number } = {
      'fundamentals': 4,
      'adult_nursing': 6,
      'nursing_assessment': 3,
      'pharmacology': 5,
      'pathophysiology': 4,
      'clinical_skills': 4,
      'patient_safety': 2,
      'healthcare_ethics': 2,
      'communication_skills': 3,
      'specialty_preparation': 3,
      'oncology_fundamentals': 4,
      'cancer_biology': 3,
      'chemotherapy_nursing': 4,
      'genetics_basics': 3,
      'molecular_biology': 4,
      'gene_therapy_nursing': 5,
      'research_methodology': 3,
      'clinical_trial_management': 4,
      'regulatory_compliance': 3
    };
    
    return sequence.reduce((total, module) => total + (moduleEstimates[module] || 3), 0);
  }
  
  private identifyKeyMilestones(sequence: string[]): string[] {
    const milestones: string[] = [];
    
    // Add milestone every 25% of the path
    const quarterPoints = [
      Math.floor(sequence.length * 0.25),
      Math.floor(sequence.length * 0.5),
      Math.floor(sequence.length * 0.75),
      sequence.length - 1
    ];
    
    quarterPoints.forEach(point => {
      milestones.push(sequence[point]);
    });
    
    return milestones;
  }
  
  private defineSuccessMetrics(goals: any): any {
    return {
      knowledge_retention: 85,
      skill_demonstration: 80,
      confidence_level: 4,
      goal_achievement: 90,
      time_efficiency: 100
    };
  }
  
  public adaptLearningPath(learner_id: string, performance_data: any): LearningPath | null {
    const learningPath = this.learningPaths.get(learner_id);
    if (!learningPath) return null;
    
    let pathModified = false;
    
    // Apply adaptation rules
    for (const [ruleId, rule] of this.adaptationRules) {
      if (rule.trigger(performance_data)) {
        const adjustedPath = rule.adjustment(learningPath);
        
        adjustedPath.adaptive_adjustments.push({
          adjustment_id: this.generateAdjustmentId(),
          trigger_condition: ruleId,
          adjustment_type: this.getAdjustmentType(ruleId),
          adjustment_details: this.getAdjustmentDetails(ruleId, performance_data),
          applied_date: new Date()
        });
        
        pathModified = true;
      }
    }
    
    if (pathModified) {
      this.learningPaths.set(learner_id, learningPath);
    }
    
    return learningPath;
  }
  
  private getAdjustmentType(ruleId: string): 'difficulty' | 'pacing' | 'resources' | 'sequence' {
    const typeMap: { [key: string]: 'difficulty' | 'pacing' | 'resources' | 'sequence' } = {
      'low_performance': 'difficulty',
      'slow_progress': 'pacing',
      'low_confidence': 'resources',
      'sequence_issue': 'sequence'
    };
    
    return typeMap[ruleId] || 'difficulty';
  }
  
  private getAdjustmentDetails(ruleId: string, performance_data: any): any {
    return {
      rule_id: ruleId,
      trigger_data: performance_data,
      adjustment_reason: this.getAdjustmentReason(ruleId),
      expected_outcome: this.getExpectedOutcome(ruleId)
    };
  }
  
  private getAdjustmentReason(ruleId: string): string {
    const reasons: { [key: string]: string } = {
      'low_performance': 'Performance below expected threshold',
      'slow_progress': 'Learning pace slower than optimal',
      'low_confidence': 'Confidence level needs improvement',
      'sequence_issue': 'Learning sequence needs adjustment'
    };
    
    return reasons[ruleId] || 'General improvement needed';
  }
  
  private getExpectedOutcome(ruleId: string): string {
    const outcomes: { [key: string]: string } = {
      'low_performance': 'Improved understanding and scores',
      'slow_progress': 'Better time management and efficiency',
      'low_confidence': 'Increased confidence and self-efficacy',
      'sequence_issue': 'More logical learning progression'
    };
    
    return outcomes[ruleId] || 'General improvement';
  }
  
  public generateRecommendations(learner_id: string): LearningRecommendation[] {
    const analytics = this.learningAnalytics.analyzeLearningProgress(learner_id);
    const progressSummary = this.progressTracker.getProgressSummary(learner_id);
    const recommendations: LearningRecommendation[] = [];
    
    // Performance-based recommendations
    if (analytics.overall_progress < 50) {
      recommendations.push({
        type: 'strategy',
        priority: 'high',
        title: 'Study Strategy Optimization',
        description: 'Adjust study methods to improve learning efficiency',
        rationale: 'Current progress rate suggests need for strategy adjustment',
        action_items: [
          'Try different learning techniques',
          'Increase study session frequency',
          'Seek additional support resources'
        ],
        expected_outcomes: ['Improved comprehension', 'Faster progress'],
        timeline: '2-3 weeks'
      });
    }
    
    // Weakness-based recommendations
    analytics.weaknesses.forEach(weakness => {
      recommendations.push({
        type: 'content',
        priority: 'medium',
        title: `Focus on ${weakness}`,
        description: `Additional study needed in ${weakness} area`,
        rationale: 'Identified as area needing improvement',
        action_items: [
          `Review ${weakness} fundamentals`,
          `Complete additional practice`,
          `Seek specialized resources`
        ],
        expected_outcomes: ['Improved understanding', 'Better performance'],
        timeline: '1-2 weeks'
      });
    });
    
    // Schedule-based recommendations
    if (progressSummary.study_streak < 3) {
      recommendations.push({
        type: 'schedule',
        priority: 'high',
        title: 'Consistency Improvement',
        description: 'Establish more consistent study routine',
        rationale: 'Regular study habits are crucial for retention',
        action_items: [
          'Set daily study reminders',
          'Create study schedule',
          'Track daily progress'
        ],
        expected_outcomes: ['Better retention', 'Steady progress'],
        timeline: '1 week'
      });
    }
    
    return recommendations;
  }
  
  public updateProgress(learner_id: string, module: string, progress: number): void {
    const learningPath = this.learningPaths.get(learner_id);
    if (!learningPath) return;
    
    const currentModule = learningPath.recommended_sequence[learningPath.current_position];
    
    if (currentModule === module && progress === 100) {
      learningPath.current_position++;
      this.learningPaths.set(learner_id, learningPath);
    }
  }
  
  public getLearningPath(learner_id: string): LearningPath | undefined {
    return this.learningPaths.get(learner_id);
  }
  
  public getNextRecommendation(learner_id: string): string | null {
    const learningPath = this.learningPaths.get(learner_id);
    if (!learningPath || learningPath.current_position >= learningPath.recommended_sequence.length) {
      return null;
    }
    
    return learningPath.recommended_sequence[learningPath.current_position];
  }
  
  private generatePathId(): string {
    return 'path_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
  
  private generateAdjustmentId(): string {
    return 'adj_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
}

interface AdaptationRule {
  trigger: (performance: any) => boolean;
  adjustment: (path: LearningPath) => LearningPath;
}