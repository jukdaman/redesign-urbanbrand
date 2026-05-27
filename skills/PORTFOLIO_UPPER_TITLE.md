# portfolio_upper — 타이틀 및 배경 처리

## 현행 구조

```
.portfolio_upper (swiper, position: relative, isolation: isolate)
├── .portfolio_upper_bg     ← 공유 배경 레이어 A (CSS)
├── .portfolio_upper_bg     ← 공유 배경 레이어 B (JS 동적 생성)
├── .portfolio_title        ← mix-blend-mode: screen
├── .swiper-wrapper
│   └── .swiper-slide × N  ← data-bg 속성에 이미지 URL 보유
└── .swiper-pagination
```

`portfolio_upper_bg`는 swiper 슬라이드 밖 공유 레이어. JS가 `slideChange` 시 A/B 레이어를 교대로 사용해 crossfade.

`portfolio_title`은 `mix-blend-mode: screen`으로 배경 이미지가 글자에 비치는 효과. `portfolio_upper`에 `isolation: isolate`를 주어 blending context를 명시적으로 격리.

슬라이드 추가 시 `data-bg`에 이미지 URL만 지정하면 배경이 자동으로 따라감.

```html
<div class="portfolio_upper_stage swiper-slide" data-bg="images/새이미지.jpg">
```


## 시행착오 (archive: `vom16_urbanbrand_portfolio_title_screen`)

### 시도한 방식

`portfolio_upper_bg`를 각 swiper-slide 안에 넣고, `portfolio_title`에 `mix-blend-mode: screen` 적용.

`mix-blend-mode`가 작동하려면 블렌딩 대상과 같은 stacking context 안에 있어야 해서, 배경을 슬라이드 밖으로 뺄 수 없었다.

### 문제

Swiper fade 전환 시 두 슬라이드의 배경이 동시에 렌더링되어 밝기가 증폭되는 번쩍임 발생. `crossFade: true`, filter 제거, loop: false, z-index 재배치 등 다수 시도 모두 실패.

### 원인 분석

번쩍임의 직접 원인은 **Swiper fade + loop 조합의 crossFade 버그**였고, `mix-blend-mode: screen` 자체는 원인이 아니었다. screen은 배경을 슬라이드 밖으로 못 빼게 막는 구조적 제약이었을 뿐.

### 해결

배경을 swiper 밖 공유 레이어로 분리하고 JS로 직접 crossfade 처리. 배경이 슬라이드와 분리되었으므로 `mix-blend-mode: screen`도 문제없이 복구 가능했다.
