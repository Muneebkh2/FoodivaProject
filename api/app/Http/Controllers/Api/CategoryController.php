<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public $successStatus = 200;

    public function getproducts(){
        $products = Category::with('Product')->get();
        return response()->json($products, $this->successStatus);
    }

    public function getAllCategories()
    {
        $category = Category::all();
        return response()->json($category, $this->successStatus);
    }

    public function getCategoryById($id)
    {
        $category = Category::find($id);
        return response()->json($category, $this->successStatus);
    }

    public function getCategoryByNAME($name)
    {
        $category = Category::where('name', $name)->get();
        return response()->json($category, $this->successStatus);
    }

    public function createCategory(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            // 'slug' => 'required',
        ]);

        try {

            $category = new Category();
            $category->name = $request->input('name');
            $category->description = $request->input('description');
            // $category->slug = $request->input('slug');
            $category->slug = $request->input('name');
            $category->save();

            return response()->json(['message' => 'New Category Created.'], $this->successStatus);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Creating failed !'], 409);
        }
    }

    public function updateCategory(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            // 'slug' => 'required',
        ]);

        try {

            $category = Category::find($id);

            if (!$category) {
                return response()->json(['message' => 'Category not found !'], 409);
            } else {
                $category->update([
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    // 'slug' => $request->input('slug'),
                    'slug' => $request->input('name'),
                ]);
                return response()->json(['message' => 'Category Updated Succesfully.'], $this->successStatus);
            }

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Category Updating failed !'], 409);
        }
    }

    public function destroyCategory($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found !'], 409);
        } else {
            $category->delete();
            return response()->json(['message' => 'Category Deleted Succesfully.'], $this->successStatus);
        }
    }
}
