<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/force-clear-cache', function () {
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    return "Cache is cleared! You can delete this route now.";
});
