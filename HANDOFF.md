# HANDOFF — 다음 세션 워크플로

2026-06-10 전체 코드 평가 세션의 인수인계 문서. 이 백로그 작업을 지시받으면 **평가를 반복하지 말고** 아래 기준으로 작업한다. 사용자가 다른 작업(새 섹션 제작 등)을 지시하면 그 작업이 우선이며, 이 백로그를 먼저 하자고 제안하지 않는다.

작업 완료 후 이 문서의 해당 항목을 지우고, 백로그가 비면 사용자 확인 후 문서 자체를 삭제한다. CLAUDE.md는 이 문서를 참조하지 않는다 — 에이전트 메모리의 포인터 또는 사용자 지시로 발견된다.

---

## 0. 세션 시작 절차

1. CLAUDE.md(자동 로드) 확인 → 작업할 항목의 맥락에 해당하는 `skills/` 문서를 **먼저** 읽는다 (CSS 수정이면 STYLE.md, JS면 CONTEXT.md 3·6번 등).
2. `git status`로 미커밋 변경 확인. 평가 시점 기준 6개 파일이 modified 상태였다 (article.html, index.html, css/article.css, css/index.css, css/responsive_index.css, js/article.js). 백로그 수정과 기존 미커밋 변경이 섞이지 않게 사용자와 커밋 시점을 조율한다.
3. 육안 확인이 필요하면 로컬 HTTP 서버로 연다 — `file://`에서는 SVG `<use>`가 CORS에 막힌다.
   ```bash
   cd vom16_urbanbrand && python3 -m http.server 8000
   ```

---

## 1. 백로그

라인 번호는 평가 시점 기준 — 수정이 진행되면 어긋날 수 있으니 코드 조각으로 재확인할 것.

### Phase A — 버그 수정 (바로 진행 가능, 단 초안 → 사용자 검토 흐름 유지)

| # | 위치 | 내용 |
|---|------|------|
| A1 | `index.html:349` (portfolio_lower 타이틀) | `<span>로고 하나, 글자 하나에도 <span><br>` — 두 번째 `<span>`은 `</span>` 오타. 미닫힘 span 2개 |
| A2 | `article.css` `.brunch_post_article`(≈166), `.news_card .article_small`(≈225) | 다중행 블록에 `text-overflow: ellipsis`는 무효. `display: -webkit-box` + `-webkit-line-clamp`로 교체 (구형 WebKit 기술 — 프로젝트 제약 부합). 현재 고정 height가 줄 중간을 자르므로 clamp 줄 수와 height 정합도 맞출 것 |
| A3 | `index.js` `setBg()`(≈241–257) | 600ms `setTimeout`을 정리 없이 쌓아 prev/next 연타 시 배경 플래시. 타이머 핸들 저장 → 다음 호출 시 `clearTimeout`. CONTEXT.md 1번(번쩍임)과 증상이 비슷하니 원인 혼동 주의 |
| A4 | `responsive_index.css:5` `.font_try_side` | `display: contents` 요소의 `gap`은 죽은 코드 — 제거 |

### Phase B — 사용자 결정 필요 (수정 전 반드시 질문)

| # | 위치 | 질문 |
|---|------|------|
| B1 | `index.css` `.hero` | `min-height: 1080px`가 `max-height: 100vh`를 스펙상 이김 → 낮은 화면(1366×768)에서 hero가 뷰포트 초과. "최소 1080 보장"과 "뷰포트 이내 제한" 중 어느 쪽이 의도인지 |
| B2 | `index.html` ceo 타이틀(≈523–526) | "저에게 매우 의미있는"과 "일입니다." 사이만 `<br>` 없음 (앞 줄들은 전부 `<br>`). 누락인지 의도인지 |
| B3 | `index.css` portfolio_lower 이미지(≈327–332) | 콘텐츠 성격 이미지가 `nth-child` CSS background — ASSETS.md "의미 있는 이미지는 `<img>`+alt" 규칙과 충돌 + 순서 변경에 취약. `<img>` 전환 여부 |
| B4 | `skills/STRUCTURE.md` | 트리가 낡음 (owl/jquery 기재, article.html "빈 파일", md 루트 표기, `vom16_urbanbrand/` 누락). 메타 규칙상 문서 수정은 사용자 확인 후 |

### Phase C — 일관성 정리 (낮은 위험, 묶어서 진행 가능)

- C1. `<img class=... src=...>` 속성 순서(`src → class`) 위반 6건: `index.html:546, 783` / `article.html:99, 108, 114, 983`
- C2. `article.html:72` — `class=" hero_headline"` 선행 공백 제거. 같은 패턴인 index의 `portfolio_headline`은 `<p>`인데 여기만 `<div>` — `<p>`로 통일
- C3. `index.js` GNB·HERO·PORTFOLIO 블록에 article.js 수준의 가드(`if (!el || !window.Swiper) return`) + IIFE 적용 — 요소 부재·로드 실패 시 전체 스크립트 사망 방지
- C4. `index.css` `.font_try_size_label`의 `translateX(-50%)` — 자제 대상 퍼센트 translate. JS가 이미 `left`를 px로 계산하므로 라벨 절반 너비 보정도 px로 이동
- C5. 자잘: `style.css` `.breakpoint_overlay.is-visible`의 중복 `pointer-events: none` 제거 / `aos_script.js` 들여쓰기 2칸 → 4칸

### Phase D — 권고 (착수 전 사용자 승인)

- D1. 헤딩 도입: 두 페이지에 h1~h6 전무. 섹션 타이틀의 태그만 h1/h2로 교체 (타이포 유틸 클래스가 스타일 전담하므로 시각 영향 없음 — reset.css의 헤딩 초기화 여부 먼저 확인)
- D2. `style.css` @font-face 7종에 `font-display: swap` (현재 FOIT)
- D3. 폴드 아래 `<img>`에 `loading="lazy"` (article: news 9 + stories 27 + video 5 + brunch 7)
- D4. `.gitignore` 추가 (`.DS_Store` — 디스크에 3개, 미추적)
- D5. `logo_test.html`이 배포 폴더(`vom16_urbanbrand/`) 안 — LOGO.md가 참조하는 실험 파일이므로 이동 시 LOGO.md 경로도 함께

### 평가에서 확인된 비문제 (재지적 금지)

- 곡선따옴표: 두 HTML 모두 0건 (2026-06-10 기준)
- stories 3개 Swiper가 공유하는 `.stories_scrollbar` 셀렉터 문자열 — Swiper `uniqueNavElements`(기본 true)가 셀렉터를 각 컨테이너 내부로 스코핑하므로 정상 동작
- 팔레트 외 색상(`#666`, `#737373` 등 다수) — STYLE.md 색 목록은 스냅샷, 위반 아님 (사용자 확정)
- `line-height`·`letter-spacing`의 `em` 단위 — font-size 연동 목적이면 허용 (사용자 확정)
- `portfolio_upper`의 `swiper-wrapper`에 붙은 `data-aos`, hero `data-aos`의 첫 화면 FOUC — DEPENDENCIES.md에 문서화된 승인 사항
- `--swiper-navigation-color` — Swiper 자체 테마 API라 CSS 변수 제한과 무관

---

## 2. 작업 원칙 (이 프로젝트 고유 — 위반 빈발 지점)

- **Phase 단위로 진행**하고 각 Phase 완료 시 사용자 검토를 받는다. B·D는 착수 전 질문이 먼저다.
- HTML에 대량 마크업을 Write/Edit한 직후 **곡선따옴표 검사 필수** (CONTEXT.md 4번 — 재발 이력 2회). 수정한 모든 HTML을 검사한다:
   ```bash
   python3 -c "
   for f in ['vom16_urbanbrand/index.html', 'vom16_urbanbrand/article.html']:
       c = open(f, 'rb').read()
       print(f, c.count(b'\xe2\x80\x9c') + c.count(b'\xe2\x80\x9d'))
   "
   ```
- 금지(grid, `:has()`, nesting, `@container` 등)·자제(CSS 변수, rem/em, `::before/::after`, 퍼센트 translate) 목록은 CLAUDE.md가 우선. 모던 기술이 더 깔끔해 보이면 쓰기 전에 사용자에게 제안.
- 반응형 규칙은 `responsive*.css`에만. 베이스 CSS에 미디어쿼리 금지.
- 커밋은 사용자가 요청할 때만.

---

## 3. 수정 후 검증 체크리스트

- [ ] 곡선따옴표 0건 (HTML을 건드렸다면)
- [ ] 로컬 서버에서 두 페이지 육안 확인 — 특히 A3 수정 후 portfolio_upper prev/next 연타, A2 수정 후 brunch·news 카드 말줄임
- [ ] 들여쓰기 스페이스 4칸, 클래스명 snake_case
- [ ] 새 미디어쿼리가 베이스 CSS에 섞이지 않았는지
