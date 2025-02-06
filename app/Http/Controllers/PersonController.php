<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
class PersonController extends Controller
{
    public function index()
    {
        // Return all people as JSON (API)
        return response()->json(Person::all());
    }

    public function create() 
{
    return Inertia::render('Persons/PersonCreate'); 
}
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'height' => 'required|integer|min:0',
            'weight' => 'required|integer|min:0',
            'zodiac' => 'required|string',
            'status' => 'required|in:โสด,ไม่โสด',
        ]);

        Person::create($request->all());

        return response()->json(['message' => 'ข้อมูลถูกบันทึกเรียบร้อยแล้ว'], 201);
    }
}
