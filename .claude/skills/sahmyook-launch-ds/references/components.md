# 컴포넌트 카탈로그

SAHMYOOK-DS Component 페이지(2:103)의 26종과 Asset·Icon 페이지의 에셋이다. 각 항목은 피그마 이름, 속성, 변형, 노드 ID, 라이브러리 키, 쓰는 법, 대응하는 CSS 클래스(`assets/launch.css`) 순서다.

속성 키(예: `Label#9:0`)는 접미사가 파일마다 다를 수 있으니 `figma.md`의 `propKey(owner, '이름')`으로 찾는다.

## 목차

1. 동작: Button, Chip, Tab, Tabs, Checkbox, Switch, InputField
2. 표시: Badge, Callout, Toast, Modal, EmptyState
3. 히어로: BrushBand, BrushWord, Tape, Tag
4. 행사 정보: DateBlock, InfoItem, InfoRow, StepItem, StepPanel, Stepper, ScheduleRow
5. 구조: TopBar, Footer, TeamCard
6. 에셋: 로고, 모티프, 배경, 아이콘

---

## 1. 동작

### Button — 세트 `9:170` · key `e6f381c1549d7847a8df0041f356bb3975743635`
- 변형: Size `lg`(56) · `md`(44) · `sm`(36) × Type `fill` · `outline` · `text` × State `default` · `pressed` · `disabled` (27개)
- 속성: Label(TEXT, "참가 신청"), Leading icon(BOOLEAN), Trailing icon(BOOLEAN), Icon(INSTANCE_SWAP, 기본 arrow-right)
- 쓰는 법: fill(라임)은 한 화면에 하나. 키워드 필은 `outline + Leading icon`, 묶음의 첫 필만 `fill`. 신청 버튼은 `fill + Trailing icon`. 화살표는 앞이나 뒤 한쪽에만.
- CSS: `.ls-btn` + `.ls-btn--fill|--outline|--text` + `.ls-btn--lg|--sm`

### Chip — 세트 `10:76` · key `4d6e4078fcf924d1524b46592db0c6341bfd201e`
- 변형: State `default` · `selected` · `disabled` / 속성 Label
- 쓰는 법: 필터. 선택된 칩만 라임 채움. CSS `.ls-chip`, `[aria-pressed="true"]`

### Tab — 세트 `14:372` · key `257a1e188fae3e3951139e93153bb258dd8cab23`
- 변형: State `default` · `selected` / 속성 Label
- 선택 = 굵은 글자 + 2px 라임 밑줄(`border/focus`). CSS `.ls-tab`, `[aria-selected="true"]`

### Tabs — `14:373` · key `7d270211bb7ada7183caca808daa8da68aeb1ba7`
- 탭 5개(전체 · LEARN · BUILD · TEST · LAUNCH) 묶음, 아래 구분선. CSS `.ls-tabs`

### Checkbox — 세트 `13:389` · key `e1bcc13cbbfa767f4333aeef994f7948b5abbde3`
- 변형: State `off` · `on` · `disabled` / 속성 Label
- 켜짐 = 라임 면 + Ink 체크. CSS `.ls-check`

### Switch — 세트 `13:394` · key `df33894ca3bc4682f44ab7362dad05b662433459`
- 변형: State `off` · `on`. 켜짐 = 라임 트랙 + Ink 손잡이. CSS `.ls-switch`

### InputField — 세트 `13:377` · key `12108da5dc9daf21516dd5aaecbbb5a62051322a`
- 변형: State `default` · `focus` · `filled` · `error` · `disabled`
- 속성: Label, Value, Helper
- 쓰는 법: 오류를 빨강으로 알리지 않는다. `border/strong` 2px + 주의 아이콘 + 고칠 방법을 적은 Helper 문장. 포커스는 라임 2px. CSS `.ls-field`, `[aria-invalid="true"]`

## 2. 표시

### Badge — 세트 `10:69` · key `75438cd8a1555aae72c7afeeed6a941867d5611b`
- 변형: Type `accent`(라임 면) · `outline`(흰 테두리) · `ink`(먹색 면) / 속성 Label
- 각진 사각형. 포스터의 요일 박스(THU)와 같은 모양. 차시(1강), 팀 번호(TEAM 01), 상태(접수 중). CSS `.ls-badge--accent|--outline|--ink`

### Callout — 세트 `13:254` · key `61b4f3ba4f05843b473f8a20760363a132fef8ce`
- 변형: Type `info`(패널 면 + 구분선) · `accent`(라임 면, 한 화면에 하나) / 속성 Text
- CSS `.ls-callout`, `.ls-callout--accent`

### Toast — `14:449` · key `070c5433641b40f256a440b510173266c251a011`
- 먹색 필 + 라임 체크 + 흰 글자 / 속성 Text. CSS `.ls-toast`

### Modal — `14:430` · key `7ea1c9840356a3cf3127c5b3e36c096b9b06ae36`
- 속성 Title, Body. 버튼은 노출된 인스턴스(Secondary = outline "취소", Primary = fill). 결정 하나만 묻는다. CSS `.ls-modal`

### EmptyState — `14:453` · key `268a8fd9b44d8acb1b7aff4b77bb976b8b63caf4`
- 반짝이 하나 + 제목 + 다음 할 일 + outline 버튼 / 속성 Title, Description. CSS `.ls-empty`

## 3. 히어로 (히어로에만 쓴다)

### BrushBand — 세트 `10:132` · key `dc79c6f5a740ac7bfe49e8992b006698634e2d11`
- 변형: Size `lg`(Display/Band 64) · `md`(Band-md 40) / 속성 Text
- 먹색 브러시 모양 면 + 흰 글자. 놓을 때 반시계 5~6°. CSS `.ls-band`

### BrushWord — 세트 `10:137` · key `acde4eba517b7b4a4cb0a12aa954a22936609e04`
- 변형: Size `lg`(120) · `md`(72) / 속성 Text ("LAUNCH!")
- 라임(launch) / 네이비(paper). 화면에 하나. 띠 제목 아래로 살짝 겹친다. 원본 레터링이 오면 이미지로 바꾼다. CSS `.ls-brush`

### Tape — `10:138` · key `05a1c90ad89ac9f5dff610f8eaded5fa8dda48bd`
- 속성 Accent("창업,"), Text("새로운 미래가 시작된다.") — 앞 어절만 라임. 반시계 4°. CSS `.ls-tape` + `<b>`

### Tag — `10:141` · key `22e007924b1ae877ee8de34bee93abea2ad77e54`
- 속성 Text. 2~3개를 왼쪽 정렬로 세로로 쌓아(IDEA / TO / PRODUCT) 반시계 6~8°. CSS `.ls-tags`

## 4. 행사 정보

### DateBlock — `12:122` · key `16559d9c34029f2c11aefff5fd294fa7ab276623`
- 속성 Date("2026.11.12"), Day("THU", 라임 박스), Time("10:00–17:00"), Place(핀 아이콘 + 장소). CSS `.ls-date`

### InfoItem — 세트 `12:138` · key `def44f9a41061b1e327cb77a0eebbd01f40e5a38`
- 변형: Divider `false` · `true`(왼쪽 세로선) / 속성 Label(라임), Value

### InfoRow — `12:139` · key `21a6131bb8b72edc6ac08187df76ac7dd00db881`
- InfoItem 3개(대상 · 모집 인원 · 주요 프로그램). 두 번째부터 Divider=true. CSS `.ls-info`

### StepItem — `12:176` · key `6bd3e789d40673c76d94eaaf496891d2988950a8`
- 속성 Title(라임, Display/Step), Description, Icon(INSTANCE_SWAP: bulb · wrench · flask · award)

### StepPanel — `12:181` · key `aa56cb4f73ae79c02f4c2649ebcfb45ae8891d27`
- StepItem 4개 + 화살표, 패널 면 + 1.5px 테두리 + 모서리 20. 680px 미만은 2열. CSS `.ls-steps`

### Stepper — 세트 `12:305` · key `3f5dc8f80afa7d779ec0e1f4da61267ee27681d8`
- 변형: Current `LEARN` · `BUILD` · `TEST` · `LAUNCH`
- 지난 단계 = 라임 원 + 체크, 현재 = 라임 테두리 원 + 라임 점, 남은 단계 = 흰 테두리 원. 행사 당일 진행 표시용. CSS `.ls-stepper`

### ScheduleRow — 세트 `25:468` · key `be8b542bd0c517f2db4db113b6d50744d819e1ee`
- 변형: Type `default` · `lecture`(차시 배지) · `rest`(등록·점심·휴식, 보조 글자색) / 속성 Time, Title, 노출 인스턴스 Badge
- 색으로 종류를 나누지 않는다. 배지 유무와 글자 굵기로만 구분. CSS `.ls-schedule li`, `.is-lecture`, `.is-rest`

## 5. 구조

### TopBar — 세트 `14:367` · key `c0c6c39bd633ecb9b62c4e8f70af578ef1d47de9`
- 변형: Device `desktop`(기관명 + 메뉴 4 + sm fill 버튼) · `mobile`(행사명 + 메뉴 아이콘). 680px 미만은 mobile. 메뉴는 문장형 한글. CSS `.ls-topbar`

### Footer — `14:384` · key `6b9337cc149f1804d979f84d11df2b684c062a0a`
- 왼쪽 "주최 삼육보건대학교 AI 앙트레프레너 센터"(글자), 오른쪽 "주관" + 메이저맵 로고
- 속성 Logo(INSTANCE_SWAP): launch = white(`7:11`), paper = red(`7:17`). CSS `.ls-footer`

### TeamCard — 세트 `13:245` · key `4f98f8bcaf26fc16f43df71b5b3144e73a892e75`
- 변형: State `default`(패널 면) · `awarded`(라임 면, 트로피, 글자 Ink) / 속성 Title, Description, 노출 인스턴스 Team·Stage 배지
- 수상 팀만 awarded. 카드 안에는 모티프를 넣지 않는다. CSS `.ls-card`, `.ls-card--awarded`

## 6. 에셋

| 이름 | ID | key | 비고 |
| --- | --- | --- | --- |
| logo/majormap-wordmark-white | 7:11 | 0501f24a30e4d9557aeee1a317dbffbd8822c75a | 네이비 바탕 |
| logo/majormap-wordmark-red | 7:17 | 168e44ef225a452f469fb9131fdec4b4648dfdbb | 흰 바탕 |
| motif/pixel-checker | 7:32 | 444412372830564cea9a308f17400daa77c2e18d | 96×96, 모서리 |
| motif/crown | 7:40 | 08c704ee78326e684af4deec59881e740cb50611 | 제목 위 |
| motif/sparkle | 7:47 | 249aafcba4954d3b4fe29f30df5ea959edc6a013 | 제목 주변 1~2개 |
| motif/loop | 7:54 | 472148a4a685c4990eff811a6d9147e65b6d6f6b | 왼쪽 가장자리 |
| motif/ellipse-ring | 7:62 | fb9dd926bff44f719bd0577db9f5b504b07b0048 | 빈 모서리 |
| Background/Launch | 7:69 | 716d224283c272446400c1ab466b4a42f6173012 | 맨 아래 레이어, 크기에 맞춰 resize |

### 아이콘 (24px, 선 2, 둥근 끝) — `icon/{이름}`

| 이름 | ID | key | 뜻 |
| --- | --- | --- | --- |
| arrow-right | 6:8 | c68fbd00f0d99ba33163664df3c50f260d47689e | 필 앞·뒤 화살표 |
| arrow-up-right | 6:15 | f332a74b3c304d94e6d7c47d57af8c13801cafac | 바깥 링크 |
| chevron-right | 6:22 | d26646d3343a594873b23e73bec5af632f764d59 | 다음 |
| chevron-down | 6:29 | 471ab97f5357e42d99c9d66794166e700691820c | 펼치기 |
| check | 6:36 | 5ed979b39ff9299a2b7064d212e2ca5f4278b09b | 완료 |
| close | 6:43 | 62c1653f8919f9f5c7c3f19ad01db67aa394ba50 | 닫기 |
| plus | 6:50 | e34b13df8aacc9d8c410cc8ea0971f1f77000503 | 추가 |
| menu | 6:57 | c142bd2188953a19f1f9fc7ca5ebf17251bab432 | 메뉴 |
| pin | 6:64 | b98359ee1f1fd776197ead8edc522984cca2d067 | 장소 |
| calendar | 6:71 | 40514e3af3e20300941655d3e4d34e9c347edba3 | 일시 |
| clock | 6:78 | fe8e6cf9e3e3ee969b0f23ba8e6fd247d384169a | 시간 |
| users | 6:85 | a0c1052ee2274f99fedc997be92c0c711ae63397 | 팀 |
| user | 6:92 | 2cfcb6060289117fc5ef834f71471bab22079cb7 | 참가자 |
| bulb | 6:99 | 014a52df5a854810199288fcb2e1ae08fc7c3088 | LEARN |
| wrench | 6:106 | f5919bb4e89a42858f4f5f8302f250088299ecf7 | BUILD |
| flask | 6:113 | 500be90f8b63e2df64b7ebc9bbd3b6708e88fddf | TEST |
| award | 6:120 | 5a9867807f7b23dcaa947eb3fa3983be86726111 | LAUNCH |
| trophy | 6:127 | 379888796c23ffcd8e735c48998f4799a58c305e | 시상 |
| mic | 6:134 | b60a04ad6589cd1984ca12dbc9575ad085d94204 | 발표 |
| search | 6:141 | 1a46aee185a00dd6a7dabee211561e4b80851281 | 검색 |
| download | 6:148 | f7a8968dc20770136daa71ebedf333351a9a2837 | 내려받기 |
| link | 6:155 | a9ab9f0ff0f437ebdb2235744812ac149713ce17 | 링크 |
| info | 6:162 | a4d9ee9e4815ffd0e877d536c27d98df9a3e9367 | 안내 |
| alert | 6:169 | 413f217300615afe9463c011e30e1b5ef15d5549 | 주의 |

피그마 아이콘 인스턴스의 선 색은 안쪽 `Stroke` 노드의 strokes를 Semantic 변수로 바꿔 맞춘다(`icon/primary`, 라임 면 위는 `icon/on-accent`). 단계 아이콘 4종은 포스터 원본을 옮긴 게 아니라 같은 뜻으로 새로 그린 대체 아이콘이다. 원본 아이콘을 받으면 바꾼다.
