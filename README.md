# 🏥 간호사 1대1 과외수업 MCP 시스템

전문 간호사를 위한 종양간호, 유전자치료, 임상시험 전문 과정을 제공하는 Model Context Protocol (MCP) 시스템입니다.

## 🎯 주요 기능

### 🔧 MCP 도구
- **간호학 지식 검색** (`get_nursing_knowledge`): 전문 간호학 지식과 최신 연구 자료 검색
- **임상 사례 분석** (`analyze_clinical_case`): 복잡한 임상 사례의 체계적 분석
- **간호계획 생성** (`generate_care_plan`): 개인화된 간호계획 자동 생성
- **옵시디언 연동** (`obsidian_integration`): 학습 노트 자동 생성 및 관리
- **연구 보조** (`research_assistant`): 최신 간호학 연구 동향 분석

### 📚 전문 과정
- **종양간호**: 암 생물학, 화학요법, 방사선치료, 완화간호
- **유전자치료**: 유전학 기초, 분자생물학, 유전자 편집, 유전상담
- **임상시험**: 연구 방법론, GCP 규정, 프로토콜 관리, 데이터 분석

### 🧠 개인화 학습
- 학습자 프로필 기반 맞춤형 학습 경로
- 실시간 학습 진도 추적
- 개인별 취약점 분석 및 보완
- 학습 스타일 적응형 콘텐츠 제공

## 📦 설치 방법

### 📋 사전 요구사항
- Node.js 18.0.0 이상
- npm 8.0.0 이상
- Claude Desktop 설치

### 🚀 빠른 설치 (권장)

```bash
# NPX를 통한 직접 설치
npx nursing-tutor-mcp setup
```

### 🛠️ 수동 설치

#### 1. 패키지 설치
```bash
npm install -g nursing-tutor-mcp
```

#### 2. 초기 설정
```bash
nursing-tutor-mcp setup
```

#### 3. Claude Desktop 재시작
Claude Desktop 애플리케이션을 완전히 종료하고 재시작합니다.

## 🖥️ 플랫폼별 설치 가이드

### 🪟 Windows PC

#### 설치 경로
- Claude Desktop 설정: `%APPDATA%\Claude\claude_desktop_config.json`
- 옵시디언 볼트: `%USERPROFILE%\Documents\Nursing-MCP-Vault`

#### 설치 명령
```cmd
# PowerShell 또는 Command Prompt
npx nursing-tutor-mcp setup
```

#### 문제 해결
- **권한 오류**: 관리자 권한으로 PowerShell 실행
- **경로 문제**: 백슬래시(`\`) 경로 자동 처리
- **Node.js 오류**: [Node.js 공식 사이트](https://nodejs.org/)에서 최신 LTS 버전 설치

### 🍎 macOS

#### 설치 경로
- Claude Desktop 설정: `~/Library/Application Support/Claude/claude_desktop_config.json`
- 옵시디언 볼트: `~/Documents/Nursing-MCP-Vault`

#### 설치 명령
```bash
npx nursing-tutor-mcp setup
```

### 🐧 Linux

#### 설치 경로
- Claude Desktop 설정: `~/.config/claude/claude_desktop_config.json`
- 옵시디언 볼트: `~/Documents/Nursing-MCP-Vault`

#### 설치 명령
```bash
npx nursing-tutor-mcp setup
```

## 📖 사용 방법

### 🏁 시작하기

1. **Claude Desktop 실행**
2. **새 채팅 시작**
3. **MCP 도구 확인** (채팅창 하단에 도구 아이콘 표시)
4. **간호학 질문이나 사례 분석 요청**

### 💬 사용 예시

```
사용자: 유방암 환자의 화학요법 부작용 관리에 대해 알려주세요.

Claude: get_nursing_knowledge 도구를 사용하여 유방암 화학요법 부작용 관리에 대한 최신 정보를 검색하겠습니다...
```

### 📝 옵시디언 연동

설정 완료 후 `~/Documents/Nursing-MCP-Vault` 폴더가 생성됩니다:

1. **Obsidian 실행**
2. **"Open folder as vault" 선택**
3. **생성된 폴더 선택**
4. **학습 노트 자동 생성 및 관리**

## 🔧 CLI 명령어

```bash
# MCP 서버 시작
nursing-tutor-mcp start

# 시스템 테스트
nursing-tutor-mcp test

# 초기 설정
nursing-tutor-mcp setup

# 버전 확인
nursing-tutor-mcp version

# 도움말
nursing-tutor-mcp help
```

## 🏗️ 개발 환경 설정

### 소스 코드 설치

```bash
# 저장소 클론
git clone https://github.com/voidlight/nursing-tutor-mcp.git
cd nursing-tutor-mcp

# 의존성 설치
npm install

# 개발 환경 실행
npm run dev

# 빌드
npm run build
```

### 폴더 구조

```
nursing-tutor-mcp/
├── src/
│   ├── index.ts              # MCP 서버 메인
│   ├── data/                 # 데이터 모델
│   ├── modules/              # 핵심 모듈
│   └── utils/                # 유틸리티
├── bin/
│   └── cli.js                # CLI 스크립트
├── scripts/
│   └── setup.js              # 설치 스크립트
├── dist/                     # 빌드 출력
└── README.md
```

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🐛 문제 신고

버그나 기능 요청은 [GitHub Issues](https://github.com/voidlight/nursing-tutor-mcp/issues)에 신고해주세요.

## 📞 지원

- 📧 이메일: support@nursing-tutor-mcp.com
- 📚 문서: [GitHub Wiki](https://github.com/voidlight/nursing-tutor-mcp/wiki)
- 💬 커뮤니티: [Discussions](https://github.com/voidlight/nursing-tutor-mcp/discussions)

---

**💡 Tips**: 학습 효과를 높이려면 옵시디언 볼트와 함께 사용하고, 매일 조금씩이라도 꾸준히 학습하세요!

<div align="center">
  <strong>🏥 전문 간호사를 위한 최고의 학습 파트너</strong>
</div>