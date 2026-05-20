$(function () {

    // ========== GNB ==========
    // 스크롤 위치에 따라 GNB 배경/색상을 전환한다.
    // hero 섹션을 벗어나면 .is-solid 클래스를 추가 → CSS에서 흰 배경·검정 글자로 전환.

    var $gnb  = $('.gnb');
    var $hero = $('.hero');

    function updateGnb() {
        var heroBottom = $hero.offset().top + $hero.outerHeight(); // hero 섹션 하단 y좌표
        var gnbBottom  = $(window).scrollTop() + $gnb.outerHeight(); // 현재 GNB 하단 y좌표

        if (gnbBottom >= heroBottom) {
            $gnb.addClass('is-solid');
        } else {
            $gnb.removeClass('is-solid');
        }
    }

    $(window).on('scroll', updateGnb);
    updateGnb(); // 페이지 첫 진입 시에도 즉시 판단


    // ========== HERO ==========
    // hero 배경 이미지를 자동으로 슬라이드한다.
    // 이미지 추가/제거는 index.html의 .hero_slide 요소만 수정하면 된다.
    // .hero_slide는 background-image만 사용하므로 owl이 높이를 0으로 잡는다.
    // onInitialized/onResized 콜백으로 .hero 높이를 직접 동기화한다.

    var $heroSlides = $('.hero_slides');
    var $heroEl = $('.hero');

    function syncHeroHeight() {
        var h = $heroEl.outerHeight();
        $heroSlides.find('.owl-stage-outer, .owl-stage, .owl-item, .hero_slide').height(h);
    }

    $heroSlides.owlCarousel({
        items: 1,               // 한 번에 보여줄 슬라이드 수
        loop: true,             // 마지막 슬라이드 후 첫 번째로 무한 루프
        autoplay: true,         // 자동 재생 여부
        autoplayTimeout: 5000,  // 슬라이드 전환 간격 (ms)
        autoplayHoverPause: false, // 마우스 오버 시 일시정지 여부
        nav: false,             // 이전/다음 버튼 표시 여부
        dots: false,            // 하단 페이지네이션 점 표시 여부
        smartSpeed: 800,        // 슬라이드 전환 애니메이션 속도 (ms)
        onInitialized: syncHeroHeight,  // 초기화 직후 높이 동기화
        onResized: syncHeroHeight,      // 윈도우 리사이즈 시 재동기화
    });

});
