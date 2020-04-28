import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
    
    submitted = false
    // initalize form and form controls
    categoryForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl(''),
    })

    // getter of formcontrols
    get FC(){
        return this.categoryForm.controls
    }

    constructor(private server: RestApiService, private router: Router, private displayMsg: NzNotificationService) { }

    ngOnInit(): void {}

    addCategory(){
        this.submitted = true
        console.log(this.categoryForm.value)
        let body = this.categoryForm.value

        return this.server.createCategory(body).subscribe(
            (res:any) => {
                this.submitted = false
                console.log("new category created.")
                this.router.navigate(['/admin/category/all'])
                this.displayMsg.create(
                    'success', 'Success', res.message,
                    {nzDuration: 4500}
                );
            },
            (err:any) =>{
                this.submitted = false
                console.log("category creation failed: " + err)
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    {nzDuration: 3000}
                );
            }
        )

    }

}
