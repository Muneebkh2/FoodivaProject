import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { id_ID } from 'ng-zorro-antd';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    host = 'http://127.0.0.1:8000/';
    apiURL = this.host + 'api/';

    constructor(private http: HttpClient) { }

    /* 
    * *** 
    * Category  
    * End points methods
    * **********
    */
    getAllCategory() {
        return this.http.get(this.apiURL + 'category/all');
    }
    createCategory(body) {
        return this.http.post(this.apiURL + 'category/create', body);
    }
    updateCategory(id, body) {
        return this.http.put(this.apiURL + 'category/edit/' + id, body);
    }
    deleteCategory(id) {
        return this.http.delete(this.apiURL + 'category/delete/' + id);
    }

    /* 
    * *** 
    * Products  
    * End points methods
    * **********
    */
    // get all products
    getAllProducts() {
        return this.http.get(this.apiURL + 'getproducts');
    }
    getProductsByID(id) {
        return this.http.get(this.apiURL + 'products/id/' + id);
    }
    createProducts(body) {
        return this.http.post(this.apiURL + 'products/create', body);
    }
    updateProducts(id, body) {
        return this.http.put(this.apiURL + 'products/edit/' + id, body);
    }
    deleteProducts(id) {
        return this.http.delete(this.apiURL + 'products/delete/' + id);
    }

    /* 
    * *** 
    * Orders  
    * End points methods
    * **********
    */
    getAllOrders() {
        return this.http.get(this.apiURL + 'orders/all');
    }
    createOrders(body) {
        return this.http.post(this.apiURL + 'orders/create', body);
    }
    deleteOrders(id) {
        return this.http.delete(this.apiURL + 'orders/delete/' + id);
    }
    /* 
    * *** 
    * Contact / Feedback
    * End points method
    * **********
    */
    sendConatctFormQuery(body){
        return this.http.post(this.apiURL + 'sendWebQuery', body);
    }

}
