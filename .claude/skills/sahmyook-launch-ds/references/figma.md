# 피그마에서 작업하기 (SAHMYOOK-DS)

`use_figma`를 부르기 전에 `figma-use` 스킬을 먼저 읽는다. 이 문서는 그 위에 얹는 이 파일 전용 메모다.

## 파일과 ID

- fileKey `pzP3hBWEaChKMvRP6wc57s` — https://www.figma.com/design/pzP3hBWEaChKMvRP6wc57s
- 팀: MajorMapOfficial (`team::1215111932972538100`)

| 페이지 | ID |
| --- | --- |
| CV | 0:1 |
| Color | 2:98 |
| Typography | 2:99 |
| Layout | 18:525 |
| Asset | 2:100 |
| Icon | 2:101 |
| Component | 2:103 |
| Pattern | 2:105 |

| 변수 컬렉션 | ID | 모드 |
| --- | --- | --- |
| Primitives | VariableCollectionId:2:2 | Value `2:0` |
| Layout | VariableCollectionId:2:38 | Value `2:1` |
| Semantic | VariableCollectionId:2:53 | launch `2:2`, paper `2:3` |

ID는 파일이 복제되거나 노드가 다시 만들어지면 바뀐다. 실패하면 이름으로 다시 찾는다(`figma.variables.getLocalVariablesAsync()`의 `name`, 페이지 `name`).

## 서체

이 연결 환경에서 쓸 수 있는 것: `Black Han Sans Regular`, `Permanent Marker Regular`, `Noto Sans KR`(Regular·Medium·Bold 등). Pretendard와 Wanted Sans는 없다. 텍스트를 만들거나 고치기 전에 쓸 서체를 모두 불러온다.

```js
await Promise.all([
  ['Noto Sans KR','Regular'], ['Noto Sans KR','Medium'], ['Noto Sans KR','Bold'],
  ['Black Han Sans','Regular'], ['Permanent Marker','Regular'],
].map(([family, style]) => figma.loadFontAsync({ family, style })));
```

텍스트는 로컬 텍스트 스타일로 지정한다(`await t.setTextStyleIdAsync(style.id)`). 스타일을 쓰면 서체·행간·자간이 함께 따라온다.

## 공통 도우미

새 스크립트 첫머리에 그대로 붙여 쓴다.

```js
const sem = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:2:53');
const MODE = { launch: '2:2', paper: '2:3' };
const V  = Object.fromEntries((await figma.variables.getLocalVariablesAsync()).map(v => [v.name, v]));
const TS = Object.fromEntries((await figma.getLocalTextStylesAsync()).map(s => [s.name, s]));
const paint = n => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V[n]);
async function txt(chars, style, color = 'text/primary') {
  const t = figma.createText();
  await t.setTextStyleIdAsync(TS[style].id);
  t.characters = chars; t.fills = [paint(color)]; return t;
}
// 속성 키는 "Label#9:0"처럼 접미사가 붙는다. 이름 앞부분으로 찾는다.
const propKey = (owner, name) => Object.keys(owner.componentPropertyDefinitions).find(k => k.split('#')[0] === name);
// 변형 세트에서 변형 하나를 골라 인스턴스를 만든다.
const variant = (set, name) => set.children.find(c => c.name === name);
```

새 화면 프레임:

```js
const f = figma.createFrame();
f.resize(1280, 720);
f.setExplicitVariableModeForCollection(sem, MODE.launch); // 리포트·인쇄는 MODE.paper
f.fills = [paint('bg/page')];
f.clipsContent = true;
const bg = (await figma.getNodeByIdAsync('7:69')).createInstance(); // Background/Launch
f.appendChild(bg); bg.resize(f.width, f.height);
```

인스턴스 예시:

```js
const btnSet = await figma.getNodeByIdAsync('9:170');
const b = variant(btnSet, 'Size=lg, Type=fill, State=default').createInstance();
b.setProperties({
  [propKey(btnSet, 'Label')]: '지금, 참가 신청하기',
  [propKey(btnSet, 'Trailing icon')]: true,
});
```

## 회전

피그마 `rotation`은 양수가 반시계 방향이다. 이 시스템의 기울기는 모두 양수(3~8)다. 띠 제목 5~6, 브러시 단어 5~6, 테이프 4, 태그 스택 6~8, 기관명 6, 왕관 10.

## PNG 내보내기 (고해상도)

`get_screenshot`은 원래 크기보다 크게 그려 주지 않는다. 3배 PNG가 필요하면 복제해서 키운 다음 받는다.

```js
// 1) 복제 후 3배
const src = await figma.getNodeByIdAsync('<frameId>');
const c = src.clone(); c.name = 'TEMP export 3x';
figma.currentPage.appendChild(c); c.x = 6000; c.y = 6000;
c.setExplicitVariableModeForCollection(sem, MODE.launch);
c.rescale(3);
return { id: c.id };
```

2) `get_screenshot(nodeId, maxDimension: 3840, contentsOnly: true)` → 받은 URL을 `curl -fL -o out.png`로 저장
3) 복제본 삭제 (이름이 `TEMP export 3x`인지 확인하고 `remove()`)
4) 1920×1080이 필요하면 `sips -z 1080 1920 in.png --out out.png`

## 이미지 올리기

- `upload_assets`로 사각형에 채운다. **WebP는 올라가도 화면에 빈 칸으로 나왔다.** JPEG·PNG로 바꿔 올린다(`sips -s format jpeg in.webp --out out.jpg`).
- 3D 별·콜라주·레터링·QR 같은 원본은 점선 자리(slot)에 채운다. 자리는 `bg` 없음, `border/default` 1.5px 점선 `[6,6]`, 모서리 12(원형이면 999).

## 겪었던 함정

- `figma.setFileThumbnailNodeAsync`는 이 연결에서 지원되지 않는다. 썸네일은 사용자가 직접 지정한다.
- NOISE 효과에 `blendMode`를 넣으면 검증에서 막힌다. `{type:'NOISE', noiseType:'MONOTONE', color:{r:1,g:1,b:1,a:0.1}, noiseSize:0.6, density:0.7, visible:true}`로 쓴다.
- `combineAsVariants` 뒤에는 변형들이 (0,0)에 겹친다. 직접 격자로 배치하고 `resizeWithoutConstraints`로 세트 크기를 맞춘다.
- 인스턴스의 텍스트를 바꿀 때는 `setProperties`로 바꾼다. 텍스트 노드를 직접 고치면 컴포넌트 속성과 어긋난다.
- 인스턴스를 `rescale`하면 글자 크기가 스타일과 달라져 스타일 연결이 끊긴다. 표지·카드뉴스처럼 큰 장식에만 쓰고, 본문 부품은 크기 그대로 쓴다.
- 한 번의 `use_figma` 호출에서 페이지는 한 번만 바꾼다(`await figma.setCurrentPageAsync(page)`).

## 다른 파일에서 쓰기

SAHMYOOK-DS를 라이브러리로 게시하면 다른 파일에서 키로 가져올 수 있다. 키 목록은 `components.md`에 있다.

```js
const set = await figma.importComponentSetByKeyAsync('e6f381c1549d7847a8df0041f356bb3975743635'); // Button
const single = await figma.importComponentByKeyAsync('05a1c90ad89ac9f5dff610f8eaded5fa8dda48bd'); // Tape
```

게시되지 않았으면 가져오기가 실패한다. 그때는 SAHMYOOK-DS 안에서 작업하거나, 사용자에게 피그마에서 Publish를 눌러 달라고 한다.
