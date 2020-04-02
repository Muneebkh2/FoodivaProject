<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public $successStatus = 200;

    public function getAllOrders()
    {
        $orders = Order::all();
        return response()->json($orders, $this->successStatus);
    }

    public function getOrdersById($id)
    {
        $orders = Order::find($id);
        return response()->json($orders, $this->successStatus);
    }

    public function createOrder(Request $request)
    {
        $this->validate($request, [
            'order_title' => 'required|string',
            'product_id' => 'required',
            'quantity' => 'required',
            'customer_email' => 'required|email',
            'customer_phone' => 'required',
        ]);

        // var initalized..
        $order_title = $request->input('order_title');
        $product_id = $request->input('product_id');
        $quantity = $request->input('quantity');
        $customer_email = $request->input('customer_email');
        $customer_phone = $request->input('customer_phone');

        try {

            $order = new Order();
            $order->order_title = $order_title;
            $order->product_id = $product_id;
            $order->quantity = $quantity;
            $order->customer_email = $customer_email;
            $order->customer_phone = $customer_phone;
            $order->save();

            return response()->json(['message' => 'New Order Created.'], $this->successStatus);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Creating failed !'], 409);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $this->validate($request, [
            'order_title' => 'required|string',
            'product_id' => 'required',
            'quantity' => 'required',
            'customer_email' => 'required|email',
            'customer_phone' => 'required',
        ]);

        // var initalized..
        $order_title = $request->input('order_title');
        $product_id = $request->input('product_id');
        $quantity = $request->input('quantity');
        $customer_email = $request->input('customer_email');
        $customer_phone = $request->input('customer_phone');

        try {

            $order = Order::find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found !'], 409);
            } else {
                $order->update([
                    'order_title' => $order_title,
                    'product_id' => $product_id,
                    'quantity' => $quantity,
                    'customer_email' => $customer_email,
                    'customer_phone' => $customer_phone,
                ]);

                return response()->json(['message' => 'Order Updated Succesfully.'], $this->successStatus);
            }

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Order Updating failed !'], 409);
        }
    }

    public function destroyOrder($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found !'], 409);
        } else {
            $order->delete();
            return response()->json(['message' => 'Order Deleted Succesfully.'], $this->successStatus);
        }
    }
}
