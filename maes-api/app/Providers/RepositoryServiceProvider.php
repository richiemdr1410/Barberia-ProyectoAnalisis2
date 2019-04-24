<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    private $models = array(
        'Product',
        'Service',
        'Barber',
        'Order',
        'Schedule',
        'Appointment',
        'User',
        'UploadImage',
        'Reservation',
        'ScheduleByBarber',
        'Carousel'

    );


    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        foreach ($this->models as $model) {
            $this->app->bind("App\Repositories\\{$model}Repository", "App\Repositories\\{$model}Repository".'Eloquent');
        }
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
