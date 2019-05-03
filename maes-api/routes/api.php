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

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login')->middleware('cors');;
    Route::post('signup', 'AuthController@signUp')->middleware('cors');;

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout')->middleware('cors');;
        Route::get('user', 'AuthController@user')->middleware('cors');;
    });
});

Route::resource('product', 'ProductsController');
Route::get('storage', 'ProductsController@getStorage');
Route::put('storage/increase/{id}', 'ProductsController@increaseStorage');

Route::resource('service', 'ServicesController');
Route::resource('schedule', 'SchedulesController');
Route::get('clients', 'UsersController@getClients');
Route::get('barbers', 'UsersController@getBarbers');
Route::get('admins', 'UsersController@getAdministrators');
Route::resource('users', 'UsersController');
Route::resource('reservations', 'ReservationsController');
Route::resource('carousel', 'CarouselsController');
Route::resource('carousel/home', 'CarouselsController@getCarousel');

Route::post('image/upload', 'UploadImagesController@saveFile');

Route::get('reservation/user', 'ReservationsController@getReservationByUser');

Route::delete('appointment/{id}', 'AppointmentsController@deleteAppointment');
Route::put('appointment/{id}', 'AppointmentsController@updateAppointment');
Route::post('add/appointment', 'AppointmentsController@getAppointment');
Route::get('check/appointment', 'AppointmentsController@checkAvailable');
Route::get('appointment/client', 'AppointmentsController@listAppointmentByUser');
Route::get('appointment/barber', 'AppointmentsController@listAppointmentByBarber');

Route::get('image/{type}/{name}', 'ImagesController@picture');

Route::put('deliver/reservation/{id}', 'ReservationsController@deliver');




