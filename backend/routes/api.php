<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegistrationController;


Route::post('/register', [RegistrationController::class, 'store']);
Route::get('/countries', [RegistrationController::class, 'countries']);
