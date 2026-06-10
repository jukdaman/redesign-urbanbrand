# ASSETS — 에셋 네이밍

이미지·아이콘·로고 파일을 추가/이동/리네임할 때 적용. SVG 스프라이트는 [LOGO.md](LOGO.md).

---

## 위치

- 공용 에셋은 `images/` 루트에 둔다.
- 특정 페이지에서만 쓰는 에셋은 `images/{page}/` 하위 폴더에 둔다.
- 새 페이지 전용 에셋은 해당 페이지명과 같은 하위 폴더를 만든 뒤 추가한다. 예: `images/index/`, `images/article/`

---

## 네이밍 표

| 종류        | 패턴                              | 예시 |
|------------|-----------------------------------|------|
| 아이콘      | `icon_{name}[_{variant}].svg`     | `icon_plus.svg`, `icon_carousel_next.svg`, `icon_favicon_dark.svg` |
| 일반 이미지 | `img_{name}[_{nn}].{ext}`         | `img_ceo.png`, `img_hero_01.jpg`, `img_history.png` |
| 메인 로고   | `logo_urbanbrand[_{variant}].svg` | `logo_urbanbrand.svg`, `logo_urbanbrand_white.svg`, `logo_urbanbrand_black.svg` |
| SNS 로고    | `logo_sns_{name}.svg`             | `logo_sns_instagram.svg`, `logo_sns_brunch.svg`, `logo_sns_naver.svg` |

---

## 공통 규칙

- 모든 파일명 `snake_case`
- 페이지 전용 에셋은 폴더명으로 사용처를 구분하므로 파일명에 페이지명을 중복해서 붙이지 않는다.
- 색상 변형 접미: `_white`, `_black`
- 다중 이미지 넘버링은 **두 자리** (`_01`, `_02`, …)

---

## 이미지 처리 방식

| 상황 | 방식 |
|------|------|
| 의미 있는 이미지 (콘텐츠, 접근성 필요) | `<img src="..." alt="...">` + object-fit |
| 순수 장식·배경 (alt 없음) | CSS `background` |
| JS가 배경을 동적으로 교체해야 할 때 | `data-bg` 속성 + JS 할당 (예: index portfolio 슬라이드 크로스페이드) |
| 인접 콘텐츠 이미지의 파생 장식 (블러 사본 등) | URL을 중복 기재하지 말고 JS가 `<img>`의 src를 읽어 배경에 복사 (예: article brunch 표지 블러 배경) — URL의 단일 출처는 항상 콘텐츠 `<img>` |

- `role="img"` + 빈 div는 `<img>`로 전환한다.
- 장식 배경 div에는 `aria-hidden="true"` 부여.

---

## 로고·아이콘 우선순위

새 로고/아이콘은 가급적 `logo_urbanbrand.svg` 스프라이트의 `<symbol>`로 추가 → [LOGO.md](LOGO.md) 참고.
