<?php

use App\Entities\Barber;
use App\Role;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role1 = Role::create([
           'name' => 'admin',
            'display_name' => 'Administrador'
        ]);

        $role2 = Role::create([
            'name' => 'barber',
            'display_name' => 'Barbero'
        ]);

        $role3 = Role::create([
            'name' => 'client',
            'display_name' => 'Cliente'
        ]);

        $user1 = User::create([
            'user_id' => 111111111,
            'name' => 'Alejandro',
            'last_name' => 'Gonzalez',
            'second_last_name' => 'Poveda',
            'email' => 'alegonpov@gmail.com',
            'telephone_number' => '12341234',
            'password' => Hash::make('admin123'),
            'role_id' => $role1->id
        ]);

        $user2 = User::create([
            'user_id' => 222222222,
            'name' => 'Ricardo',
            'last_name' => 'Madrigal',
            'second_last_name' => 'Herrera',
            'email' => 'rmh@gmail.com',
            'telephone_number' => '23452345',
            'password' => Hash::make('admin123'),
            'role_id' => $role2->id
        ]);

        $user3 = User::create([
            'user_id' => 333333333,
            'name' => 'Andres',
            'last_name' => 'Campos',
            'second_last_name' => 'Prado',
            'email' => 'acp@gmail.com',
            'telephone_number' => '34563456',
            'password' => Hash::make('admin123'),
            'role_id' => $role3->id
        ]);

        $user4 = User::create([
            'user_id' => 44444444,
            'name' => 'Jeffry',
            'last_name' => 'Urbina',
            'second_last_name' => 'Sanchez',
            'email' => 'jus@gmail.com',
            'telephone_number' => '34563456',
            'password' => Hash::make('admin123'),
            'role_id' => $role2->id
        ]);



    }
}
