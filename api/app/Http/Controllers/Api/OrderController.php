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
            'name' => 'required',
            'company_name' => 'required',
            'address' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'fax' => 'required',
            'payment_method' => 'required'
        ]);

        // var initalized..
        $order_title = $request->input('order_title');
        $product_id = $request->input('product_id');
        $quantity = $request->input('quantity');
        $name = $request->input('name');
        $company_name = $request->input('company_name');
        $address = $request->input('address');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $fax = $request->input('fax');
        $payment_method = $request->input('payment_method');

        try {

            $order = new Order();
            $order->order_title = $order_title;
            $order->product_id = $product_id;
            $order->quantity = $quantity;
            $order->name = $name;
            $order->company_name = $email;
            $order->address = $address;
            $order->email = $email;
            $order->phone = $phone;
            $order->fax = $fax;
            $order->payment_method = $payment_method;
            $order->save();

            return response()->json(['message' => 'New Order Created.'], $this->successStatus);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Creating failed !'], 409);
        }
    }

    public function updateOrder(Request $request, $id)
    {
        $this->validate($request, [
            'order_title' => 'required|string',
            'product_id' => 'required',
            'quantity' => 'required',
            'name' => 'required',
            'company_name' => 'required',
            'address' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'fax' => 'required',
            'payment_method' => 'required'
        ]);

        // var initalized..
        $order_title = $request->input('order_title');
        $product_id = $request->input('product_id');
        $quantity = $request->input('quantity');
        $name = $request->input('name');
        $company_name = $request->input('company_name');
        $address = $request->input('address');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $fax = $request->input('fax');
        $payment_method = $request->input('payment_method');

        try {

            $order = Order::find($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found !'], 409);
            } else {
                $order->update([
                    'order_title' => $order_title,
                    'product_id' => $product_id,
                    'quantity' => $quantity,
                    'name' => $name,
                    'company_name' => $company_name,
                    'address' => $address,
                    'email' => $email,
                    'phone' => $phone,
                    'fax' => $fax,
                    'payment_method' => $payment_method,
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
