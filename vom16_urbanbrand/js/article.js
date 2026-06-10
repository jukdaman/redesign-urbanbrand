// article.html 전용 스크립트. index.js가 index.html을 담당하듯, article의 모든 JS는 여기서 담당한다.
// 콘텐츠(제목/메타/desc/캡션)는 HTML에 정적으로 작성됨(A-2 완료). JS는 위젯 동작만 담당.
// article GNB는 항상 solid(HTML에 is-solid 고정)이라 스크롤 토글 JS 불필요.




// ========== BRUNCH ==========
// 브런치북 7권 캐러셀. prev/next 버튼·하단 dots·드래그로 전환.
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
        grabCursor: true,
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




// ========== VIDEO ==========
// 영상 5편 페이저(1~5) 전용 전환. Swiper 미사용 — 썸네일 img·video_side_wrap을 is-active로
// 동기 토글하고, 썸네일 페이드는 CSS opacity transition이 담당. 자동재생 없음.
// video_article_wrap 내 video_article 88px 접힘 → video_article_more로 펼침(→ close 토글).

(function () {
    var root = document.querySelector('.video_thumbs');
    if (!root) return;

    var thumbs    = root.querySelectorAll('img');
    var panels    = document.querySelectorAll('.video_side_wrap');
    var pagerBtns = document.querySelectorAll('.video_pager button');

    function activate(idx) {
        thumbs.forEach(function (img, i) { img.classList.toggle('is-active', i === idx); });
        pagerBtns.forEach(function (btn, i) { btn.classList.toggle('is-active', i === idx); });
        panels.forEach(function (panel, i) { panel.classList.toggle('is-active', i === idx); });

        // 새 패널의 desc 초기화 및 more 버튼 가시성 설정
        var panel = panels[idx];
        if (!panel) return;
        var descEl  = panel.querySelector('.video_article');
        var moreBtn = panel.querySelector('.video_article_more');
        if (descEl && moreBtn) {
            descEl.classList.remove('is-open');
            moreBtn.textContent = 'read more +';
            moreBtn.style.display = descEl.scrollHeight > descEl.clientHeight + 1 ? '' : 'none';
        }
    }

    // 각 패널의 video_article_more 이벤트 등록
    panels.forEach(function (panel) {
        var descEl  = panel.querySelector('.video_article');
        var moreBtn = panel.querySelector('.video_article_more');
        if (!descEl || !moreBtn) return;
        moreBtn.addEventListener('click', function () {
            var open = descEl.classList.toggle('is-open');
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
