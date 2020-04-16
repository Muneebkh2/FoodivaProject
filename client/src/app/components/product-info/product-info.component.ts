import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
    selector: 'app-product-info',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

    // var initalized...
    productDetails: any = {}
    productStatus: string = ''
    cartProducts: any = []

    constructor(private api: RestApiService) { }

    ngOnInit(): void {

    }

    getProductData(id) {
        return this.api.getProductsByID(id).subscribe(
            (res: any) => {
                console.log(res)
                this.productDetails = res
                this.productStatus = JSON.parse(res.sku).status
                console.log(JSON.parse(res.sku).status)
            },
            err => {
                console.log(err)
            }
        )
    }

    addToCart() {
        var item = {
            product: this.productDetails,
            quantity: 1
        };

        if (localStorage.getItem('cart') == null) {
            let cart: any = [];
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
            
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
            }
        }

        console.log("MY Cart: ", localStorage.getItem('cart'));
    }
}
