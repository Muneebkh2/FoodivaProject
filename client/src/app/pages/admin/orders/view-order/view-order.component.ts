import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-order',
    templateUrl: './view-order.component.html',
    styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

    // var initalized...
    UserId = this.route.snapshot.paramMap.get('ID');
    ordersData: any;
    isInProgress: boolean;
    photoURL: string = '';

    constructor(private server: RestApiService, private router: Router, private displayMsg: NzNotificationService, private modalService: NzModalService,  private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getOrderByID(this.UserId)
    }

    parseJson(value){
        let parsedValue = JSON.parse(value, (key, value) => {
            return value
        })
        return parsedValue
    }
    
    getOrderByID(id) {
        return this.server.getOrdersById(id).subscribe(
            (res: any) => {
                this.ordersData = res[0]
                // console.log(res)
            },
            (err: any) => {
                // console.log(err);
                this.displayMsg.create(
                    'error', 'Error', err.error.message,
                    { nzDuration: 3000 }
                );
            }
        )
    }

}
