<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('class_time_table', function (Blueprint $table) {
            $table->id();
            $table->integer('ctt_id');
            $table->string('class_name');
            $table->bigInteger('days');
            $table->bigInteger('periods');
            $table->time('start_time');
            $table->bigInteger('duration');
            $table->enum('break',['yes','no'])->default('no');
            $table->text('break_data');
            $table->enum('lunch',['yes','no'])->default('no');
            $table->bigInteger('lunch_duration');
            $table->enum('status',['active','inactive'])->default('active');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_time_table');
    }
};
