#!/usr/bin/env tsx
/**
 * Nursing Tutor MCP v2.0 Demo
 * 실제 사용 예시를 보여주는 데모 스크립트
 */

import { NursingDatabase } from '../src/data/nursing-database.js';
import { ClinicalCasesDatabase } from '../src/data/clinical-cases.js';

console.log('🏥 Nursing Tutor MCP v2.0 - 실제 데이터 기반 간호 지원 시스템\n');

const db = new NursingDatabase();
const casesDb = new ClinicalCasesDatabase();

// 1. 약물 정보 검색 예시
console.log('=== 1. 약물 정보 검색 ===');
console.log('검색어: "morphine"\n');

const morphine = db.getMedication('morphine');
if (morphine) {
  console.log(`약물명: ${morphine.nameKorean} (${morphine.name})`);
  console.log(`분류: ${morphine.categoryKorean}`);
  console.log(`용법: ${morphine.dosage.adult}`);
  console.log(`주요 부작용: ${morphine.sideEffects.common.slice(0, 3).join(', ')}`);
  console.log(`간호 고려사항: ${morphine.nursingConsiderations[0]}`);
}

// 2. 검사 수치 해석 예시
console.log('\n\n=== 2. 검사 수치 해석 ===');
console.log('환자 검사 결과: 헤모글로빈 8.5 g/dL (남성)\n');

const interpretation = db.interpretLabValue('hemoglobin', 8.5, 'male');
console.log(`해석: ${interpretation}`);

const alerts = db.getCriticalAlerts('hemoglobin', 8.5);
alerts.forEach(alert => console.log(alert));

const hgb = db.getLabValue('hemoglobin');
if (hgb) {
  console.log(`\n간호 고려사항:`);
  hgb.nursingConsiderations.slice(0, 2).forEach(nc => console.log(`- ${nc}`));
}

// 3. 간호진단 제안 예시
console.log('\n\n=== 3. 간호진단 제안 ===');
console.log('환자 증상: 피로, 호흡곤란, 활동 시 악화\n');

const suggestedDiagnoses = db.suggestNursingDiagnoses(['피로', '호흡곤란', '활동 제한']);
console.log('제안된 간호진단:');
suggestedDiagnoses.slice(0, 3).forEach((diag, index) => {
  console.log(`\n${index + 1}. [${diag.code}] ${diag.labelKorean}`);
  console.log(`   정의: ${diag.definition}`);
  console.log(`   우선 중재: ${diag.nursingInterventions.priority[0]}`);
});

// 4. 임상 프로토콜 조회 예시
console.log('\n\n=== 4. 임상 프로토콜 조회 ===');
console.log('검색: 정맥주사 삽입\n');

const ivProtocol = db.getClinicalProtocol('iv_insertion');
if (ivProtocol) {
  console.log(`프로토콜: ${ivProtocol.nameKorean}`);
  console.log(`목적: ${ivProtocol.purpose}`);
  console.log(`\n주요 절차:`);
  ivProtocol.procedure.slice(0, 3).forEach(step => {
    console.log(`${step.step}. ${step.action}`);
    console.log(`   → ${step.rationale}`);
  });
}

// 5. 임상 사례 분석 예시
console.log('\n\n=== 5. 임상 사례 분석 ===');
const dkaCase = casesDb.getCase('dka');
if (dkaCase) {
  console.log(`사례: ${dkaCase.titleKorean}`);
  console.log(`환자: ${dkaCase.patient.age}세 ${dkaCase.patient.gender === 'female' ? '여성' : '남성'}`);
  console.log(`진단: ${dkaCase.patient.diagnosis}`);
  console.log(`\n주요 검사 결과:`);
  Object.entries(dkaCase.labResults).slice(0, 3).forEach(([test, result]) => {
    console.log(`- ${test}: ${result.value} ${result.unit} (${result.interpretation})`);
  });
  console.log(`\n간호진단:`);
  dkaCase.nursingDiagnoses.slice(0, 3).forEach(diag => console.log(`- ${diag}`));
}

// 6. 통합 검색 예시
console.log('\n\n=== 6. 통합 검색 예시 ===');
console.log('간호사: "당뇨 환자의 인슐린 투여 방법을 알려주세요"\n');

const insulin = db.getMedication('insulin_regular');
const glucoseProtocol = db.getClinicalProtocol('blood_glucose_monitoring');

if (insulin && glucoseProtocol) {
  console.log('💊 인슐린 정보:');
  console.log(`- 약물: ${insulin.nameKorean}`);
  console.log(`- 투여경로: ${insulin.route.join(', ')}`);
  console.log(`- 주의사항: ${insulin.nursingConsiderations[0]}`);
  
  console.log('\n🔬 혈당 측정 프로토콜:');
  console.log(`- ${glucoseProtocol.procedure[0].action}`);
  console.log(`- 측정 시간: 식전/식후 준수`);
}

console.log('\n\n✅ 데모 완료!');
console.log('Nursing Tutor MCP v2.0은 실제 임상 데이터를 기반으로 한국 간호사를 지원합니다.');