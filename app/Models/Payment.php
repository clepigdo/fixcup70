<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Bukti bayar ini milik Tim siapa?
    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}