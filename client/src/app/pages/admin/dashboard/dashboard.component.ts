import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Router } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    // var initalized...
    ordersData: any
    isInProgress: boolean;
    categoryCounts: string = '0'
    productCounts: string = '0'
    orderCounts: string = '0'
    photoURL: string = '0'

    constructor(private server: RestApiService, private router: Router, private displayMsg: NzNotificationService, private modalService: NzModalService) {     
    }
    
    ngOnInit(): void {
        this.getAllOrders() // getAllOrders
        this.getALlCounts()
        // window.location.reload()
        this.photoURL = this.server.host + 'products/images/'
    }

    parseJson(value){
        let parsedValue = JSON.parse(value, (key, value) => {
            return value
        })
        return parsedValue
    }

    getALlCounts(){
        return this.server.getDashboardCounts().subscribe(
            (res:any) => {
                this.categoryCounts = res[0]
                this.productCounts = res[1]
                this.orderCounts = res[2]
            },
            (err:any) => {
                // this.displayMsg.create(
                //     'error', 'Error', err.error.message,
                //     { nzDuration: 3000 }
                // );
            }
        )
    }

    getAllOrders() {
        return this.server.getNewOrders().subscribe(
            (res: any) => {
                this.ordersData = res
            },
            (err: any) => {
                // this.displayMsg.create(
                //     'error', 'Error', err.error.message,
                //     { nzDuration: 3000 }
                // );
            }
        )
    }

    deleteOrder(id){
        return this.server.deleteOrders(id).subscribe(
            (res:any) => {
                this.isInProgress = false
                this.getAllOrders()
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

    // this method generate a new modal for deleting skill.
    showDeleteModal(value): void {
        this.modalService.confirm({
            nzTitle: 'Are you sure delete this category?',
            nzOkText: 'Yes',
            nzOkType: 'danger',
            nzOkLoading: this.isInProgress,
            nzOnOk: () => this.deleteOrder(value),
            nzCancelText: 'No',
            nzOnCancel: () => console.log('Cancel')
        });
    }

}
