# CONTEXT — 주요 시행착오 기록

이 프로젝트에서 겪은 major 시행착오. 같은 실수 반복 방지용.

---

## 1. portfolio_upper 배경 번쩍임

**증상**: Swiper fade 전환 중간에 배경이 순간 밝아지는 번쩍임 발생.

**오판**: `mix-blend-mode: screen`이 원인이라고 오해 → screen 제거, filter 제거, brightness 제거, loop: false, z-index 재배치 등 시도. 모두 실패.

**실제 원인**: Swiper fade + loop 조합에서 `crossFade: true`가 동작하지 않는 버그. slide1 fadeout과 slide2 fadein이 동시에 발생해 두 배경이 겹치면서 밝아짐.

**해결**: 배경을 swiper 슬라이드 밖 공유 레이어로 분리하고 JS로 직접 crossfade 처리. Swiper는 콘텐츠만 담당.

→ 상세: [PORTFOLIO_UPPER_TITLE.md](PORTFOLIO_UPPER_TITLE.md)

---

## 2. mix-blend-mode: screen과 stacking context

**증상**: `portfolio_title`에 `mix-blend-mode: screen`을 적용했는데 배경 이미지가 글자에 비치지 않음.

**원인**: `mix-blend-mode`는 부모의 stacking context 기준으로 블렌딩. 블렌딩 대상(`portfolio_upper_bg`)과 같은 stacking context 안에 있어야 효과가 작동함. `filter`가 있는 요소는 자체 stacking context를 형성하므로 부모에 `isolation: isolate`를 명시해야 함.

**해결**: `.portfolio_upper`에 `isolation: isolate` 추가.
