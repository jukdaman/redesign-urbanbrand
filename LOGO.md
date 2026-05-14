# 로고 SVG 사용법

도시브랜드연구소 로고는 `images/logo_urbanbrand.svg` 한 파일에 `<symbol>`로 정의돼 있습니다. 페이지 어디서든 `<use>`로 참조해서 사용하고, **색상·크기·hover는 CSS로 제어**합니다.

## 기본 사용법

```html
<svg class="logo" role="img" aria-label="도시브랜드연구소 로고">
    <use href="images/logo_urbanbrand.svg#logo_urbanbrand"></use>
</svg>
```

- 의미 있는 로고: `role="img"` + `aria-label="..."`
- 장식용(주변 텍스트로 의미 전달됨): `aria-hidden="true"`만 부여
- `href` 경로는 **현재 HTML 파일 기준 상대 경로**
  - 루트 페이지: `images/logo_urbanbrand.svg#logo_urbanbrand`
  - 하위 폴더 페이지: `../images/logo_urbanbrand.svg#logo_urbanbrand`

## 섹션별 스타일 제어

SVG path는 `fill="currentColor"`로 정의돼 있어서 **CSS `color` 한 줄로 색상이 바뀝니다**.

```css
/* 베이스: 부모 크기 채움 */
.logo { display: inline-block; width: 100%; height: 100%; }

/* GNB — 흰색 + hover */
.gnb_logo .logo { color: #fff; transition: color .2s; }
.gnb_logo:hover .logo { color: #ddd; }

/* services 헤더 — 검정, 큰 크기 */
.services_logo { width: 244px; height: 244px; color: #000; }

/* services 카드 아이콘 */
.services_card_logo { color: #000; }

/* portfolio */
.portfolio_icon { width: 70px; height: 70px; color: #000; }

/* footer */
.footer_logo { width: 147px; height: 147px; color: #000; }
```

| 속성 | 제어 방법 |
|------|----------|
| 색상 | `color: #fff` / `color: #000` 등 — `currentColor`가 따라옴 |
| 크기 | `width` / `height` |
| hover | `:hover { color: ... }`, `transform`, `opacity` 등 일반 CSS |

## 새 아이콘을 같은 스프라이트에 추가하기

`images/logo_urbanbrand.svg` 안에 `<symbol>`을 추가합니다.

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="logo_urbanbrand" viewBox="0 0 50 50">
        <path d="..." fill="currentColor"/>
    </symbol>
    <symbol id="icon_arrow" viewBox="0 0 24 24">
        <path d="..." fill="currentColor"/>
    </symbol>
</svg>
```

사용처에서 `#id`만 바꿔서 참조:

```html
<svg class="logo"><use href="images/logo_urbanbrand.svg#icon_arrow"></use></svg>
```

추가 시 체크리스트:
- `viewBox` 정확히 지정 (디자인 원본 좌표계 기준)
- `fill="black"` 같은 고정 색은 `fill="currentColor"`로 교체
- `id`는 snake_case로 통일

## 주의사항

**로컬 `file://`에서 동작 안 함**
외부 SVG 참조(`<use href="외부파일#id">`)는 Chrome 등에서 `file://` 프로토콜로 열면 CORS 정책에 막힙니다. 개발 시 로컬 서버로 띄우세요:

```bash
cd redesign-urbanbrand
python3 -m http.server 8000
# → http://localhost:8000/index.html
```

VS Code Live Server 확장도 됩니다. 실제 호스팅 환경(HTTP/HTTPS)에서는 문제없이 동작합니다.

## 왜 `<img>`가 아닌가

- `<img>`로 SVG를 넣으면 색상이 파일에 고정 — 흰색·검정 등 색상별로 파일을 따로 만들어야 함
- CSS `color`로 색을 못 바꾸고, hover 색상 전환·테마 변경도 불가
- 같은 도형을 6번 사용 → path 정의 6중 다운로드 (스프라이트는 1회 + 캐시)
