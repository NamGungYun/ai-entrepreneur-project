# 화면 패턴

SAHMYOOK-DS Pattern 페이지(2:105)의 다섯 예시를 글로 옮겼다. 새 결과물을 짤 때 가장 가까운 패턴에서 출발한다. 좌표는 피그마 기준(px)이다.

## 공통

- 바탕: `bg/page` + Background/Launch(왼쪽 위 푸른 빛, 오른쪽 아래 노란 빛, 아래로 깊어지는 비네트, 입자감).
- 장식은 네 모서리에 나눠 둔다. 왼쪽 위 픽셀 체커 + 왕관, 오른쪽 위 반짝이 1~2개, 오른쪽 아래 타원 링 + 픽셀 체커, 왼쪽 가장자리 루프.
- 히어로 제목 묶음은 늘 같은 순서로 겹친다: 기관명(작게, 6°) → BrushBand(5~6°) → BrushWord(띠 아래로 조금 겹침, 5~6°) → Tape(4°).
- 하단은 Footer(주최 글자 · 주관 로고).

## ① 행사 안내 웹 (1280, launch)

1. TopBar desktop (바탕 투명)
2. 히어로 560 높이: 왼쪽에 제목 묶음, 오른쪽에 3D 별 자리(150 원형 slot), 태그 스택(IDEA/TO/PRODUCT, 8°), 타원 링
3. 본문 좌우 여백 80, 섹션 간격 48
   - DateBlock 아래에 키워드 필 한 줄: `11 TEAMS`(md fill + leading arrow), `AI SPRINT`·`BUILD WITH AI`·`SHOW YOUR SERVICE`(md outline + leading arrow)
   - StepPanel (전체 너비)
   - InfoRow 왼쪽, 오른쪽에 lg fill "지금, 참가 신청하기" + Trailing arrow, 옆에 QR 자리(88 slot)
4. Footer

## ② 참가 신청 (모바일 360, launch)

장식 없음. TopBar mobile → 본문(좌우 16, 간격 24): Badge outline "접수 중", H1 "참가 신청", 일시·장소 Body-sm → InputField 3개(이름 · 학번 · 연락처) → Checkbox(개인정보 동의) → Callout info → lg fill "신청 보내기"(전체 너비). 오류 예시는 학번 칸 State=error + "학번 8자리를 숫자로 입력해 주세요."

## ③ 카드뉴스 표지 (1080×1350, launch)

포스터와 같은 비율(약 0.8)이다. 1장은 히어로, 2장부터 정보를 하나씩 싣는다.

- 기관명 H1 (110, 318, 6°)
- BrushBand lg ×1.45 (90, 428, 6°), BrushWord lg ×1.65 (50, 590, 6°), Tape ×1.35 (230, 790, 4°)
- DateBlock ×1.25 (80, 930), 키워드 필 lg 3개 (80, 1150)
- 3D 별 자리 220 원형 (800, 70), 픽셀 체커 192 왼쪽 위·오른쪽 아래, 타원 링 오른쪽 아래
- 하단 주최/주관 (y 1268)

## ④ 팀 리뷰 리포트 (1280, paper)

긴 문서라 머리에만 장식을 쓴다.

- TopBar desktop
- 머리(위 56, 좌우 80): BrushBand md "AI 앙트레프레너 LAUNCH"(3°), H1 "팀 리뷰 리포트", Body-lg 요약
- Stepper (Current=LAUNCH)
- "참가 팀" H2 → Tabs → TeamCard 3열(356 폭, 간격 24, 높이 맞춤). 수상 팀만 awarded.
- Callout info "팀 이름과 서비스는 예시 데이터입니다…"
- Footer, Logo = red

paper 모드에서는 라임 글자가 네이비로 바뀌고, 라임은 배지·fill 버튼·수상 카드 같은 면으로만 남는다.

## ⑤ 행사 일정표 (16:9, 1280×720, launch)

- 머리(높이 약 170): 픽셀 체커 72 (0, 20), 왕관 56 (104, 8, 10°), BrushWord md (66, 104, 5°), BrushBand md (84, 56, 5°), Tape "행사 일정"(첫 어절 '행사'만 라임, 488, 102, 4°), 반짝이 32·18, 오른쪽 위 DateBlock ×0.62(오른쪽 끝 1224에 맞춤)
- 본문: 패널 두 장(576 폭, 간격 16, y 192). 패널 = `bg/surface` + `border/default` 1.5 + radius 20, 안쪽 위 16 · 좌우 24.
  - 패널 머리: "오전"/"오후"(Display/Step, 라임) + 시간 범위(Body/Label, 보조)
  - ScheduleRow를 차례로. 마지막 줄은 구분선 없음.
- 짧은 쪽 패널 아래 빈 곳에 태그 스택(×0.6, 6°)과 타원 링, 오른쪽 끝 픽셀 체커
- 맨 아래(y 683) 주최 글자 왼쪽, 주관 로고 오른쪽

### 일정 (2026.11.12)

운영 시트의 시간 칸을 시작 시각으로 읽고 "60" 줄은 다음 시 정각으로 본 해석이다. 시각을 새로 쓰기 전에 사용자에게 확인한다.

| 시작 | 끝 | 종류 | 내용 |
| --- | --- | --- | --- |
| 09:30 | 10:00 | rest | 등록 |
| 10:00 | 10:10 | default | 개회사 |
| 10:10 | 10:20 | default | 행사 안내 및 강사 소개 |
| 10:20 | 10:30 | default | 이중훈 대표 자기소개 |
| 10:30 | 11:00 | lecture 1강 | 점검(사전과제) |
| 11:00 | 11:40 | lecture 2강 | Claude Code, Skill, MCP, 하네스 |
| 11:40 | 12:00 | lecture 3강 | GitHub 및 슈파베이스 가입 및 설치 |
| 12:00 | 12:30 | lecture 4강 | 시장조사 및 기획서 작성 |
| 12:30 | 13:10 | rest | 점심 |
| 13:10 | 13:20 | default | 멘토 소개 |
| 13:20 | 13:50 | default | AI 활용 원포인트 강의 by 멘토 |
| 13:50 | 14:50 | lecture 5강 | 구현과 GitHub 배포 |
| 14:50 | 15:10 | lecture 6강 | SNS 크리에이티브 작성 및 발표 준비 |
| 15:10 | 16:40 | default | 조별 시연과 심사 |
| 16:40 | 16:50 | rest | 심사 계산(휴식, 자리 정리) |
| 16:50 | 17:00 | default | 시상식 |

## 슬라이드(16:9) 일반

일정표 말고 다른 발표 슬라이드도 같은 틀을 쓴다.

- 표지: ③ 카드뉴스 표지 구성을 가로로 펼친다(SAHMYOOK-DS CV 페이지 참고, 1600×900).
- 본문 슬라이드: 왼쪽 위에 작은 BrushBand md 하나로 섹션 이름, 본문은 패널 면에 흰 글자와 라임 라벨. BrushWord는 표지에만.
- 섹션 구분 슬라이드: 가운데에 Tape 하나("BUILD, 팀별 서비스 제작." 식).
- 16:9 HTML 출발점은 `assets/templates/slide-16x9.html`.
