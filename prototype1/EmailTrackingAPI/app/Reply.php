<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable=[

    ];

    public function thread(){
        return $this->belongsTo(Thread::class, 'thread_id' , 'threadId');
    }
    
    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
