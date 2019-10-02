<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Team;
use Faker\Generator as Faker;

$factory->define(Team::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'title' => $faker->jobTitle,
        // 'thumbnail' => $faker->imageUrl($width = 640, $height = 480)
    ];
});