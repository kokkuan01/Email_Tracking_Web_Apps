<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email',100)->unique();
            $table->string('displayName',100)->nullable();
            $table->string('name',100)->nullable();
            $table->tinyInteger('age')->nullable();
            $table->char('gender',1)->nullable();
            $table->char('race',1)->nullable();
            $table->string('job',100)->nullable();
            $table->char('nationality',1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
