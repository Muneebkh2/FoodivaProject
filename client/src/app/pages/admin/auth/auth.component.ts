import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    submitted = false
    isLogginInFLAG = false;
    errorMessage: string;
    // initalize form and form controls
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    })

    // getter of formcontrols
    get FC(){
        return this.loginForm.controls
    }

    constructor(private server: RestApiService, private router: Router, private storage: TokenService) { }

    ngOnInit(): void {}

    login(){
        this.submitted = true
        
        let body = this.loginForm.value
        // console.log(body);
        
        return this.server.login(body).subscribe(
            (res:any) => {
                this.storage.store(res.success.token, res.user.is_admin, res.user.email, res.user.name, res.user.id);
                this.submitted = false; // reset flag to display spinne
                if (this.storage.retrieveUserRole() === 1) {
                    this.router.navigate(['admin/dashboard']);
                }else{
                    this.submitted = false // reset flag to display spinner
                    this.errorMessage = 'Authorization failed, you do not have access to page.'    
                }
            },
            (err:any) =>{
                this.submitted = false // reset flag to display spinner
                this.errorMessage = 'Invalid login credentials.'
            }
        )
    }

}
