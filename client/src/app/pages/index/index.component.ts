import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    // ***
    // Images Array Initalized...
    // >> brand slider Images
    brandSlideImages = [
        '../assets/images/brands/chinar.jpg',
        '../assets/images/brands/mdh.jpg',
        '../assets/images/brands/shan.png',
        '../assets/images/brands/dabur.png',
        '../assets/images/brands/haldirams.png',
        '../assets/images/brands/amul.jpg',
        '../assets/images/brands/ashoka.png'
    ]
    // >> product slider Images
    productSlideImages = [
        {name: 'product one',image:'../assets/images/products/product_1.jpg'},
        {name: 'product two',image:'../assets/images/products/product_2.jpg'},
        {name: 'product three',image:'../assets/images/products/product_3.jpg'},
        {name: 'product four',image:'../assets/images/products/product_4.jpg'},
        {name: 'product five',image:'../assets/images/products/product_5.jpg'},
        {name: 'product six',image:'../assets/images/products/product_6.jpg'}
    ]


    // ***********
    // Slider Settings start...
    // >>> set brands sliders options
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

    // set products sliders options
    ProductSlideOptions = {
        margin: 50,
        nav: true,
        dots: false,
        autoplay: false,
        loop: false,
        items: 3,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    }

    constructor() { }

    ngOnInit(): void { }


}
