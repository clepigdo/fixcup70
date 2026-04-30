<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        // Mengambil semua data tim beserta relasi kontak dan pembayarannya
        // Diurutkan dari yang paling baru mendaftar (latest)
        $teams = Team::with(['contacts', 'payment'])->latest()->get();

        return Inertia::render('Admin/DashboardAdmin', [
            'teams' => $teams
        ]);
    }

    public function show($id)
    {
        // Panggil data tim beserta SEMUA relasinya
        $team = \App\Models\Team::with(['contacts', 'players', 'officials', 'document', 'payment'])->findOrFail($id);

        return Inertia::render('Admin/DetailAdmin', [
            'team' => $team
        ]);
    }
    // Tambahkan ini di dalam AdminController.php
    public function destroy($id)
    {
        $team = \App\Models\Team::findOrFail($id);
        
        // Hapus tim dari database
        $team->delete();

        // Kembali ke halaman dashboard admin
        return redirect()->route('admin.dashboard');
    }
}