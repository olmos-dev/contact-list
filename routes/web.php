<?php

use Illuminate\Support\Facades\Route;

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

/**Rutas de autenticación*/
Auth::routes();

/**Ruta principal de la apliación - se define una ruta dinámica*/
Route::get('/{parameter?}','InicioController')->name('inicio.index');





