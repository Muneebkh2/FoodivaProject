import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    // var initalized.
    countCartProducts:number = 0
    // cartProducts: { product: any, quantity: number }
    cartProducts:any = []
    disable_It:boolean = false

    constructor() { }

    ngOnInit(): void {
        this.getCartItems() // this will show all the cart Items.
    }

    getCartItems(){
        if (localStorage.getItem('cart') != null) {
            let cart: any = JSON.parse(localStorage.getItem('cart'));
            // console.log(cart)
            this.countCartProducts = cart.length
            for (var i = 0; i < cart.length; i++) {
                let item = JSON.parse(cart[i]);
                // console.log(item);
                this.cartProducts.push(item)
                // console.log(item.product.name);
            }
        }else{
            this.disable_It = true
            console.log("its working..")
        } 
    }

    clearCart(){
        localStorage.clear();
        this.countCartProducts = 0
        this.cartProducts = []
        this.getCartItems()
    }
}
