// article.html 전용 스크립트. index.js가 index.html을 담당하듯, article의 모든 JS는 여기서 담당한다.
// 슬라이드별 제목/부제/메타는 designs/article 캡쳐에서 추출한 실데이터.
// 단, 섹션 단위 캡쳐라 본문이 작아 판독이 어려운 brunch 포스트 본문과 video 설명문은
// 1번 슬라이드 기준 placeholder로 둔다(실카피 확보 시 채울 것).
// article GNB는 항상 solid(HTML에 is-solid 고정)이라 스크롤 토글 JS 불필요.




// ========== BRUNCH ==========
// 브런치북 7권 캐러셀. prev/next 버튼·하단 dots·드래그로 전환.
// 권 추가/제거: 아래 books 배열 수정. (포스트 3개 본문은 현재 1번 권 복제 placeholder.)

(function () {
    var root = document.querySelector('.brunch_book');
    if (!root || !window.Swiper) return;

    var wrapper  = root.querySelector('.swiper-wrapper');
    var template = wrapper.querySelector('.brunch_slide');
    var dots     = document.querySelector('.brunch .dots');
    if (!template || !dots) return;

    var books = [
        { cover: 'images/article/img_brunch_01.jpg', title: '서체기행',        sub: '도시마다 고유한 서체를 가진 나라' },
        { cover: 'images/article/img_brunch_02.jpg', title: '로컬 브랜드',      sub: '주민 참여형 브랜드 개발 사례 30곳' },
        { cover: 'images/article/img_brunch_03.jpg', title: '일에 대한 생각 1', sub: '일과 삶에 대한 이야기 1' },
        { cover: 'images/article/img_brunch_04.jpg', title: '일에 대한 생각 2', sub: '일과 삶에 대한 이야기 2' },
        { cover: 'images/article/img_brunch_05.jpg', title: '일에 대한 생각 4', sub: '일과 삶에 대한 이야기 4' },
        { cover: 'images/article/img_brunch_06.jpg', title: '일에 대한 생각 5', sub: '일과 삶에 대한 이야기 5' },
        { cover: 'images/article/img_brunch_07.jpg', title: '일에 대한 생각 6', sub: '일과 삶에 대한 이야기 6' }
    ];

    books.forEach(function (book, i) {
        var slide = i === 0 ? template : template.cloneNode(true);
        if (i > 0) wrapper.appendChild(slide);

        var cover = slide.querySelector('.brunch_book_cover img');
        var title = slide.querySelector('.brunch_book_title_wrap .title_small');
        var sub   = slide.querySelector('.brunch_book_title_wrap .article_medium_r');
        if (cover) cover.src = book.cover;
        if (title) title.textContent = book.title;
        if (sub)   sub.textContent   = book.sub;

        var dot = document.createElement('span');
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

    var dotEls = dots.querySelectorAll('span');
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
// 전환 시 우측 제목/메타/설명을 교체. 설명(desc)은 접힘 상태(88px) → read more로 펼침(→ close).
// 우측 콘텐츠는 하단 정렬이라 펼치면 위로 늘어난다.
// desc는 문단 배열 — 2~5편 본문은 임시 텍스트(추후 교체).

(function () {
    var root = document.querySelector('.video_thumbs');
    if (!root || !window.Swiper) return;

    var wrapper  = root.querySelector('.swiper-wrapper');
    var template = wrapper.querySelector('.swiper-slide');
    if (!template) return;

    var PLACEHOLDER = '여기 요약본 적어주십시오오오오오오오오오오오오.......';

    var videos = [
        {
            thumb: 'images/article/img_video_01.jpg',
            title: "광산이 멈추고 사람마저 떠난 마을, 0.5mm 획 끝에서 시작된 문화의 역습 '다시, 영월'",
            meta:  '도시브랜드연구소  |  2025. 12. 19.',
            desc:  [
                "한때 국가 산업의 중심지였던 영월은 폐광 이후 인구 감소와 고령화라는 구조적 위기를 겪어왔습니다.  하지만 영월에는 강과 산, 계곡으로 대표되는 '우수한 자연경관'이라는 대체할 수 없는 유산이 있었습니다.  도시브랜드연구소는 영월군과 함께 이 소중한 자연을 도시의 언어로 전환하기 위해 힘썼습니다. 영월의 자연을 대체산업이자 핵심 문화자산으로 삼고자 한 시도, 그 결과물이 바로 '영월체’ 입니다.",
                "자연의 형상을 담은 서체 디자인 영월체는 쌍용마을과의 인연을 시작으로 영월과 깊은 관계를 맺어온 서체 디자이너 강병호(도시브랜드연구소 대표)가 참여하여 제작되었습니다."
            ]
        },
        {
            thumb: 'images/article/img_video_02.jpg',
            title: "부여에는 소년시대만 있다? 아니 신동엽도 있다! 부여 서체 제작 다큐멘터리 '신동엽, 살아나다'",
            meta:  '부여군지역공동체활성화재단  |  2023. 12. 20.',
            desc:  [PLACEHOLDER]
        },
        {
            thumb: 'images/article/img_video_03.jpg',
            title: '말단 영업사원에서 서체디자이너가 될 수 있었던 이유 | 꿈이 중요한 이유',
            meta:  '청년자기다움학교  |  2021. 10. 23.',
            desc:  [PLACEHOLDER]
        },
        {
            thumb: 'images/article/img_video_04.jpg',
            title: '도시브랜드 서체 전시관 & 토크쇼',
            meta:  '도시브랜드연구소  |  2025. 2. 6.',
            desc:  [PLACEHOLDER]
        },
        {
            thumb: 'images/article/img_video_05.jpg',
            title: '태화강 벤치에서 울던 날, 인생이 바뀌었다 | 강병호의 드라마 같은 순간',
            meta:  '우주필름  |  2026. 2. 22.',
            desc:  [PLACEHOLDER]
        }
    ];

    videos.forEach(function (video, i) {
        if (i === 0) return;
        var slide = template.cloneNode(true);
        var img = slide.querySelector('img');
        if (img) img.src = video.thumb;
        wrapper.appendChild(slide);
    });

    var titleEl = document.querySelector('.video_feature_content p.title_small');
    var metaEl  = document.querySelector('.video_meta');
    var descEl  = document.querySelector('.video_desc');
    var moreBtn = document.querySelector('.video_more');

    function renderContent(idx) {
        var v = videos[idx];
        if (!v) return;
        if (titleEl) titleEl.textContent = v.title;
        if (metaEl)  metaEl.textContent  = v.meta;

        if (descEl) {
            descEl.innerHTML = '';
            v.desc.forEach(function (para) {
                var p = document.createElement('p');
                p.className = 'article_xsmall';
                p.textContent = para;
                descEl.appendChild(p);
            });
            descEl.classList.remove('is-open');
        }
        if (moreBtn && descEl) {
            moreBtn.textContent = 'read more +';
            // 88px 안에 다 들어오면 토글 숨김
            moreBtn.style.display = descEl.scrollHeight > descEl.clientHeight + 1 ? '' : 'none';
        }
    }

    if (moreBtn && descEl) {
        moreBtn.addEventListener('click', function () {
            var open = descEl.classList.toggle('is-open');
            moreBtn.textContent = open ? 'close' : 'read more +';
        });
    }

    var swiper = new Swiper(root, {
        slidesPerView: 1,
        speed: 500,
        grabCursor: true,
    });

    var pagerBtns = document.querySelectorAll('.video_pager button');
    pagerBtns.forEach(function (btn, idx) {
        btn.addEventListener('click', function () { swiper.slideTo(idx); });
    });

    swiper.on('slideChange', function () {
        pagerBtns.forEach(function (btn, idx) {
            btn.classList.toggle('is-active', idx === swiper.activeIndex);
        });
        renderContent(swiper.activeIndex);
    });

    renderContent(0);
}());




// ========== STORIES ==========
// 탭(Instagram/Facebook/Blog) + 드래그 카드 캐러셀(스크롤바). 채널별 9개 카드.
// 탭 전환 시 9개 카드의 썸네일(img_stories_{tab}_NN.jpg)과 캡션을 해당 채널 데이터로 교체.
// 캡션 추가/수정: 아래 CAPTIONS 배열만 손대면 된다(채널당 9개).

(function () {
    var root = document.querySelector('.stories_cards');
    if (!root || !window.Swiper) return;

    var CAPTIONS = {
        instagram: [
            'K-Design Award 2025',
            '강원도 영월체',
            '광복절 기념, 아름다운 필기체 글꼴',
            '영월 단종문화제 굿즈 제작',
            '문경시 전용서체 ‘문경감홍사과체’ 탄생',
            '문경시 폰트가 사용된 문경 감홍 사과잼',
            '부여군 서체 프로젝트',
            '마포나루체 프로젝트',
            '월간 인쇄계 인터뷰'
        ],
        facebook: [
            '2026 단종문화제에서',
            '서울, 강원, 광주 등 다양한 곳에서',
            '2024 서울 디자인 페스티벌 도시브랜드',
            '도시브랜드 서체 전시관',
            '도시브랜드 폰트 토크쇼',
            '영월의 타이포 브랜딩',
            '영월 고유서체 개발 교육',
            '별빛문화축제 캘리그라피',
            '모곡53의 디자인'
        ],
        blog: [
            '‘살기좋은 영월’',
            '왕과 사는 영월 단종과 엄종도(텀블러)',
            '‘왕과 사는 영월’ 손글씨 작업',
            '서울 마포 레드로드',
            '서울 종로 늘만드美',
            '서울 강서 꿈날개막걸리',
            '경북 봉화 아기사슴 별별마을',
            '도랑사구 브랜드',
            '전북 무주 연모당 브랜드'
        ]
    };

    var swiper = new Swiper(root, {
        slidesPerView: 'auto',
        spaceBetween: 24,
        freeMode: { enabled: true },
        grabCursor: true,
        scrollbar: { el: '.stories_scrollbar', draggable: true },
    });

    var tabs   = document.querySelectorAll('.stories_tab button');
    var slides = root.querySelectorAll('.stories_card_wrap .swiper-slide');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('is-active'); });
            tab.classList.add('is-active');

            var channel  = tab.getAttribute('data-tab');
            var captions = CAPTIONS[channel] || [];

            slides.forEach(function (slide, idx) {
                var n   = ('0' + (idx + 1)).slice(-2);
                var img = slide.querySelector('.stories_thumb');
                var cap = slide.querySelector('.article_medium_r');
                if (img) {
                    img.src = 'images/article/img_stories_' + channel + '_' + n + '.jpg';
                    if (captions[idx]) img.alt = captions[idx];
                }
                if (cap) cap.textContent = captions[idx] || '';
            });
            swiper.slideTo(0);
        });
    });
}());
