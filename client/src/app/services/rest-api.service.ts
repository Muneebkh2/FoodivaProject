import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    host = 'http://127.0.0.1:8000/';
    apiURL = this.host + 'api/';

    constructor(private http: HttpClient) { }

    // get all products
    getProducts() {
        return this.http.get(this.apiURL + 'getproducts');
    }
    // get products by id
    getProductsByID(id) {
        return this.http.get(this.apiURL + 'products/id/'+id);
    }

}
