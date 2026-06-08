# ARTICLE_HANDOFF — article.html 정적 초안 인수인계

## 현재 상태

- `vom16_urbanbrand/article.html` 정적 초안 구현 완료. 컨벤션 정비 완료.
- `vom16_urbanbrand/css/article.css` 신규 작성 완료.
- `vom16_urbanbrand/css/responsive_article.css` 신규 생성. 현재 반응형 규칙 없음.
- article 전용 에셋은 `vom16_urbanbrand/images/article/`에 배치.
- 공용 에셋은 `vom16_urbanbrand/images/` 루트에 유지.

## 구현된 섹션

섹션 클래스명은 index.html과 동일하게 접두사 없이 콘텐츠 이름 단독 사용.
(CSS가 파일 단위 분리, `body.article_page`로 스코프 확보 → 접두사 불필요)

- `GNB` (`.gnb`): index 공통 구조 재사용. GNB 흰 배경 고정은 `article.css`의 `.article_page .gnb`로 처리. `is-solid`를 HTML에 하드코딩하지 않음.
- `HERO` (`.hero`): `img_hero_01.png` 사용. 대형 `ARTICLE` 타이틀과 우측 메인 카피 구성.
- `YEONGWOL` (`.yeongwol`): 인용문, 인물 이미지(`img_yeongwol_02.png`), 기사 대표 이미지(`img_yeongwol_01.jpg`) 구성.
- `BRUNCH` (`.brunch`): 정적 1번 상태. `brunch_01.png`와 우측 목록 3개 구성.
- `NEWS` (`.news`): 정적 3개 카드 구성. 현재 `news_01.png`, `news_02.png`, `news_03.png` 사용.
- `VIDEOS` (`.videos`): 정적 1번 상태. 현재 `img_video_01.jpg` 사용.
- `STORIES` (`.stories`): 정적 Instagram 탭 상태. 현재 `img_stories_instagram_01.jpg`~`04.jpg` 사용.
- `FOOTER` (`.footer`): index 공통 구조 재사용.

## 중요 결정

- Figma MCP는 `403 Invalid token`으로 접근 실패. 구현은 로컬 `designs/article/` 이미지 기준으로 진행.
- 전체 캡쳐/섹션 캡쳐 PNG(`article.png`, `hero.png`, `yeongwol.png`, `brunch.png`, `news.png`, `videos.png`, `stories.png`)는 구현용 에셋으로 쓰지 않음.
- 섹션별 레퍼런스는 참고만 하고, 마크업과 클래스 구조는 프로젝트 지침에 맞춰 새로 구성.
- 슬라이드/탭은 아직 JS 없이 정적 초안만 구현.
- BEM 변형(`--`) 적용: `section_head--line` (BRUNCH 섹션 헤드에만 적용).
- 타이포 유틸(`article_small`, `article_medium_r`, `article_medium_m`, `article_xsmall`, `article_xlarge`)은 `style.css` 정의이므로 그대로 유지.

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
