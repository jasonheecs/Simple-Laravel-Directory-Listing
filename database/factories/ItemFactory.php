<?php

$factory->define(App\Item::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->sentence(5, true),
        'link' => $faker->url(),
        'description' => $faker->text(150),
        'version' => 0
    ];
});