# DEPENDENCIES — 외부 의존성

새 라이브러리·CDN·플러그인 도입 검토 시 적용. 폰트 호스팅 정책은 [TYPOGRAPHY.md](TYPOGRAPHY.md).

---

## 현재

- **Swiper 11.2.10** (bundle CSS + JS, 자체 호스팅)
- **AOS 2.3.2** (`js/aos.js` + `css/aos.css`, 자체 호스팅) — 스크롤 진입 애니메이션. 초기화는 `js/aos_script.js`
- **Lenis 1.2.3** (`js/lenis.min.js`, 자체 호스팅) — 스무스 스크롤. 구동은 `js/smooth_scroll.js`
- **Pretendard Variable** (jsDelivr CDN)
- **로컬 웹폰트** (woff/woff2 7종, `fonts/`): 영월, 정림사지, 문경감홍사과, 마포나루, 신동엽손글씨, 창원단감둥근/아삭 — 용도 구분은 [TYPOGRAPHY.md](TYPOGRAPHY.md)

---

## 플러그인 정책

- **허용**: `swiper`, `aos`, `lenis`
- **제안 가능 후보** (2020년 전후 한국 로우엔드 프론트엔드에서 통용된 것): lightGallery, GLightbox, Micromodal 등
- **금지**: 모던 ESM 전용 라이브러리, 빌드 도구 필요 라이브러리

Lenis는 후보군(2020년 전후 통용) 밖의 모던 라이브러리지만, 전역(`globalThis.Lenis`) 노출 단일 파일 빌드로 클래식 스크립트 동작이 확인되어 사용자 결정으로 도입 (2026-06-10).

---

## AOS·Lenis 사용 규칙

- **`data-aos`를 플러그인 관리 노드에 붙이지 않는다.** Swiper가 인라인 `transform`을 제어하는 `swiper-wrapper`·`swiper-slide`에 붙이면 AOS의 transform 애니메이션이 무시되거나 충돌한다 (CLAUDE.md transform 충돌 원칙의 적용). 섹션 컨테이너 등 플러그인 비관리 요소에 붙인다.
  - 예외: `portfolio_upper`의 `swiper-wrapper`에 `fade-down`이 붙어 있음 — Swiper 인라인 transform이 이동을 무력화해 사실상 opacity 페이드만 동작하는 상태로 테스트·승인됨. 구조 변경 시 재검토.
- **AOS 애니메이션명은 공식 명칭만** 사용한다 (`fade`, `fade-up` 등). `fade-in` 같은 비표준명은 `[data-aos^=fade]` 접두 매칭으로 우연히 동작할 뿐이다.
- **Lenis rAF 루프는 하나만** 둔다. 다른 라이브러리 ticker(GSAP 등)와 이중 구동하면 시간 델타가 어긋난다.
- 첫 화면(hero)에 `data-aos`가 있으면 `window load`(AOS init)까지 해당 요소가 `opacity: 0` — 저속 환경에서 첫 화면 공백으로 보일 수 있음을 인지한다.
- 스크롤 위치 의존 JS(마퀴, 패럴랙스 등)를 새로 만들 때는 Lenis 보간 후의 `scroll` 이벤트·`window.scrollY` 기준으로 동작하는지 확인한다.

---

## 라이브러리 기능 우선 원칙

도입된 라이브러리의 위젯 기능은 **먼저 해당 라이브러리의 옵션·권장 구조에서 찾고, 없을 때만 직접 구현**한다.

- 직접 구현이 필요해 보이면 문서를 덜 찾아본 신호로 간주하고 한 번 더 확인한다.
- 라이브러리 표준 클래스(예: `swiper-pagination`)로 해결되는 곳에 고유 클래스를 새로 만들지 않는다. 섹션별 스타일 차이는 부모 스코프 선택자(예: `.brunch_book .swiper-pagination`)로 해결한다.
- 직접 구현이 정당한 경우는 라이브러리 버그 우회뿐이며(예: [CONTEXT.md](CONTEXT.md) 1번 fade+loop crossFade 버그), 그땐 이유를 주석으로 남긴다.

사례: brunch dots를 Swiper `pagination` 옵션 대신 수동 구현(bullet 생성·클릭·slideChange 토글)했다가 제거 — 코드 3~4배, 추후 loop/autoplay 도입 시 activeIndex 불일치 위험.

---

## 추가 절차 (필수)

1. **왜 필요한지** — 직접 구현으로 해결되지 않는 이유 설명
2. **대안 검증** — 2020년 전후 한국 로우엔드 환경에서 통용된 대안인지 명시
3. **사용자 승인 후** 추가

Pretendard 외 신규 의존성은 **자체 호스팅 기본**.
