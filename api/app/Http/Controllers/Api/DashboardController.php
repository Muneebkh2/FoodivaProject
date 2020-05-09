<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use App\Product;
use App\Order;

class DashboardController extends Controller
{
    // Get Counts for dashboard.
    public function getCounts()
    {
        $result[0] = Category::count();
        $result[1] = Product::count();
        $result[2] = Order::count();
        return response()->json($result);
    }
    // Get New Orders for dashboard
    public function newOrders()
    {
        $orders = Order::with('Product')->orderBy('created_at', 'desc')->take(5)->get();
        return response()->json($orders);
    }
}