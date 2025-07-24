import { MedicationDatabase } from './nursing-medications.js';
import { LabValuesDatabase } from './lab-values.js';
import { NursingDiagnosesDatabase } from './nursing-diagnoses.js';
import { ClinicalProtocolsDatabase } from './clinical-protocols.js';

export class NursingDatabase {
  private knowledgeBase: Map<string, any>;
  private medicationDb: MedicationDatabase;
  private labValuesDb: LabValuesDatabase;
  private nursingDiagnosesDb: NursingDiagnosesDatabase;
  private protocolsDb: ClinicalProtocolsDatabase;
  
  constructor() {
    this.knowledgeBase = new Map();
    this.medicationDb = new MedicationDatabase();
    this.labValuesDb = new LabValuesDatabase();
    this.nursingDiagnosesDb = new NursingDiagnosesDatabase();
    this.protocolsDb = new ClinicalProtocolsDatabase();
    this.initializeDatabase();
  }
  
  async searchKnowledge(topic: string, level: string, specialty?: string): Promise<any> {
    const searchKey = `${topic.toLowerCase()}_${level}`;
    const knowledge = this.knowledgeBase.get(searchKey) || this.getDefaultKnowledge(topic, level);
    
    if (specialty) {
      return this.filterBySpecialty(knowledge, specialty);
    }
    
    return knowledge;
  }
  
  private initializeDatabase(): void {
    this.knowledgeBase.set('종양간호_basic', {
      title: '종양간호학 기초',
      basic_definition: '암 환자의 전인적 간호를 제공하는 간호학의 전문 분야로, 암의 예방, 조기 발견, 치료, 재활, 완화 간호를 포함합니다.',
      key_points: [
        '암의 기본 개념과 발생 원인',
        '암 환자의 신체적, 심리적, 사회적 요구',
        '암 치료 방법과 부작용',
        '감염 예방과 안전 관리',
        '통증 관리와 완화 간호'
      ],
      learning_objectives: [
        '암의 병태생리학적 과정 이해',
        '항암 치료의 종류와 부작용 파악',
        '종양 환자의 간호 문제 식별',
        '안전한 항암제 취급 방법 습득'
      ],
      related_concepts: ['기본간호학', '성인간호학', '약리학', '병리학']
    });
    
    this.knowledgeBase.set('종양간호_intermediate', {
      title: '종양간호학 중급',
      detailed_explanation: '종양간호는 암 환자와 가족을 대상으로 하는 전문화된 간호 실무입니다. 다학제 팀의 일원으로서 환자의 치료 과정 전반에 걸쳐 포괄적인 간호를 제공합니다.',
      clinical_applications: [
        '화학요법 시 간호 관리',
        '방사선 치료 환자 간호',
        '수술 전후 간호',
        '면역치료 부작용 관리',
        '호스피스 및 완화 간호'
      ],
      learning_objectives: [
        '종양별 특성과 간호 접근법 이해',
        '항암제 투여 시 안전 관리',
        '부작용 조기 발견 및 중재',
        '환자 교육 및 자가 관리 지도'
      ],
      related_concepts: ['약물안전관리', '감염관리', '통증관리', '영양관리']
    });
    
    this.knowledgeBase.set('종양간호_advanced', {
      title: '종양간호학 고급',
      advanced_concepts: '최신 종양 치료법인 면역치료, 표적치료, 정밀의료 등에 대한 깊이 있는 이해와 함께 종양간호 전문가로서의 역할을 수행합니다.',
      recent_research: '최근 연구에서는 CAR-T 세포 치료, 면역관문억제제, 종양 바이오마커 등의 새로운 치료법이 주목받고 있습니다.',
      clinical_evidence: '체계적 문헌고찰 결과, 전문 종양간호사의 개입이 환자의 치료 결과와 삶의 질 향상에 유의한 효과를 보임이 입증되었습니다.',
      learning_objectives: [
        '최신 종양 치료법의 간호적 접근',
        '종양간호 연구 방법론 이해',
        '전문 간호사로서의 리더십 개발',
        '종양간호 정책 및 윤리 이슈 분석'
      ],
      related_concepts: ['정밀의료', '면역치료', '표적치료', '생물학적치료']
    });
    
    this.knowledgeBase.set('유전자치료_basic', {
      title: '유전자 치료 기초',
      basic_definition: '유전자 치료는 질병의 원인이 되는 유전자를 수정하거나 정상 유전자를 도입하여 질병을 치료하는 방법입니다.',
      key_points: [
        '유전자 치료의 기본 원리',
        'DNA, RNA의 구조와 기능',
        '유전자 전달 방법',
        '유전자 치료의 종류',
        '윤리적 고려사항'
      ],
      learning_objectives: [
        '유전학의 기본 개념 이해',
        '유전자 치료의 원리 파악',
        '유전 상담의 중요성 인식',
        '윤리적 이슈 이해'
      ],
      related_concepts: ['분자생물학', '유전학', '생명윤리', '상담이론']
    });
    
    this.knowledgeBase.set('유전자치료_intermediate', {
      title: '유전자 치료 중급',
      detailed_explanation: '유전자 치료는 벡터를 이용한 유전자 전달, 유전자 편집 기술, 세포 치료 등 다양한 방법으로 구현됩니다.',
      clinical_applications: [
        'CRISPR-Cas9 유전자 편집',
        '바이러스 벡터 기반 치료',
        'mRNA 치료법',
        '줄기세포 치료',
        '유전자 백신'
      ],
      learning_objectives: [
        '유전자 편집 기술의 임상 적용',
        '유전자 치료 부작용 관리',
        '환자 모니터링 방법',
        '가족 상담 기법'
      ],
      related_concepts: ['세포치료', '줄기세포', '면역학', '약물전달시스템']
    });
    
    this.knowledgeBase.set('유전자치료_advanced', {
      title: '유전자 치료 고급',
      advanced_concepts: '차세대 유전자 치료는 표적 특이성을 높이고 부작용을 최소화하는 방향으로 발전하고 있습니다.',
      recent_research: '최근 연구에서는 염기 편집, 프라임 편집 등의 정밀 유전자 편집 기술이 주목받고 있습니다.',
      clinical_evidence: '여러 임상시험에서 유전자 치료의 안전성과 효과가 입증되어 FDA 승인을 받은 제품들이 증가하고 있습니다.',
      learning_objectives: [
        '최신 유전자 편집 기술 이해',
        '임상시험 설계 및 관리',
        '규제 요구사항 이해',
        '환자 안전 관리 체계'
      ],
      related_concepts: ['염기편집', '프라임편집', '후성유전학', '정밀의료']
    });
    
    this.knowledgeBase.set('임상시험_basic', {
      title: '임상시험 기초',
      basic_definition: '임상시험은 새로운 치료법이나 의료기기의 안전성과 효과를 평가하기 위해 사람을 대상으로 실시하는 연구입니다.',
      key_points: [
        '임상시험의 정의와 목적',
        '임상시험 단계 (Phase I-IV)',
        '연구 윤리와 피험자 보호',
        '임상시험 승인 과정',
        '좋은 임상시험 실시 기준 (GCP)'
      ],
      learning_objectives: [
        '임상시험의 기본 개념 이해',
        '연구 윤리 원칙 파악',
        '동의서 과정의 중요성 인식',
        '임상시험 간호사 역할 이해'
      ],
      related_concepts: ['연구방법론', '통계학', '의료윤리', '약물안전성']
    });
    
    this.knowledgeBase.set('임상시험_intermediate', {
      title: '임상시험 중급',
      detailed_explanation: '임상시험에서 간호사는 피험자 등록, 데이터 수집, 안전성 모니터링, 프로토콜 준수 등의 핵심 역할을 담당합니다.',
      clinical_applications: [
        '피험자 스크리닝 및 등록',
        '임상시험 약물 관리',
        '이상 반응 모니터링',
        '데이터 수집 및 관리',
        '프로토콜 준수 확인'
      ],
      learning_objectives: [
        '임상시험 프로토콜 이해',
        '데이터 품질 관리',
        '이상 반응 보고 체계',
        '피험자 교육 및 상담'
      ],
      related_concepts: ['임상데이터관리', '약물안전성', '품질관리', '규제과학']
    });
    
    this.knowledgeBase.set('임상시험_advanced', {
      title: '임상시험 고급',
      advanced_concepts: '고급 임상시험 관리에서는 복잡한 프로토콜, 다기관 연구, 국제 협력 연구를 관리하는 능력이 필요합니다.',
      recent_research: '최근에는 적응형 임상시험, 실제 임상 데이터(RWD) 활용, 디지털 헬스케어 기술 도입이 주목받고 있습니다.',
      clinical_evidence: '체계적 분석 결과, 전문 임상시험 간호사의 참여가 데이터 품질과 피험자 안전에 긍정적 영향을 미치는 것으로 나타났습니다.',
      learning_objectives: [
        '고급 임상시험 설계 이해',
        '글로벌 임상시험 관리',
        '규제 요구사항 전문성',
        '임상시험 질 관리 체계'
      ],
      related_concepts: ['적응형임상시험', '실제임상데이터', '디지털헬스케어', '글로벌임상시험']
    });
    
    this.knowledgeBase.set('간호과정_basic', {
      title: '간호과정 기초',
      basic_definition: '간호과정은 환자의 건강 문제를 체계적으로 해결하기 위한 문제 해결 과정으로, 사정, 진단, 계획, 수행, 평가의 5단계로 구성됩니다.',
      key_points: [
        '간호과정의 5단계',
        '체계적 사정 방법',
        '간호진단 분류체계',
        '간호계획 수립',
        '간호중재 수행과 평가'
      ],
      learning_objectives: [
        '간호과정 각 단계의 특성 이해',
        '체계적 사정 기법 습득',
        '간호진단 도출 능력 개발',
        '간호계획 수립 방법 학습'
      ],
      related_concepts: ['간호이론', '건강사정', '간호진단', '간호중재']
    });
    
    this.knowledgeBase.set('간호과정_intermediate', {
      title: '간호과정 중급',
      detailed_explanation: '간호과정은 간호의 전문성을 보여주는 핵심 도구로, 근거 기반 간호 실무의 기반이 됩니다.',
      clinical_applications: [
        '복합적 건강 문제 사정',
        '우선순위 결정',
        '개별화된 간호계획',
        '다학제 팀 협력',
        '간호 결과 평가'
      ],
      learning_objectives: [
        '복잡한 간호 상황 분석',
        '우선순위 결정 기법',
        '간호 결과 측정 방법',
        '질 개선 활동 참여'
      ],
      related_concepts: ['근거기반간호', '환자안전', '질개선', '간호정보학']
    });
    
    this.knowledgeBase.set('간호과정_advanced', {
      title: '간호과정 고급',
      advanced_concepts: '고급 간호과정은 복잡한 건강 문제를 가진 환자들을 대상으로 하는 전문적이고 포괄적인 간호 접근법입니다.',
      recent_research: '최근 연구에서는 인공지능과 빅데이터를 활용한 간호과정의 디지털화가 주목받고 있습니다.',
      clinical_evidence: '체계적 문헌고찰 결과, 표준화된 간호과정 적용이 환자 결과와 간호의 질 향상에 유의한 효과를 보입니다.',
      learning_objectives: [
        '고급 간호과정 모델 적용',
        '간호 연구 방법론 활용',
        '간호 정책 개발 참여',
        '간호 교육 및 멘토링'
      ],
      related_concepts: ['간호연구', '간호정책', '간호교육', '간호리더십']
    });
  }
  
  private getDefaultKnowledge(topic: string, level: string): any {
    return {
      title: `${topic} (${level})`,
      basic_definition: `${topic}에 대한 기본 정보를 제공합니다.`,
      key_points: [
        `${topic}의 기본 개념`,
        `${topic}의 중요성`,
        `${topic}의 실무 적용`
      ],
      detailed_explanation: `${topic}에 대한 상세한 설명입니다.`,
      clinical_applications: [
        `${topic}의 임상 적용`,
        `${topic}의 실무 활용`
      ],
      advanced_concepts: `${topic}의 고급 개념과 최신 동향입니다.`,
      recent_research: `${topic} 분야의 최신 연구 동향입니다.`,
      clinical_evidence: `${topic}에 대한 임상 근거입니다.`,
      learning_objectives: [
        `${topic} 기본 개념 이해`,
        `${topic} 실무 적용 능력 개발`
      ],
      related_concepts: ['간호학', '의학', '보건학']
    };
  }
  
  private filterBySpecialty(knowledge: any, specialty: string): any {
    const specialtyKeywords: { [key: string]: string[] } = {
      'oncology': ['암', '종양', '항암', '화학요법', '방사선'],
      'genetics': ['유전', '유전자', 'DNA', 'RNA', '염색체'],
      'clinical_trial': ['임상시험', '연구', '프로토콜', '피험자'],
      'nursing': ['간호', '환자', '간호사', '간호중재', '간호진단']
    };
    
    const keywords = specialtyKeywords[specialty] || [];
    
    if (keywords.length === 0) {
      return knowledge;
    }
    
    return {
      ...knowledge,
      specialty_focus: `${specialty} 전문 분야에 특화된 내용`,
      specialized_applications: keywords.map(keyword => `${keyword} 관련 실무 적용`),
      specialty_considerations: `${specialty} 분야의 특별한 고려사항들`
    };
  }

  // 약물 데이터베이스 접근 메서드
  getMedication(id: string) {
    return this.medicationDb.getMedication(id);
  }

  searchMedications(query: string) {
    return this.medicationDb.searchMedications(query);
  }

  getMedicationsByCategory(category: string) {
    return this.medicationDb.getMedicationsByCategory(category);
  }

  // 검사 수치 데이터베이스 접근 메서드
  getLabValue(id: string) {
    return this.labValuesDb.getLabValue(id);
  }

  searchLabValues(query: string) {
    return this.labValuesDb.searchLabValues(query);
  }

  interpretLabValue(labId: string, value: number, gender?: 'male' | 'female') {
    return this.labValuesDb.interpretValue(labId, value, gender);
  }

  getCriticalAlerts(labId: string, value: number) {
    return this.labValuesDb.getCriticalAlerts(labId, value);
  }

  // 간호진단 데이터베이스 접근 메서드
  getNursingDiagnosis(code: string) {
    return this.nursingDiagnosesDb.getDiagnosis(code);
  }

  searchNursingDiagnoses(query: string) {
    return this.nursingDiagnosesDb.searchDiagnoses(query);
  }

  suggestNursingDiagnoses(symptoms: string[]) {
    return this.nursingDiagnosesDb.suggestDiagnoses(symptoms);
  }

  // 임상 프로토콜 데이터베이스 접근 메서드
  getClinicalProtocol(id: string) {
    return this.protocolsDb.getProtocol(id);
  }

  searchClinicalProtocols(query: string) {
    return this.protocolsDb.searchProtocols(query);
  }

  getProtocolsByCategory(category: string) {
    return this.protocolsDb.getProtocolsByCategory(category);
  }
}