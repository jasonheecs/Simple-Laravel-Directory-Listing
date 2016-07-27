<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')
                    ->comment('Name of the directory item');

            $table->string('link')
                    ->comment('URL link of the directory item');

            $table->text('description');

            $table->integer('order')
                    ->unsigned()
                    ->default(0);

            $table->smallInteger('version')
                    ->unsigned()
                    ->default(0)
                    ->comment('Current version number of the item. Used to manage concurrency');

            $table->timestamp('checked_out')
                    ->nullable()
                    ->comment('Last time a user checked out this item for editing. Used to manage concurrency');

            $table->timestamp('checked_in')
                    ->nullable()
                    ->comment('Last time a user checked in this item after editing. Used to manage concurrency');

            $table->integer('category_id')
                    ->unsigned()
                    ->index();
            $table->foreign('category_id')
                    ->references('id')->on('categories')
                    ->onDelete('cascade');

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
        Schema::drop('items');
    }
}
