# STRUCTURE — 파일 구조 + 신규 파일 분기

새 페이지·새 CSS·새 JS·새 이미지를 추가할 때 어디에 둘지 결정.

---

## 전체 구조 (2026-06-11 기준)

```
redesign-urbanbrand/
├── CLAUDE.md                  # 라우터 (항상 로드)
├── .gitignore                 # .DS_Store, captures/
├── skills/                    # 작업 맥락별 문서 (CLAUDE.md 참조표에서 연결)
│   ├── STYLE.md / TYPOGRAPHY.md / ASSETS.md / LOGO.md
│   ├── STRUCTURE.md / DEPENDENCIES.md
│   └── CONTEXT.md / PORTFOLIO_UPPER_TITLE.md   # 시행착오·맥락 보관
├── vom16_urbanbrand/          # 배포 루트 (GitHub Pages가 이 폴더를 서빙)
│   ├── index.html
│   ├── article.html
│   ├── logo_test.html         # 로고 draw-on 실험 파일 (LOGO.md 참조, 비배포 의도)
│   ├── css/
│   │   ├── reset.css                       # 손대지 않음
│   │   ├── style.css                       # 공통 (@font-face, 타이포 유틸, 버튼, GNB, 컨테이너, 푸터)
│   │   ├── index.css / article.css         # 페이지 전용
│   │   ├── responsive.css                  # 공통 반응형
│   │   ├── responsive_index.css            # index 반응형
│   │   ├── responsive_article.css          # article 반응형 (미작성)
│   │   └── swiper-bundle.min.css / aos.css # 라이브러리
│   ├── js/
│   │   ├── index.js / article.js           # 페이지 전용
│   │   ├── aos_script.js / smooth_scroll.js  # 라이브러리 설정 (기능별)
│   │   └── swiper-bundle.min.js / aos.js / lenis.min.js  # 라이브러리
│   ├── fonts/                 # 자체 호스팅 웹폰트 woff/woff2 7종 (TYPOGRAPHY.md)
│   └── images/                # 공용 에셋 루트 + images/{page}/ 페이지 전용 (ASSETS.md)
├── archive/                   # 이전 AI 생성본 (리팩토링 참조용 / 배포 X)
├── designs/                   # Figma 원본 디자인 캡쳐 (배포 X)
└── skeleton/                  # 사용자 구조도 캡쳐 (현재 리팩토링 입력 / 배포 X)
```

`archive/`는 자체 하위 구조(`css/`, `js/`, `fonts/`, `images/`, `index.html`)가 배포 루트와 거의 동일 — 섹션별 마크업·스타일 의도 참고용이며 그대로 복사 금지.

---

## 로컬 개발 환경

`<use href="외부.svg#id">` 패턴은 `file://`로 열면 CORS 정책에 막혀 동작하지 않음.
로컬에서는 반드시 HTTP 서버로 실행:

```bash
cd redesign-urbanbrand/vom16_urbanbrand
python -m http.server 8000
# → http://localhost:8000/
```

VS Code Live Server 확장도 가능.

---

## 신규 파일 분기

| 상황                | 위치 / 방법 |
|---------------------|-------------|
| 새 페이지 CSS       | `css/{page}.css` |
| 새 페이지 반응형    | `css/responsive_{page}.css` |
| 새 페이지 JS        | `js/{page}.js` (페이지 전용) / 라이브러리 설정은 기능별 파일 |
| 새 이미지           | 공용은 `images/`, 페이지 전용은 `images/{page}/` |
| 새 `@font-face`     | **무조건** `style.css` 상단에 추가 (페이지 CSS에 분산 금지), 용도 주석 그룹에 맞춰 배치 |
| 새 미디어쿼리       | `responsive*.css`로만 — 베이스 CSS에 섞지 않음 |
