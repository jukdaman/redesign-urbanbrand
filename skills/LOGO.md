# 로고 SVG 사용법

도시브랜드연구소 로고는 `images/logo_urbanbrand.svg` 한 파일에 **3개의 `<symbol>`**(`face_a`, `face_b`, `face_c`)로 정의돼 있습니다. 셋을 한 SVG 안에 `<use>`로 겹쳐 그려 완성 로고를 만들고, **각 면을 독립적으로 색·굵기·표시 여부 제어**할 수 있습니다.

## 기본 사용법

```html
<svg class="logo_urbanbrand {section}_logo" viewBox="0 0 240 240" role="img" aria-label="도시브랜드연구소 로고">
    <use class="logo_face face_a" href="images/logo_urbanbrand.svg#face_a"></use>
    <use class="logo_face face_b" href="images/logo_urbanbrand.svg#face_b"></use>
    <use class="logo_face face_c" href="images/logo_urbanbrand.svg#face_c"></use>
</svg>
```

- 베이스 클래스 `logo_urbanbrand` + 섹션별 클래스(`gnb_logo`, `services_logo` 등) 함께 부여
- 각 `<use>`에 `logo_face` (공통) + `face_a/b/c` (개별) 두 클래스 부여 — 면별 CSS 제어 진입점
- 의미 있는 로고: `role="img"` + `aria-label="..."`
- 장식용(주변 텍스트로 의미 전달): `aria-hidden="true"`
- `href` 경로는 **현재 HTML 파일 기준 상대 경로**
    - 루트 페이지: `images/logo_urbanbrand.svg#face_a`
    - 하위 폴더 페이지: `../images/logo_urbanbrand.svg#face_a`

## CSS 제어

각 `<use>`는 일반 DOM 요소라 CSS 선택자로 직접 짚을 수 있습니다. SVG 파일 내부에 박혀 있는 값:

- `fill="none"` — 도형은 외곽선만 그림
- `stroke="currentColor"` — 색은 CSS `color`에서 받아옴
- `vector-effect="non-scaling-stroke"` — 크기가 바뀌어도 stroke 굵기는 px 기준 고정
- `stroke-linecap="round"`, `stroke-miterlimit="1.5"` — 끝단·코너 처리

따라서 사용처 CSS에서 제어할 항목은 **색(`color`)과 굵기(`stroke-width`)** 두 가지입니다.

```css
/* 공통 — 기본 굵기 */
.logo_face { stroke-width: 2; }

/* GNB — 전체 흰색 + hover */
.gnb_logo .logo_face { color: #fff; transition: color .2s; }
.gnb_inner > a:hover .logo_face { color: #ddd; }

/* services 헤더 — 전체 검정, 굵게 */
.services_logo { width: 244px; height: 244px; }
.services_logo .logo_face { color: #000; stroke-width: 3; }

/* services 카드 아이콘 — 한 면만 강조 */
.services_card .logo_urbanbrand { width: 50px; height: 50px; }
.services_card .logo_face { color: #c8c8c8; }
.card_logo_design .face_a { color: #000; }
.card_font_design .face_b { color: #000; }
.card_consulting  .face_c { color: #000; }
```

| 속성       | 제어 방법                                          |
|-----------|--------------------------------------------------|
| 색상       | `color: #fff` — `currentColor`가 따라옴             |
| 굵기       | `stroke-width` — 크기와 무관 (non-scaling-stroke)    |
| 표시/숨김  | `display: none` 또는 `opacity: 0`                   |
| hover     | `:hover { color: ... }`, `transform`, `opacity` 등  |

## z-order (앞뒤 순서)

SVG에는 `z-index`가 없습니다. **`<use>` 형제 중 뒤에 쓴 것이 위에 그려집니다** (painter's algorithm). 강조할 면을 가장 위로 올리려면 그 `<use>`를 마지막에 두세요.

```html
<!-- face_b를 가장 위로 -->
<svg viewBox="0 0 240 240" ...>
    <use class="logo_face face_a" href="images/logo_urbanbrand.svg#face_a"></use>
    <use class="logo_face face_c" href="images/logo_urbanbrand.svg#face_c"></use>
    <use class="logo_face face_b" href="images/logo_urbanbrand.svg#face_b"></use>
</svg>
```

단, `face_b` 내부의 두 path는 symbol 정의에 묶여 있어 외부에서 순서를 못 바꿉니다 — 필요하면 [images/logo_urbanbrand.svg](../images/logo_urbanbrand.svg)를 직접 편집.

## 새 아이콘을 같은 스프라이트에 추가하기

`images/logo_urbanbrand.svg` 안에 `<symbol>`을 추가합니다.

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="face_a" viewBox="0 0 240 240" ...>...</symbol>
    <symbol id="face_b" viewBox="0 0 240 240" ...>...</symbol>
    <symbol id="face_c" viewBox="0 0 240 240" ...>...</symbol>
    <symbol id="icon_arrow" viewBox="0 0 24 24">
        <path d="..." fill="currentColor"/>
    </symbol>
</svg>
```

추가 시:
- `viewBox` 정확히 (원본 좌표계 기준)
- 고정 색(`fill="black"` 등)은 `fill="currentColor"` 또는 `stroke="currentColor"`로
- `id`는 snake_case

## 인라인 패턴 (애니메이션·JS 제어 필요 시)

`<use href="외부.svg#id">` 방식은 shadow DOM으로 인해 **CSS `@keyframes`와 JS가 내부 `<path>`에 접근 불가**.
stroke draw-on 애니메이션이나 WAAPI 제어가 필요하면 경로를 HTML에 직접 인라인한다.

```html
<svg class="logo_urbanbrand logo_anim" viewBox="0 0 240 240" overflow="visible"
     role="img" aria-label="도시브랜드연구소 로고">
    <g class="logo_face face_a" stroke-linecap="round" stroke-miterlimit="1.5">
        <path class="logo_stroke"
              d="M80,0 L160,0 L160,80 L80,160 L0,160 L0,80 Z"
              fill="none" stroke="currentColor" vector-effect="non-scaling-stroke"/>
    </g>
    <g class="logo_face face_b" stroke-linecap="round" stroke-miterlimit="1.5">
        <path class="logo_stroke"
              d="M240,80 L160,160 L80,160"
              fill="none" stroke="currentColor" vector-effect="non-scaling-stroke"/>
        <path class="logo_stroke"
              d="M160,80 L240,80 L240,160 L160,240 L80,240 L80,160 Z"
              fill="none" stroke="currentColor" vector-effect="non-scaling-stroke"/>
    </g>
    <g class="logo_face face_c" stroke-linecap="round" stroke-miterlimit="1.5">
        <path class="logo_stroke"
              d="M80,240 L80,80 L160,0 L240,0 L240,160 L160,240 Z"
              fill="none" stroke="currentColor" vector-effect="non-scaling-stroke"/>
    </g>
</svg>
```

- `<symbol>` → `<g>`, `<use>` 제거, `stroke-linecap`·`stroke-miterlimit`을 `<g>`로 이동
- `logo_anim` 같은 별도 클래스로 `gnb_logo`와 명확히 분리
- `overflow="visible"` 필수 (symbol의 기본값이었던 것과 동일하게)
- `stroke-dasharray` / `stroke-dashoffset`은 `vector-effect="non-scaling-stroke"` 환경에서
  브라우저 간 좌표계 차이가 있을 수 있으므로 JS의 `path.getTotalLength()`로 런타임 측정 권장

실험 파일: `vom16_urbanbrand/logo_test.html`

---

## 주의사항

**로컬 `file://`에서 동작 안 함** — 외부 SVG 참조(`<use href="외부파일#id">`)는 Chrome 등에서 `file://`로 열면 CORS 정책에 막힙니다. 개발 시 로컬 서버로:

```bash
cd redesign-urbanbrand
python -m http.server 8000
# → http://localhost:8000/index.html
```

VS Code Live Server 확장도 가능. 실제 호스팅 환경(HTTP/HTTPS)에선 문제없음.

## 왜 `<img>`가 아닌가

- `<img>`로 SVG를 넣으면 색·굵기가 파일에 고정 — 변형마다 파일을 따로 만들어야 함
- CSS `color` / `stroke-width`로 동적 제어 불가, hover 전환·테마 변경도 불가
- 면별 강조(서비스 카드 같은) 디자인이 원천 불가능
- 같은 도형을 N번 사용 → 정의가 N중 다운로드 (스프라이트는 1회 + 캐시)
