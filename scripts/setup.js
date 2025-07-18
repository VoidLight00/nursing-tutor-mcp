#!/usr/bin/env node

import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWindows = process.platform === 'win32';
const isMacOS = process.platform === 'darwin';

async function setupClaudeDesktop() {
  console.log('🏥 간호사 1대1 과외수업 MCP 설정을 시작합니다...');
  
  try {
    // Claude Desktop 설정 파일 경로 결정
    let configPath;
    if (isWindows) {
      configPath = join(homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json');
    } else if (isMacOS) {
      configPath = join(homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
    } else {
      // Linux
      configPath = join(homedir(), '.config', 'claude', 'claude_desktop_config.json');
    }
    
    console.log(`📁 설정 파일 경로: ${configPath}`);
    
    // 디렉토리 생성
    const configDir = dirname(configPath);
    await fs.mkdir(configDir, { recursive: true });
    
    // 현재 설정 파일 읽기 (있다면)
    let config = {};
    try {
      const existingConfig = await fs.readFile(configPath, 'utf8');
      config = JSON.parse(existingConfig);
    } catch (error) {
      console.log('📝 새로운 설정 파일을 생성합니다...');
    }
    
    // MCP 서버 설정 추가
    if (!config.mcpServers) {
      config.mcpServers = {};
    }
    
    // 현재 프로젝트 경로 결정
    const projectPath = join(__dirname, '..');
    const serverPath = join(projectPath, 'dist', 'index.js');
    
    config.mcpServers['nursing-tutor-mcp'] = {
      command: 'node',
      args: [serverPath],
      env: {
        NODE_ENV: 'production'
      }
    };
    
    // 설정 파일 저장
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    
    console.log('✅ Claude Desktop 설정이 완료되었습니다!');
    console.log('');
    console.log('📋 다음 단계:');
    console.log('1. Claude Desktop을 재시작하세요');
    console.log('2. 새 채팅을 시작하세요');
    console.log('3. MCP 도구가 활성화되었는지 확인하세요');
    console.log('');
    console.log('🔧 사용 가능한 도구:');
    console.log('• get_nursing_knowledge - 간호학 지식 검색');
    console.log('• analyze_clinical_case - 임상 사례 분석');
    console.log('• generate_care_plan - 간호계획 생성');
    console.log('• obsidian_integration - 옵시디언 연동');
    console.log('• research_assistant - 연구 보조');
    
  } catch (error) {
    console.error('❌ 설정 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

async function createObsidianVault() {
  console.log('📓 옵시디언 볼트 설정을 시작합니다...');
  
  try {
    const vaultPath = join(homedir(), 'Documents', 'Nursing-MCP-Vault');
    
    // 볼트 디렉토리 생성
    await fs.mkdir(vaultPath, { recursive: true });
    
    // 기본 폴더 구조 생성
    const folders = [
      'Daily-Notes',
      'Concepts',
      'Case-Studies',
      'Templates',
      'Resources',
      'Oncology',
      'Gene-Therapy',
      'Clinical-Trials'
    ];
    
    for (const folder of folders) {
      await fs.mkdir(join(vaultPath, folder), { recursive: true });
    }
    
    // 기본 템플릿 생성
    const dailyTemplate = `# 📚 학습 일지 - {{date}}

## 🎯 오늘의 목표
- [ ] 목표 1
- [ ] 목표 2

## 📖 학습 내용
### 주요 개념
- 

### 중요 포인트
- 

## 🤔 어려웠던 점
- 

## 💡 깨달음과 통찰
- 

## 🔗 연관 개념
- [[개념 1]]
- [[개념 2]]

## 📝 내일 계획
- [ ] 계획 1
- [ ] 계획 2

---
*생성일: {{date}}*
*태그: #일일학습 #간호학*`;

    await fs.writeFile(join(vaultPath, 'Templates', 'Daily-Note-Template.md'), dailyTemplate);
    
    const conceptTemplate = `# 🧠 {{title}}

## 📝 정의
개념의 명확한 정의를 작성하세요.

## 🔍 핵심 내용
### 주요 특징
- 특징 1
- 특징 2

### 임상 적용
- 적용 1
- 적용 2

## 🌐 연결 개념
- [[상위 개념]]
- [[하위 개념]]
- [[관련 개념]]

## 📚 참고 자료
- 교재 페이지:
- 논문 링크:
- 온라인 자료:

## 🎯 학습 포인트
- [ ] 기본 개념 이해
- [ ] 임상 적용 파악
- [ ] 관련 개념 연결

---
*생성일: {{date}}*
*태그: #개념정리 #{{category}}*`;

    await fs.writeFile(join(vaultPath, 'Templates', 'Concept-Template.md'), conceptTemplate);
    
    // README 파일 생성
    const readmeContent = `# 🏥 간호사 1대1 과외수업 MCP 볼트

이 옵시디언 볼트는 간호사 1대1 과외수업 MCP 시스템과 연동하여 사용하는 학습 공간입니다.

## 📁 폴더 구조

- **Daily-Notes**: 일일 학습 기록
- **Concepts**: 개념 정리 노트
- **Case-Studies**: 임상 사례 연구
- **Templates**: 노트 템플릿
- **Resources**: 학습 자료
- **Oncology**: 종양간호 전문 자료
- **Gene-Therapy**: 유전자 치료 관련 자료
- **Clinical-Trials**: 임상시험 관련 자료

## 🎯 사용 방법

1. **일일 학습**: Daily-Notes 폴더에서 매일 학습 기록 작성
2. **개념 정리**: Concepts 폴더에서 주요 개념 정리
3. **사례 연구**: Case-Studies 폴더에서 임상 사례 분석
4. **템플릿 활용**: Templates 폴더의 템플릿을 사용하여 일관성 있는 노트 작성

## 🔗 MCP 연동

Claude Desktop에서 MCP 도구를 사용하여 자동으로 노트를 생성하고 업데이트할 수 있습니다.

## 📚 학습 가이드

### 종양간호 학습 경로
1. 암 생물학 기초 → Oncology/Cancer-Biology.md
2. 화학요법 → Oncology/Chemotherapy.md
3. 방사선치료 → Oncology/Radiation-Therapy.md
4. 완화간호 → Oncology/Palliative-Care.md

### 유전자치료 학습 경로
1. 유전학 기초 → Gene-Therapy/Genetics-Basics.md
2. 분자생물학 → Gene-Therapy/Molecular-Biology.md
3. 유전자 편집 → Gene-Therapy/Gene-Editing.md
4. 유전상담 → Gene-Therapy/Genetic-Counseling.md

### 임상시험 학습 경로
1. 연구 방법론 → Clinical-Trials/Research-Methods.md
2. GCP 규정 → Clinical-Trials/GCP-Guidelines.md
3. 프로토콜 관리 → Clinical-Trials/Protocol-Management.md
4. 데이터 관리 → Clinical-Trials/Data-Management.md

---
*생성일: ${new Date().toLocaleDateString('ko-KR')}*
*버전: 1.0.0*`;

    await fs.writeFile(join(vaultPath, 'README.md'), readmeContent);
    
    console.log('✅ 옵시디언 볼트 설정이 완료되었습니다!');
    console.log(`📁 볼트 경로: ${vaultPath}`);
    console.log('');
    console.log('📋 다음 단계:');
    console.log('1. Obsidian에서 "Open folder as vault" 선택');
    console.log(`2. 생성된 폴더 (${vaultPath}) 선택`);
    console.log('3. 볼트가 열리면 학습을 시작하세요!');
    
  } catch (error) {
    console.error('❌ 옵시디언 볼트 설정 중 오류가 발생했습니다:', error);
  }
}

async function main() {
  console.log('🚀 간호사 1대1 과외수업 MCP 설정 시작');
  console.log('=====================================');
  
  // 빌드 확인
  const distPath = join(__dirname, '..', 'dist');
  try {
    await fs.access(distPath);
  } catch {
    console.log('📦 프로젝트를 빌드합니다...');
    const { spawn } = await import('child_process');
    const build = spawn('npm', ['run', 'build'], { 
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });
    
    await new Promise((resolve, reject) => {
      build.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`빌드 실패 (exit code: ${code})`));
      });
    });
  }
  
  await setupClaudeDesktop();
  await createObsidianVault();
  
  console.log('');
  console.log('🎉 설정이 모두 완료되었습니다!');
  console.log('');
  console.log('📚 시작하기:');
  console.log('1. Claude Desktop 재시작');
  console.log('2. Obsidian에서 생성된 볼트 열기');
  console.log('3. 간호학 학습 시작!');
  console.log('');
  console.log('🔧 문제가 발생하면:');
  console.log('- nursing-tutor-mcp test (시스템 테스트)');
  console.log('- nursing-tutor-mcp help (도움말)');
  console.log('- https://github.com/voidlight/nursing-tutor-mcp (문서)');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}