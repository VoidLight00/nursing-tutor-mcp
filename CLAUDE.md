# 간호사 1대1 과외수업 MCP 시스템 - 프로젝트 메모리

## 📋 프로젝트 개요
- **프로젝트명**: 간호사 1대1 과외수업 MCP 시스템
- **목적**: 전문 간호사를 위한 종양간호, 유전자치료, 임상시험 전문 교육 시스템
- **기술스택**: TypeScript, Node.js, MCP SDK, Obsidian 연동
- **저장소**: https://github.com/VoidLight00/nursing-tutor-mcp (Private)

## 🎯 핵심 기능
### MCP 도구 (5개)
1. **get_nursing_knowledge** - 간호학 지식 검색
2. **analyze_clinical_case** - 임상 사례 분석
3. **generate_care_plan** - 간호계획 생성
4. **obsidian_integration** - 옵시디언 연동
5. **research_assistant** - 연구 보조

### 전문 과정 (3개)
1. **종양간호**: 암 생물학, 화학요법, 방사선치료, 완화간호
2. **유전자치료**: 유전학 기초, 분자생물학, 유전자 편집, 유전상담
3. **임상시험**: 연구 방법론, GCP 규정, 프로토콜 관리, 데이터 분석

## 🏗️ 시스템 구조
```
nursing-tutor-mcp/
├── src/
│   ├── index.ts              # MCP 서버 메인
│   ├── data/                 # 데이터 모델
│   │   ├── learner-profiles.ts
│   │   ├── nursing-core-areas.ts
│   │   └── nursing-database.ts
│   ├── modules/              # 10개 교육 모듈
│   ├── tools/                # 5개 MCP 도구
│   └── utils/                # 개인화 학습 엔진
├── bin/cli.js                # NPX CLI 인터페이스
├── scripts/setup.js          # 자동 설정 스크립트
└── dist/                     # 빌드 출력
```

## 🔧 개발 환경
- **Node.js**: >=18.0.0
- **TypeScript**: ^5.0.0
- **MCP SDK**: @modelcontextprotocol/sdk ^0.4.0
- **빌드**: `npm run build`
- **개발**: `npm run dev`
- **테스트**: `npm test`

## 📦 설치 방법
```bash
# NPX 직접 설치 (권장)
npx nursing-tutor-mcp setup

# 글로벌 설치
npm install -g nursing-tutor-mcp
nursing-tutor-mcp setup
```

## 🖥️ 플랫폼 지원
- **Windows**: %APPDATA%\Claude\claude_desktop_config.json
- **macOS**: ~/Library/Application Support/Claude/claude_desktop_config.json
- **Linux**: ~/.config/claude/claude_desktop_config.json

## 🧠 개인화 학습 시스템
### 학습자 프로필
```typescript
interface LearnerProfile {
  personal_info: { id, name, email, created_at, last_active };
  background: { education_level, nursing_experience, specializations };
  learning_preferences: { preferred_learning_style, study_schedule };
  career_goals: { target_specialty, certification_goals };
  current_status: { overall_progress, strengths, areas_for_improvement };
}
```

### 개인화 학습 엔진
- **적응형 학습 경로**: 학습자별 맞춤형 커리큘럼
- **실시간 진도 추적**: 학습 진행률 모니터링
- **취약점 분석**: 개인별 보완 영역 식별
- **학습 스타일 적응**: 시각적/청각적/실습형 학습 최적화

## 📚 옵시디언 연동
### 볼트 구조
```
Nursing-MCP-Vault/
├── Daily-Notes/           # 일일 학습 기록
├── Concepts/             # 개념 정리
├── Case-Studies/         # 임상 사례
├── Templates/            # 노트 템플릿
├── Resources/            # 학습 자료
├── Oncology/             # 종양간호
├── Gene-Therapy/         # 유전자치료
└── Clinical-Trials/      # 임상시험
```

### 자동 생성 템플릿
- **일일 학습 템플릿**: 학습 목표, 내용, 성찰, 계획
- **개념 정리 템플릿**: 정의, 핵심 내용, 임상 적용, 연결 개념

## 🔄 CLI 명령어
```bash
nursing-tutor-mcp start    # MCP 서버 시작
nursing-tutor-mcp test     # 시스템 테스트
nursing-tutor-mcp setup    # 초기 설정
nursing-tutor-mcp version  # 버전 확인
nursing-tutor-mcp help     # 도움말
```

## 🎓 교육 모듈 (10개)
1. **학습환경설정**: 개발 환경 구축
2. **MCP서버개발**: 핵심 서버 구현
3. **간호핵심영역**: 데이터베이스 및 분석
4. **개인학습관리시스템**: 프로필 및 진도 관리
5. **임상케이스시스템**: 사례 분석 도구
6. **임상실무모듈**: 실무 적용 훈련
7. **의료법령정보시스템**: 법적 지식 관리
8. **간호진단도구모음**: 진단 지원 도구
9. **옵시디언연동도구**: 지식 관리 시스템
10. **RAG시스템구축**: 검색 증강 생성

## 🚀 배포 상태
- **GitHub**: Private 저장소 (VoidLight00/nursing-tutor-mcp)
- **NPM**: 발행 준비 완료
- **Claude Desktop**: 통합 설정 완료
- **크로스 플랫폼**: Windows/macOS/Linux 지원

## 🔍 주요 개발 포인트
### TypeScript 설정
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
    "forceConsistentCasingInFileNames": true
  }
}
```

### MCP 서버 구현
```typescript
export class NursingTutorMCPServer {
  private server: Server;
  
  constructor() {
    this.server = new Server({
      name: 'nursing-tutor-mcp',
      version: '1.0.0',
    });
    this.setupHandlers();
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        { name: 'get_nursing_knowledge', description: '간호학 지식 검색' },
        { name: 'analyze_clinical_case', description: '임상 사례 분석' },
        { name: 'generate_care_plan', description: '간호계획 생성' },
        { name: 'obsidian_integration', description: '옵시디언 연동' },
        { name: 'research_assistant', description: '연구 보조' }
      ]
    }));
  }
}
```

## 🔐 보안 및 개인정보
- **프라이빗 저장소**: 소스코드 비공개
- **개인정보 보호**: 학습자 데이터 로컬 저장
- **암호화**: 민감 정보 암호화 처리
- **접근 제어**: 권한 기반 접근 관리

## 💡 향후 개선 사항
1. **AI 모델 통합**: 더 정교한 개인화 알고리즘
2. **실시간 협업**: 동료 학습자와의 상호작용
3. **모바일 앱**: 모바일 학습 환경 지원
4. **인증 시스템**: 학습 성과 인증 체계
5. **분석 대시보드**: 학습 데이터 시각화

---

**📅 최종 업데이트**: 2024-07-18  
**📊 프로젝트 상태**: 완료 ✅  
**🎯 다음 단계**: NPM 패키지 발행 및 사용자 테스트