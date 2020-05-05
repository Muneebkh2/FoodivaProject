import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private _router: Router) { }

    private tokenKey: 'app_token';

    public store(content: Object, role: Object, email: Object, name: Object, id: Object) {
        if (localStorage.length == null) {
            localStorage.setItem(this.tokenKey, JSON.stringify({
                token: content,
                role: role,
                email: email,
                name: name,
                id: id,
            }));
        } else {
            localStorage.clear();
            localStorage.setItem(this.tokenKey, JSON.stringify({
                token: content,
                role: role,
                email: email,
                name: name,
                id: id,
            }));
        }
    }

    public retrieve() {
        let data = JSON.parse(localStorage.getItem(this.tokenKey));
        if (!data) return null;
        return data.token;
    }

    public retrieveUserRole() {
        let data = JSON.parse(localStorage.getItem(this.tokenKey));
        // let data:any = localStorage.getItem(this.tokenKey);
        if (!data) return null;
        return data.role;
    }

    public retrieveUserId() {
        let data = JSON.parse(localStorage.getItem(this.tokenKey));
        if (!data) return null;
        return data.id;
    }

    public retrieveAllInfo() {
        let data = JSON.parse(localStorage.getItem(this.tokenKey));
        // let data:any = localStorage.getItem(this.tokenKey);
        // console.log('data', data)
        if (!data) return null;
        return data;
    }

    roleMatch(allowedRoles): boolean {
        var isMatch = false;
        var userRoles = JSON.parse(localStorage.getItem(this.tokenKey));
        if (userRoles.role == 0) {
            isMatch = true;
            return false;
        }
        return isMatch;
    }

    public isLoggedIn() {
        let storedToken = localStorage.getItem(this.tokenKey);
        if (!storedToken) return false;
        return true;


        // canActivate(
        //     next: ActivatedRouteSnapshot,
        //     state: RouterStateSnapshot):  boolean {
        //       if (localStorage.getItem('userToken') != null)
        //       {
        //         let roles = next.data["roles"] as Array<string>;
        //         if (roles) {
        //           var match = this.userService.roleMatch(roles);
        //           if (match) return true;
        //           else {
        //             this._router.navigate(['/forbidden']);
        //             return false;
        //           }
        //         }
        //         else
        //           return true;
        //       }
        //       this._router.navigate(['/login']);
        //       return false;
        //   }
    }

    public logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.clear();
        this._router.navigate(['/login']);
    }

    public delete() {
        localStorage.removeItem(this.tokenKey);
        localStorage.clear();
    }
}
