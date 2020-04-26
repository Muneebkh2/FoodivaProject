<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Authenticated routes...
Route::group(['middleware' => 'auth:api'], function () {
    // Route::get('users', 'Api\AuthController@getAuthUser');
});

// get-Products
Route::get('getproducts', 'Api\CategoryController@getproducts');

// Category Routes >>>
Route::get('category/all', 'Api\CategoryController@getAllCategories');
Route::get('category/slug/{slug}', 'Api\CategoryController@getCategoryByNAME');
Route::get('category/id/{id}', 'Api\CategoryController@getCategoryById');
Route::post('category/create', 'Api\CategoryController@createCategory');
Route::put('category/edit/{id}', 'Api\CategoryController@updateCategory');
Route::delete('category/delete/{id}', 'Api\CategoryController@destroyCategory');

// Products Routes >>>
Route::get('products/all', 'Api\ProductController@getAllProducts');
Route::get('products/id/{id}', 'Api\ProductController@getProductsById');
Route::post('products/create', 'Api\ProductController@createProduct');
Route::put('products/edit/{id}', 'Api\ProductController@updateProduct');
Route::delete('products/delete/{id}', 'Api\ProductController@destroyProduct');

// Order Routes >>>
Route::get('orders/all', 'Api\OrderController@getAllOrders');
Route::get('orders/id/{id}', 'Api\OrderController@getOrdersById');
Route::post('orders/create', 'Api\OrderController@createOrder');
Route::put('orders/edit/{id}', 'Api\OrderController@updateOrder');
Route::delete('orders/delete/{id}', 'Api\OrderController@destroyOrder');

// Auth Routes >>>
Route::post('login', 'Api\UserController@login');
Route::post('register', 'Api\UserController@register');
Route::put('user/profile/edit/{id}', 'Api\UserController@updateUser');


