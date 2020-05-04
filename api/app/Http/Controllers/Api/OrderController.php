<?php

namespace App\Http\Controllers\Api;
use App\Notifications\OrderCompleted;
use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public $successStatus = 200;

    public function getAllOrders()
    {
        $orders = Order::with('Product')->get();
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
            'firstname' => 'required|string',
            'lastname' => 'required',
            'company' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
            'address2' => 'required',
            'country' => 'required',
            'state' => 'required',
            'zipcode'=>'required',
            'products_id' => 'required',
            // 'quantity' => 'required'

        ]);

        // var initalized..
        $firstname = $request->input('firstname');
        $lastname = $request->input('lastname');
        $company = $request->input('company');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $address = $request->input('address');
        $address2 = $request->input('address2');
        $country = $request->input('country');
        $state = $request->input('state');
        $zipcode = $request->input('zipcode');
        $products = $request->input('products_id');
        // [$quantity] = $request->input('quantity');
        $unique = 00000;
        $order_no = $unique + 1; 
        try {

            $order = new Order();
            $order->name = $firstname.' '.$lastname;
            $order->company = $company;
            $order->email = $email;
            $order->phone = $phone;
            $order->address = $address;
            $order->address2 = $address2;
            $order->country = $country;
            $order->state = $state;
            $order->zipcode = $zipcode;
            $order->order_no = $order_no;
            $order->save();
            
            // update foriegn key .. 
            foreach ($products as $key => $value) {
                $order->Product()->attach($value['id'], ['quantity' => $value['quantity']]);
            }
            $order->notify(new OrderCompleted($order));

            return response()->json(['message' => 'New Order Created.'], $this->successStatus);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Creating failed !'.$th], 409);
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
        $products = $request->input('products_id');

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
                // update foriegn key .. 
                $order->Product()->attach($products);

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
