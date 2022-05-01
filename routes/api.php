<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('students', [\App\Http\Controllers\StudentController::class, 'index']);
Route::get('students/{nisn}', [\App\Http\Controllers\StudentController::class, 'find']);
Route::post('students', [\App\Http\Controllers\StudentController::class, 'save']);
Route::delete('students/{id}', [\App\Http\Controllers\StudentController::class, 'delete']);

Route::get('config/{name}', [\App\Http\Controllers\ConfigController::class, 'index']);
Route::post('config', [\App\Http\Controllers\ConfigController::class, 'save']);

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

Route::get('/regg', [\App\Http\Controllers\AuthController::class, 'register']);
