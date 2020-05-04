<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    use Notifiable;
    // yahan pr saray table kay columns kay name detay hay phr validation is ky base pr hoty hay controller mayn..

    protected $table = 'order';
    protected $fillable = [
        'id',
        'order_no',
        'name',
        'company', // is order kay table mayn product id a rahy hay.. product ki id hogy 
        'email',
        'phone',
        'address',
        'address2',
        'country',
        'state',
        'zipcode'
    ];

    public function Product()
    {
        return $this->belongsToMany('App\Product', 'order_products', 'order_id', 'product_id')->withPivot('quantity')
    	->withTimestamps();
    }
}
