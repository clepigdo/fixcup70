<?php

namespace App\Models; 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        // Gunakan Database Transaction agar jika satu gagal, semua batal (Data tetap bersih)
        DB::beginTransaction();

        try {
            // 1. Simpan Data Tim & Upload Logo
            $teamData = [
                'nama' => $request->nama,
                'kategori' => $request->kategori ?? 'SMA',
            ];
            
            if ($request->hasFile('logo')) {
                $teamData['logo'] = $request->file('logo')->store('logos', 'public');
            }

            $team = Team::create($teamData);

            // 2. Simpan Contacts (Captain, Official, Capo)
            if ($request->has('contacts')) {
                foreach ($request->contacts as $role => $contact) {
                    // Hanya simpan jika namanya diisi
                    if (!empty($contact['nama'])) {
                        $team->contacts()->create([
                            'role' => $role, // 'captain', 'official', 'capo'
                            'nama' => $contact['nama'],
                            'no_wa' => $contact['no_wa']
                        ]);
                    }
                }
            }

            // 3. Simpan Players (KUNCI PERBAIKAN: Hanya simpan yang namanya tidak kosong)
            if ($request->has('players')) {
                foreach ($request->players as $index => $player) {
                    // Cek apakah nama pemain diisi
                    if (!empty($player['nama'])) {
                        $playerData = [
                            'nama' => $player['nama'],
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

            // 4. Simpan Officials (Hanya simpan yang namanya tidak kosong)
            if ($request->has('officials')) {
                foreach ($request->officials as $index => $official) {
                    if (!empty($official['nama'])) {
                        $officialData = [
                            'nama' => $official['nama'],
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

            // 5. Simpan Dokumen Tim
            if ($request->has('documents')) {
                $docFiles = [];
                $fields = [
                    'foto_tim_berjersey', 'foto_jersey_pemain', 'foto_jersey_kiper', 
                    'surat_rekomendasi', 'foto_player_satu', 'foto_player_dua', 'foto_player_tiga'
                ];
                
                foreach ($fields as $field) {
                    if ($request->hasFile("documents.$field")) {
                        $docFiles[$field] = $request->file("documents.$field")->store('documents', 'public');
                    }
                }
                $team->document()->create($docFiles);
            }

            // 6. Simpan Pembayaran
            if ($request->hasFile('payment.bukti_pembayaran')) {
                $team->payment()->create([
                    'bukti_pembayaran' => $request->file('payment.bukti_pembayaran')->store('payments', 'public')
                ]);
            }

            DB::commit();

            // KUNCI PERBAIKAN INERTIA: Gunakan redirect()->back() bukan response()->json()
            return redirect()->back()->with('success', 'Pendaftaran Tim Berhasil!');

        } catch (\Exception $e) {
            DB::rollBack();
            // Kembalikan error ke halaman agar ditangkap oleh Inertia
            return redirect()->back()->withErrors(['message' => 'Gagal mendaftar: ' . $e->getMessage()]);
        }
    }
}