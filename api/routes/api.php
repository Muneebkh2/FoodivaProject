<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Authenticated routes...
Route::group(['middleware' => 'auth:api'], function () {
    // Route::get('users', 'Api\AuthController@getAuthUser');
});

// Auth Routes >>>
Route::post('login', 'Api\UserController@login');
Route::post('register', 'Api\UserController@register');
Route::put('user/profile/edit/{id}', 'Api\UserController@updateUser');

// Products Routes >>>
Route::get('products/all', 'Api\ProductController@getAllProducts');
Route::get('products/id/{id}', 'Api\ProductController@getProductsById');
Route::post('products/create', 'Api\ProductController@createProduct');
Route::put('producst/edit/{id}', 'Api\ProductController@updateProduct');
Route::delete('products/delete/{id}', 'Api\ProductController@destroyProduct');

// Order Routes >>>
Route::get('orders/all', 'Api\OrderController@getAllOrders');
Route::get('orders/id/{id}', 'Api\OrderController@getOrdersById');
Route::post('orders/create', 'Api\OrderController@createOrder');
Route::put('orders/edit/{id}', 'Api\OrderController@updateOrder');
Route::delete('orders/delete/{id}', 'Api\OrderController@destroyOrder');
