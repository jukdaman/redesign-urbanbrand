# redesign-urbanbrand

도시브랜드연구소 공식 사이트 리디자인 클론 코딩. **데스크탑 전용** — 반응형은 추후 작업이며 `responsive*.css`는 빈 파일로 유지한다.

이 문서가 모든 작업의 우선 기준이다. 다른 지침이나 일반 베스트프랙티스와 충돌하면 이 문서를 따른다.

---

## 항상 적용되는 절대 규칙

### 금지
- **CSS**: `display: grid` / `subgrid`, `:has()`, CSS nesting, `@container`, `@layer`, `@scope`, CSS Variables (`--*`), `rem`·`em` 단위
- **플러그인**: owl-carousel 외 사용 금지
- **라이브러리**: 모던 ESM 전용 / 빌드 도구 필요한 것

### 허용
- CSS는 `display: flex`까지 — `flex: 1`, `flex-basis`, `flex-grow/shrink`, `gap`, `flex-wrap` 자유
- `position`, `transition`, `transform`, `calc()`, `::before`/`::after`
- 색상은 HEX + `rgba()` 직접 표기

### 메타 규칙
원칙 때문에 코드가 지저분해지거나 큰 비효율이 생긴다고 판단되면 — 모던 기술을 쓰기 전 **반드시 사용자에게 먼저 제안**한다.

---

## 작업 맥락별 참조

작업하려는 맥락에 해당하는 문서를 **먼저 읽고** 시작한다.

| 작업 맥락                                  | 읽을 문서 |
|-------------------------------------------|----------|
| HTML 또는 CSS 코드를 쓸 때                | [STYLE.md](STYLE.md) |
| 폰트·타이포 유틸 클래스 작업              | [TYPOGRAPHY.md](TYPOGRAPHY.md) |
| 이미지·아이콘·로고 파일 추가/네이밍       | [ASSETS.md](ASSETS.md) |
| 메인 로고나 SVG 스프라이트 다룰 때        | [LOGO.md](LOGO.md) |
| 새 페이지·새 파일 만들 때 (어디 둘지)     | [STRUCTURE.md](STRUCTURE.md) |
| 새 라이브러리·CDN·웹폰트 도입 검토        | [DEPENDENCIES.md](DEPENDENCIES.md) |

---

## 작업 전 체크
- [ ] 위 "금지" 리스트의 항목을 쓰려 하지 않음
- [ ] 해당 작업 맥락의 문서를 읽었음
- [ ] 클래스명 `snake_case`, 들여쓰기 스페이스 4칸
