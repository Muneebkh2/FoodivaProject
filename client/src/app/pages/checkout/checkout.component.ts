import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    countCartProducts: number = 0;
    cartProducts: any = [];
    submitted = false
    // initalize form and form controls
    checkoutForm = new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        address2: new FormControl(''),
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.required]),
        products_id: new FormControl(''),
        // quantity: new FormControl(''),
    })

    // getter of formcontrols
    get FC(){
        return this.checkoutForm.controls
    }
    constructor(private router: Router, private server: RestApiService, private displayMsg: NzNotificationService) { 
        this.getCartItems();
    }

    ngOnInit(): void {
    }

    getCartItems(){
        if (localStorage.getItem('cart') != null) {
            let cart: any = JSON.parse(localStorage.getItem('cart'));
            console.log(cart)
            this.countCartProducts = cart.length
            for (var i = 0; i < cart.length; i++) {
                let item = JSON.parse(cart[i]);
                console.log(item);
                this.cartProducts.push(item)
                console.log(item.product.name);
            }
        }else{
            this.router.navigate(['products'])
            console.log("its working..")
        } 
    }

    createOrder(){
        console.log(this.cartProducts);
        let productsIDs:any = []
        
        this.cartProducts.forEach(element => {
            productsIDs.push({id: element.product.id,quantity: element.quantity})
        });
        console.log(productsIDs);
        this.checkoutForm.controls['products_id'].setValue(productsIDs);
        // this.checkoutForm.controls['products_id'].setValue(productsIDs['product']['id']);
        // this.checkoutForm.controls['quantity'].setValue(productsIDs['quantity']);
        console.log(this.checkoutForm.value);
        // let productsIDs = []
        // let quantity = []
        // this.cartProducts.forEach(element => {
        //     productsIDs.push(element.product.id)
        //     quantity.push(element.quantity)
        // });
        // console.log(productsIDs);
        // console.log(quantity);
        
        return this.server.createOrders(this.checkoutForm.value).subscribe(
            (res:any) => {
                this.submitted = false
                console.log("new order created.")
                this.clearCart()
                this.router.navigate(['/thank-you-for-order'])
                this.displayMsg.create(
                    'success', 'Success', res.message,
                    {nzDuration: 4500}
                );
            },
            (err:any) =>{
                this.submitted = false
                console.log("failed: " + err)
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    {nzDuration: 3000}
                );
            }
        )

    }

    clearCart(){
        localStorage.clear();
        this.countCartProducts = 0
        this.cartProducts = []
        this.getCartItems()
    }
}
