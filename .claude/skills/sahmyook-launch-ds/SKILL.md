---
name: sahmyook-launch-ds
description: 삼육보건대학교 AI 앙트레프레너 LAUNCH(2026.11.12, 주최 삼육보건대 AI 앙트레프레너 센터, 주관 메이저맵) 디자인 시스템. 피그마 라이브러리 SAHMYOOK-DS의 변수·텍스트 스타일·컴포넌트 26종·화면 패턴과, 같은 값을 옮긴 웹용 CSS 토큰·컴포넌트 CSS·모티프와 아이콘 SVG·16:9 슬라이드 템플릿을 담고 있다. 이 행사나 삼육보건대 앙트레프레너 센터 이름으로 나가는 결과물(행사 안내 웹페이지, 참가 신청 폼, 발표 슬라이드, 일정표, 카드뉴스, 포스터, 팀 리뷰 리포트, 시상 자료, 피그마 화면·컴포넌트)을 만들거나 고치거나 검수할 때 반드시 먼저 읽는다. "삼육", "삼육보건대", "LAUNCH", "AI 앙트레프레너", "앙트레프레너 센터", "런치 행사", "라임·네이비 포스터 스타일"이 나오면 사용자가 디자인 시스템을 말하지 않아도 쓴다. ai-launch-design 스킬과 내용이 겹치면 이 스킬을 따른다. 메이저맵 자체 브랜드 결과물과 메이저스쿨 제품 UI에는 쓰지 않는다.
---

# 삼육보건대 AI 앙트레프레너 LAUNCH 디자인 시스템

「AI 앙트레프레너 LAUNCH!」 포스터 한 장에서 뽑은 행사 아이덴티티를 피그마 라이브러리와 코드 토큰으로 정리한 것이다. 네이비 바탕, 라임 강조 하나, 블랙 브러시 띠와 손그림 낙서가 기본 문법이다. 피그마에서 작업하든 HTML로 작업하든 같은 이름의 토큰을 쓰므로, 한쪽에서 정한 값이 다른 쪽에서도 그대로 통한다.

## 다른 스킬과의 관계

- **ai-launch-design**: 포스터에서 직접 뽑은 원본 메모다. 이 스킬은 그 내용을 피그마 라이브러리와 코드로 확장했다. 값이 다르면 이 스킬이 최신이다.
- **majormap-brand**: 메이저맵은 이 행사의 주관사라서 로고만 들어간다. 로고 사용 규칙(원본 SVG, 비율·색 변형 금지)은 majormap-brand를 따르고, 색과 서체는 이 스킬을 따른다. 메이저맵 레드(#EA5645)는 이 행사 결과물에 쓰지 않는다. 라임 하나만 강조색이라서다.
- **메이저스쿨 제품 UI**(majorschool-design-context)에는 이 스킬을 쓰지 않는다. 행사용 캠페인 아이덴티티다.

## 들어 있는 파일

| 파일 | 언제 읽나 |
| --- | --- |
| `references/figma.md` | 피그마에서 작업할 때. 파일 키, 페이지·모드 ID, 컴포넌트 인스턴스 만드는 코드, PNG 내보내기, 겪었던 함정 |
| `references/components.md` | 컴포넌트를 고르거나 조립할 때. 26종의 속성·변형·피그마 ID·라이브러리 키·쓰는 법 |
| `references/patterns.md` | 화면·슬라이드·카드뉴스·리포트·일정표를 새로 짤 때. 매체별 배치 순서와 치수 |
| `references/tokens.json` | 다른 도구(Tailwind, Style Dictionary 등)로 토큰을 옮길 때 |
| `assets/launch.css` | HTML로 만들 때 그대로 링크하거나 인라인한다. 토큰 + 배경 + 컴포넌트 CSS |
| `assets/templates/slide-16x9.html` | 16:9 슬라이드(일정표·안내)를 HTML로 빨리 만들 때의 출발점 |
| `assets/motifs/*.svg` | 픽셀 체커, 왕관, 반짝이, 루프, 타원 링 |
| `assets/icons/*.svg` | 24px 선 아이콘 24종 (`currentColor`) |
| `assets/logo/` | 메이저맵 워드마크 white·red (BI 원본 사본) |
| `assets/poster-reference.jpg` | 원본 포스터. 분위기를 확인하는 참고용이고, 잘라서 쓰지 않는다 |

## 피그마 원본

- 파일: **SAHMYOOK-DS** — https://www.figma.com/design/pzP3hBWEaChKMvRP6wc57s
- fileKey `pzP3hBWEaChKMvRP6wc57s` (MajorMapOfficial 팀)
- 페이지: CV → Color · Typography · Layout · Asset · Icon → Component → Pattern
- 다른 피그마 파일에서 컴포넌트를 가져다 쓰려면 이 파일이 **라이브러리로 게시**돼 있어야 한다. 게시는 피그마 화면(Assets 패널 → Publish)에서만 할 수 있다. 게시 전이면 이 파일 안에서 작업하거나 사용자에게 게시를 부탁한다.

## 핵심 규칙

규칙마다 이유를 붙였다. 이유를 알면 표에 없는 상황에서도 같은 판단을 내릴 수 있다.

1. **강조색은 라임 하나뿐이다.** 포스터의 힘은 네이비와 라임 두 색의 대비에서 나온다. 빨강, 민트, 보라 그라데이션을 더하면 바로 흔한 행사 포스터가 된다. 상태(좋음·주의·선택)도 색을 더하지 않고 채움(라임 면)과 테두리(흰 선)의 모양 차이로 구분한다.
2. **라임은 면이나 짧은 강조에만 쓴다.** 긴 본문을 라임으로 쓰면 눈이 피로하다. 라임 면 위 글자는 항상 Ink(#07080D)다. 흰 바탕(paper 모드)에서는 라임 글자가 읽히지 않으므로 강조 글자를 네이비로 바꾸고, 라임은 면으로만 남긴다.
3. **화면에는 Semantic 토큰만 쓴다.** `bg/page`, `text/accent`처럼 역할 이름으로 쓰면 launch ↔ paper 모드 전환이 저절로 된다. Primitives(`navy/700`)를 직접 쓰면 모드가 바뀔 때 깨진다.
4. **회전은 반시계 방향 3°~8°만 쓴다.** 포스터의 모든 기울기가 같은 방향이라 리듬이 생긴다. 시계 방향이 섞이면 산만해진다. 피그마 `rotation` 값으로는 양수다.
5. **띠 제목·브러시 단어·테이프·낙서는 히어로에만 쓴다.** 긴 문서나 표에서 장식이 반복되면 정보가 묻힌다. 본문은 네이비(또는 흰) 면, 흰(또는 네이비) 글자, 라임 라벨로 차분하게 둔다.
6. **브러시 단어(LAUNCH!)는 한 화면에 하나만 둔다.** 가장 센 요소라서 두 개면 서로 힘을 깎는다.
7. **장식은 가장자리와 모서리에 두고 본문을 가리지 않는다.** HTML에서는 모두 `aria-hidden="true"`로 단다.
8. **원본이 필요한 소스는 흉내 내지 않는다.** 3D 유리 별, 졸업모자·노트북 콜라주, LAUNCH! 손 레터링, QR 코드, 학교 공식 로고는 원본을 받아 넣는다. 없으면 점선 자리(slot)를 남기고 사용자에게 알린다. LAUNCH!는 원본이 오기 전까지 Permanent Marker로 대체한다.
9. **사실은 지어내지 않는다.** 아래 '행사 정보'에 없는 숫자(참가자 수, 만족도, 수상 결과, 팀 이름)는 쓰지 않는다. 예시가 필요하면 "TEAM 01"처럼 쓰고 예시 데이터라고 밝힌다.
10. **카피는 짧게.** 영문 키워드는 2~3단어 대문자 묶음(BUILD WITH AI)이고 자간은 0이다. 한국어 슬로건은 선언형 한 문장에 마침표, 첫 어절만 라임. 정보는 "라벨: 값"으로 쓰고, 가운뎃점으로 메타 정보를 줄줄이 잇지 않는다. 작은 라벨·메뉴·표 머리에는 대문자 트래킹 라벨을 쓰지 않는다.

## 토큰

### Semantic (화면에 쓰는 것)

| 토큰 | launch (기본, 네이비 바탕) | paper (리포트·인쇄) | 용도 |
| --- | --- | --- | --- |
| `bg/page` | #212C67 | #FFFFFF | 페이지 바탕 |
| `bg/surface` | #1A2458 | #F3F5FA | 패널, 카드, 입력 필드 |
| `bg/deep` | #111A36 | #E4E7F0 | 깊은 면, 비네트 |
| `bg/ink` | #07080D | #07080D | 브러시 띠, 테이프, 토스트 |
| `bg/accent` | #D8E072 | #D8E072 | 라임 면 (fill 버튼, 배지, 수상 카드) |
| `bg/accent-pressed` | #C2CB4E | #C2CB4E | 눌린 fill 버튼 |
| `bg/accent-soft` | #3A4479 | #F4F6D3 | outline·text 버튼 눌림 |
| `bg/disabled` | #3A4479 | #E4E7F0 | 비활성 면 |
| `text/primary` | #F3F5FA | #111A36 | 제목·본문 |
| `text/secondary` | #BCC1D6 | #5E6478 | 보조 글자 |
| `text/accent` | #D8E072 | #212C67 | 라벨, 단계명, 시각 |
| `text/on-accent` | #07080D | #07080D | 라임 면 위 글자 |
| `text/on-ink` / `text/on-ink-accent` | #F3F5FA / #D8E072 | 같음 | 먹색 면 위 글자 |
| `text/disabled` | #7F8598 | #A5AAB8 | 비활성 글자 |
| `border/default` | #A5AAB8 | #A5AAB8 | 필 테두리, 패널 |
| `border/rule` | #3A4479 | #D0D4E2 | 표·목록 구분선 |
| `border/strong` | #F3F5FA | #111A36 | 오류, 눌림 |
| `border/focus` | #D8E072 | #212C67 | 포커스 2px |
| `icon/*` | primary·secondary·accent·on-accent·disabled | | 텍스트와 같은 값 |
| `deco/pixel`, `deco/pixel-shadow`, `deco/doodle` | #D8E072, #3B3859, #F3F5FA | #D8E072, #B5BDE3, #212C67 | 모티프 |
| `deco/glow-blue`, `deco/glow-lime` | #4A5CBE 45%, #D8E072 10% | | 배경 빛 번짐 |

포스터에서 직접 뽑은 값은 Navy #212C67, Panel #1A2458, Deep #111A36, Rule #3A4479, Lime #D8E072, Lime Pale #EBEEBD, Ink #07080D, Text #F3F5FA, Text 2 #BCC1D6, Line #A5AAB8, Violet #3B3859다. 나머지 램프 단계는 이 사이를 이어 만든 파생값이다. 전체 값은 `references/tokens.json`.

대비: 라임/네이비 9.1:1, 텍스트/네이비 약 12:1, 잉크/라임 14.1:1, 보조 글자/네이비 7.2:1. 모두 WCAG AA를 넘는다.

### Layout

- 간격 `space/4·8·12·16·24·32·48·64` — 4px 단위 밖의 값은 쓰지 않는다.
- 모서리 `radius/sm 8`(체크박스) · `md 12`(입력, 안내 상자) · `lg 20`(패널, 카드, 모달) · `full 999`(필, 칩, 토스트). 배지·태그·테이프는 각진 사각형이다.
- 선 `stroke/default 1.5` · `stroke/strong 2`(포커스, 오류, 현재 단계).

## 타이포그래피

| 스타일 | 서체 | 크기/행간 | 쓰임 |
| --- | --- | --- | --- |
| Display/Band (·Band-md) | Black Han Sans | 64/110 (40) · 자간 -1% | 블랙 띠 위 한글 제목 |
| Display/Brush (·Brush-md) | Permanent Marker | 120/90 (72) | 라임 브러시 단어 하나 |
| Display/Tape | Black Han Sans | 32/120 · -1% | 테이프 슬로건 |
| Display/Tag | Black Han Sans | 32/100 | 라임 태그 스택 |
| Display/Step | Black Han Sans | 20/120 | 단계명, 패널 머리 |
| Number/Date · Day · Time | 본문 서체 Bold/Regular | 56 · 40 · 32 | 날짜 블록 |
| Heading/H1·H2·H3 | 본문 서체 Bold | 32·24·20 / 140 · -2%~-1% | 제목 |
| Body/Body-lg·Body·Body-sm·Caption | 본문 서체 Regular | 18·16·14·12 / 160 | 본문 |
| Body/Label | 본문 서체 Medium | 14/140 | 라벨 |
| Body/Button-lg·Button·Button-sm | 본문 서체 Bold | 18·16·14 / 120 | 버튼, 일정 줄 |

- **본문 서체는 웹에서 Pretendard**다. 피그마 연결 환경에는 Pretendard가 없어 라이브러리의 본문 스타일이 Noto Sans KR로 잡혀 있다. 피그마에 Pretendard가 생기면 텍스트 스타일의 서체만 바꾸면 된다.
- 서체는 세 벌까지만 쓴다(Black Han Sans, Permanent Marker, 본문 서체).
- 한글 행간은 auto로 두지 않는다. 제목 140%, 본문 160%.

## 컴포넌트

26종. 속성·변형·ID·키와 조립 예시는 `references/components.md`에 있다.

- **동작**: Button(Size lg·md·sm × Type fill·outline·text × State 3), Chip, Tab, Tabs, Checkbox, Switch, InputField(5상태)
- **표시**: Badge(accent·outline·ink), Callout(info·accent), Toast, Modal, EmptyState
- **히어로**: BrushBand, BrushWord, Tape, Tag
- **행사 정보**: DateBlock, InfoItem, InfoRow, StepItem, StepPanel, Stepper, ScheduleRow(default·lecture·rest)
- **구조**: TopBar(desktop·mobile), Footer(주최 글자 + 주관 로고), TeamCard(default·awarded)
- **에셋**: logo/majormap-wordmark-white·red, motif 5종, Background/Launch, icon 24종

fill 버튼(라임)은 한 화면에 하나만 둔다. 키워드 필 묶음에서는 첫 번째만 fill이고 나머지는 outline이다.

## 매체별 구성

자세한 배치는 `references/patterns.md`.

| 매체 | 크기 | 모드 | 요점 |
| --- | --- | --- | --- |
| 행사 안내 웹 | 1280, 컨테이너 1120 | launch | 포스터 순서 그대로: 기관명 → 띠 제목 → 브러시 단어 → 테이프 → 일시·장소 → 키워드 필 → 단계 패널 → 정보 행 → 주최·주관 |
| 참가 신청 | 모바일 360 | launch | 장식 없이 폼만. 오류는 굵은 테두리 + 고칠 방법 문장. fill 버튼은 맨 아래 하나 |
| 슬라이드·일정표 | 16:9 (1280×720 기준) | launch | 머리에 작은 띠 제목·브러시·테이프, 본문은 패널 두 장 |
| 카드뉴스 | 1080×1350 | launch | 1장은 히어로, 2장부터 정보 하나씩 |
| 팀 리뷰 리포트 | 1280 | paper | 머리에만 띠 제목. 카드 3열. 주관 로고는 red |
| 인쇄 A4 | — | launch 또는 paper | 배경은 두되 입자감(노이즈)은 끈다 |

## 작업 흐름

### 피그마에서

1. `figma-use` 스킬을 먼저 읽고 `references/figma.md`를 연다.
2. SAHMYOOK-DS 파일 안에서 작업하거나, 게시된 라이브러리에서 키로 가져온다.
3. 새 프레임에는 `setExplicitVariableModeForCollection`으로 launch 또는 paper 모드를 지정하고, 채움·선은 Semantic 변수에 묶는다.
4. 컴포넌트는 인스턴스로 쓰고 떼어내지(detach) 않는다. 없는 부품이 필요하면 Component 페이지에 같은 방식(변수 바인딩, 설명, 속성)으로 추가한다.
5. 결과는 화면으로 확인한다. 잘린 글자, 겹침, 시계 방향 회전, 라임이 두 번 이상 강조된 곳이 없는지 본다.

### HTML·코드로

1. `assets/launch.css`를 복사하거나 인라인한다. 폰트는 그 안의 Google Fonts·Pretendard CDN 링크를 쓴다. 외부 링크를 못 쓰는 환경이면 대체 서체를 썼다고 사용자에게 알린다.
2. 바탕 요소에 `class="ls-bg"`, paper 모드는 `data-mode="paper"`.
3. 모티프·아이콘은 `assets/` SVG를 인라인한다. 색은 `currentColor`라 부모의 `color`로 바뀐다.
4. 16:9 결과물이면 `assets/templates/slide-16x9.html`에서 시작한다.
5. 모든 버튼·링크에 `:focus-visible`(라임 2px 외곽선)을 두고, 움직임은 `prefers-reduced-motion`에서 끈다. `launch.css`에 들어 있다.

### PNG로 내보내기

- 피그마: 프레임을 복제해 3배로 `rescale`한 뒤 `get_screenshot`(maxDimension 3840, contentsOnly)으로 받고, 복제본은 지운다. 자세한 코드는 `references/figma.md`.
- HTML: 브라우저에서 1280×720 뷰포트로 열고 deviceScaleFactor 2~3으로 캡처한다.
- 파일 이름은 `AI_LAUNCH_{내용}_{비율}_{가로}x{세로}.png`처럼 쓰고, 1920×1080과 3840×2160 두 벌을 주면 대부분의 화면에 맞는다.

## 행사 정보 (카피에 쓰는 사실)

| 항목 | 내용 |
| --- | --- |
| 행사명 | AI 앙트레프레너 LAUNCH! |
| 슬로건 | 창업, 새로운 미래가 시작된다. |
| 일시 | 2026.11.12 THU 10:00–17:00 (등록 09:30) |
| 장소 | S관 나무계단 및 라운지 |
| 대상 | 삼육보건대학교 재학생 누구나 |
| 모집 인원 | 약 80명 |
| 주요 프로그램 | AI 활용 교육, 서비스 구현 스프린트, 결과물 시연 및 발표, 시상식 |
| 단계 | LEARN(AI 도구 익히기) → BUILD(팀별 서비스 제작) → TEST(검증하고 공유하기) → LAUNCH(결과물 발표 & 시상) |
| 키워드 | 11 TEAMS, AI SPRINT, BUILD WITH AI, SHOW YOUR SERVICE, IDEA TO PRODUCT |
| 주최·주관 | 주최 삼육보건대학교 AI 앙트레프레너 센터 · 주관 메이저맵(MAJOR MAP) |

당일 일정은 `references/patterns.md`의 '일정표'에 있다. 운영 시트의 시간 칸을 해석한 것이므로, 시각을 새로 쓸 때는 사용자에게 한 번 확인한다.

## 점검 목록

- 색이 모두 Semantic 토큰(피그마 변수 또는 CSS 변수)을 거치는가
- 라임 말고 다른 강조색이 없는가, 라임 면 위 글자가 Ink인가
- 브러시 단어가 한 화면에 하나뿐인가
- 회전이 모두 반시계 방향(3°~8°)인가
- 장식이 본문을 가리지 않는가 (HTML이면 `aria-hidden`)
- fill 버튼이 한 화면에 하나인가
- 한글 행간이 auto가 아니고, 글자가 잘리지 않았는가
- 행사 정보에 없는 숫자나 이름을 지어내지 않았는가
- 3D 별·콜라주·레터링·QR·학교 로고를 흉내 내지 않았는가
- 메이저맵 로고가 원본 SVG이고, 네이비 바탕엔 white, 흰 바탕엔 red인가
