<?php

$factory->define(App\Item::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->sentence(10, true),
        'link' => $faker->imageUrl(200, 45),
        'description' => $faker->text(100),
        'version' => 0
    ];
});