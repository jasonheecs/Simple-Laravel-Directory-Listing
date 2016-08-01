<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Category;
use App\Item;

class CategoryTest extends TestCase
{
    use WithoutMiddleware;

    /**
     * Grab the category instance of the page, 
     * compare the number of items it has vs the number of items the same Category instance from the database has
     * @return [type] [description]
     */
    public function testCategoriesIndex()
    {
        $categories = Category::all();
        foreach ($categories as $category) {
           $response = $this->call('GET', "/category/$category->slug");

           $content = $response->getOriginalContent();
           $content = $content->getData();
           $contentCategory = $content['category'];
           $contentCategory->load('items');

           $this->assertEquals(count($category->items), count($contentCategory->items));
        }
    }
}
