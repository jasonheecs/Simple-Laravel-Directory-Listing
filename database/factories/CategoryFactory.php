<?php

$factory->define(App\Category::class, function (Faker\Generator $faker) {
    return [
        'name' => ucwords($faker->words(1, true)),
        'logo_url' => $faker->imageUrl(200, 45),
        'icon_url' => $faker->imageUrl(45, 45),
    ];
});