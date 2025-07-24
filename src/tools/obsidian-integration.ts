import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export class ObsidianIntegrationTool {
  private obsidianVault: string;
  
  constructor() {
    // Default to a folder in user's home directory to avoid permission issues
    this.obsidianVault = process.env.OBSIDIAN_VAULT_PATH || 
                         path.join(os.homedir(), 'Documents', 'NursingTutorVault');
  }
  
  async execute(args: {
    note_type: 'daily' | 'concept' | 'case_study';
    content: string;
    tags: string[];
  }) {
    const { note_type, content, tags } = args;
    
    const note = await this.createObsidianNote(note_type, content, tags);
    
    let message = `✅ 옵시디언 노트가 생성되었습니다!\n\n**파일명**: ${note.filename}\n**위치**: ${note.path}\n\n`;
    
    if ((note as any).error) {
      message += `⚠️ **주의**: ${(note as any).error}\n\n`;
    }
    
    message += `**미리보기**:\n${note.preview}\n\n**연결된 태그**: ${tags.join(', ')}\n\n`;
    
    if (!(note as any).error) {
      message += `노트가 성공적으로 생성되어 옵시디언 볼트에 저장되었습니다.`;
    } else {
      message += `노트를 옵시디언에서 열려면 위 경로의 파일을 옵시디언 볼트로 복사하세요.`;
    }
    
    return {
      content: [
        {
          type: 'text',
          text: message
        }
      ]
    };
  }
  
  private async createObsidianNote(
    type: string,
    content: string,
    tags: string[]
  ) {
    const timestamp = new Date().toISOString().split('T')[0];
    const timeId = Math.random().toString(36).substr(2, 9);
    const filename = `${timestamp}-${type}-${timeId}.md`;
    
    const noteContent = this.generateNoteContent(type, content, tags);
    const notePath = path.join(this.obsidianVault, filename);
    
    try {
      this.ensureDirectoryExists(this.obsidianVault);
      await fs.promises.writeFile(notePath, noteContent, 'utf8');
    } catch (error) {
      console.error('옵시디언 노트 생성 중 오류:', error);
      
      // If permission error, try alternative location
      if ((error as any).code === 'EACCES' || (error as any).code === 'EPERM') {
        const altPath = path.join(os.tmpdir(), 'nursing-tutor-notes');
        this.ensureDirectoryExists(altPath);
        const altNotePath = path.join(altPath, filename);
        await fs.promises.writeFile(altNotePath, noteContent, 'utf8');
        
        return {
          filename,
          path: altNotePath,
          content: noteContent,
          preview: this.generatePreview(content, type),
          tags: tags,
          error: '원래 위치에 권한 문제로 임시 폴더에 저장되었습니다.'
        };
      }
      
      throw error;
    }
    
    return {
      filename,
      path: notePath,
      content: noteContent,
      preview: this.generatePreview(content, type),
      tags: tags
    };
  }
  
  private generateNoteContent(type: string, content: string, tags: string[]): string {
    const frontMatter = this.generateFrontMatter(type, tags);
    const title = this.getTitleFromType(type);
    const template = this.getTemplateByType(type);
    
    return `${frontMatter}

# ${title}

${content}

${template}

## 🔗 연관 개념
${this.generateRelatedConcepts(type)}

## 📝 학습 메모
${this.generateLearningChecklist(type)}

## 🎯 복습 계획
${this.generateReviewPlan(type)}

---
*생성일: ${new Date().toLocaleString('ko-KR')}*
*마지막 수정: ${new Date().toLocaleString('ko-KR')}*
`;
  }
  
  private generateFrontMatter(type: string, tags: string[]): string {
    const allTags = [...tags, 'nursing', type];
    
    return `---
tags: [${allTags.join(', ')}]
type: ${type}
created: ${new Date().toISOString()}
modified: ${new Date().toISOString()}
status: active
priority: medium
---`;
  }
  
  private getTitleFromType(type: string): string {
    const titles: { [key: string]: string } = {
      'daily': '일일 학습 노트',
      'concept': '개념 정리 노트',
      'case_study': '사례 연구 노트'
    };
    
    return titles[type] || '학습 노트';
  }
  
  private getTemplateByType(type: string): string {
    const templates: { [key: string]: string } = {
      'daily': `
## 📅 오늘의 학습 목표
- [ ] 목표 1
- [ ] 목표 2
- [ ] 목표 3

## 📚 학습한 내용
(위 내용 참조)

## 🤔 어려웠던 점
- 

## 💡 새로 알게 된 것
- 

## 🔄 복습이 필요한 부분
- `,
      
      'concept': `
## 📖 개념 정의
(위 내용 참조)

## 🔍 세부 내용
### 주요 특징
- 

### 임상 적용
- 

### 주의사항
- 

## 🧪 실습 포인트
- 

## ❓ 추가 질문
- `,
      
      'case_study': `
## 📋 사례 요약
(위 내용 참조)

## 🔍 분석 과정
### 1. 문제 파악
- 

### 2. 간호진단
- 

### 3. 계획 수립
- 

### 4. 중재 실행
- 

### 5. 평가
- 

## 📊 학습 성과
- 

## 🎯 적용 계획
- `
    };
    
    return templates[type] || '';
  }
  
  private generateRelatedConcepts(type: string): string {
    const concepts: { [key: string]: string[] } = {
      'daily': ['[[간호과정]]', '[[환자안전]]', '[[간호윤리]]'],
      'concept': ['[[기본간호학]]', '[[성인간호학]]', '[[임상실습]]'],
      'case_study': ['[[간호진단]]', '[[간호계획]]', '[[간호평가]]']
    };
    
    return concepts[type]?.map(c => `- ${c}`).join('\n') || '- [[간호학 기초]]';
  }
  
  private generateLearningChecklist(type: string): string {
    const checklists: { [key: string]: string[] } = {
      'daily': [
        '[ ] 오늘의 학습 목표 달성',
        '[ ] 핵심 개념 정리',
        '[ ] 실습 적용 방법 이해',
        '[ ] 복습 계획 수립'
      ],
      'concept': [
        '[ ] 개념 정의 완전 이해',
        '[ ] 임상 적용 사례 파악',
        '[ ] 관련 개념과의 연결성 파악',
        '[ ] 실습에서 활용 방법 계획'
      ],
      'case_study': [
        '[ ] 사례 분석 완료',
        '[ ] 간호진단 적절성 검토',
        '[ ] 간호계획 실현 가능성 검토',
        '[ ] 유사 사례 적용 방법 계획'
      ]
    };
    
    return checklists[type]?.join('\n') || '- [ ] 학습 내용 복습';
  }
  
  private generateReviewPlan(type: string): string {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR');
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR');
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR');
    
    return `- **1일 후 (${tomorrow})**: 핵심 개념 재확인
- **1주 후 (${nextWeek})**: 실습 적용 및 응용
- **1개월 후 (${nextMonth})**: 종합 정리 및 심화 학습`;
  }
  
  private generatePreview(content: string, type: string): string {
    const preview = content.substring(0, 200);
    const typeKorean = type === 'daily' ? '일일 학습' : type === 'concept' ? '개념 정리' : '사례 연구';
    
    return `[${typeKorean}] ${preview}${content.length > 200 ? '...' : ''}`;
  }
  
  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}