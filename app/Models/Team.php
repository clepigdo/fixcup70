<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    // Mengizinkan semua kolom diisi secara massal
    protected $guarded = [];

    // 1 Tim punya banyak Contact
    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    // 1 Tim punya banyak Pemain
    public function players()
    {
        return $this->hasMany(Player::class);
    }

    // 1 Tim punya banyak Official
    public function officials()
    {
        return $this->hasMany(Official::class);
    }

    // 1 Tim punya 1 set Dokumen
    public function document()
    {
        return $this->hasOne(Document::class);
    }

    // 1 Tim punya 1 Bukti Pembayaran
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}