// ========== GNB ==========
// 스크롤이 hero 섹션을 벗어나면 GNB 배경이 흰색으로 바뀝니다.
// 건드릴 것 없음.

var gnb  = document.querySelector('.gnb');
var hero = document.querySelector('.hero');

function updateGnb() {
    var heroBottom = hero.getBoundingClientRect().bottom;
    var gnbHeight  = gnb.offsetHeight;

    if (heroBottom <= gnbHeight) {
        gnb.classList.add('is-solid');
    } else {
        gnb.classList.remove('is-solid');
    }
}

window.addEventListener('scroll', updateGnb);
updateGnb();


// ========== HERO ==========
// hero 배경 이미지 자동 슬라이드.
// 이미지 추가/제거: index.html의 hero_slide 요소를 추가하거나 지우면 됩니다.
// 속도 조절: speed(전환 속도 ms), autoplay.delay(머무는 시간 ms)

new Swiper('.hero_slides', {
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    autoplay: { delay: 5000, disableOnInteraction: false },
    allowTouchMove: false,
});




// ========== LOGO DRAW-ON ==========
// .logo_anim 클래스가 붙은 인라인 SVG 로고를 선이 그려지는 애니메이션으로 재생합니다.
// 화면에 들어오면 자동 시작, 벗어나면 멈춥니다.
//
// 타이밍 조절:
//   DRAW_DELAY   : 화면 진입 후 애니메이션 시작까지 대기 시간 (ms)
//   DRAW_DURATION: 선이 그려지는 데 걸리는 시간 (ms)
//   HOLD         : 다 그려진 후 유지 시간 (ms)
//   FADE         : 서서히 사라지는 시간 (ms)
//   GAP          : 사라진 후 다음 회 시작까지 대기 시간 (ms)

var DRAW_DELAY = 500;
var DRAW_DURATION = 2400;
var HOLD = 2000;
var FADE = 2000;
var GAP = 1000;
var CYCLE = DRAW_DURATION + HOLD + FADE + GAP;

var logos = document.querySelectorAll('.logo_anim');
if (logos.length && Element.prototype.animate) {
    var activeAnimations = new Map();

    function startDraw(svg) {
        if (activeAnimations.has(svg)) return;
        var anims = [];

        var holdEnd  = (DRAW_DURATION + HOLD) / CYCLE;
        var fadeEnd  = (DRAW_DURATION + HOLD + FADE) / CYCLE;
        var resetAt  = Math.min(fadeEnd + 0.0001, 1);

        var faceDurations = [900,  2200, 1500];
        var faceStarts    = [0,    200,  400];

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




// ========== PORTFOLIO ==========
// portfolio_upper 슬라이드. 슬라이드 전환 시 배경 이미지도 함께 crossfade합니다.
// 슬라이드 추가/제거: index.html의 swiper-slide 요소와 data-bg 이미지 경로를 수정하면 됩니다.
// 속도 조절: speed(전환 속도 ms), autoplay.delay(머무는 시간 ms)

var bgWrap = document.querySelector('.portfolio_upper');
var bgLayer = bgWrap.querySelector('.portfolio_upper_bg');

var bgLayerB = bgLayer.cloneNode(false);
bgWrap.insertBefore(bgLayerB, bgLayer);

var slides = document.querySelectorAll('.portfolio_upper .swiper-slide[data-bg]');

slides.forEach(function (slide) {
    var img = slide.querySelector('.portfolio_upper_img');
    if (img) img.style.backgroundImage = "url('" + slide.dataset.bg + "')";
});

function setBg(index) {
    var realCount = slides.length;
    var realIndex = ((index % realCount) + realCount) % realCount;
    var url = "url('" + slides[realIndex].dataset.bg + "')";

    bgLayerB.style.backgroundImage = url;
    bgLayer.style.opacity = '0';

    setTimeout(function () {
        bgLayer.style.transition = 'none';
        bgLayer.style.backgroundImage = url;
        bgLayer.style.opacity = '1';
        setTimeout(function () {
            bgLayer.style.transition = '';
        }, 20);
    }, 600);
}

bgLayer.style.transition = 'none';
bgLayer.style.backgroundImage = "url('" + slides[0].dataset.bg + "')";
bgLayerB.style.backgroundImage = "url('" + slides[0].dataset.bg + "')";
setTimeout(function () { bgLayer.style.transition = ''; }, 20);

var portfolioSwiper = new Swiper('.portfolio_upper', {
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 600,
    allowTouchMove: true,
    autoplay: { delay: 4400, disableOnInteraction: false },
    pagination: {
        el: '.portfolio_upper .swiper-pagination',
        clickable: true,
    },
    navigation: {
        prevEl: '.portfolio_upper .swiper-button-prev',
        nextEl: '.portfolio_upper .swiper-button-next',
    },
    on: {
        slideChange: function () {
            setBg(this.realIndex);

            var active = document.querySelector('.portfolio_upper .swiper-pagination-bullet-active');
            if (!active) return;
            active.classList.remove('swiper-pagination-bullet-active');
            void active.offsetWidth;
            active.classList.add('swiper-pagination-bullet-active');
        },
    },
});




// ========== FONT_TRY ==========
// 폰트 체험 섹션. 버튼 클릭 → 폰트 변경, 슬라이더 → 크기 변경, 텍스트 입력 → 미리보기 반영.
//
// 폰트 추가 시:
//   1. index.html에 font_try_font_btn 버튼 추가 (data-font, data-preview 속성 필요)
//   2. style.css에 @font-face 추가
//   3. 아래 fontFamilyMap에 { '폰트이름': "'폰트이름', serif" } 항목 추가

(function () {
    var resultText   = document.querySelector('.font_try_result');
    var sizeLabel    = document.querySelector('.font_try_size_label');
    var slider       = document.querySelector('.font_try_slider');
    var inputField   = document.querySelector('.font_try_input_field');
    var inputCount   = document.querySelector('.font_try_input_count');
    var fontBtns     = document.querySelectorAll('.font_try_font_btn');

    if (!resultText) return;

    var fontFamilyMap = {
        'Yeongwol':            "'Yeongwol', serif",
        'MungyeongGamhong':    "'MungyeongGamhong', serif",
        'MapoMaponaru':        "'MapoMaponaru', serif",
        'ShinDongYup':         "'ShinDongYup', serif",
        'Jeonglimsaji':        "'Jeonglimsaji', serif",
        'ChangwonDangamRound': "'ChangwonDangamRound', serif",
        'ChangwonDangamAsac':  "'ChangwonDangamAsac', serif"
    };

    var activeBtn = document.querySelector('.font_try_font_btn.is-active');

    function getActiveFont()    { return activeBtn ? activeBtn.getAttribute('data-font')    : null; }
    function getActivePreview() { return activeBtn ? activeBtn.getAttribute('data-preview') : ''; }

    function updatePreview() {
        var font     = getActiveFont();
        var userText = inputField.value.trim();

        resultText.style.fontFamily = font ? fontFamilyMap[font] : '';
        resultText.style.fontSize   = slider.value + 'px';
        resultText.textContent      = userText ? userText : getActivePreview();
    }

    fontBtns.forEach(function (btn) {
        var font = btn.getAttribute('data-font');
        btn.style.fontFamily = fontFamilyMap[font] || '';

        btn.addEventListener('click', function () {
            if (activeBtn) activeBtn.classList.remove('is-active');
            btn.classList.add('is-active');
            activeBtn = btn;
            updatePreview();
        });
    });

    slider.addEventListener('input', function () {
        sizeLabel.textContent = slider.value + 'px';
        updatePreview();
    });

    inputField.addEventListener('input', function () {
        inputCount.textContent = '(' + inputField.value.length + '/100)';
        updatePreview();
    });

    updatePreview();
}());
