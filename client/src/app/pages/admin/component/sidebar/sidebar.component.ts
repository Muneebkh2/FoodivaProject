import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    isCollapsed = false;
    isCollapsed1 = false;

    constructor(private _token: TokenService) { }

    ngOnInit(): void {
    }

    signout(){
        this._token.delete()
        return this._token.logout()
    }

}
