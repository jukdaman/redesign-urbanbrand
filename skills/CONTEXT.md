# CONTEXT — 주요 시행착오 기록

이 프로젝트에서 겪은 major 시행착오. 같은 실수 반복 방지용.

---

## 1. portfolio_upper 배경 번쩍임

**증상**: Swiper fade 전환 중간에 배경이 순간 밝아지는 번쩍임 발생.

**오판**: `mix-blend-mode: screen`이 원인이라고 오해 → screen 제거, filter 제거, brightness 제거, loop: false, z-index 재배치 등 시도. 모두 실패.

**실제 원인**: Swiper fade + loop 조합에서 `crossFade: true`가 동작하지 않는 버그. slide1 fadeout과 slide2 fadein이 동시에 발생해 두 배경이 겹치면서 밝아짐.

**해결**: 배경을 swiper 슬라이드 밖 공유 레이어로 분리하고 JS로 직접 crossfade 처리. Swiper는 콘텐츠만 담당.

→ 상세: [PORTFOLIO_UPPER_TITLE.md](PORTFOLIO_UPPER_TITLE.md)

---

## 2. mix-blend-mode: screen과 stacking context

**증상**: `portfolio_title`에 `mix-blend-mode: screen`을 적용했는데 배경 이미지가 글자에 비치지 않음.

**원인**: `mix-blend-mode`는 부모의 stacking context 기준으로 블렌딩. 블렌딩 대상(`portfolio_upper_bg`)과 같은 stacking context 안에 있어야 효과가 작동함. `filter`가 있는 요소는 자체 stacking context를 형성하므로 부모에 `isolation: isolate`를 명시해야 함.

**해결**: `.portfolio_upper`에 `isolation: isolate` 추가.

---

## 3. JS rAF transform 애니메이션의 저사양 비용

**맥락**: history 마퀴를 rAF 루프에서 매 프레임 `style.transform`으로 갱신 (좌우 독립 속도·오프셋 제어 목적으로 CSS→JS 전환).

**문제**: JS 구동 애니메이션은 메인 스레드에서 돌아 다른 스크립트·레이아웃에 영향받고, 레이어 승격 힌트가 없으면 매 프레임 리페인트가 발생해 저사양에서 끊김(throttle)이 생긴다. rAF는 백그라운드 탭·저전력 모드에서 브라우저가 호출 빈도를 강제로 낮추므로 타이밍 기반 속도도 변동한다.

**원칙**:
- 연속적으로 transform/opacity만 바꾸는 요소는 `will-change: transform`으로 레이어를 승격해 컴포지터에 묶는다 (리페인트 회피).
- 같은 클럭으로 도는 다중 애니메이션은 rAF 루프를 하나로 합쳐 콜백 오버헤드를 줄인다.
- rAF 복귀 점프는 `dt` 클램프(`Math.min(dt, n)`)로 막되, 이 경우 throttle 중 속도가 느려지는 트레이드오프가 있음을 인지한다.

---

## 4. HTML 속성값에 곡선따옴표 혼입

**증상**: brunch 이미지 404. DevTools URL에 `%E2%80%9D`(`"`) 인코딩. Swiper·CSS는 정상(304).

**원인**: Write 도구로 대량 HTML 블록 작성 시 속성 따옴표가 직선(`"`) 대신 곡선(`"` `"`, U+201C/201D)으로 출력됨. 이번 세션에서 추가한 404개 전부 곡선따옴표. HTML 속성은 곡선따옴표를 인식하지 못해 src 경로에 따옴표 문자가 그대로 포함됨.

**재발 이력**: article.html 초기 생성 시 1회, A-2 콘텐츠 HTML 전환(brunch 7슬라이드·stories 3채널 추가) 시 1회 — 대량 HTML 블록을 Write로 작성할 때마다 재발하는 패턴.

**검토 필수**: HTML 파일에 대량 마크업을 Write/Edit으로 추가한 직후, 아래 명령으로 곡선따옴표 잔여 여부를 반드시 확인한다.
```
python3 -c "
with open('file.html','rb') as f: c=f.read()
print(c.count(b'\xe2\x80\x9c')+c.count(b'\xe2\x80\x9d'))
"
```

**치환 명령**: `python3 -c "import pathlib; p=pathlib.Path('file.html'); p.write_bytes(p.read_bytes().replace(b'\xe2\x80\x9c', b'\"').replace(b'\xe2\x80\x9d', b'\"'))"`

---

## 5. hero_subject 1920 초과 위치 고정 미해결

**맥락**: `article.html` hero 섹션. `hero_bg`(width: 100%) 위에 인물 이미지(`hero_subject`)를 absolute로 올림. 뷰포트 1920 초과에서 이미지 위치를 고정하고 싶음.

**시도한 방법들**:
- `background-image` + `background-position: clamp(min, vw, max)` — 1920에서 max로 고정되지만, 요소(`width: 100%`) 자체가 뷰포트를 따라 늘어나므로 이미지가 왼쪽에 붙어버림.
- `max-width: 1920px; margin: 0 auto` — absolute 요소에는 효과 없음. 1920 초과 시 오른쪽이 잘림.
- `background-image`는 `overflow: visible`과 무관하게 요소 경계 밖으로 나오지 않음.

**미해결 원인**: `background-image`는 요소 박스 안에서만 렌더링되므로, 요소 너비 = 이미지 표시 영역. 요소를 1920으로 고정하면서 동시에 부모(hero_bg) 안에서 중앙정렬하는 것이 CSS만으로 어려움.

**유력한 해결 방향**: `hero_subject`를 `hero_bg` 밖으로 꺼내 `hero` 섹션(position: relative) 기준으로 absolute 배치. 구조 변경이 필요해 현재는 보류.

---

## 6. AOS + Lenis 도입 시 GSAP 죽은 코드 (테스트본)

**맥락**: AOS + 스무스 스크롤 테스트본(`aos/` 사본)을 메인에 병합하며 검토.

**발견**: 테스트본은 GSAP·ScrollTrigger·ScrollToPlugin 3개를 CDN으로 로드했지만 어떤 애니메이션에도 사용하지 않았다. 유일한 역할은 `gsap.ticker`로 `lenis.raf`를 호출하는 것 — 이미 자체 rAF 루프가 같은 일을 하고 있어 **이중 구동**(매 프레임 2회, 서로 다른 시간 단위) 상태였다. 튜토리얼 코드를 복사하면 이런 미사용 의존성이 따라오기 쉽다.

**원칙**:
- 라이브러리를 추가하면 **실제 호출처가 있는지** 확인한다. 연동 글루 코드만 있고 기능 사용이 없으면 제거한다.
- 같은 대상(예: `lenis.raf`)을 구동하는 루프·ticker는 하나만 둔다.
- 병합 시 GSAP 3종을 제거하고 Lenis 단독 rAF 루프로 정리, Lenis는 자체 호스팅으로 전환.
