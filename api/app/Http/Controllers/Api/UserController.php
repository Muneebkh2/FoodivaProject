<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use App\User;

class UserController extends Controller
{
    public $successStatus = 200;

    // a method for creating a new User
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        try {

            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $plainPassword = $request->input('password');
            $user->password = app('hash')->make($plainPassword);
            $user->is_admin = 0;
            $user->save();

            return response()->json(['message' => 'User Created'], $this->successStatus);

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Creation failed !'], 409);
        }

    }

    // this method login user
    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {

            $user = Auth::user();
            $user->last_login = Carbon::now();
            $user->save();
            $success['token'] = $user->createToken('AppName')->accessToken;
            return response()->json(['success' => $success, 'user' => $user], $this->successStatus);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    // Update User Method
    public function UpdateUser(Request $request, $id)
    {
        // validator
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);
        
        // var initalized.. 
        $name = $request->input('name');
        $email = $request->input('email');
        $hash_password = $request->input('password');
        $password = app('hash')->make($hash_password);
        
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User Not Found !'], 409);
            } else {
                $user->update([
                    'name' => $name,
                    'email' => $email,
                    'password' => $password,
                ]);
                return response()->json(['message' => 'User Update Succesfully.'], $this->successStatus);
            }

        } catch (\Throwable $th) {
            return response()->json(['message' => 'Error .. updating user not working !'], 409);
        }

    }
}
