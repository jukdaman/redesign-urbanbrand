# redesign-urbanbrand

도시브랜드연구소 공식 사이트 리디자인 코딩. **데스크탑 전용** — 반응형은 추후 작업이며 `responsive*.css`는 빈 파일로 유지한다.

- **원본 사이트**: https://www.urbanbrand.co.kr/
- **배포 주소**: https://jukdaman.github.io/redesign-urbanbrand/vom16_urbanbrand/

이 문서가 모든 작업의 우선 기준이다. 다른 지침이나 일반 베스트프랙티스와 충돌하면 이 문서를 따른다.

---

## 작업 방식

섹션 단위 리팩토링 진행 중.

- **입력**: 사용자가 대화 중 제공하거나 `skeleton/`에 있는 구조도 캡쳐본 (한 섹션씩 제작)
- **참조**: `archive/` — 이전 AI 생성본. 지침 미준수이므로 그대로 복사 금지. 마크업·스타일 의도 참고용
- **출력**: [vom16_urbanbrand/index.html](vom16_urbanbrand/index.html), [vom16_urbanbrand/css/](vom16_urbanbrand/css/), [vom16_urbanbrand/js/](vom16_urbanbrand/js/)
- **흐름**: 구조도 수신 → 초안 작성 → 사용자 검토 → 완성
- 새 구조도에 결함이 있어 예상되는 의도를 충분히 반영하지 못하거나, 기존 코드와 충돌할 우려가 있으면 작업을 진행하지 말고 사용자에게 보고 후 결정한다.
- 우선순위: 일관성 + 체계성 + 명료성

`designs/`는 archive 생성 당시의 Figma 원본. 현재 작업의 직접 입력은 아니지만 시각적 의도 참고 가능.

---

## 항상 적용되는 절대 규칙

### 금지
- **라이브러리**: 모던 ESM 전용 / 빌드 도구 필요한 것
- **CSS**: `display: grid` / `subgrid`, `:has()`, CSS nesting, `@container`, `@layer`, `@scope`

### 자제
- CSS Variables (`--*`), `rem`·`em` 단위
- `::before`/`::after`

### 허용
- `display: flex`, `position`, `transition`, `transform`, `calc()`
- 색상은 HEX + `rgba()` 직접 표기

### 메타 규칙
원칙 때문에 코드가 지저분해지거나 큰 비효율이 생긴다고 판단되면 — 모던 기술을 쓰기 전 **반드시 사용자에게 먼저 제안**한다.

작업 진행중 혹은 commit시 맥락적으로 유의미하거나, 향후 지침이 될만한 변경 사항은 해당하는 md에 기록한다. 기존 내용과 모순될 경우 **먼저 사용자에게 확인을 받은 후** 수정이 가능하다.

사용자 발화를 md에 기록할 때 미사여구·강조 표현을 그대로 옮기지 말고, 핵심 요점을 추출해 에이전트 지시문으로서 효율적인 표현으로 작성한다.

---

## 작업 맥락별 참조

작업하려는 맥락에 해당하는 문서를 **먼저 읽고** 시작한다.

| 작업 맥락                                  | 읽을 문서 |
|-------------------------------------------|----------|
| HTML 또는 CSS 코드를 쓸 때                | [skills/STYLE.md](skills/STYLE.md) |
| 폰트·타이포 유틸 클래스 작업              | [skills/TYPOGRAPHY.md](skills/TYPOGRAPHY.md) |
| 이미지·아이콘·로고 파일 추가/네이밍       | [skills/ASSETS.md](skills/ASSETS.md) |
| 메인 로고나 SVG 스프라이트 다룰 때        | [skills/LOGO.md](skills/LOGO.md) |
| 새 페이지·새 파일 만들 때 (어디 둘지)     | [skills/STRUCTURE.md](skills/STRUCTURE.md) |
| 새 라이브러리·CDN·웹폰트 도입 검토        | [skills/DEPENDENCIES.md](skills/DEPENDENCIES.md) |

---

## 작업 전 체크
- [ ] 위 "금지" 리스트의 항목을 쓰려 하지 않음
- [ ] 해당 작업 맥락의 문서를 읽었음
- [ ] 클래스명 `snake_case`, 들여쓰기 스페이스 4칸
