#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

const distPath = join(__dirname, '..', 'dist', 'index.js');

if (!existsSync(distPath)) {
  console.error('❌ 빌드된 파일을 찾을 수 없습니다. npm run build를 실행해주세요.');
  process.exit(1);
}

switch (command) {
  case 'start':
    console.log('🏥 간호사 1대1 과외수업 MCP 서버를 시작합니다...');
    const server = spawn('node', [distPath], { stdio: 'inherit' });
    
    server.on('error', (error) => {
      console.error('❌ 서버 시작 중 오류가 발생했습니다:', error);
      process.exit(1);
    });
    
    server.on('close', (code) => {
      console.log(`🔄 서버가 종료되었습니다. (exit code: ${code})`);
      process.exit(code);
    });
    break;
    
  case 'test':
    console.log('🧪 시스템 통합 테스트를 실행합니다...');
    const testScript = join(__dirname, '..', 'scripts', 'test-all-modules.ts');
    const test = spawn('npx', ['tsx', testScript], { stdio: 'inherit' });
    
    test.on('error', (error) => {
      console.error('❌ 테스트 실행 중 오류가 발생했습니다:', error);
      process.exit(1);
    });
    
    test.on('close', (code) => {
      console.log(`🔄 테스트가 완료되었습니다. (exit code: ${code})`);
      process.exit(code);
    });
    break;
    
  case 'setup':
    console.log('⚙️  클로드 데스크탑 설정을 시작합니다...');
    const setup = spawn('node', [join(__dirname, '..', 'scripts', 'setup.js')], { stdio: 'inherit' });
    
    setup.on('error', (error) => {
      console.error('❌ 설정 중 오류가 발생했습니다:', error);
      process.exit(1);
    });
    
    setup.on('close', (code) => {
      console.log(`🔄 설정이 완료되었습니다. (exit code: ${code})`);
      process.exit(code);
    });
    break;
    
  case 'version':
  case '-v':
  case '--version':
    const packageJson = JSON.parse(require('fs').readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
    console.log(`간호사 1대1 과외수업 MCP v${packageJson.version}`);
    break;
    
  case 'help':
  case '-h':
  case '--help':
  default:
    console.log(`
🏥 간호사 1대1 과외수업 MCP 시스템

사용법: nursing-tutor-mcp <command>

Commands:
  start     MCP 서버 시작
  test      시스템 통합 테스트 실행
  setup     클로드 데스크탑 설정
  version   버전 정보 표시
  help      도움말 표시

예시:
  nursing-tutor-mcp start
  nursing-tutor-mcp test
  nursing-tutor-mcp setup

자세한 정보는 https://github.com/voidlight/nursing-tutor-mcp 를 참조하세요.
`);
    break;
}