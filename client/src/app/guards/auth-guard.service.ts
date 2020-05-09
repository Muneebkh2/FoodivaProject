import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private _authService: TokenService, private _router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.isLoggedIn()) {
            return true;
        }

        // navigate to login page
        this._router.navigate(['/admin/login']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    }

}
