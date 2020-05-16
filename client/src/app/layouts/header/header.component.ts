import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare interface RouteInfo {
    path: string
    title: string
    // icon: string;
    class: string
}

export const navbarROUTES: RouteInfo[] = [
    { path: '/', title: 'Home', class: 'nav-link' },
    { path: '/brands', title: 'Brand', class: 'nav-link' },
    { path: '/products', title: 'Products', class: 'nav-link' },
    { path: '/about', title: 'About Us', class: 'nav-link' },
    { path: '/contact', title: 'Contact Us', class: 'nav-link' },
];

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public menuItems: any[]
    countCartProducts: number = 0

    constructor() { }

    ngOnInit(): void {
        this.main__menu()
        let cart: any = JSON.parse(localStorage.getItem('cart'))
        // console.log(cart)
        if (cart != null) {
            this.countCartProducts = cart.length
        }
        $(document).ready(function () {
            $(".navbar-toggler").on("click", function () {
                  $(this).toggleClass("active");
            });
        });
        // hide menu on click 
        $('.navbar-nav>li').on('click', function(){
            $('.navbar-collapse').collapse('show');
            $(".navbar-toggler").toggleClass("active");
            $(".navbar-toggler").toggleClass("collapsed");
        });
    }

    main__menu(): void {
        this.menuItems = navbarROUTES.filter(menuItem => menuItem)
    }

}
