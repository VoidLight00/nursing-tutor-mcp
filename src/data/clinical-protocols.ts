// 실제 임상에서 사용되는 간호 프로토콜 데이터베이스
export interface ClinicalProtocol {
  id: string;
  name: string;
  nameKorean: string;
  category: string;
  categoryKorean: string;
  purpose: string;
  indications: string[];
  contraindications: string[];
  equipment: string[];
  procedure: {
    step: number;
    action: string;
    rationale: string;
  }[];
  complications: string[];
  nursingConsiderations: string[];
  documentation: string[];
  references: string[];
}

export class ClinicalProtocolsDatabase {
  private protocols: Map<string, ClinicalProtocol>;

  constructor() {
    this.protocols = new Map();
    this.initializeProtocols();
  }

  private initializeProtocols(): void {
    // 정맥주사 프로토콜
    this.protocols.set('iv_insertion', {
      id: 'iv_insertion',
      name: 'Peripheral IV Insertion',
      nameKorean: '말초정맥 주사',
      category: 'Vascular Access',
      categoryKorean: '혈관 접근',
      purpose: '정맥로 확보를 통한 수액, 약물, 혈액제제 투여',
      indications: [
        '수액 요법 필요',
        '정맥 약물 투여',
        '혈액제제 투여',
        '응급 상황 대비',
        '조영제 투여'
      ],
      contraindications: [
        '삽입 부위 감염',
        '정맥염',
        '심한 부종',
        'AV fistula가 있는 팔',
        '림프절 절제술을 받은 팔'
      ],
      equipment: [
        'IV 카테터 (18-24G)',
        '무균 장갑',
        '지혈대',
        '알코올 솜',
        '포비돈 요오드 또는 클로르헥시딘',
        '투명 드레싱',
        '3-way',
        '생리식염수',
        '주사기'
      ],
      procedure: [
        {
          step: 1,
          action: '손위생 수행 및 필요물품 준비',
          rationale: '감염 예방 및 시술 효율성 증가'
        },
        {
          step: 2,
          action: '환자 확인 및 설명, 동의 획득',
          rationale: '환자 안전 및 협조 유도'
        },
        {
          step: 3,
          action: '적절한 정맥 선택 (전완부 우선)',
          rationale: '합병증 최소화 및 환자 편의'
        },
        {
          step: 4,
          action: '지혈대를 삽입부위 10-15cm 상방에 적용',
          rationale: '정맥 충혈로 천자 용이'
        },
        {
          step: 5,
          action: '삽입부위 소독 (중심에서 바깥쪽으로 원형)',
          rationale: '무균술 유지'
        },
        {
          step: 6,
          action: '15-30도 각도로 정맥 천자',
          rationale: '정맥 손상 최소화'
        },
        {
          step: 7,
          action: '혈액 역류 확인 후 카테터 전진',
          rationale: '정맥 내 위치 확인'
        },
        {
          step: 8,
          action: '지혈대 제거 및 카테터 고정',
          rationale: '혈류 회복 및 카테터 이탈 방지'
        },
        {
          step: 9,
          action: '생리식염수로 개방성 확인',
          rationale: '카테터 기능 확인'
        },
        {
          step: 10,
          action: '투명 드레싱 적용 및 날짜/시간 기록',
          rationale: '감염 예방 및 교체 시기 확인'
        }
      ],
      complications: [
        '정맥염',
        '침윤',
        '혈종',
        '감염',
        '혈전',
        '공기색전'
      ],
      nursingConsiderations: [
        '72-96시간마다 부위 교체',
        '매 근무마다 삽입부위 사정',
        '정맥염 징후 관찰 (발적, 부종, 통증)',
        '수액 주입 속도 확인',
        '카테터 개방성 유지'
      ],
      documentation: [
        '삽입 날짜 및 시간',
        '카테터 크기 및 길이',
        '삽입 부위',
        '시도 횟수',
        '환자 반응',
        '합병증 유무'
      ],
      references: [
        'INS Standards of Practice 2021',
        '병원감염관리지침',
        'CDC Guidelines for IV Therapy'
      ]
    });

    // 유치도뇨관 삽입
    this.protocols.set('foley_insertion', {
      id: 'foley_insertion',
      name: 'Foley Catheter Insertion',
      nameKorean: '유치도뇨관 삽입',
      category: 'Elimination',
      categoryKorean: '배설',
      purpose: '방광 배액 및 소변량 정확한 측정',
      indications: [
        '급성 요정체',
        '정확한 소변량 측정 필요',
        '수술 전후 관리',
        '요실금으로 인한 피부 손상',
        '장기간 부동 환자'
      ],
      contraindications: [
        '요도 손상 의심',
        '급성 전립선염',
        '요도 협착',
        '최근 요도/방광 수술'
      ],
      equipment: [
        '적절한 크기의 Foley 카테터 (14-18Fr)',
        '멸균 장갑',
        '멸균 드레이프',
        '10ml 주사기',
        '멸균 증류수',
        '윤활제',
        '소독솜',
        '소변백',
        '고정 테이프'
      ],
      procedure: [
        {
          step: 1,
          action: '환자 확인 및 설명, 프라이버시 보호',
          rationale: '환자 권리 존중 및 협조 유도'
        },
        {
          step: 2,
          action: '앙와위 자세 (여성: 굴곡위, 남성: 앙와위)',
          rationale: '요도 노출 용이'
        },
        {
          step: 3,
          action: '회음부 소독 (여성: 위에서 아래로, 남성: 원형)',
          rationale: '감염 예방'
        },
        {
          step: 4,
          action: '멸균 장갑 착용 및 멸균영역 설치',
          rationale: '무균술 유지'
        },
        {
          step: 5,
          action: '윤활제 도포 (카테터 끝 5-7cm)',
          rationale: '요도 손상 예방'
        },
        {
          step: 6,
          action: '카테터 삽입 (여성: 5-7cm, 남성: 17-22cm)',
          rationale: '방광 도달 확인'
        },
        {
          step: 7,
          action: '소변 배출 확인 후 추가 2-3cm 삽입',
          rationale: '방광 내 위치 확실히 함'
        },
        {
          step: 8,
          action: '벌룬에 멸균 증류수 주입 (5-10ml)',
          rationale: '카테터 고정'
        },
        {
          step: 9,
          action: '카테터를 살짝 당겨 고정 확인',
          rationale: '적절한 위치 확인'
        },
        {
          step: 10,
          action: '소변백 연결 및 방광 아래 위치',
          rationale: '역류 방지'
        }
      ],
      complications: [
        '요로감염',
        '요도 손상',
        '방광 경련',
        '혈뇨',
        '벌룬 팽창 실패',
        'CAUTI'
      ],
      nursingConsiderations: [
        '매일 카테터 필요성 재평가',
        '회음부 청결 유지',
        '충분한 수분 섭취 격려',
        '소변 색깔 및 양 관찰',
        '카테터 꼬임 방지'
      ],
      documentation: [
        '삽입 날짜 및 시간',
        '카테터 종류 및 크기',
        '벌룬 주입량',
        '소변 특성',
        '환자 반응',
        '교육 내용'
      ],
      references: [
        'CDC CAUTI Prevention Guidelines',
        'ANA CAUTI Prevention Tool',
        '요로감염 예방지침'
      ]
    });

    // 혈당 측정
    this.protocols.set('blood_glucose_monitoring', {
      id: 'blood_glucose_monitoring',
      name: 'Blood Glucose Monitoring',
      nameKorean: '혈당 측정',
      category: 'Diagnostic',
      categoryKorean: '진단적 검사',
      purpose: '혈당 수치 확인 및 당뇨 관리',
      indications: [
        '당뇨병 환자',
        '저혈당/고혈당 증상',
        '스테로이드 치료 중',
        'TPN 투여 중',
        '수술 전후'
      ],
      contraindications: [
        '심한 말초순환 장애',
        '측정 부위 감염',
        '심한 부종'
      ],
      equipment: [
        '혈당측정기',
        '검사 스트립',
        '란셋',
        '알코올 솜',
        '거즈',
        '장갑'
      ],
      procedure: [
        {
          step: 1,
          action: '손위생 및 장갑 착용',
          rationale: '감염 예방'
        },
        {
          step: 2,
          action: '혈당측정기 준비 및 스트립 삽입',
          rationale: '정확한 측정 준비'
        },
        {
          step: 3,
          action: '천자 부위 선택 (손가락 측면)',
          rationale: '통증 최소화'
        },
        {
          step: 4,
          action: '알코올로 소독 후 건조',
          rationale: '감염 예방 및 정확한 결과'
        },
        {
          step: 5,
          action: '란셋으로 천자',
          rationale: '충분한 혈액 획득'
        },
        {
          step: 6,
          action: '첫 번째 혈액 방울 제거',
          rationale: '조직액 혼입 방지'
        },
        {
          step: 7,
          action: '두 번째 혈액 방울을 스트립에 적용',
          rationale: '정확한 검사'
        },
        {
          step: 8,
          action: '천자 부위 지혈',
          rationale: '출혈 방지'
        },
        {
          step: 9,
          action: '결과 확인 및 기록',
          rationale: '혈당 관리'
        }
      ],
      complications: [
        '감염',
        '출혈',
        '통증',
        '부정확한 결과',
        '란셋 자상'
      ],
      nursingConsiderations: [
        '식전/식후 측정 시간 준수',
        '저혈당 시 즉시 조치',
        '측정 부위 순환 사용',
        '스트립 유효기간 확인',
        '측정기 정기 점검'
      ],
      documentation: [
        '측정 시간',
        '혈당 수치',
        '식사와의 관계',
        '인슐린 투여량',
        '환자 증상',
        '조치사항'
      ],
      references: [
        'ADA Standards of Medical Care',
        '대한당뇨병학회 진료지침',
        'ISO 15197:2013'
      ]
    });

    // 산소 요법
    this.protocols.set('oxygen_therapy', {
      id: 'oxygen_therapy',
      name: 'Oxygen Therapy',
      nameKorean: '산소 요법',
      category: 'Respiratory',
      categoryKorean: '호흡기계',
      purpose: '저산소증 교정 및 조직 산소화 개선',
      indications: [
        'SpO2 <90%',
        '호흡곤란',
        '청색증',
        '급성 심근경색',
        '쇼크',
        '수술 후'
      ],
      contraindications: [
        '상대적 금기: 만성 CO2 저류 환자',
        '고농도 산소 장기 투여 시 주의'
      ],
      equipment: [
        '산소 공급원',
        '유량계',
        '가습기',
        '산소 전달 장치 (nasal cannula, mask)',
        '맥박산소측정기'
      ],
      procedure: [
        {
          step: 1,
          action: '의사 처방 확인 (농도, 방법)',
          rationale: '적절한 산소 투여'
        },
        {
          step: 2,
          action: '기초 SpO2 및 호흡양상 사정',
          rationale: '비교 기준 설정'
        },
        {
          step: 3,
          action: '적절한 산소 전달 장치 선택',
          rationale: '필요 농도에 따른 선택'
        },
        {
          step: 4,
          action: '가습기 연결 (>4L/min 시)',
          rationale: '점막 건조 방지'
        },
        {
          step: 5,
          action: '처방된 유량으로 산소 공급',
          rationale: '적정 산소 농도 유지'
        },
        {
          step: 6,
          action: '환자에게 장치 적용',
          rationale: '편안하고 효과적인 전달'
        },
        {
          step: 7,
          action: '15-30분 후 SpO2 재측정',
          rationale: '효과 평가'
        }
      ],
      complications: [
        '산소 독성',
        '흡수성 무기폐',
        '비강 건조',
        '고탄산혈증 (COPD)',
        '화재 위험'
      ],
      nursingConsiderations: [
        'SpO2 목표: 94-98% (COPD: 88-92%)',
        '비강 캐뉼라: 1-6L/min (24-44%)',
        '단순 마스크: 5-10L/min (40-60%)',
        '비재호흡 마스크: 10-15L/min (60-100%)',
        '화기 주의 교육'
      ],
      documentation: [
        '산소 투여 시작 시간',
        '투여 방법 및 농도',
        'SpO2 변화',
        '호흡양상',
        '환자 반응',
        '부작용'
      ],
      references: [
        'BTS Oxygen Therapy Guidelines',
        'WHO Oxygen Therapy Guidelines',
        '대한결핵및호흡기학회 지침'
      ]
    });

    // 수혈
    this.protocols.set('blood_transfusion', {
      id: 'blood_transfusion',
      name: 'Blood Transfusion',
      nameKorean: '수혈',
      category: 'Transfusion',
      categoryKorean: '수혈',
      purpose: '혈액 성분 보충을 통한 산소 운반 능력 및 응고 기능 개선',
      indications: [
        'Hgb <7g/dL',
        '급성 출혈',
        '수술 중 출혈',
        '혈소판 <10,000',
        '응고 장애'
      ],
      contraindications: [
        '종교적 거부',
        '이전 심각한 수혈 반응',
        '순환 과부하 위험'
      ],
      equipment: [
        '혈액제제',
        '수혈 세트',
        '0.9% 생리식염수',
        'IV 카테터 (18-20G)',
        '활력징후 측정 장비'
      ],
      procedure: [
        {
          step: 1,
          action: '의사 처방 및 동의서 확인',
          rationale: '법적 요구사항 충족'
        },
        {
          step: 2,
          action: '혈액은행에서 혈액 수령',
          rationale: '30분 이내 시작'
        },
        {
          step: 3,
          action: '2인 확인 (환자 정보, 혈액형, 단위번호)',
          rationale: '수혈 오류 방지'
        },
        {
          step: 4,
          action: '기초 활력징후 측정',
          rationale: '반응 비교 기준'
        },
        {
          step: 5,
          action: '생리식염수로 정맥로 확보',
          rationale: '다른 수액과 혼합 금지'
        },
        {
          step: 6,
          action: '처음 15분간 천천히 주입 (50ml/hr)',
          rationale: '급성 반응 관찰'
        },
        {
          step: 7,
          action: '15분 후 활력징후 재측정',
          rationale: '이상반응 조기 발견'
        },
        {
          step: 8,
          action: '이상 없으면 속도 증가 (200ml/hr)',
          rationale: '4시간 이내 완료'
        },
        {
          step: 9,
          action: '수혈 중 15-30분마다 관찰',
          rationale: '지속적 모니터링'
        },
        {
          step: 10,
          action: '수혈 완료 후 활력징후 측정',
          rationale: '최종 평가'
        }
      ],
      complications: [
        '발열성 비용혈성 반응',
        '급성 용혈성 반응',
        '알레르기 반응',
        'TRALI',
        'TACO',
        '감염 전파'
      ],
      nursingConsiderations: [
        '수혈 전 혈액 가온 금지',
        '필터 사용 필수',
        '수혈 반응 시 즉시 중단',
        '4시간 이내 완료',
        '수혈 세트 4시간마다 교체'
      ],
      documentation: [
        '수혈 시작/종료 시간',
        '혈액제제 종류 및 단위',
        '활력징후 변화',
        '수혈 속도',
        '환자 반응',
        '이상반응 유무'
      ],
      references: [
        'AABB Standards',
        '혈액관리법',
        '수혈가이드라인 2022'
      ]
    });

    // 심폐소생술
    this.protocols.set('cpr', {
      id: 'cpr',
      name: 'Cardiopulmonary Resuscitation',
      nameKorean: '심폐소생술',
      category: 'Emergency',
      categoryKorean: '응급',
      purpose: '심정지 환자의 순환 및 호흡 유지',
      indications: [
        '의식 없음',
        '정상 호흡 없음',
        '맥박 없음',
        '심정지'
      ],
      contraindications: [
        'DNR 지시',
        '명백한 사망 징후',
        '구조자 안전 위협'
      ],
      equipment: [
        'CPR board',
        'Ambu bag',
        '산소',
        'AED/제세동기',
        '응급카트',
        '흡인기'
      ],
      procedure: [
        {
          step: 1,
          action: '반응 확인 및 도움 요청',
          rationale: '신속한 대응팀 활성화'
        },
        {
          step: 2,
          action: '환자를 단단한 바닥에 앙와위',
          rationale: '효과적인 압박'
        },
        {
          step: 3,
          action: '경동맥 맥박 확인 (10초 이내)',
          rationale: '심정지 확인'
        },
        {
          step: 4,
          action: '흉부압박 시작 (30회)',
          rationale: '순환 유지'
        },
        {
          step: 5,
          action: '기도 개방 (head-tilt, chin-lift)',
          rationale: '환기 준비'
        },
        {
          step: 6,
          action: '인공호흡 2회',
          rationale: '산소 공급'
        },
        {
          step: 7,
          action: '30:2 비율로 지속',
          rationale: '효과적인 CPR'
        },
        {
          step: 8,
          action: 'AED 도착 시 즉시 적용',
          rationale: '제세동 필요성 평가'
        },
        {
          step: 9,
          action: '2분마다 시행자 교대',
          rationale: '압박 질 유지'
        },
        {
          step: 10,
          action: 'ROSC 징후 확인',
          rationale: '소생 여부 평가'
        }
      ],
      complications: [
        '늑골 골절',
        '기흉',
        '간 손상',
        '위 팽만',
        '구토/흡인'
      ],
      nursingConsiderations: [
        '압박 깊이: 5-6cm',
        '압박 속도: 100-120회/분',
        '완전한 이완 허용',
        '중단 시간 최소화',
        '고품질 CPR 유지'
      ],
      documentation: [
        '심정지 발견 시간',
        'CPR 시작 시간',
        '제세동 시행 여부',
        '투여 약물',
        'ROSC 시간',
        '환자 결과'
      ],
      references: [
        'AHA Guidelines 2020',
        'ERC Guidelines 2021',
        'KACPR 가이드라인'
      ]
    });
  }

  getProtocol(id: string): ClinicalProtocol | undefined {
    return this.protocols.get(id);
  }

  searchProtocols(query: string): ClinicalProtocol[] {
    const results: ClinicalProtocol[] = [];
    const searchTerm = query.toLowerCase();

    this.protocols.forEach(protocol => {
      if (
        protocol.name.toLowerCase().includes(searchTerm) ||
        protocol.nameKorean.includes(searchTerm) ||
        protocol.category.toLowerCase().includes(searchTerm) ||
        protocol.categoryKorean.includes(searchTerm)
      ) {
        results.push(protocol);
      }
    });

    return results;
  }

  getProtocolsByCategory(category: string): ClinicalProtocol[] {
    const results: ClinicalProtocol[] = [];
    
    this.protocols.forEach(protocol => {
      if (protocol.category.toLowerCase() === category.toLowerCase() ||
          protocol.categoryKorean === category) {
        results.push(protocol);
      }
    });

    return results;
  }

  getAllProtocols(): ClinicalProtocol[] {
    return Array.from(this.protocols.values());
  }
}