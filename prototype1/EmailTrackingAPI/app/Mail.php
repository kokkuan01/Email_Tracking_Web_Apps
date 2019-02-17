<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mail extends Model
{
    protected $fillable=[
        'mailId','to','from','date'
    ];

    public function thread(){
        return $this->belongsTo(Thread::class, 'thread_id' , 'threadId');
    }
}
