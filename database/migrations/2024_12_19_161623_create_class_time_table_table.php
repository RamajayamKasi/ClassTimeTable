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
            $table->id('ctt_id');
            $table->integer('user_id');
            $table->string('class_name');
            $table->bigInteger('days')->default(0);
            $table->bigInteger('periods')->default(0);
            $table->time('start_time');
            $table->bigInteger('duration')->default(0);
            $table->bigInteger('break')->default(0);
            $table->text('break_data')->default('');
            $table->enum('lunch',['yes','no'])->default('no');
            $table->bigInteger('lunch_after_period')->default(0);
            $table->bigInteger('lunch_duration')->default(0);
            $table->longText('subject_teacher_name')->default('');
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
