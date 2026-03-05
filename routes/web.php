<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RegistrationController;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

Route::get('/pendaftaran/sma', function () {
    return Inertia::render('FormPendaftaranSMA'); 
})->name('pendaftaran.sma');

Route::get('/pendaftaran/mahasiswa', function () {
    return Inertia::render('FormPendaftaranMahasiswa'); 
})->name('pendaftaran.mahasiswa');

Route::post('/register-team', [RegistrationController::class, 'store'])->name('registration.store');

require __DIR__.'/auth.php';