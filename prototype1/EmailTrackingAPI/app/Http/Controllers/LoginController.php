<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Illuminate\Support\Facades\Auth; 
use Validator;
use DB;

class LoginController extends Controller
{
    public function login(Request $request){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user();
            DB::DELETE('DELETE FROM oauth_access_tokens WHERE user_id=' . $user->id);
            $success['token'] =  $user->createToken('MyApp')-> accessToken; 
            return response()->json([
                'success' => $success,
                'name' => $user->name,
                'role' => $user->role,
                'id' => $user->id
            ], 200); 
        } 
        else{ 
            return response()->json([
                'error'=>404
            ], 404); 
        } 
    }
}
