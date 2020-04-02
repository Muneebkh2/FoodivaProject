<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'id',
        'name',
        'slug',
    ];

    // yeh hum relation bnaa rahay haynn...
    public function Product()
    {
        return $this->belongsToMany('App\Product');
    }
}
