<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    protected $providers = [
        \Prettus\Repository\Providers\RepositoryServiceProvider::class,
        //\Laravel\Passport\PassportServiceProvider::class,
        AuthServiceProvider::class,
        RepositoryServiceProvider::class
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        foreach ($this->providers as $provider) {
            $this->app->register($provider);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
