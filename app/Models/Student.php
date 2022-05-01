<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ["nisn", "nama", "kelamin", "kelas", "status", "deskripsi", "tahun_ajaran"];
}
