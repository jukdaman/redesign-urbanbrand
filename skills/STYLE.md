# STYLE — HTML + CSS 컨벤션

HTML 또는 CSS 코드를 쓸 때마다 적용. 폰트/타이포 유틸은 [TYPOGRAPHY.md](TYPOGRAPHY.md), 파일 분기는 [STRUCTURE.md](STRUCTURE.md), 에셋 네이밍은 [ASSETS.md](ASSETS.md) 참고.

---

## 공통
- 들여쓰기 **스페이스 4칸** (HTML/CSS 모두)
- 문서의 현재 상태에서 지침에 없거나 기존 지침과 충돌하는 규칙이 보일 경우, 해당 구조를 지침에 반영할지 여부를 사용자에게 확인.

---

## HTML

- 속성 순서: `href`/`src` → `class` → `alt`/`type`/`role`/`aria-*` → `data-*` → `style`
- 시맨틱 태그 적극: `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- 외부 스크립트: `defer`
- 섹션 주석 (전부 대문자, 등호로 감쌈):
  ```html
  <!-- ========== GNB ========== -->
  <!-- ========== HERO ========== -->
  ```
- 깊은 중첩 닫는 태그에 식별 주석:
  ```html
  </nav><!-- gnb_nav_left -->
  </div><!-- gnb_inner -->
  ```
- 빈 줄 규칙 — 깊이가 아닌 **요소의 시각적 무게** 기준:
  - 섹션 간: 빈 줄 4개
  - 섹션 내 큰 블록 간 (upper/lower, 주요 div 등): 빈 줄 2개
  - 블록 내 형제 요소 간: 빈 줄 1개
  - 의미적으로 강하게 묶인 짝 (nav 버튼들, title+category 등): 빈 줄 없음

---

## CSS 포매팅

의미적으로 묶이는 짧은 속성들은 **한 줄로**:
```css
.hero_inner { position: absolute; left: 0; right: 0; bottom: 443px; }
```

한 줄 규칙에서 중괄호 앞뒤에 **공백 1칸**:
```css
.logo_anim { opacity: 0; }
.gnb_nav a:hover { opacity: 1; }
```

한 줄이 시각적으로 무거워지면 한 속성 한 줄로 분리:
```css
.gnb {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    height: 90px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}
```

---

## CSS 네이밍

| 종류      | 규칙                  | 예시 |
|-----------|-----------------------|------|
| 블록/요소 | `snake_case`          | `gnb`, `gnb_nav_left`, `hero_copy`, `solution_top` |
| 상태      | `is-` 접두 + 하이픈   | `is-active`, `is-fading` |
| 변형      | BEM `--` 접미         | `gnb--compact` |

- ID 셀렉터 지양 — 스타일은 클래스로.
- 기존 네이밍의 직관성 or 일관성이 부족할 경우, 사용자에게 더 좋은 이름을 제안 가능.

---

## 색상

- HEX 우선, 투명도/그래디언트는 `rgba()`
- CSS Variables 도입 금지
- 현재 팔레트:
  - `#000`, `#fff`, `#888`, `#ddd`
  - `rgba(255,255,255,0.05)`, `rgba(255,255,255,0.6)`
  - `rgba(0,0,0,0.3)`, `rgba(0,0,0,0.55)`

---

## 단위

- 기본 `px` (`18px`, `140px`, letter-spacing `-0.25px` / `12px`)
- 뷰포트 의존만 `vw` / `vh`
- 동적 계산 `calc()` OK
- `rem`, `em` 금지

---

## 레이아웃

- `display: flex` **만** 사용 (grid 금지)
- `gap`, `justify-content`, `align-items`, `flex-direction`, `flex-wrap` 자유
- `flex: 1`, `flex-basis`, `flex-grow`, `flex-shrink` OK
  - 예: `.solution_line { flex: 1; }`, `.solution_desc { flex-basis: 100%; }`
- 컨테이너 표준: `.container { max-width: 1920px; margin: 0 auto; padding: 0 140px; }` (좌우 140px 인셋)

---

## 속성 선언 순서

1. display / flex 계열 (`flex-direction`, `justify-content`, `align-items`, `gap`)
2. position / inset / top·right·bottom·left / z-index
3. width / height / min-* / margin / padding
4. border / border-radius
5. background / color
6. font-* / line-height / letter-spacing / text-align / text-decoration / white-space
7. box-shadow / text-shadow / filter / opacity
8. transition / transform / animation
9. cursor / overflow / 기타

---

## CSS 주석

```css
/* ========== HERO ========== */     /* 섹션: 대문자 + 등호 */
/* solution_top */                    /* 서브섹션: 소문자 평문 */
/* FONT */                            /* 영역 라벨 */
```

---

## CSS 파일 역할

| 파일                | 역할 |
|---------------------|------|
| `reset.css`         | 손대지 않음 |
| `style.css`         | 공통 (`@font-face`, 타이포 유틸, 버튼, GNB, 컨테이너, SVG `.logo` 베이스) |
| `{page}.css`        | 페이지 전용 섹션 스타일 |
| `responsive*.css`   | 모든 반응형. 베이스 CSS에 미디어쿼리 섞지 말 것 |
