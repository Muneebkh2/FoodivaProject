import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    // brand slider Images
    brandSlideImages = [
        '../assets/images/brands/chinar.jpg',
        '../assets/images/brands/mdh.jpg',
        '../assets/images/brands/shan.png',
        '../assets/images/brands/dabur.png',
        '../assets/images/brands/haldirams.png',
        '../assets/images/brands/amul.jpg',
        '../assets/images/brands/ashoka.png'
    ]
    // set sliders options
    BrandSlideOptions = {
        margin: 10,
        nav: true,
        dots: false,
        // navText : ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-chevron-right'></i>"],
        autoplay: true,
        loop: true,
        items: 5,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }
        }
    }

    constructor() { }

    ngOnInit(): void { }


}
