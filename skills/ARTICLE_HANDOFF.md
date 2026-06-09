# ARTICLE_HANDOFF — article.html 인수인계

## 현재 상태

- `vom16_urbanbrand/article.html` 마크업 + 4개 캐러셀 동작(BRUNCH·NEWS·VIDEOS·STORIES) 구현 완료.
- `vom16_urbanbrand/js/article.js` 신규 — article 전용 JS 전부 담당(Swiper 11). `index.js`(구 `main.js`)는 index 전용.
- `vom16_urbanbrand/css/article.css` 작성 완료. `responsive_article.css`는 아직 비어 있음(반응형 미작성).
- article 전용 에셋 `images/article/`, 공용 에셋 `images/` 루트.
- **아직 commit/push 전.** (이번 세션 작업은 워킹트리에만 존재.)

## 데이터 편집 위치 (다음 세션이 콘텐츠 채울 때)

- BRUNCH 7권: `article.js` `books` 배열(표지/제목/부제). 포스트 3개 본문은 HTML 1번 슬라이드 → JS가 복제하므로 슬라이드별 본문을 채우려면 복제 방식을 데이터화하거나 HTML에 7권 명시 필요.
- VIDEOS 5편: `article.js` `videos` 배열(제목/메타/desc 문단 배열).
- STORIES 채널별 캡션: `article.js` `CAPTIONS.{instagram|facebook|blog}` 9개씩.
- NEWS 9건: `article.html`에 카드 9개 정적 작성(데이터 분리 안 함).

## 구현된 섹션

섹션 클래스명은 index.html과 동일하게 접두사 없이 콘텐츠 이름 단독 사용.
(CSS는 파일 단위 분리로 스코프 확보 → 접두사 불필요. 섹션 머리 래퍼는 `section_title_wrap` 공용 클래스 사용.)

- `GNB` (`.gnb`): index 공통 구조 재사용. GNB는 style.css가 관리하며, article은 항상 solid이므로 HTML에 `is-solid`를 직접 부여(스크롤 토글 JS 없음). 좌측 `ABOUT`/`WORK`/`SERVICE`·우측 `CONTACT` 링크는 모두 `index.html`로 연결 — **`WORK`/`SERVICE`/`CONTACT`(및 `ABOUT`)에 대응하는 index 내 섹션 앵커는 현재 구현 계획 없음**(index에 해당 `id` 없음). 추후 index 섹션에 앵커가 생기면 프래그먼트로 연결.
- `HERO` (`.hero`): `img_hero_01.png` 사용. 대형 `ARTICLE` 타이틀과 우측 메인 카피 구성.
- `YEONGWOL` (`.yeongwol`): 인용문, 인물 이미지(`img_yeongwol_02.png`), 기사 대표 이미지(`img_yeongwol_01.jpg`) 구성.
- `BRUNCH` (`.brunch`): 브런치북 7권 캐러셀(prev/next·dots·드래그). 표지 `img_brunch_01~07.jpg`, 책 제목·부제는 캡쳐 실데이터. 우측 포스트 3개 본문은 1권 기준 placeholder(섹션 캡쳐 해상도 한계로 2~7권 포스트 본문 미추출).
- `NEWS` (`.news`): 보도 9건 드래그 캐러셀. 카드 N = `img_news_0N.jpg`(에셋 번호 = `designs/article/news_0N.png` 캡쳐 순서). 9개 카드 콘텐츠는 캡쳐에서 추출해 HTML에 정적 작성.
- `VIDEOS` (`.videos`): 영상 5편 썸네일 캐러셀 + 페이저(1~5). `img_video_01~05.jpg`. 제목·메타·설명은 사용자 제공 텍스트(article.js `videos`). 2~5편 desc는 임시 텍스트(추후 교체). 우측 콘텐츠는 **하단 정렬**, 설명문(`.video_desc`)은 접힘 상태 max-height 88px → `read more`로 펼침(버튼 텍스트 `close`로 토글), 88px 안에 다 들어오면 토글 자동 숨김.
- `STORIES` (`.stories`): 탭(Instagram/Facebook/Blog) + 드래그 카드 캐러셀. 채널별 9개 카드. 탭 전환 시 `img_stories_{tab}_NN.jpg`와 캡션을 교체. 캡션은 `designs/article/stories_{tab}_NN.png` 캡쳐에서 추출한 실데이터(article.js `CAPTIONS`).
- `FOOTER` (`.footer`): index 공통 구조 재사용.

## 중요 결정

- Figma MCP 접근 가능 (fileKey `Apt9K76JOiMZYgJkpr0ra2`, 페이지 node `0:1`). 텍스트 스타일·카드 콘텐츠·이미지-카드 매핑을 MCP로 검증함.
- 전체 캡쳐/섹션 캡쳐 PNG(`article.png`, `hero.png`, `yeongwol.png`, `brunch.png`, `news.png`, `videos.png`, `stories.png`)는 구현용 에셋으로 쓰지 않음. 캡쳐본은 `designs/article/`에만 두며, `images/article/`에 중복 반입됐던 캡쳐 29개는 제거함(실제 에셋은 `img_*`).
- 섹션별 레퍼런스는 참고만 하고, 마크업과 클래스 구조는 프로젝트 지침에 맞춰 새로 구성.
- 슬라이드/탭 동작은 `js/article.js`에서 Swiper(11)로 구현. dots·페이저·탭은 커스텀 마크업 유지하고 JS로 active 제어(Swiper 기본 페이지네이션 CSS와 specificity 충돌 회피 — scrollbar 등 override는 `.스코프 .swiper-*` 형태로 specificity를 올려둠). NEWS·STORIES 카드 캐러셀은 `freeMode + scrollbar` 드래그, BRUNCH는 navigation(prev/next)+dots, VIDEOS는 페이저(1~5).
- 콘텐츠 추출 출처: NEWS 9건·STORIES 캡션 27개는 `designs/article/{news,stories_*}_NN.png`(카드 단위 크롭 → 본문까지 판독 가능)에서 추출. VIDEOS 텍스트는 사용자 제공. BRUNCH 책 제목/부제는 `brunch_NN.png`(섹션 단위라 제목만 판독). **BRUNCH 포스트 본문은 섹션 캡쳐 해상도 한계로 미추출 → 1권 placeholder.**
- `index.js`(구 `main.js`)는 index 전용 요소(`.portfolio_upper` 등)를 guard 없이 참조하므로 article에 연결 금지.
- BRUNCH 섹션 머리의 타이틀+버튼 가로 배치는 brunch 고유 레이아웃이므로 공통 `section_title_wrap`의 변형이 아니라 전용 클래스 `brunch_top`으로 분리(BRUNCH 섹션 CSS에 위치). 내부 타이틀 그룹(아이콘+제목+부제)만 공용 `section_title_wrap` 사용. (gnb 외 래퍼에는 `header` 명칭 사용 안 함.)
- 타이포: 모든 텍스트는 Figma 텍스트 스타일과 동일한 `style.css` 유틸 클래스를 HTML에 부여한다(제목 h1~h4 포함). 매핑 예: 섹션 제목 h2=`title_small`, 부제=`article_xlarge`, 히어로 카피=`title_xlarge_m`, 뉴스 카드 제목=`article_medium_m`. `article.css`에는 폰트 선언을 두지 않고 레이아웃·여백·색만 둔다(히어로 `ARTICLE` h1, 인용문 등 명명된 스타일이 없는 bespoke 요소만 예외).

## 다음 세션 인계 (PENDING)

1. **브라우저 런타임 미검증** — 에이전트는 헤드리스라 JS 동작/레이아웃을 실제로 못 봤다. 정적 검증만 수행(아래 검증 기록). 로컬 서버(`cd vom16_urbanbrand && python3 -m http.server 8000` → `article.html`)로 4개 위젯(드래그·화살표·dots·페이저·탭·스크롤바, VIDEOS read more/close 접기) 동작 + 시안 대비 여백/비율을 먼저 확인할 것.
2. **BRUNCH 포스트 본문** — 2~7권 본문 미추출(1권도 포스트 2·3은 짧은 placeholder). `stories_NN.png`처럼 **포스트 단위 캡쳐 추가**나 텍스트 제공 시 `books` 배열을 본문 포함 데이터로 확장(현재는 HTML 1슬라이드를 JS 복제하므로, 슬라이드별 본문을 넣으려면 복제 방식을 데이터 렌더로 바꾸거나 HTML에 7권 명시).
3. **BRUNCH 넘버링 확인** — 캡쳐상 `일에 대한 생각`이 1·2·4·5·6으로 읽혀 **3이 비어 있음**. 의도인지 오독인지 확인 필요(`books` 배열 수정).
4. **VIDEOS desc 2~5편** — 사용자가 별도 제공 예정. 현재 placeholder("여기 요약본 적어주십시오…")로 `videos` 배열에 들어가 있음.
5. **STORIES 레이아웃** — 사용자가 `.stories { padding: 120px 0 }`로 수정(기존 `overflow: hidden` 제거). `.stories_content { min-width: 1420px }`라 컨테이너 초과분이 섹션에서 클립되지 않아 페이지 가로 스크롤이 생길 수 있음 — 반응형/레이아웃 정리 시 확인.
6. **반응형** — `responsive_article.css` 비어 있음. 데스크탑 확정 후 작성.

## 검증 기록 (이번 세션, 정적)

- `node --check js/article.js` 통과.
- article.js가 참조하는 셀렉터가 모두 HTML에 존재(brunch/news/video/stories 위젯).
- 참조 에셋 디스크 존재 확인: NEWS `img_news_01~09`, STORIES `img_stories_{instagram,facebook,blog}_01~09`(27개), VIDEO `img_video_01~05`, BRUNCH 표지 `img_brunch_01~07`.
- `article.css`에 금지 기술(`grid`/`subgrid`/`:has()`/`@container`/`@layer`/`@scope`) 없음.
- (런타임 동작은 미확인 — PENDING 1번 참조.)

## 이번 세션 정비/버그수정 요약

- 곡선따옴표 class(`”title_small”`)→정상, 디버그 `background: red`→`#000`, 무효 ellipsis에 `overflow:hidden`, brunch 포스트 02·03 병렬화, 닫는태그 식별주석 정정.
- `--line` modifier 제거 → brunch 전용 `brunch_top`(gnb 외 `header` 명칭 회피).
- muted 본문 투명도 → 흰배경 기준 hex(`#404040`/`#737373`, 0.45→기존 `#888`). (팔레트 외 색은 허용 — 흩어진 값만 통일.)
- GNB 깨진 프래그먼트 앵커 → `index.html`(work/service/contact 미계획).
- `main.js`→`index.js` 개명.

## 관련 변경 파일 (이번 세션)

- `vom16_urbanbrand/article.html`, `vom16_urbanbrand/css/article.css`
- `vom16_urbanbrand/js/article.js` (신규), `vom16_urbanbrand/js/index.js` (← `main.js` 개명)
- `vom16_urbanbrand/index.html` (script src 갱신)
- `skills/ARTICLE_HANDOFF.md`
- `designs/article/{news,videos,brunch}_NN.png`, `stories_{instagram,facebook,blog}_NN.png` (사용자 추가, 미추적)
