<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function index(){
        return User::all();
    }

    public function store(Request $request)
    {
        $sameEmail = User::where('email',$request->email)->first();
        if($sameEmail){
            return response()->json([
                'error'=>400,
                'message'=>"The email address had been used"
            ],400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role
        ]);

        return response()->json([
            'created_at' => $user->created_at,
        ], 201);

    }

    public function validateId($id){
        $user = User::find($id);

        if(!$user) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        return response()->json([
            'message'=>'Logon',
        ],200);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        
        if(!$user) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        $user->name = $request->name;
        $user->role = $request->role;

        $user->save();

        return response()->json(null,204);
    }

    public function destroy(Request $request, $id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json([
                'id'=>$id,
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'users'=>User::all(),
            'message'=>"Delete Successfully"
        ],200);
    }

    public function resetPassword(Request $request){
        $user = User::find($request->id);

        if(!$user) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }
        
        if(!Hash::check($request->oldPassword,$user->password)){
            return response()->json([
                'error' => 400,
                'message' => 'Wrong Password'
            ], 400);
        }

        $user->password = bcrypt($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'success'
        ], 200);
    }
}
