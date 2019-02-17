<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable=[
        'email'
    ];

    public function threads(){
        return $this->hasMany(Thread::class);
    }
}
