import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService {

    constructor(private _authService: TokenService, private _router: Router) {}


    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRole = route.data.expectedRole;

        if (this._authService.isLoggedIn()) {
            if(this._authService.retrieveUserId() == expectedRole[1]){
                return true;
            }else{
                return false;
            }
        }
            
        this._router.navigate(['/admin/login']); 
        return false;
    }

}
