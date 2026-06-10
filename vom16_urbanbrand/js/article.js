// article.html 전용 스크립트. index.js가 index.html을 담당하듯, article의 모든 JS는 여기서 담당한다.
// 콘텐츠(제목/메타/desc/캡션)는 HTML에 정적으로 작성됨(A-2 완료). JS는 위젯 동작만 담당.
// article GNB는 항상 solid(HTML에 is-solid 고정)이라 스크롤 토글 JS 불필요.




// ========== BRUNCH ==========
// 브런치북 7권 캐러셀. prev/next 버튼·하단 dots·드래그로 전환.
// 슬라이드 콘텐츠는 HTML에 7슬라이드 명시. 표지·제목·부제는 HTML에서 직접 수정.

(function () {
    var root = document.querySelector('.brunch_book');
    if (!root || !window.Swiper) return;

    var dots   = document.querySelector('.brunch_dots');
    var slides = root.querySelectorAll('.swiper-slide');
    if (!dots || !slides.length) return;

    slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', (i + 1) + '번째 브런치북');
        if (i === 0) dot.className = 'is-active';
        dots.appendChild(dot);
    });

    var swiper = new Swiper(root, {
        slidesPerView: 1,
        speed: 500,
        grabCursor: true,
        navigation: {
            prevEl: root.querySelector('.brunch_arrow_prev'),
            nextEl: root.querySelector('.brunch_arrow_next'),
        },
    });

    var dotEls = dots.querySelectorAll('button');
    dotEls.forEach(function (dot, idx) {
        dot.addEventListener('click', function () { swiper.slideTo(idx); });
    });

    swiper.on('slideChange', function () {
        dotEls.forEach(function (dot, idx) {
            dot.classList.toggle('is-active', idx === swiper.activeIndex);
        });
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




// ========== VIDEO ==========
// 영상 5편 썸네일 캐러셀. 페이저(1~5)·드래그로 전환. 자동재생 없음.
// 전환 시 해당 video_panel을 is-active로 교체.
// video_desc_wrap 내 video_desc 88px 접힘 → video_desc_more로 펼침(→ close 토글).

(function () {
    var root = document.querySelector('.video_thumbs');
    if (!root || !window.Swiper) return;

    var panels   = document.querySelectorAll('.video_panel');
    var pagerBtns = document.querySelectorAll('.video_pager button');

    function activatePanel(idx) {
        panels.forEach(function (panel) { panel.classList.remove('is-active'); });
        if (panels[idx]) panels[idx].classList.add('is-active');

        // 새 패널의 desc 초기화 및 more 버튼 가시성 설정
        var panel = panels[idx];
        if (!panel) return;
        var descEl  = panel.querySelector('.video_desc');
        var moreBtn = panel.querySelector('.video_desc_more');
        if (descEl && moreBtn) {
            descEl.classList.remove('is-open');
            moreBtn.textContent = 'read more +';
            moreBtn.style.display = descEl.scrollHeight > descEl.clientHeight + 1 ? '' : 'none';
        }
    }

    // 각 패널의 video_desc_more 이벤트 등록
    panels.forEach(function (panel) {
        var descEl  = panel.querySelector('.video_desc');
        var moreBtn = panel.querySelector('.video_desc_more');
        if (!descEl || !moreBtn) return;
        moreBtn.addEventListener('click', function () {
            var open = descEl.classList.toggle('is-open');
            moreBtn.textContent = open ? 'close' : 'read more +';
        });
    });

    var swiper = new Swiper(root, {
        slidesPerView: 1,
        speed: 500,
        grabCursor: true,
    });

    pagerBtns.forEach(function (btn, idx) {
        btn.addEventListener('click', function () { swiper.slideTo(idx); });
    });

    swiper.on('slideChange', function () {
        pagerBtns.forEach(function (btn, idx) {
            btn.classList.toggle('is-active', idx === swiper.activeIndex);
        });
        activatePanel(swiper.activeIndex);
    });

    activatePanel(0);
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
