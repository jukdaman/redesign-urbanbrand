# TYPOGRAPHY — 폰트 + 타이포 유틸

폰트 변경, 새 웹폰트 추가, 타이포 유틸 클래스 작업 시 적용. 일반 CSS 컨벤션은 [STYLE.md](STYLE.md), 새 라이브러리/CDN 도입 절차는 [DEPENDENCIES.md](DEPENDENCIES.md).

---

## 본문

- 기본: `'Pretendard', sans-serif`
- Variable 필요 시: `'Pretendard Variable', 'Pretendard', sans-serif`

---

## 호스팅 정책

- **Pretendard만 CDN 허용** — jsDelivr (`cdn.jsdelivr.net/gh/orioncactus/pretendard/...`)
  - 자체 호스팅으로 전환 시 사용자 승인
- 장식·체험 폰트는 **자체 호스팅** (`fonts/`, woff/woff2 7종). 용도는 3유형이며 `style.css` @font-face 구역에 주석 그룹으로 구분돼 있다:
  1. **본문 전역** — Pretendard (CDN, @font-face 선언 없음)
  2. **rich text 장식** (solution·portfolio_lower의 `rich_*` 클래스) — 영월 (Yeongwol), 정림사지 (Jeonglimsaji)
  3. **font_try 체험 전용** (index.js `fontFamilyMap` 참조) — 문경감홍사과 (MungyeongGamhong), 마포나루 (MapoMaponaru), 신동엽손글씨 (ShinDongYup), 창원단감둥근/아삭 (ChangwonDangamRound/Asac)
- **신규 웹폰트 (Google Fonts, Noto 등) → 사용자 승인 필요**

---

## `@font-face` 선언 위치

- **무조건 `style.css` 상단에 모음**
- 페이지별 CSS에 분산 금지
- 새 자체 호스팅 폰트 추가 시도 `style.css`에 선언

---

## 타이포 유틸 클래스 네이밍

패턴: `{type}_{size}[_{weight}]`

| 슬롯            | 값 |
|----------------|-----|
| `type`         | `title`, `article` 등 |
| `size`         | `xxlarge`, `xlarge`, `large`, `medium`, `small`, `xsmall`, `xxsmall` |
| `weight` (선택) | `_b` (bold), `_m` (medium), `_r` (regular) — 같은 size에서 굵기 분기 필요할 때만 |

예: `.title_xlarge_b`, `.title_xlarge_m`, `.article_medium_m`, `.article_medium_r`

**새 유틸을 만들기 전 기존 `{type}_{size}` 조합부터 확인.**

---

## 버튼 클래스

버튼은 타이포 유틸로 분리하지 않음. 텍스트 + 레이아웃을 하나의 클래스로 정의하고 `style.css`의 BOX 섹션(`/* btn */`)에 둔다. 디자인 확정 시 추가.
