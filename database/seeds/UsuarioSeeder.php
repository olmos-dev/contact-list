<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Alberto',
            'phone' => '2281467334',
            'email' => 'alberto@mail.com',
            'password' => Hash::make(123)
        ]);
    }
}