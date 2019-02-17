<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'LoginController@login');
Route::get('users', 'AccountController@index');
Route::post('users/create', 'AccountController@store');
Route::delete('users/{user}', 'AccountController@destroy');
Route::put('users/{user}', 'AccountController@update');

Route::get('inbox', 'InboxController@index');
Route::get('checkClient/{thread}', 'InboxController@checkClient');
Route::post('addClientInfo/{client}', 'InboxController@updateClient');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
