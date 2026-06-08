# ARTICLE_HANDOFF — article.html 정적 초안 인수인계

## 현재 상태

- `vom16_urbanbrand/article.html` 정적 초안 구현 완료. 컨벤션 정비 완료.
- `vom16_urbanbrand/css/article.css` 신규 작성 완료.
- `vom16_urbanbrand/css/responsive_article.css` 신규 생성. 현재 반응형 규칙 없음.
- article 전용 에셋은 `vom16_urbanbrand/images/article/`에 배치.
- 공용 에셋은 `vom16_urbanbrand/images/` 루트에 유지.

## 구현된 섹션

섹션 클래스명은 index.html과 동일하게 접두사 없이 콘텐츠 이름 단독 사용.
(CSS는 파일 단위 분리로 스코프 확보 → 접두사 불필요. 섹션 머리 래퍼는 `section_title_wrap` 공용 클래스 사용.)

- `GNB` (`.gnb`): index 공통 구조 재사용. GNB는 style.css가 관리하며, article은 항상 solid이므로 HTML에 `is-solid`를 직접 부여(스크롤 토글 JS 없음).
- `HERO` (`.hero`): `img_hero_01.png` 사용. 대형 `ARTICLE` 타이틀과 우측 메인 카피 구성.
- `YEONGWOL` (`.yeongwol`): 인용문, 인물 이미지(`img_yeongwol_02.png`), 기사 대표 이미지(`img_yeongwol_01.jpg`) 구성.
- `BRUNCH` (`.brunch`): 정적 1번 상태. `img_brunch_01.jpg`와 우측 목록 3개 구성.
- `NEWS` (`.news`): 정적 3개 카드 구성. `img_news_04.jpg`~`06.jpg` 사용 (디자인 카드 1~3에 해당. 에셋 번호가 카드 표시 순서와 달라 첫 3개 카드 이미지는 04~06).
- `VIDEOS` (`.videos`): 정적 1번 상태. 현재 `img_video_01.jpg` 사용.
- `STORIES` (`.stories`): 정적 Instagram 탭 상태. 현재 `img_stories_instagram_01.jpg`~`04.jpg` 사용.
- `FOOTER` (`.footer`): index 공통 구조 재사용.

## 중요 결정

- Figma MCP 접근 가능 (fileKey `Apt9K76JOiMZYgJkpr0ra2`, 페이지 node `0:1`). 텍스트 스타일·카드 콘텐츠·이미지-카드 매핑을 MCP로 검증함.
- 전체 캡쳐/섹션 캡쳐 PNG(`article.png`, `hero.png`, `yeongwol.png`, `brunch.png`, `news.png`, `videos.png`, `stories.png`)는 구현용 에셋으로 쓰지 않음. 캡쳐본은 `designs/article/`에만 두며, `images/article/`에 중복 반입됐던 캡쳐 29개는 제거함(실제 에셋은 `img_*`).
- 섹션별 레퍼런스는 참고만 하고, 마크업과 클래스 구조는 프로젝트 지침에 맞춰 새로 구성.
- 슬라이드/탭은 아직 JS 없이 정적 초안만 구현.
- BEM 변형(`--`) 적용: `section_title_wrap--line` (BRUNCH 섹션 헤드에만 적용).
- 타이포: 모든 텍스트는 Figma 텍스트 스타일과 동일한 `style.css` 유틸 클래스를 HTML에 부여한다(제목 h1~h4 포함). 매핑 예: 섹션 제목 h2=`title_small`, 부제=`article_xlarge`, 히어로 카피=`title_xlarge_m`, 뉴스 카드 제목=`article_medium_m`. `article.css`에는 폰트 선언을 두지 않고 레이아웃·여백·색만 둔다(히어로 `ARTICLE` h1, 인용문 등 명명된 스타일이 없는 bespoke 요소만 예외).

## 다음 작업 후보

- 브라우저에서 `article.html`을 열고 전체 캡쳐와 비교해 섹션별 여백, 비율, 이미지 crop 조정.
- `BRUNCH`, `VIDEOS`, `STORIES`에 동작을 붙일지 결정.
- 동작을 붙일 경우 `main.js`를 그대로 article에 연결하지 말 것. 현재 `main.js`에는 index 전용 코드(`hero` 요소 기준 GNB scroll 처리 등)가 guard 없이 섞여 있어 article에서 오류 가능성이 있다.
- 공통 JS와 index 전용 JS를 분리하거나, article 전용 `js/article.js`를 새로 만든다.
- `responsive_article.css`는 아직 비어 있다. 데스크탑 초안 확정 후 반응형 작성.

## 검증 기록

- article에서 참조하는 주요 에셋 존재 확인 완료.
- `article.css`에서 `display: grid`, `subgrid`, `:has()`, `@container`, `@layer`, `@scope` 사용 없음.
- `images/article/`에는 실제 구현용 분리 에셋과 향후 슬라이드/탭 확장용 이미지가 함께 들어 있다.
- 컨벤션 정비 완료: 섹션 클래스명 통일, BEM 변형 적용, 속성 선언 순서 준수, 닫는 태그 식별 주석 보완.

## 관련 변경 파일

- `vom16_urbanbrand/article.html`
- `vom16_urbanbrand/css/article.css`
- `vom16_urbanbrand/css/responsive_article.css`
- `vom16_urbanbrand/images/article/`
- `skills/ASSETS.md`
- `skills/STRUCTURE.md`
