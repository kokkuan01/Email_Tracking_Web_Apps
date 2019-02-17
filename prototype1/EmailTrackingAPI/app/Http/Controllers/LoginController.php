<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class LoginController extends Controller
{
    public function login(Request $request){
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json([
                'error' => 404,
                'message' => 'Incorrect Email'
            ], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 400,
                'message' => 'Incorrect Passwod'
            ], 400);
        }
        $_SESSION['user'] = $user;
        
        return response()->json([
            'name'=>$user->name
        ], 200);
    }
}
