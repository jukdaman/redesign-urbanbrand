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
- 장식 폰트는 **자체 호스팅 TTF** (`fonts/`):
  - 정림사지 (Jeonglimsaji)
  - 영월 (Yeongwol)
  - 창원단감 (Changwon Dangam)
  - 신동엽손글씨 (ShinDongYupHandwriting)
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
| `type`         | `title`, `article`, `button` 등 |
| `size`         | `xxlarge`, `xlarge`, `large`, `medium`, `small`, `xsmall`, `xxsmall` |
| `weight` (선택) | `_m` (medium), `_r` (regular) — 같은 size에서 굵기 분기 필요할 때만 |

예: `.title_xlarge`, `.article_medium_m`, `.article_medium_r`, `.button_large`

**새 유틸을 만들기 전 기존 `{type}_{size}` 조합부터 확인.**
