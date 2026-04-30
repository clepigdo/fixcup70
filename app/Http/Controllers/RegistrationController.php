<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $aturanAman = 'nullable|file|mimes:jpeg,webp,png,jpg,pdf,doc,docx,xls,xlsx,zip,rar|max:500';

        $request->validate([
            // Identitas Tim
            'logo'                        => $aturanAman,

            // Data Pemain
            'players.*.pas_foto'          => $aturanAman,
            'players.*.foto_kartu'        => $aturanAman,

            // Data Official
            'officials.*.pas_foto'        => $aturanAman,
            'officials.*.foto_ktp'        => $aturanAman,

            // Dokumen Tim & Promosi
            'documents.foto_tim_berjersey'=> $aturanAman,
            'documents.foto_jersey_pemain'=> $aturanAman,
            'documents.foto_jersey_kiper' => $aturanAman,
            'documents.surat_rekomendasi' => $aturanAman,
            'documents.foto_player_satu'  => $aturanAman,
            'documents.foto_player_dua'   => $aturanAman,

            // Bukti Pembayaran
            'payment.bukti_pembayaran'    => $aturanAman,
        ], [
            // Pesan Error Custom (Biar user paham salahnya di mana)
            'max'   => 'Gagal! Ada file unggahan yang ukurannya melebihi batas 500 KB. Silakan kompres file Anda terlebih dahulu.',
            'mimes' => 'Format file ditolak! Harap upload file dengan format yang diizinkan (JPEG, JPG, PDF).',
            'file'  => 'Terjadi kesalahan sistem. Pastikan data yang diupload benar-benar sebuah file.',
        ]);

        DB::beginTransaction();

        try {
            // 1. Simpan Data Tim
            $teamData = [
                'nama' => $request->nama,
                'kategori' => $request->kategori ?? 'SMA',
                'logo' => '' // <-- Beri default string kosong
            ];
            
            if ($request->hasFile('logo')) {
                $teamData['logo'] = $request->file('logo')->store('logos', 'public');
            }
            $team = Team::create($teamData);

            // 2. Simpan Contacts
            if ($request->has('contacts')) {
                foreach ($request->contacts as $role => $contact) {
                    if (!empty($contact['nama'])) {
                        $team->contacts()->create([
                            'role' => $role, // 'captain', 'official', 'capo'
                            'nama' => $contact['nama'],
                            'no_wa' => $contact['no_wa'] ?? '' // Default kosong jika tidak diisi
                        ]);
                    }
                }
            }

            // 3. Simpan Players
            if ($request->has('players')) {
                foreach ($request->players as $index => $player) {
                    if (!empty($player['nama'])) {
                        $playerData = [
                            'nama' => $player['nama'],
                            'pas_foto' => '',   // Default kosong
                            'foto_kartu' => ''  // Default kosong
                        ];

                        if ($request->hasFile("players.$index.pas_foto")) {
                            $playerData['pas_foto'] = $request->file("players.$index.pas_foto")->store('players/pas_foto', 'public');
                        }
                        if ($request->hasFile("players.$index.foto_kartu")) {
                            $playerData['foto_kartu'] = $request->file("players.$index.foto_kartu")->store('players/kartu', 'public');
                        }

                        $team->players()->create($playerData);
                    }
                }
            }

            // 4. Simpan Officials
            if ($request->has('officials')) {
                foreach ($request->officials as $index => $official) {
                    if (!empty($official['nama'])) {
                        $officialData = [
                            'nama' => $official['nama'],
                            'pas_foto' => '', // Default kosong
                            'foto_ktp' => ''  // Default kosong
                        ];

                        if ($request->hasFile("officials.$index.pas_foto")) {
                            $officialData['pas_foto'] = $request->file("officials.$index.pas_foto")->store('officials/pas_foto', 'public');
                        }
                        if ($request->hasFile("officials.$index.foto_ktp")) {
                            $officialData['foto_ktp'] = $request->file("officials.$index.foto_ktp")->store('officials/ktp', 'public');
                        }

                        $team->officials()->create($officialData);
                    }
                }
            }

            // 5. Simpan Dokumen Tim (KUNCI PERBAIKAN ERROR 1364 ADA DI SINI)
            $docFiles = [
                'foto_tim_berjersey' => '',
                'foto_jersey_pemain' => '',
                'foto_jersey_kiper' => '',
                'surat_rekomendasi' => '',
                'foto_player_satu' => '',
                'foto_player_dua' => ''
                // 'foto_player_tiga' => ''
            ]; // <-- Set semua default jadi string kosong agar MySQL puas
            
            if ($request->has('documents')) {
                $fields = array_keys($docFiles);
                foreach ($fields as $field) {
                    if ($request->hasFile("documents.$field")) {
                        $docFiles[$field] = $request->file("documents.$field")->store('documents', 'public');
                    }
                }
            }
            $team->document()->create($docFiles);

            // 6. Simpan Pembayaran
            $paymentData = ['bukti_pembayaran' => '']; // Default kosong
            if ($request->hasFile('payment.bukti_pembayaran')) {
                $paymentData['bukti_pembayaran'] = $request->file('payment.bukti_pembayaran')->store('payments', 'public');
            }
            $team->payment()->create($paymentData);

            DB::commit();

            return redirect()->back()->with('success', 'Pendaftaran Tim Berhasil!');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['message' => 'System Error: ' . $e->getMessage()]);
        }
    }
}