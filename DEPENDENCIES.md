# DEPENDENCIES — 외부 의존성

새 라이브러리·CDN·플러그인 도입 검토 시 적용. 폰트 호스팅 정책은 [TYPOGRAPHY.md](TYPOGRAPHY.md).

---

## 현재

- **jQuery** (owl-carousel 의존)
- **Owl Carousel 2.3.4** (CSS + JS, 자체 호스팅)
- **Pretendard Variable** (jsDelivr CDN)
- **로컬 TTF**: 정림사지, 영월, 창원단감, 신동엽손글씨

---

## 플러그인 정책

- **허용**: `owl-carousel`만 (현재 유일)
- **제안 가능 후보** (2020년 전후 한국 로우엔드 프론트엔드에서 통용된 것): AOS, lightGallery, GLightbox, Micromodal 등
- **금지**: 모던 ESM 전용 라이브러리, 빌드 도구 필요 라이브러리

---

## 추가 절차 (필수)

1. **왜 필요한지** — 직접 구현으로 해결되지 않는 이유 설명
2. **대안 검증** — 2020년 전후 한국 로우엔드 환경에서 통용된 대안인지 명시
3. **사용자 승인 후** 추가

Pretendard 외 신규 의존성은 **자체 호스팅 기본**.
