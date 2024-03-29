<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        //'email' => $faker->unique()->safeEmail,
        'email' => $faker->safeEmail,
        'phone' => $faker->phoneNumber,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMiYe4oKoEa3Ro9llC', // password
        'remember_token' => Str::random(10),
    ];
});
