# 01-학습환경설정

## 📚 개요
비전공자에서 간호사로 독학하는 분들을 위한 개별 코칭 환경을 설정합니다. 
옵시디언과 클로드를 연동하여 효율적인 학습 시스템을 구축합니다.

## 🎯 학습자 프로필
- **배경**: 비전공자 → 간호사 독학
- **현업**: 임상시험 및 유전자 기반 항암제 치료 분야
- **관심사**: MCP, RAG, 옵시디언 연동, 체계적 지식 관리
- **목표**: 개별 맞춤형 간호 지식 습득 및 체계화

## 🛠️ 개발 환경 구성

### 1. 기본 개발 환경
```bash
# Node.js 18+ 설치 필요
node --version
npm --version

# TypeScript 개발 환경
npm install -g typescript tsx

# MCP SDK 설치
npm install @modelcontextprotocol/sdk
```

### 2. 간호학 전문 라이브러리
```bash
# 의료 데이터 처리
npm install medical-terminology
npm install hl7-fhir

# 옵시디언 연동
npm install obsidian-api
npm install markdown-it

# RAG 시스템
npm install @langchain/core
npm install chromadb
```

### 3. 프로젝트 구조
```
간호사-1대1-과외수업-MCP개발/
├── src/
│   ├── index.ts                 # 메인 MCP 서버
│   ├── tools/                   # MCP 도구들
│   │   ├── nursing-knowledge.ts # 간호 지식 검색
│   │   ├── clinical-case.ts     # 임상 사례 분석
│   │   ├── care-plan.ts         # 간호계획 생성
│   │   ├── obsidian-sync.ts     # 옵시디언 연동
│   │   └── research-assistant.ts # 연구 보조
│   ├── data/                    # 간호학 데이터
│   │   ├── nursing-diagnosis.json
│   │   ├── clinical-guidelines.json
│   │   └── oncology-protocols.json
│   └── utils/                   # 유틸리티 함수
├── docs/                        # 문서화
├── tests/                       # 테스트 코드
└── scripts/                     # 자동화 스크립트
```

## 🔧 개발 도구 설정

### 1. VSCode 확장 프로그램
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-python.python",
    "obsidian.obsidian-vscode",
    "ms-vscode.vscode-json"
  ]
}
```

### 2. TypeScript 설정
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. 패키지 관리
```json
{
  "name": "nursing-tutor-mcp",
  "version": "1.0.0",
  "description": "간호사 1대1 과외수업을 위한 MCP 시스템",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "obsidian-sync": "tsx scripts/obsidian-sync.ts"
  },
  "keywords": [
    "nursing",
    "tutoring",
    "mcp",
    "obsidian",
    "rag",
    "oncology",
    "clinical-trial"
  ]
}
```

## 🏥 간호학 전문 영역 설정

### 1. 핵심 간호 영역
- **기본간호학**: 기본적인 간호 이론과 실무
- **성인간호학**: 성인 환자 간호 (종양학 포함)
- **아동간호학**: 소아 환자 간호
- **모성간호학**: 여성 건강 및 출산 간호
- **정신간호학**: 정신건강 간호
- **지역사회간호학**: 공중보건 간호

### 2. 전문 특화 영역
- **종양간호**: 암 환자 간호 (유전자 치료 포함)
- **임상시험 간호**: 연구 간호사 역할
- **유전자 치료**: 정밀의료 간호
- **항암제 치료**: 화학요법 간호

### 3. 의료법령 및 윤리
- **의료법**: 간호사 면허 및 업무 범위
- **간호윤리**: 환자 권리 및 간호사 윤리
- **의료기기법**: 의료기기 사용 및 관리
- **개인정보보호법**: 환자 정보 보호

## 🧠 학습 방법론

### 1. 체계적 학습 접근
- **개념 → 원리 → 적용** 순서
- **이론 → 실무 → 사례연구** 연결
- **기초 → 심화 → 전문** 단계별 학습

### 2. 지식 체계화 전략
- **마인드맵**: 개념 간 연관관계 시각화
- **플래시카드**: 핵심 개념 암기
- **사례 연구**: 실제 임상 상황 분석
- **셀프 퀴즈**: 학습 내용 점검

### 3. 옵시디언 활용법
- **일일 노트**: 학습 내용 기록
- **개념 연결**: 링크를 통한 지식 네트워크
- **태그 시스템**: 주제별 분류
- **템플릿**: 학습 양식 표준화

## 📊 학습 진도 관리

### 1. 학습 단계별 목표
```typescript
interface LearningGoal {
  phase: 'foundation' | 'intermediate' | 'advanced' | 'expert';
  subjects: string[];
  duration: number; // weeks
  milestones: string[];
}

const learningPath: LearningGoal[] = [
  {
    phase: 'foundation',
    subjects: ['기본간호학', '해부생리학', '간호윤리'],
    duration: 8,
    milestones: ['기본 개념 이해', '용어 정리', '기초 실습']
  },
  {
    phase: 'intermediate',
    subjects: ['성인간호학', '아동간호학', '모성간호학'],
    duration: 12,
    milestones: ['질병별 간호', '간호과정 적용', '사례 분석']
  },
  {
    phase: 'advanced',
    subjects: ['종양간호학', '임상시험', '유전자치료'],
    duration: 8,
    milestones: ['전문 지식 습득', '연구 이해', '최신 동향']
  },
  {
    phase: 'expert',
    subjects: ['개별 맞춤형 심화 학습'],
    duration: 4,
    milestones: ['전문성 강화', '실무 적용', '지속적 발전']
  }
];
```

### 2. 성과 측정 지표
- **이론 이해도**: 개념 설명 정확도
- **실무 적용**: 사례 분석 능력
- **지식 연결**: 영역 간 통합 사고
- **자기주도 학습**: 독립적 학습 능력

## 🤝 개별 코칭 계획

### 1. 맞춤형 학습 계획
- **현재 수준 진단**: 사전 평가
- **목표 설정**: 단기/장기 목표
- **학습 경로**: 개별 맞춤 커리큘럼
- **진도 점검**: 주간/월간 리뷰

### 2. 코칭 방식
- **질문 기반 학습**: 궁금증 해결
- **사례 중심 학습**: 실제 상황 적용
- **피드백 제공**: 학습 방향 조정
- **동기 부여**: 성취감 극대화

## 📝 다음 단계
1. 간호학 핵심 개념 데이터베이스 구축
2. 옵시디언 연동 시스템 개발
3. RAG 기반 지식 검색 시스템 구현
4. 임상 사례 분석 도구 개발
5. 개인 학습 진도 추적 시스템 구축

---

**목표**: 체계적이고 효율적인 간호학 학습 환경 조성  
**방법**: 기술과 교육의 융합을 통한 개별 맞춤형 코칭  
**결과**: 전문성 있는 간호사로의 성장 지원