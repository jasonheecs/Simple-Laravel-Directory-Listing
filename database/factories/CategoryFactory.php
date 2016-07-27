<?php

$factory->define(App\Category::class, function (Faker\Generator $faker) {
    $name = ucwords($faker->words(1, true));
    return [
        'name' => $name,
        'logo_url' => $faker->imageUrl(200, 45),
        'icon_url' => $faker->imageUrl(45, 45),
        'slug' => convertToSlug($name)
    ];
});