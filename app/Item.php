<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /**
     * Get the category record associated with the item
     */
    public function category()
    {
        return $this->belongsTo('App\Category');
    }
}
