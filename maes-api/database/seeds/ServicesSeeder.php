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
            'price' => '5000',
            'image' => 'service1.jpg'
        ]);

        Service::create([
            'name' => 'Corte de cabello y barba',
            'service_time' => '1:30',
            'price' => '10000',
            'image' => 'service2.jpg'
        ]);

        Service::create([
            'name' => 'Barba',
            'service_time' => '0:30',
            'price' => '7000',
            'image' => 'service3.jpg'
        ]);

        Service::create([
            'name' => 'Marcados',
            'service_time' => '0:30',
            'price' => '5000',
            'image' => 'service4.jpg'
        ]);

        Service::create([
            'name' => 'Dibujos',
            'service_time' => '1:00',
            'price' => '9000',
            'image' => 'service5.jpg'
        ]);

        Service::create([
            'name' => 'Alisseth',
            'service_time' => '2:30',
            'price' => '15000',
            'image' => 'service6.jpg'
        ]);

        Service::create([
            'name' => 'Keratina',
            'service_time' => '2:30',
            'price' => '17000',
            'image' => 'service7.jpg'
        ]);

        Service::create([
            'name' => 'Teñido',
            'service_time' => '2:30',
            'price' => '18000',
            'image' => 'service8.jpg'
        ]);

        Service::create([
            'name' => 'Mascarilla facial',
            'service_time' => '1:00',
            'price' => '10000',
            'image' => 'service9.jpg'
        ]);

        Service::create([
            'name' => 'Cejas',
            'service_time' => '0:45',
            'price' => '8000',
            'image' => 'service10.jpg'
        ]);

        Service::create([
            'name' => 'Lavado de pelo',
            'service_time' => '1:00',
            'price' => '10000',
            'image' => 'service11.jpg'
        ]);

        Service::create([
            'name' => 'Aplancho',
            'service_time' => '0:45',
            'price' => '10000',
            'image' => 'service12.jpg'
        ]);


    }
}
