<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void //ใช้สำหรับสร้างตารางใหม่ในฐานข้อมูล.
    {
        // สร้างตาราง `jobs` สำหรับเก็บข้อมูลงานในคิว
        Schema::create('jobs', function (Blueprint $table) {
            $table->id(); // คอลัมน์ `id` เป็น primary key ของงาน
            $table->string('queue')->index(); // คอลัมน์เก็บชื่อคิว (indexed เพื่อการค้นหาเร็ว)
            $table->longText('payload'); // คอลัมน์เก็บข้อมูล payload ของงาน (ข้อมูลที่จะประมวลผล)
            $table->unsignedTinyInteger('attempts'); // คอลัมน์เก็บจำนวนครั้งที่งานถูกพยายามทำ
            $table->unsignedInteger('reserved_at')->nullable(); // คอลัมน์เก็บเวลาในการจองงาน (อาจเป็น NULL)
            $table->unsignedInteger('available_at'); // คอลัมน์เก็บเวลาเมื่อสามารถใช้งานงานได้
            $table->unsignedInteger('created_at'); // คอลัมน์เก็บเวลาที่งานถูกสร้าง
        });

        // สร้างตาราง `job_batches` สำหรับเก็บข้อมูลชุดงาน (batch jobs)
        Schema::create('job_batches', function (Blueprint $table) {
            $table->string('id')->primary(); // คอลัมน์ `id` เป็น primary key ของชุดงาน
            $table->string('name'); // คอลัมน์เก็บชื่อชุดงาน
            $table->integer('total_jobs'); // คอลัมน์เก็บจำนวนงานทั้งหมดในชุด
            $table->integer('pending_jobs'); // คอลัมน์เก็บจำนวนงานที่รอการประมวลผล
            $table->integer('failed_jobs'); // คอลัมน์เก็บจำนวนงานที่ล้มเหลว
            $table->longText('failed_job_ids'); // คอลัมน์เก็บ IDs ของงานที่ล้มเหลว
            $table->mediumText('options')->nullable(); // คอลัมน์เก็บตัวเลือกเพิ่มเติม (อาจเป็น NULL)
            $table->integer('cancelled_at')->nullable(); // คอลัมน์เก็บเวลาที่ชุดงานถูกยกเลิก (อาจเป็น NULL)
            $table->integer('created_at'); // คอลัมน์เก็บเวลาเมื่อชุดงานถูกสร้าง
            $table->integer('finished_at')->nullable(); // คอลัมน์เก็บเวลาเมื่อชุดงานเสร็จสิ้น (อาจเป็น NULL)
        });

        // สร้างตาราง `failed_jobs` สำหรับเก็บข้อมูลงานที่ล้มเหลว
        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id(); // คอลัมน์ `id` เป็น primary key ของงานที่ล้มเหลว
            $table->string('uuid')->unique(); // คอลัมน์ `uuid` ที่ไม่ซ้ำสำหรับระบุงานที่ล้มเหลว
            $table->text('connection'); // คอลัมน์เก็บข้อมูลการเชื่อมต่อ (เช่น database, queue ฯลฯ)
            $table->text('queue'); // คอลัมน์เก็บชื่อคิวของงานที่ล้มเหลว
            $table->longText('payload'); // คอลัมน์เก็บข้อมูล payload ของงานที่ล้มเหลว
            $table->longText('exception'); // คอลัมน์เก็บข้อมูลข้อผิดพลาดที่เกิดขึ้นในงาน
            $table->timestamp('failed_at')->useCurrent(); // คอลัมน์เก็บเวลาที่งานล้มเหลว (ค่าเริ่มต้นเป็นเวลาปัจจุบัน)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // ลบตารางทั้งหมดหากมีการย้อนกลับการกู้คืน
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
    }
};
