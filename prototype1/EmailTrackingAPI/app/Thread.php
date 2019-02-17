<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    protected $fillable=[
        
    ];

    public function mails(){
        return $this->hasMany(Mail::class, 'thread_id', 'threadId');
    }

    public function replies(){
        return $this->hasMany(Reply::class, 'thread_id', 'threadId');
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }

    public function lastMail(){
        return $this->mails()->orderBy('date','desc')->first();
    }
}
