<?php

use App\Entities\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Service::create([
            'name' => 'Corte de cabello',
            'service_time' => '0:30',
            'price' => '5000'
        ]);

        Service::create([
            'name' => 'Corte de cabello y barba',
            'service_time' => '1:30',
            'price' => '10000'
        ]);

        Service::create([
            'name' => 'Barba',
            'service_time' => '0:30',
            'price' => '7000'
        ]);

        Service::create([
            'name' => 'Marcados',
            'service_time' => '0:30',
            'price' => '5000'
        ]);

        Service::create([
            'name' => 'Dibujos',
            'service_time' => '1:00',
            'price' => '9000'
        ]);

        Service::create([
            'name' => 'Alisseth',
            'service_time' => '2:30',
            'price' => '15000'
        ]);

        Service::create([
            'name' => 'Keratina',
            'service_time' => '2:30',
            'price' => '17000'
        ]);

        Service::create([
            'name' => 'Teñido',
            'service_time' => '2:30',
            'price' => '18000'
        ]);

        Service::create([
            'name' => 'Mascarilla facial',
            'service_time' => '1:00',
            'price' => '10000'
        ]);

        Service::create([
            'name' => 'Cejas',
            'service_time' => '0:45',
            'price' => '8000'
        ]);

        Service::create([
            'name' => 'Lavado de pelo',
            'service_time' => '1:00',
            'price' => '10000'
        ]);

        Service::create([
            'name' => 'Aplancho',
            'service_time' => '0:45',
            'price' => '10000'
        ]);


    }
}
