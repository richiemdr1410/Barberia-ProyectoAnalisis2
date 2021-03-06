<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateBarbersTable.
 */
class CreateBarbersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('barbers', function(Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('last_name');
            $table->string('second_last_name');
            $table->string('email')->unique();
            $table->string('telephone_number');
            $table->string('password');
            $table->integer('role_id');
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
		Schema::drop('barbers');
	}
}
