<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'id',
        'name',
        'sku',
    ];

    // haan abhy call nhn karwaya likh diya function dono main elk dosray ka..
    // call ham controller mayn karwayengay jab zaroorat paray gy... 
    // insert karty waqt or get kartay waqt ..
    public function Category()
    {
        return $this->belongsToMany('App\Category');
    }

    public function Order()
    {
        return $this->hasOne('App\Order');
    }
}
