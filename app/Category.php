<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * Get the items belonging to this category
     */
    public function items()
    {
        return $this->hasMany('App\Item');
    }

    public function addItem(Item $item)
    {
        return $this->items()->save($item);
    }

    public function getLastItemOrder()
    {
        return \DB::table('items')->where('category_id', $this->id)->max('order');
    }
}
