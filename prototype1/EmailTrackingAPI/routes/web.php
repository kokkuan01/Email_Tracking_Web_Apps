<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/testing','FetchGmailController@index');

Route::get('/oauth2callback.php','FetchGmailController@index');

Route::get('/retrieve','FetchGmailController@handle');