import { Component, OnInit } from '@angular/core';
declare interface RouteInfo {
    path: string
    title: string
    // icon: string;
    class: string
}

export const navbarROUTES: RouteInfo[] = [
    { path: '', title: 'Home', class: 'nav-item' },
    { path: '/brands', title: 'Brand', class: 'nav-item' },
    { path: '/products', title: 'Products', class: 'nav-item' },
    { path: '/about', title: 'About Us', class: 'nav-item' },
    { path: '/contact', title: 'Contact Us', class: 'nav-item' },
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
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        // console.log(cart)
        this.countCartProducts = cart.length
    }

    main__menu(): void {
        this.menuItems = navbarROUTES.filter(menuItem => menuItem)
    }

}
