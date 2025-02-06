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
            'chromosome' => 'required|in:XX,XY',  // ตรวจสอบค่าโครโมโซม
        ]);

        Person::create($request->all());

        return response()->json(['message' => 'ข้อมูลถูกบันทึกเรียบร้อยแล้ว'], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'height' => 'required|integer|min:0',
            'weight' => 'required|integer|min:0',
            'zodiac' => 'required|string',
            'status' => 'required|in:โสด,ไม่โสด',
            'chromosome' => 'required|in:XX,XY',  // ตรวจสอบค่าโครโมโซม
        ]);

        $person = Person::findOrFail($id);
        $person->update($request->all());

        return response()->json(['message' => 'ข้อมูลถูกอัปเดตเรียบร้อยแล้ว'], 200);
    }

    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->delete();

        return response()->json(['message' => 'ข้อมูลถูกลบเรียบร้อยแล้ว'], 200);
    }
}
