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


    // ========== PORTFOLIO ==========
    // portfolio_upper: owl-carousel, fade 전환.
    // 각 slide의 stage 안에 bg + title + content가 함께 있어 mix-blend-mode 정상 작동.
    // 페이드 전환 시 슬라이드 전체(bg, title 포함)가 자연스럽게 교차.
    // portfolio_lower: 일반 컨테이너 — carousel 없음.

    var $portfolioUpper = $('.portfolio_upper');

    $portfolioUpper.owlCarousel({
        items: 1,
        loop: true,
        autoplay: false,
        nav: false,
        dots: true,
        smartSpeed: 600,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
    });

    $(document).on('click', '.nav_btn_prev', function () {
        $portfolioUpper.trigger('prev.owl.carousel');
    });
    $(document).on('click', '.nav_btn_next', function () {
        $portfolioUpper.trigger('next.owl.carousel');
    });


    // ========== LOGO DRAW-ON ==========
    // .logo_anim 인라인 SVG의 stroke draw-on 애니메이션.
    // 화면에 들어오면 시작, 벗어나면 멈춤.
    // 사이클: 진입 후 0.5s 대기 → draw 2.4s → 2s 유지 → 1s 페이드아웃 → 1s 대기 → 반복.

    var DRAW_DELAY = 500;
    var DRAW_DURATION = 2400;
    var HOLD = 2000;
    var FADE = 2000;
    var GAP = 1000;
    var CYCLE = DRAW_DURATION + HOLD + FADE + GAP; // 7400ms — 첫 회 이후 반복 주기

    var logos = document.querySelectorAll('.logo_anim');
    if (logos.length && Element.prototype.animate) {
        var activeAnimations = new Map();

        function startDraw(svg) {
            if (activeAnimations.has(svg)) return;
            var anims = [];

            var holdEnd  = (DRAW_DURATION + HOLD) / CYCLE;
            var fadeEnd  = (DRAW_DURATION + HOLD + FADE) / CYCLE;
            // fadeEnd 직후 dashoffset을 len으로 점프시킬 keyframe 위치 (opacity 0 구간).
            var resetAt  = Math.min(fadeEnd + 0.0001, 1);

            // face 단위(a,b,c)로 그리되 인접 face가 겹쳐 시작한다.
            // 전역 시간 0~DRAW_DURATION에 ease-out 곡선 하나를 깔고, 각 face는 자기 시간 구간에서
            // 그 곡선이 만들어내는 진행률을 따라간다 — 셋이 함께 감속하는 한 줄기의 곡선이 된다.
            // face_c는 곡선의 가장 감속 심한 후반을 담당, face_a는 곡선 초반의 빠른 구간.
            var faceDurations = [900,  2200, 1500]; // a, b, c 그리기 시간 (ms)
            var faceStarts    = [0,    200,  400];  // a, b, c 시작 시점 (ms) — 끝: 900 / 2400 / 1900

            // 전역 곡선: t(0~1) → 진행률(0~1). quartic ease-out — 초반 빠르고 후반 길게 감속.
            function eased(t) { var u = 1 - t; return 1 - u * u * u * u; }

            var faceGroups = [
                svg.querySelectorAll('.face_a .logo_stroke'),
                svg.querySelectorAll('.face_b .logo_stroke'),
                svg.querySelectorAll('.face_c .logo_stroke')
            ];

            faceGroups.forEach(function(group, faceIdx) {
                if (!group.length) return;
                var faceStartMs = faceStarts[faceIdx];
                var faceEndMs   = faceStartMs + faceDurations[faceIdx];
                var faceStartOff = faceStartMs / CYCLE;
                var faceEndOff   = faceEndMs / CYCLE;

                // 곡선의 자기 구간을 12샘플로 근사. eased()의 face_start~face_end 구간 값을
                // 0~1로 정규화한 결과를 dashoffset에 매핑. 정규화 때문에 각 face는 자기 path 전체를
                // 다 그리지만, 곡선의 미분 특성(초반 빠름, 후반 느림)은 그대로 묻어 들어온다.
                var SAMPLES = 12;
                var startEased = eased(faceStartMs / DRAW_DURATION);
                var endEased   = eased(faceEndMs / DRAW_DURATION);
                var samples = [];
                for (var s = 0; s <= SAMPLES; s++) {
                    var localT = s / SAMPLES;
                    var globalT = (faceStartMs + faceDurations[faceIdx] * localT) / DRAW_DURATION;
                    samples.push((eased(globalT) - startEased) / (endEased - startEased));
                }

                group.forEach(function(path) {
                    var len = path.getTotalLength();
                    path.style.strokeDasharray = len;
                    path.style.strokeDashoffset = len;

                    var keyframes = [
                        { strokeDashoffset: len, offset: 0 },
                        { strokeDashoffset: len, offset: faceStartOff }
                    ];
                    for (var s = 1; s <= SAMPLES; s++) {
                        var off = faceStartOff + (faceEndOff - faceStartOff) * (s / SAMPLES);
                        keyframes.push({
                            strokeDashoffset: len * (1 - samples[s]),
                            offset: off
                        });
                    }
                    keyframes.push({ strokeDashoffset: 0,   offset: fadeEnd });
                    keyframes.push({ strokeDashoffset: len, offset: resetAt });
                    keyframes.push({ strokeDashoffset: len, offset: 1 });

                    anims.push(path.animate(keyframes, {
                        duration: CYCLE, iterations: Infinity, delay: DRAW_DELAY
                    }));
                });
            });

            // opacity 사이클: draw + 유지 동안 1, 페이드 구간에서 0, 대기 동안 0. CSS의 opacity:0을 덮어쓴다.
            anims.push(svg.animate(
                [
                    { opacity: 1, offset: 0 },
                    { opacity: 1, offset: holdEnd },
                    { opacity: 0, easing: 'ease-in-out', offset: fadeEnd },
                    { opacity: 0, offset: 1 }
                ],
                { duration: CYCLE, iterations: Infinity, delay: DRAW_DELAY, fill: 'backwards' }
            ));

            activeAnimations.set(svg, anims);
        }

        function stopDraw(svg) {
            var anims = activeAnimations.get(svg);
            if (!anims) return;
            anims.forEach(function(a) { a.cancel(); });
            activeAnimations.delete(svg);
        }

        var logoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                entry.isIntersecting ? startDraw(entry.target) : stopDraw(entry.target);
            });
        }, { threshold: 0.1 });

        logos.forEach(function(el) { logoObserver.observe(el); });
    }

});
