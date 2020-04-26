import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-products',
    templateUrl: './add-products.component.html',
    styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
    submitted = false
    // initalize form and form controls
    productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required])
    })

    // getter of formcontrols
    get FC(){
        return this.productForm.controls
    }

    constructor() { }

    ngOnInit(): void {
    }

    addProduct(){
        console.log(this.productForm.value)
    }

}
