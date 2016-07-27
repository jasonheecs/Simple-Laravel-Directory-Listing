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
}
