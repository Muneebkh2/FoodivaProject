import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    // APP Host URL
    // host = 'http://127.0.0.1:8000/';
    host = 'https://foodivausa.com/api/public/';
    apiURL = this.host + 'api/';
    
    // API Token headers
    httpOptions = new HttpHeaders({
        Accept: 'application/json',
        // Authorization: 'Bearer ' + this._storage.retrieve()
    });
    // API Token headers
    authhttpOptions = new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this._storage.retrieve(),
    });
    // .setHeader('Access-Control-Allow-Origin', '*');

    constructor(private http: HttpClient, private _storage: TokenService) { }

    /* 
    * *** 
    * Authentication  
    * End points methods
    * **********
    */
    // ** Login
    login(body) {
        return this.http.post(this.apiURL + 'login', body);
    }

    /* 
    * *** 
    * Dashboard  
    * End points methods
    * **********
    */
    getDashboardCounts(){
        return this.http.get(this.apiURL + 'dashboard/counts', {headers: this.authhttpOptions});
    }
    getNewOrders(){
        return this.http.get(this.apiURL + 'dashboard/orders', {headers: this.authhttpOptions});
    }
    /* 
    * *** 
    * Category  
    * End points methods
    * **********
    */
    getAllCategory() {
        return this.http.get(this.apiURL + 'category/all', {headers: this.httpOptions});
    }
    createCategory(body) {
        return this.http.post(this.apiURL + 'category/create', body, {headers: this.authhttpOptions});
    }
    updateCategory(id, body) {
        return this.http.put(this.apiURL + 'category/edit/' + id, body, {headers: this.authhttpOptions});
    }
    deleteCategory(id) {
        return this.http.delete(this.apiURL + 'category/delete/' + id, {headers: this.authhttpOptions});
    }

    /* 
    * *** 
    * Products  
    * End points methods
    * **********
    */
    // get all products
    getAllProducts() {
        return this.http.get(this.apiURL + 'getproducts', {headers: this.httpOptions});
    }
    productsAll(){
        return this.http.get(this.apiURL + 'products/all', {headers: this.httpOptions});
    }
    getProductsByID(id) {
        return this.http.get(this.apiURL + 'products/id/' + id, {headers: this.httpOptions});
    }
    createProducts(body) {
        return this.http.post(this.apiURL + 'products/create', body, {headers: this.authhttpOptions});
    }
    updateProducts(id, body) {
        return this.http.put(this.apiURL + 'products/edit/' + id, body, {headers: this.authhttpOptions});
    }
    deleteProducts(id) {
        return this.http.delete(this.apiURL + 'products/delete/' + id, {headers: this.authhttpOptions});
    }

    /* 
    * *** 
    * Orders  
    * End points methods
    * **********
    */
    getAllOrders() {
        return this.http.get(this.apiURL + 'orders/all', {headers: this.httpOptions});
    }
    createOrders(body) {
        return this.http.post(this.apiURL + 'orders/create', body, {headers: this.httpOptions});
    }
    deleteOrders(id) {
        return this.http.delete(this.apiURL + 'orders/delete/' + id, {headers: this.authhttpOptions});
    }
    /* 
    * *** 
    * Contact / Feedback
    * End points method
    * **********
    */
    sendConatctFormQuery(body){
        return this.http.post(this.apiURL + 'sendWebQuery', body, {headers: this.httpOptions});
    }

    getCartData(){
        let cart: any = JSON.parse(localStorage.getItem('cart'))
        // console.log(cart)
        if (cart != null) {
            return cart.length
        }else{
            return 0
        }
    }
}
