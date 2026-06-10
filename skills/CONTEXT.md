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
