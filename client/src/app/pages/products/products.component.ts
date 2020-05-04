import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    // data array's
    allProducts = []
    displayProducts = []
    // var's 
    searchValue: string = ''
    searchText;
    dataArray = []

    constructor(private api: RestApiService) {
        this.getAllProducts()
    }

    ngOnInit(): void { }

    getAllProducts() {
        return this.api.getAllProducts().subscribe(
            (res: any) => {
                console.log(res)
                this.allProducts = res
                this.displayProducts = res
            },
            err => {
                console.log(err)
            }
        )
    }

    searchProducts(value) {
        console.log(value)
        // let data = this.allProducts.filter(c => c.product.every(p => product.includes(c.id)))
        // let data = this.allProducts[1]['product'].filter(element => element.id == 3)
        // let data = this.allProducts.forEach((element) => {
        //     console.log(element.product);
        //     element.product
        //     // this.dataArray.push(element.product)
        // })
        // console.log(data)
        let filter = [1,3]
        // console.log(this.allProducts.map(result => {
        //     result.product = result.product.filter(course => (filter.includes(course.id)))
        //     return result
        // }))

        // let courses = [1, 3];

        const r = this.allProducts.filter(d => d.product.every(c => filter.includes(c.id)));
        console.log(r);
    }
}
