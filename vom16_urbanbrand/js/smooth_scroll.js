/* Lenis 스무스 스크롤. 네이티브 scrollTop을 보간하므로 scroll 이벤트가 정상 발생 —
   AOS·position: fixed와 충돌 없음. rAF 루프는 하나만 둔다(이중 구동 시 시간 델타가 어긋남). */
var lenis = new Lenis({
    duration: 2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
