<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    public $successStatus = 200;

    public function getAllProducts()
    {
        $products = Product::all();
        return response()->json($products, $this->successStatus);
    }

    public function getProductsById($id)
    {
        $products = Product::find($id);
        return response()->json($products, $this->successStatus);
    }

    public function createProduct(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'sku' => 'required',
            'categories_id' => 'required'
        ]);

        // var initalized.. 
        $name = $request->input('name');
        $sku = $request->input('sku');
        $categories = $request->input('categories_id');
        $image = $request->file('product_image'); //get the file

        try {

            $product = new Product();
            $product->name = $name;
            $product->sku = json_encode($sku);
            $name = "product_image_".time().'_.'.$image->getClientOriginalExtension(); //get the  file extention
            $destinationPath = public_path('/products/images'); //public path folder dir
            $image->move($destinationPath, $name);  //mve to destination you mentioned 
            $product->image = $name;
            // if ($request->hasFile('product_image')) {  //check the file present or not
            // }
            $product->save();
            
            // update foriegn key .. 
            $product->Category()->attach($categories);

            return response()->json(['message' => 'New Product Created.'], $this->successStatus);

        } catch (\Exception $e) {
            return response()->json($e, 409);
        }
    }

    public function updateProduct(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'sku' => 'required',
            'categories_id' => 'required'
        ]);

        // var initalized.. 
        $name = $request->input('name');
        $sku = $request->input('sku');
        $categories = $request->input('categories_id');
        $image = $request->file('product_image'); //get the file

        try {

            $product = Product::find($id);

            if (!$product) {
                return response()->json(['message' => 'Product not found !'], 409);
            } else {
                if ($request->hasFile('product_image')) {  //check the file present or not
                    $name = "product_image_".time().'_.'.$image->getClientOriginalExtension(); //get the  file extention
                    $destinationPath = public_path('/products/images'); //public path folder dir
                    $image->move($destinationPath, $name);  //mve to destination you mentioned 
                    $product->image = $name;
                    $product->update([
                        'name' => $name,
                        'sku' => $sku,
                        'image' => $image
                    ]);
                }else{
                    $product->update([
                        'name' => $name,
                        'sku' => $sku,
                    ]);
                }
                $product->Category()->sync($categories);
                
                return response()->json(['message' => 'Product Updated Succesfully.'], $this->successStatus);
            }

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Product Updating failed !'], 409);
        }
    }

    public function destroyProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found !'], 409);
        } else {
            // delete foriegn key .. 
            // $product->Category()->detach($categories);
            $product->delete();
            
            return response()->json(['message' => 'Product Deleted Succesfully.'], $this->successStatus);
        }
    }
}
