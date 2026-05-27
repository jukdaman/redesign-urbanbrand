# ASSETS — 에셋 네이밍

이미지·아이콘·로고 파일을 추가/이동/리네임할 때 적용. SVG 스프라이트는 [LOGO.md](LOGO.md).

---

## 위치

- 모든 에셋은 `images/`에 **평면 구조** — 하위 폴더 만들지 않음

---

## 네이밍 표

| 종류        | 패턴                              | 예시 |
|------------|-----------------------------------|------|
| 아이콘      | `icon_{name}[_{variant}].svg`     | `icon_plus.svg`, `icon_carousel_next.svg`, `icon_contact_arrow_down.svg` |
| 일반 이미지 | `img_{name}[_{nn}].{ext}`         | `img_ceo.png`, `img_ceo_signature.png`, `img_history_01.png` |
| 메인 로고   | `logo_urbanbrand[_{variant}].svg` | `logo_urbanbrand.svg`, `logo_urbanbrand_white.svg`, `logo_urbanbrand_black.svg` |
| SNS 로고    | `logo_sns_{name}.svg`             | `logo_sns_instagram.svg`, `logo_sns_brunch.svg`, `logo_sns_naver.svg` |

---

## 공통 규칙

- 모든 파일명 `snake_case`
- 색상 변형 접미: `_white`, `_black`
- 다중 이미지 넘버링은 **두 자리** (`_01`, `_02`, …)

---

## 로고·아이콘 우선순위

새 로고/아이콘은 가급적 `logo_urbanbrand.svg` 스프라이트의 `<symbol>`로 추가 → [LOGO.md](LOGO.md) 참고.
