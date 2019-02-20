<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGlobalVariablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('global_variables', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('value')->nullable();
            $table->timestamps();
        });

        $date = new DateTime();
        
        DB::table('global_variables')->insert(
            array(
                'name' => 'refreshToken',
                'value' => null,
                'created_at'=> $date,
                'updated_at'=> $date
            )
        );

        DB::table('global_variables')->insert(
            array(
                'name' => 'last_update_time',
                'value' => null,
                'created_at'=> $date,
                'updated_at'=> $date
            )
        );

        DB::table('global_variables')->insert(
            array(
                'name' => 'current_email',
                'value' => null,
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
        Schema::dropIfExists('global_variables');
    }
}
