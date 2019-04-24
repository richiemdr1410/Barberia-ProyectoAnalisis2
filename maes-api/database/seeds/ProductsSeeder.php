<?php

use App\Entities\Product;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'name' => 'Producto A',
            'price' => '5000',
            'quantity' => 10,
            'image' => 'productA.png'
        ]);

        Product::create([
            'name' => 'Producto B',
            'price' => '5000',
            'quantity' => 4,
            'image' => 'productB.png'
        ]);

        Product::create([
            'name' => 'Producto C',
            'price' => '5000',
            'quantity' => 6,
            'image' => 'productC.png'
        ]);

        Product::create([
            'name' => 'Producto D',
            'price' => '5000',
            'quantity' => 3,
            'image' => 'productD.png'
        ]);

        Product::create([
            'name' => 'Producto E',
            'price' => '5000',
            'quantity' => 15,
            'image' => 'productE.png'
        ]);
    }
}
