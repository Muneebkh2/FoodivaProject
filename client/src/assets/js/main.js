$('#brandCarousel').owlCarousel({
    margin:10,
    nav: true,
    // navText : ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-chevron-right'></i>"],
    autoplay:true,
    loop: true,
    items: 4,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:5
        }
    }
});