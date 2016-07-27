<?php

use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Category::class, 4)
            ->create()
            ->each(function($category) {
                $category->items()->saveMany(factory(App\Item::class, 12)->make());
            });
    }
}
