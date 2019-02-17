<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->char('role');
            $table->rememberToken();
            $table->timestamps();
        });

        $date = new DateTime();
        $date->setTimestamp(time());
        $date->setTimezone(new DateTimeZone('Asia/Kuala_Lumpur'));

        DB::table('users')->insert(
            array(
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt("123456"),
                'role' => '2',
                'created_at'=> $date,
                'updated_at'=> $date
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
