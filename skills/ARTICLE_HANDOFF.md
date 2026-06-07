# ARTICLE_HANDOFF — article.html 정적 초안 인수인계

## 현재 상태

- `vom16_urbanbrand/article.html` 정적 초안 구현 완료.
- `vom16_urbanbrand/css/article.css` 신규 작성 완료.
- `vom16_urbanbrand/css/responsive_article.css` 신규 생성. 현재 반응형 규칙 없음.
- article 전용 에셋은 `vom16_urbanbrand/images/article/`에 배치.
- 공용 에셋은 `vom16_urbanbrand/images/` 루트에 유지.

## 구현된 섹션

- `GNB`: index 공통 구조 재사용. article 페이지에서는 흰 배경 고정 톤으로 보이도록 `article.css`에서 보정.
- `HERO`: `img_hero_01.png` 사용. 대형 `ARTICLE` 타이틀과 우측 메인 카피 구성.
- `YEONGWOL`: 인용문, 인물 이미지(`img_yeongwol_02.png`), 기사 대표 이미지(`img_yeongwol_01.jpg`) 구성.
- `BRUNCH`: 정적 1번 상태. `brunch_01.png`와 우측 목록 3개 구성.
- `NEWS`: 정적 3개 카드 구성. 현재 `news_01.png`, `news_02.png`, `news_03.png` 사용.
- `VIDEOS`: 정적 1번 상태. 현재 `img_video_01.jpg` 사용.
- `STORIES`: 정적 Instagram 탭 상태. 현재 `img_stories_instagram_01.jpg`~`04.jpg` 사용.
- `FOOTER`: index 공통 구조 재사용.

## 중요 결정

- Figma MCP는 `403 Invalid token`으로 접근 실패. 구현은 로컬 `designs/article/` 이미지 기준으로 진행.
- 전체 캡쳐/섹션 캡쳐 PNG(`article.png`, `hero.png`, `yeongwol.png`, `brunch.png`, `news.png`, `videos.png`, `stories.png`)는 구현용 에셋으로 쓰지 않음.
- 섹션별 레퍼런스는 참고만 하고, 마크업과 클래스 구조는 프로젝트 지침에 맞춰 새로 구성.
- 슬라이드/탭은 아직 JS 없이 정적 초안만 구현.

## 다음 작업 후보

- 브라우저에서 `article.html`을 열고 전체 캡쳐와 비교해 섹션별 여백, 비율, 이미지 crop 조정.
- `BRUNCH`, `VIDEOS`, `STORIES`에 동작을 붙일지 결정.
- 동작을 붙일 경우 `main.js`를 그대로 article에 연결하지 말 것. 현재 `main.js`에는 index 전용 코드가 guard 없이 섞여 있어 article에서 오류 가능성이 있다.
- 필요하면 공통 JS와 index 전용 JS를 분리하거나, article 전용 `js/article.js`를 새로 만든다.
- `responsive_article.css`는 아직 비어 있다. 데스크탑 초안 확정 후 반응형 작성.

## 검증 기록

- article에서 참조하는 주요 에셋 존재 확인 완료.
- `article.css`에서 `display: grid`, `subgrid`, `:has()`, `@container`, `@layer`, `@scope` 사용 없음.
- `images/article/`에는 실제 구현용 분리 에셋과 향후 슬라이드/탭 확장용 이미지가 함께 들어 있다.

## 관련 변경 파일

- `vom16_urbanbrand/article.html`
- `vom16_urbanbrand/css/article.css`
- `vom16_urbanbrand/css/responsive_article.css`
- `vom16_urbanbrand/images/article/`
- `skills/ASSETS.md`
- `skills/STRUCTURE.md`
