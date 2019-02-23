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
Route::get('checkLogin',function(){
    return response()->json([
        "message"=>"Logon"
    ],200);
})->middleware('auth:api');
Route::post('resetPassword','AccountController@resetPassword')->middleware('auth:api');

Route::get('validateAccount/{acc}','AccountController@validateId')->middleware('auth:api');

Route::get('users', 'AccountController@index')->middleware('auth:api');
Route::post('users/create', 'AccountController@store')->middleware('auth:api');
Route::delete('users/{user}', 'AccountController@destroy')->middleware('auth:api');
Route::put('users/{user}', 'AccountController@update')->middleware('auth:api');

Route::get('inbox', 'InboxController@index')->middleware('auth:api');
Route::get('checkClient/{thread}', 'InboxController@checkClient')->middleware('auth:api');
Route::post('addClientInfo/{client}', 'InboxController@updateClient')->middleware('auth:api');
Route::get('/getThread/{thread}', 'InboxController@getThreadDetail')->middleware('auth:api');
Route::post('/addComment','InboxController@addComment')->middleware('auth:api');
Route::get('/unlockForUnDone/{id}','InboxController@unlock')->middleware('auth:api');
Route::get('/getThreadStatistic/{id}','InboxController@getStatistic')->middleware('auth:api');

Route::get('/getGeneralData','ReportController@index')->middleware('auth:api');
Route::get('/getVolunteerData','ReportController@getVolunteerData')->middleware('auth:api');
Route::get('/getClientData','ReportController@getClientData')->middleware('auth:api');
Route::get('/getEmailData','ReportController@getEmailData')->middleware('auth:api');