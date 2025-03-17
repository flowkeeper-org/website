(async function ($) {
    $('.owl-carousel').owlCarousel({
        autoplay: true,
        items: 1,
        loop: true,
        navigation: false,
        dots: false,
        slideSpeed: 300,
        lazyLoad: true,
        paginationSpeed: 400,
        singleItem: true,
        autoHeight: true
    });
})(jQuery);
