<?php

use App\Entities\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Reservation::create([
            'user_id' => 3,
            'product_id' => 2,
            'reservation_quantity' => 3
        ]);

        Reservation::create([
            'user_id' => 3,
            'product_id' => 1,
            'reservation_quantity' => 3
        ]);
    }
}
