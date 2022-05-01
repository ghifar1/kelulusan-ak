<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['find']]);
    }

    public function find($nisn)
    {
        $student = Student::where('nisn', $nisn)->first();

        return response()->json($student);
    }

    public function index()
    {
        $students = Student::all();

        return response()->json($students);
    }

    public function save(Request $request)
    {

        $student = Student::updateOrCreate([
            'nisn' => $request->nisn
        ], $request->all());

        return response()->json("OK");
    }

    public function delete($id)
    {
        $student = Student::find($id);
        $student->delete();

        return response()->json("OK");
    }

}
