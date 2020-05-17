import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'app-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

    // var initalized...
    productDetails: any = {}
    productStatus: string = ''
    productStock: number
    cartProducts: any = []
    quantity: number = 0
    photoURL = ''
    disableCartBTN: boolean = true
    showCartLink: any;

    constructor(private api: RestApiService, private displayMsg: NzNotificationService) { }

    ngOnInit(): void {
        this.photoURL = this.api.host + 'products/images/'
    }

    changeQTY() {
        console.log(this.quantity);
        console.log(this.disableCartBTN);
        if (this.quantity > this.productStock) {
            this.disableCartBTN = true
        }
        if (this.quantity !== 0) {
            this.disableCartBTN = false
        } else {
            this.disableCartBTN = true
        }
    }

    getProductData(id) {
        return this.api.getProductsByID(id).subscribe(
            (res: any) => {
                // console.log(res)
                this.productDetails = res
                this.productStatus = JSON.parse(res.sku).status
                this.productStock = parseInt(JSON.parse(res.sku).stock)
                // console.log(this.productStatus)
                // console.log(this.productStock)
            },
            err => {
                console.log(err)
            }
        )
    }

    getCartItem() {
        
        if (localStorage.getItem('cart') != null) {
            let cart: any = JSON.parse(localStorage.getItem('cart'));
            let index: number = -1;
            
            for (var i = 0; i < cart.length; i++) {
                let item = JSON.parse(cart[i]);
                if (item.product.id == this.productDetails.id) {
                    index = i;
                    break;
                }
            }
            
            if (index != -1) {
                return false;
            }else{
                return true;
            }
        }

    }

    addToCart() {
        var item = {
            product: this.productDetails,
            quantity: this.quantity
        };

        if (this.quantity > this.productStock) {
            this.displayMsg.create(
                'error', 'Error', 'Prodect stock not available for your required quantity ! just (' + this.productStock + ') products available.',
                { nzDuration: 4500 }
            );
            this.disableCartBTN = true
        } else {
            if (localStorage.getItem('cart') == null) {
                let cart: any = [];
                cart.push(JSON.stringify(item));
                localStorage.setItem('cart', JSON.stringify(cart));
                this.displayMsg.create(
                    'success', 'Success', 'Prodect added in cart succesfully !',
                    { nzDuration: 4500 }
                );
            } else {
                let cart: any = JSON.parse(localStorage.getItem('cart'));
                let index: number = -1;
                for (var i = 0; i < cart.length; i++) {
                    let item = JSON.parse(cart[i]);
                    if (item.product.id == this.productDetails.id) {
                        index = i;
                        break;
                    }
                }
                if (index == -1) {
                    cart.push(JSON.stringify(item));
                    localStorage.setItem('cart', JSON.stringify(cart));
                } else {
                    let item = JSON.parse(cart[index]);
                    item.quantity += 1;
                    cart[index] = JSON.stringify(item);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    this.displayMsg.create(
                        'success', 'Success', 'Prodect also in cart product quantity updated succesfully !',
                        { nzDuration: 55500 }
                    );
                }
            }
        }

        // console.log("MY Cart: ", JSON.parse(localStorage.getItem('cart')));
    }
}
