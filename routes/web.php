<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. HALAMAN PUBLIK (Bebas akses siapapun)
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


// 2. JALAN PINTAS KE LOGIN (Kalau ketik localhost/admin langsung disuruh login)
Route::get('/admin', function () {
    return redirect()->route('admin.dashboard');
});


// 3. AREA KHUSUS ADMIN (WAJIB LOGIN)
Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        return redirect()->route('admin.dashboard');
        })->name('dashboard');
    // Semua yang ada di dalam sini aman dari intipan orang luar
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/team/{id}', [AdminController::class, 'show'])->name('admin.team.show');
    
    // Rute Profile (Bawaan Breeze, opsional)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// 4. RUTE AUTHENTICATION (Login, Register, Logout dari Breeze)
require __DIR__.'/auth.php';