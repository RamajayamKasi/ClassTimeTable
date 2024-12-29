<?php

use App\Http\Controllers\ClassTimeTableController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/time_table', function () {
    return view('time_table');
})->middleware(['auth', 'verified'])->name('time_table');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Store the class time table
    Route::post('/store_class_time_table', [ClassTimeTableController::class, 'store_class_time_table'])->name('store_class_time_table');

    // Get the class time table
    Route::post('/get_class_time_table', [ClassTimeTableController::class, 'get_class_time_table'])->name('get_class_time_table');

    // Delete the class time table
    Route::post('/delete_class_time_table', [ClassTimeTableController::class, 'delete_class_time_table'])->name('delete_class_time_table');

    // Restore the class time table
    Route::post('/restore_class_time_table', [ClassTimeTableController::class, 'restore_class_time_table'])->name('restore_class_time_table');

    // Restore the class time table
    Route::post('/save_subject_teacher', [ClassTimeTableController::class, 'save_subject_teacher'])->name('save_subject_teacher');
});

require __DIR__ . '/auth.php';
