# STRUCTURE — 파일 구조 + 신규 파일 분기

새 페이지·새 CSS·새 JS·새 이미지를 추가할 때 어디에 둘지 결정.

---

## 전체 구조

```
redesign-urbanbrand/
├── index.html
├── article.html              # 예정 (빈 파일)
├── structure.html            # index.html 구조도 (개발 참고용, 배포 X)
├── CLAUDE.md                 # 라우터 (항상 로드)
├── LOGO.md                   # SVG 스프라이트
├── STYLE.md                  # HTML + CSS 컨벤션
├── TYPOGRAPHY.md             # 폰트 + 타이포 유틸
├── ASSETS.md                 # 에셋 네이밍
├── STRUCTURE.md              # 이 문서
├── DEPENDENCIES.md           # 의존성 + 추가 절차
├── css/
│   ├── reset.css             # 손대지 않음
│   ├── style.css             # 공통 (@font-face, 타이포 유틸, 버튼, GNB, 컨테이너)
│   ├── index.css             # index 전용
│   ├── responsive.css        # 공통 반응형 (빈 파일)
│   ├── responsive_index.css  # index 반응형 (빈 파일)
│   ├── owl.carousel.min.css
│   └── owl.theme.default.min.css
├── js/
│   ├── jquery.min.js
│   ├── owl.carousel.js
│   └── carousel.js
├── fonts/                    # 정림사지·영월·창원단감·신동엽손글씨 TTF
├── images/                   # 평면 구조 (하위 폴더 금지)
├── captures/                 # 디자인 참고 (배포 X)
└── examples/                 # 작업 참고 (배포 X)
```

---

## 신규 파일 분기

| 상황                | 위치 / 방법 |
|---------------------|-------------|
| 새 페이지 CSS       | `css/{page}.css` |
| 새 페이지 반응형    | `css/responsive_{page}.css` |
| 새 페이지 JS        | 분리 방식 사용자 확인 (`js/{page}.js` vs 기능별 분리) |
| 새 이미지           | `images/` 평면 — 하위 폴더 만들지 않음 |
| 새 `@font-face`     | **무조건** `style.css` 상단에 추가 (페이지 CSS에 분산 금지) |
| 새 미디어쿼리       | `responsive*.css`로만 — 베이스 CSS에 섞지 않음 |
