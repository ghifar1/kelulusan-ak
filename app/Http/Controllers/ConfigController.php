<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => 'index']);
    }
    public function index($name)
    {
        $config = Config::where('nama', $name)->first();

        return response()->json($config);
    }

    public function save(Request $request)
    {
        $config = Config::updateOrCreate(
            ['nama' => $request->nama],
            [
                'nama' => $request->nama,
                'tanggal' => $request->tanggal,
            ]
        );
    }
}
