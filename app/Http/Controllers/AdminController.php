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
}