import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    submitted = false
    // initalize form and form controls
    feedbackForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        message: new FormControl('', [Validators.required]),
    })

    constructor(private server: RestApiService, private router: Router, private displayMsg: NzNotificationService) { }

    ngOnInit(): void {
    }

    // getter of formcontrols
    get FC(){
        return this.feedbackForm.controls
    }

    sendMessage(){
        console.log(this.feedbackForm.value);

        return this.server.sendConatctFormQuery(this.feedbackForm.value).subscribe(
            (res:any) => {
                this.submitted = false
                console.log("feedback send successfully.")
                this.feedbackForm.reset()
                this.displayMsg.create(
                    'success', 'Success', res.message,
                    {nzDuration: 4500}
                );
            },
            (err:any) =>{
                this.submitted = false
                console.log("feedback sending failed: " + err)
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    {nzDuration: 3000}
                );
            }
        )
    }
}
