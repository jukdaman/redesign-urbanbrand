var owl = $('.owl-carousel');

owl.on('changed.owl.carousel', function(event) {
    var count = event.item.count;
    var index = event.item.index;
    var clones = event.relatedTarget._clones.length / 2;
    var realIndex = ((index - clones) % count + count) % count;

    var $item = $('.news_carousel .owl-item').not('.cloned').eq(realIndex).find('.news_item');
    $('.news_item_title_wrap .content_title_medium').text($item.data('title'));
    $('.news_item_title_wrap .content_desc_small').text($item.data('desc'));
});

owl.owlCarousel({
    margin: 30,
    loop: true,
    center: true,
    nav: true,
    navText: [
        "<i class='ri-arrow-left-circle-fill'></i>",
        "<i class='ri-arrow-right-circle-fill'></i>"
    ],
    responsive: {
        300: {
            items: 2
        },
        700: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})

$('.owl-nav').appendTo('.owl-stage-outer');