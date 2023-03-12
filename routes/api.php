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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**Recuerda que para acceder a estas rutas tu debes anteponer la palabra api : /api/agenda */

/**Mostrar todos los contactos */
Route::get('/agenda','AgendaController@index')->name('agenda.index');

/**Paginación*/ 
Route::get('/agenda/paginacion','AgendaController@paginate')->name('agenda.paginate');

/**Mostrar un contacto*/
Route::get('/agenda/{id}','AgendaController@show')->name('agenda.show');

/**Buscar un contacto*/
Route::get('/agenda/buscar/{busqueda}','AgendaController@search')->name('agenda.search');

/**Guardar un nuevo contacto*/
Route::post('/agenda','AgendaController@store')->name('agenda.store');

/**Actualizar un contacto*/
Route::put('/agenda/{id}','AgendaController@update')->name('agenda.update');

/**Eliminar un contacto*/
Route::delete('/agenda/{id}','AgendaController@destroy')->name('agenda.destroy');

