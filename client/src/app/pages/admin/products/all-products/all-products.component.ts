import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

    // var initalized...
    productsData:any
    isInProgress: boolean = false;
    submitted: boolean = false;
    // initalize form and form controls
    updateProductForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl(''),
    })

    // getter of formcontrols
    get FC(){
        return this.updateProductForm.controls
    }

    constructor(private server: RestApiService, private router: Router, private displayMsg: NzNotificationService, private modalService: NzModalService) { }

    ngOnInit(): void {
        this.getAllProducts() // getAllCategories
    }

    getAllProducts(){
        return this.server.getAllProducts().subscribe(
            (res:any) => {
                this.productsData = res
            },
            (err:any) => {
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    { nzDuration: 3000 }
                );
            }
        )
    }
    deleteProduct(id){
        return this.server.deleteProducts(id).subscribe(
            (res:any) => {
                this.isInProgress = false
                this.getAllProducts()
                this.displayMsg.create(
                    'success', 'Success', res.message,
                    { nzDuration: 6500 }
                )
            },
            (err:any) => {
                this.isInProgress = false
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    { nzDuration: 6500 }
                )
            }
        )
    }
    editProduct(id){
        this.submitted = true
        console.log(this.updateProductForm.value)
        let body = this.updateProductForm.value

        return this.server.updateProducts(id, body).subscribe(
            (res:any) => {
                this.submitted = false
                console.log("Product updated succesfully.")
                location.reload()
                this.displayMsg.create(
                    'success', 'Success', res.message,
                    {nzDuration: 4500}
                );
            },
            (err:any) =>{
                this.submitted = false
                console.log("Product updating failed: " + err)
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    {nzDuration: 3000}
                );
            }
        )

    }

    // this method generate a new modal for deleting skill.
    showDeleteModal(value): void {
        this.modalService.confirm({
            nzTitle: 'Are you sure delete this Product?',
            nzOkText: 'Yes',
            nzOkType: 'danger',
            nzOkLoading: this.isInProgress,
            nzOnOk: () => this.deleteProduct(value),
            nzCancelText: 'No',
            nzOnCancel: () => console.log('Cancel')
        });
    }


}
