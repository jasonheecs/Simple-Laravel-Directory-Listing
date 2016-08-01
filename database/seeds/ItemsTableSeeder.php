<?php

use Illuminate\Database\Seeder;
use App\Category;
use App\Item;

class ItemsTableSeeder extends Seeder
{
    private $categories = ['Wordpress', 'Prestashop', 'Joomla', 'Magento'];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Item::truncate();
        Category::truncate();

        factory(Category::class, 4)
            ->create()
            ->each(function($category, $key) {
                $category->name = $this->categories[$key];
                $category->slug = convertToSlug($this->categories[$key]);
                $category->save();
                $category->items()->saveMany(
                    factory(Item::class, 12)
                    ->make()
                    ->each(function($item, $order) {
                        $item->order = $order + 1;
                    })
                );
            });
    }
}
