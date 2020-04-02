<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // yahan pr saray table kay columns kay name detay hay phr validation is ky base pr hoty hay controller mayn..
    protected $fillable = [
        'id',
        'order_title',
        'product_id', // is order kay table mayn product id a rahy hay.. product ki id hogy 
        'quantity',
        'customer_email',
        'customer_phone',
    ];

    public function product()
    {
        return $this->hasMany('App\Product');
    }
}
