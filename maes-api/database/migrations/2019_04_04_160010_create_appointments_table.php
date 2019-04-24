<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateAppointmentsTable.
 */
class CreateAppointmentsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('appointments', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('barber_id');
            $table->integer('id_user');
            $table->integer('id_service');
            $table->string('status')->default('pending');
            $table->time('time');
            $table->date('date');
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
		Schema::drop('appointments');
	}
}
