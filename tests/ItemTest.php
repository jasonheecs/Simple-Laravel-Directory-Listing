<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Category;
use App\Item;

class ItemTest extends TestCase
{
    use DatabaseTransactions;
    use WithoutMiddleware;

    public function testCreate()
    {
        $category = factory(Category::class)->create();
        $item = factory(Item::class)->make();

        $this->json('POST', '/item', 
                    ['name' => $item->name,
                    'url' => $item->link,
                    'description' => $item->description,
                    'categoryId' => $category->id
                    ])
            ->seeJsonEquals([
                'response' => 'Item Added',
            ])
            ->seeInDatabase('items', [
                'name' => $item->name,
                'link' => $item->link,
                'description' => $item->description
            ]);
    }

    public function testDelete()
    {
        $category = factory(Category::class)->create();
        $item = factory(Item::class)->make();
        $category->addItem($item);

        $this->json('DELETE', '/item/' . $item->id)
            ->seeJsonEquals([
                'response' => 'Item Deleted',
            ]);
    }
}
