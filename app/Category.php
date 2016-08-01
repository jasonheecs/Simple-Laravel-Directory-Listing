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

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Create a Category slug.
     *
     * @param  string $name
     * @return string
     */
    public function makeSlugFromName($name)
    {
        $slug = str_slug($name);

        $count = Category::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count();

        return $count ? "{$slug}-{$count}" : $slug;
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
