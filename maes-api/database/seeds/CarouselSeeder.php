<?php

use App\Entities\Carousel;
use Illuminate\Database\Seeder;

class CarouselSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Carousel::create(
            [
                'name' => 'Imagen 1',
                'description' => 'Promo',
                'image' => 'image1.jpeg'
            ]
        );

        Carousel::create(
            [
                'name' => 'Imagen 2',
                'description' => 'Promo',
                'image' => 'image2.jpeg'
            ]
        );

        Carousel::create(
            [
                'name' => 'Imagen 3',
                'description' => 'Promo',
                'image' => 'image3.jpeg'
            ]
        );

        Carousel::create(
            [
                'name' => 'Imagen 4',
                'description' => 'Promo',
                'image' => 'image4.jpeg'
            ]
        );

        Carousel::create(
            [
                'name' => 'Imagen 5',
                'description' => 'Producto',
                'image' => 'image5.jpeg'
            ]
        );
    }
}
