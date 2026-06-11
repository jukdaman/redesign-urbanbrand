// article.html 전용 스크립트. index.js가 index.html을 담당하듯, article의 모든 JS는 여기서 담당한다.
// 콘텐츠(제목/메타/desc/캡션)는 HTML에 정적으로 작성됨(A-2 완료). JS는 위젯 동작만 담당.
// article GNB는 항상 solid(HTML에 is-solid 고정)이라 스크롤 토글 JS 불필요.




// ========== HERO LOGO DRAW-ON ==========
// hero_logo 인라인 SVG를 선이 그려지는 애니메이션으로 재생한다.
// index의 logo_anim 루프와 달리 화면 첫 진입 시 1회만 그려지고, 페이드아웃 없이 유지된다.
// face별 타이밍·이징은 index.js LOGO DRAW-ON과 동일한 곡선을 사용.
//
// 타이밍 조절:
//   DRAW_DELAY   : 화면 진입 후 애니메이션 시작까지 대기 시간 (ms)
//   DRAW_DURATION: 선이 그려지는 데 걸리는 시간 (ms)

(function () {
    var svg = document.querySelector('.hero_logo.logo_anim');
    if (!svg || !Element.prototype.animate) return;

    var DRAW_DELAY = 1000;
    var DRAW_DURATION = 2400;

    var faceDurations = [900,  2200, 1500];
    var faceStarts    = [0,    200,  400];

    function eased(t) { var u = 1 - t; return 1 - u * u * u * u; }

    function startDraw() {
        /* non-scaling-stroke에서는 dash가 화면 좌표 기준으로 적용되지만 getTotalLength()는
         * viewBox 좌표 길이를 반환하므로, 렌더 크기 비율로 보정해야 그리는 속도가 맞는다.
         * (service_logo는 244px ≈ viewBox 240이라 1:1이어서 보정 없이도 티가 안 났던 것) */
        var scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;

        var faceGroups = [
            svg.querySelectorAll('.face_a .logo_stroke'),
            svg.querySelectorAll('.face_b .logo_stroke'),
            svg.querySelectorAll('.face_c .logo_stroke')
        ];

        faceGroups.forEach(function (group, faceIdx) {
            if (!group.length) return;
            var faceStartMs = faceStarts[faceIdx];
            var faceEndMs   = faceStartMs + faceDurations[faceIdx];

            /* 전역 ease-out 곡선을 face 구간만큼 잘라 0~1로 정규화한 샘플 */
            var SAMPLES = 12;
            var startEased = eased(faceStartMs / DRAW_DURATION);
            var endEased   = eased(faceEndMs / DRAW_DURATION);
            var samples = [];
            for (var s = 0; s <= SAMPLES; s++) {
                var globalT = (faceStartMs + (faceEndMs - faceStartMs) * (s / SAMPLES)) / DRAW_DURATION;
                samples.push((eased(globalT) - startEased) / (endEased - startEased));
            }

            group.forEach(function (path) {
                var len = path.getTotalLength() * scale;
                path.style.strokeDasharray = len;
                path.style.strokeDashoffset = len;

                var keyframes = [
                    { strokeDashoffset: len, offset: 0 },
                    { strokeDashoffset: len, offset: faceStartMs / DRAW_DURATION }
                ];
                for (var s = 1; s <= SAMPLES; s++) {
                    keyframes.push({
                        strokeDashoffset: len * (1 - samples[s]),
                        offset: (faceStartMs + (faceEndMs - faceStartMs) * (s / SAMPLES)) / DRAW_DURATION
                    });
                }
                keyframes.push({ strokeDashoffset: 0, offset: 1 });

                var anim = path.animate(keyframes, {
                    duration: DRAW_DURATION, delay: DRAW_DELAY, fill: 'forwards'
                });
                /* fill: forwards에만 의존하지 않고 완료 시점에 최종값을 인라인으로 고정 */
                anim.onfinish = function () { path.style.strokeDashoffset = '0'; };
            });
        });

        /* 모든 선이 dashoffset으로 숨겨진 뒤에 .logo_anim의 opacity: 0 해제 */
        svg.style.opacity = '1';
    }

    var logoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            logoObserver.unobserve(entry.target);
            startDraw();
        });
    }, { threshold: 0.1 });

    logoObserver.observe(svg);
}());




// ========== BRUNCH ==========
// 브런치북 7권 캐러셀. prev/next 버튼·하단 dots로 전환하며 드래그 전환은 막는다.
// 슬라이드 콘텐츠는 HTML에 7슬라이드 명시. 표지·제목·부제는 HTML에서 직접 수정.

(function () {
    var root = document.querySelector('.brunch_book');
    if (!root || !window.Swiper) return;

    // 표지 블러 배경: 인접한 표지 img의 src를 복사해 할당.
    // 이미지 URL은 HTML의 img에만 둔다 — 표지 교체 시 img src 한 곳만 수정 (ASSETS.md).
    root.querySelectorAll('.brunch_book_cover').forEach(function (cover) {
        var bg  = cover.querySelector('.brunch_book_cover_bg');
        var img = cover.querySelector('img');
        if (bg && img) bg.style.backgroundImage = "url('" + img.getAttribute('src') + "')";
    });

    new Swiper(root, {
        slidesPerView: 1,
        speed: 500,
        allowTouchMove: false,
        navigation: {
            prevEl: root.querySelector('.brunch_arrow_prev'),
            nextEl: root.querySelector('.brunch_arrow_next'),
        },
        pagination: {
            el: root.querySelector('.swiper-pagination'),
            type: 'bullets',
            clickable: true,
        },
    });
}());




// ========== NEWS ==========
// 언론 보도 9건 드래그 캐러셀(스크롤바). 카드 콘텐츠는 HTML에 9개 모두 정적 작성됨.

(function () {
    var root = document.querySelector('.news_card_wrap');
    if (!root || !window.Swiper) return;

    new Swiper(root, {
        slidesPerView: 'auto',
        spaceBetween: 48,
        freeMode: { enabled: true },
        grabCursor: true,
        scrollbar: { el: '.news_scrollbar', draggable: true },
    });
}());




// ========== VIDEOS ==========
// 영상 5편 페이저(1~5) 전용 전환. Swiper 미사용.
// 초기에는 video_facade(썸네일+플레이버튼)만 렌더링 — 페이지 로드 시 유튜브 연결 없음.
// facade 클릭 시 해당 자리를 autoplay iframe으로 교체. 이후 iframe은 DOM에 유지.
// 페이저 전환 시: 재생 중인 iframe은 postMessage로 정지 후 숨김(facade 복원 없음).
// videos_article_wrap 내 videos_article 88px 접힘 → videos_article_more로 펼침(→ close 토글).
// 펼침은 max-height를 scrollHeight 픽셀값으로 지정해 CSS transition이 걸리게 함.

(function () {
    var root = document.querySelector('.videos_youtube');
    if (!root) return;

    var panels    = document.querySelectorAll('.videos_text_wrap');
    var pagerBtns = document.querySelectorAll('.videos_pager button');

    // facade를 autoplay iframe으로 교체. 이후 DOM에 유지.
    function loadVideo(facade) {
        var src   = facade.getAttribute('data-src');
        var title = facade.getAttribute('data-title');
        var iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.title = title;
        iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        facade.parentNode.replaceChild(iframe, facade);
        return iframe;
    }

    function activate(idx) {
        var slots = root.querySelectorAll('.video_facade, iframe');
        slots.forEach(function (el, i) {
            var isTarget = i === idx;
            el.classList.toggle('is-active', isTarget);
            if (!isTarget && el.tagName === 'IFRAME' && el.contentWindow) {
                el.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });

        pagerBtns.forEach(function (btn, i) { btn.classList.toggle('is-active', i === idx); });
        panels.forEach(function (panel, i) { panel.classList.toggle('is-active', i === idx); });

        var panel = panels[idx];
        if (!panel) return;
        var descEl  = panel.querySelector('.videos_article');
        var moreBtn = panel.querySelector('.videos_article_more');
        if (descEl && moreBtn) {
            descEl.classList.remove('is-open');
            descEl.style.maxHeight = '';
            moreBtn.textContent = 'read more +';
            moreBtn.style.display = descEl.scrollHeight > descEl.clientHeight + 1 ? '' : 'none';
        }
    }

    // facade 클릭: iframe으로 교체 후 해당 인덱스 활성화
    root.querySelectorAll('.video_facade').forEach(function (facade) {
        facade.addEventListener('click', function () {
            var slots = root.querySelectorAll('.video_facade, iframe');
            var idx = Array.prototype.indexOf.call(slots, facade);
            loadVideo(facade);
            activate(idx);
        });
    });

    // 각 패널의 videos_article_more 이벤트 등록
    panels.forEach(function (panel) {
        var descEl  = panel.querySelector('.videos_article');
        var moreBtn = panel.querySelector('.videos_article_more');
        if (!descEl || !moreBtn) return;
        moreBtn.addEventListener('click', function () {
            var open = descEl.classList.toggle('is-open');
            descEl.style.maxHeight = open ? descEl.scrollHeight + 'px' : '';
            moreBtn.textContent = open ? 'close' : 'read more +';
        });
    });

    pagerBtns.forEach(function (btn, idx) {
        btn.addEventListener('click', function () { activate(idx); });
    });

    activate(0);
}());




// ========== STORIES ==========
// 탭(Instagram/Facebook/Blog) + 드래그 카드 캐러셀(스크롤바). 채널별 9개 카드.
// 콘텐츠는 HTML에 채널별 독립 stories_cards로 명시됨.
// 탭 전환 시 해당 data-tab stories_cards만 표시(display 토글). 각 채널 Swiper는 최초 표시 시 초기화.

(function () {
    if (!window.Swiper) return;

    var swiperOpts = {
        slidesPerView: 'auto',
        spaceBetween: 24,
        freeMode: { enabled: true },
        grabCursor: true,
        scrollbar: { el: '.stories_scrollbar', draggable: true },
    };

    var cardEls = document.querySelectorAll('.stories_cards');
    var initialized = {};

    function initSwiper(el) {
        var tab = el.getAttribute('data-tab');
        if (initialized[tab]) return;
        initialized[tab] = new Swiper(el, swiperOpts);
    }

    // 기본 활성 탭(instagram) 초기화
    var defaultEl = document.querySelector('.stories_cards[data-tab="instagram"]');
    if (defaultEl) initSwiper(defaultEl);

    var tabs = document.querySelectorAll('.stories_tab button');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('is-active'); });
            tab.classList.add('is-active');

            var channel = tab.getAttribute('data-tab');
            cardEls.forEach(function (el) {
                var isTarget = el.getAttribute('data-tab') === channel;
                el.style.display = isTarget ? '' : 'none';
                if (isTarget) initSwiper(el);
            });
        });
    });
}());
