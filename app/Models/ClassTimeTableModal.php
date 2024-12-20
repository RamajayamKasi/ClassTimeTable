<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClassTimeTableModal extends Model
{
    use HasFactory;

    protected $table="class_time_table";

    protected $fillable = [
        'ctt_id',
        'user_id',
        'class_name',
        'days',
        'periods',
        'start_time',
        'duration',
        'break',
        'break_data',
        'lunch',
        'lunch_duration',
        'status',
        'created_at',
        'updated_at',
    ];
}
