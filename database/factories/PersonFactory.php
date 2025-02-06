<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PersonFactory extends Factory
{
    protected $model = \App\Models\Person::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'age' => $this->faker->numberBetween(18, 60),
            'height' => $this->faker->numberBetween(150, 200),
            'weight' => $this->faker->numberBetween(50, 100),
            'zodiac' => $this->faker->randomElement(['เมษ', 'พฤษภ', 'เมถุน', 'กรกฎ', 'สิงห์', 'กันย์', 'ตุล', 'พิจิก', 'ธนู', 'มังกร', 'กุมภ์', 'มีน']),
            'status' => $this->faker->randomElement(['โสด', 'ไม่โสด']),
            'chromosome' => $this->faker->randomElement(['XX', 'XY']), // เพิ่มโครโมโซม
        ];
    }
}

