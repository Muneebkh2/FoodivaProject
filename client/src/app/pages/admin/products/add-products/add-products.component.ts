import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
// import * as $ from 'jquery';

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
        category: new FormControl(null, [Validators.required]),
        image: new FormControl('', [Validators.required]),
        // description: new FormControl(''),
    })
    allCategories:any = []
    productPicture: any;

    // getter of formcontrols
    get FC(){
        return this.productForm.controls
    }

    constructor(private server: RestApiService, private router: Router, private displayMsg: NzNotificationService) { }

    ngOnInit(): void {
        this.getCategory() // get all categories to craete products
        // $('#product_image').on('change',function(){
        //     var fileName = $(this).val();// get the file name
        //     $(this).next('.custom-file-label').html(fileName);// replace the "Choose a file" label
        // });
    }

    getCategory(){
        return this.server.getAllCategory().subscribe(
            (res:any) => {
                this.allCategories = res
                console.log(this.allCategories)
            },(err:any) => {
                console.log(err)
            }
        )
    }

    addProduct(){
        this.submitted = true
        // console.log(this.productForm.value)
        // let body = {
        //     name: this.productForm.value.name,
        //     categories_id: [this.productForm.value.category],
        //     sku: "empty",
        //     // product_image: this.productForm.value.image
        // }
        // console.log(body);
        
        const formData = new FormData();
        formData.append('name', this.productForm.get('name').value);
        formData.append('product_image', this.productForm.get('image').value); 
        formData.append("categories_id", this.productForm.get('category').value);
        formData.append("sku", "empty");
        // formData.append("description", this.productForm.get('description').value);
        

        return this.server.createProducts(formData).subscribe(
            (res:any) => {
                this.submitted = false
                console.log("new product created.")
                this.router.navigate(['/admin/products/all'])
                this.displayMsg.create(
                    'success', 'Success', res.message,
                    {nzDuration: 4500}
                );
            },
            (err:any) =>{
                this.submitted = false
                console.log("product creation failed: " + err)
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    {nzDuration: 3000}
                );
            }
        )

    }

    //check pic extension
    onFileChange(e: Event) {
        if ((<HTMLInputElement>e.target).files.length > 0) {
            const file = (<HTMLInputElement>e.target).files[0];
            console.log(file);
            this.productForm.patchValue({
                image: file
            });
          }
    }
}
