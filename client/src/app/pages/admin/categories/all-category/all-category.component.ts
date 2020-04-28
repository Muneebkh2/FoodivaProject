import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-all-category',
    templateUrl: './all-category.component.html',
    styleUrls: ['./all-category.component.scss']
})
export class AllCategoryComponent implements OnInit {

    // var initalized...
    categoriesData:any
    isInProgress: boolean = false;
    submitted: boolean = false;
    // initalize form and form controls
    updateCategoryForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl(''),
    })

    // getter of formcontrols
    get FC(){
        return this.updateCategoryForm.controls
    }

    constructor(private server: RestApiService, private router: Router, private displayMsg: NzNotificationService, private modalService: NzModalService) { }

    ngOnInit(): void {
        this.getAllCategories() // getAllCategories
    }

    getAllCategories(){
        return this.server.getAllCategory().subscribe(
            (res:any) => {
                this.categoriesData = res
            },
            (err:any) => {
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    { nzDuration: 3000 }
                );
            }
        )
    }
    deleteCategory(id){
        return this.server.deleteCategory(id).subscribe(
            (res:any) => {
                this.isInProgress = false
                this.getAllCategories()
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
    editCategory(id){
        this.submitted = true
        console.log(this.updateCategoryForm.value)
        let body = this.updateCategoryForm.value

        return this.server.updateCategory(id, body).subscribe(
            (res:any) => {
                this.submitted = false
                console.log("category updated succesfully.")
                location.reload()
                this.displayMsg.create(
                    'success', 'Success', res.message,
                    {nzDuration: 4500}
                );
            },
            (err:any) =>{
                this.submitted = false
                console.log("category updating failed: " + err)
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
            nzTitle: 'Are you sure delete this category?',
            nzOkText: 'Yes',
            nzOkType: 'danger',
            nzOkLoading: this.isInProgress,
            nzOnOk: () => this.deleteCategory(value),
            nzCancelText: 'No',
            nzOnCancel: () => console.log('Cancel')
        });
    }
}
