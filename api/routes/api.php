<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('test', function () {
    return response()->json(["message", "its working.."]);
});

// Auth Routes >>>
Route::post('login', 'Api\UserController@login');
Route::post('register', 'Api\UserController@register');

// ContactForm Email Route >>
Route::post('sendWebQuery', 'Api\UserController@ContactForm');

// Category Routes >>>
Route::get('category/all', 'Api\CategoryController@getAllCategories');
Route::get('category/slug/{slug}', 'Api\CategoryController@getCategoryByNAME');

// Products Routes >>>
Route::get('getproducts', 'Api\CategoryController@getproducts');// Products with category
Route::get('products/all', 'Api\ProductController@getAllProducts');
Route::get('products/id/{id}', 'Api\ProductController@getProductsById');

// Order Routes >>>
Route::get('orders/all', 'Api\OrderController@getAllOrders');
Route::get('orders/id/{id}', 'Api\OrderController@getOrdersById');

// Authenticated routes for admin panel...
Route::group(['middleware' => 'auth:api'], function () {
    // Dashboard Routes >>>
    Route::get('dashboard/counts', 'Api\DashboardController@getCounts');
    Route::get('dashboard/orders', 'Api\DashboardController@newOrders');

    // Category Routes >>>
    Route::post('category/create', 'Api\CategoryController@createCategory');
    Route::put('category/edit/{id}', 'Api\CategoryController@updateCategory');
    Route::delete('category/delete/{id}', 'Api\CategoryController@destroyCategory');
    
    // Products Routes >>>
    Route::post('products/create', 'Api\ProductController@createProduct');
    Route::put('products/edit/{id}', 'Api\ProductController@updateProduct');
    Route::delete('products/delete/{id}', 'Api\ProductController@destroyProduct');
    
    // Order Routes >>>
    Route::post('orders/create', 'Api\OrderController@createOrder');
    Route::put('orders/edit/{id}', 'Api\OrderController@updateOrder');
    Route::delete('orders/delete/{id}', 'Api\OrderController@destroyOrder');

    // Admin Profile Routes >>>
    Route::put('user/profile/edit/{id}', 'Api\UserController@updateUser');
});