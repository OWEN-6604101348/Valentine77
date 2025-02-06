import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const PersonCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    zodiac: '',
    status: '',
    chromosome: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoses, setShowRoses] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // ตรวจสอบว่าแต่ละฟิลด์มีข้อมูลครบหรือไม่
    if (!formData.name) {
      newErrors.name = ['กรุณากรอกชื่อ'];
    } else if (formData.name.length > 40) {
      newErrors.name = ['ชื่อไม่ควรเกิน 40 ตัวอักษร'];
    }
    if (!formData.age) {
      newErrors.age = ['กรุณากรอกอายุ'];
    } else if (formData.age < 18 || formData.age > 100) {
      newErrors.age = ['อายุต้องอยู่ระหว่าง 18 - 100 ปี'];
    }
    if (!formData.height) {
      newErrors.height = ['กรุณากรอกส่วนสูง'];
    } else if (formData.height > 200) {
      newErrors.height = ['ส่วนสูงต้องไม่เกิน 200 ซม.'];
    }
    if (!formData.weight) {
      newErrors.weight = ['กรุณากรอกน้ำหนัก'];
    } else if (formData.weight > 200) {
      newErrors.weight = ['น้ำหนักต้องไม่เกิน 200 กก.'];
    }
    if (!formData.zodiac) {
      newErrors.zodiac = ['กรุณาเลือกราศี'];
    }
    if (!formData.status) {
      newErrors.status = ['กรุณาเลือกสถานะ'];
    }
    if (!formData.chromosome) {
      newErrors.chromosome = ['กรุณาเลือกโครโมโซม'];
    }

    // ถ้ามีข้อผิดพลาด ให้ไม่ส่งข้อมูลไป
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage('กรุณาตรวจสอบข้อมูลที่กรอก');
      setLoading(false);
      return;
    }

    setLoading(true);
    setShowRoses(true); // Trigger the falling roses animation

    Inertia.post('/api/persons', formData, {
      onSuccess: () => {
        setMessage('ข้อมูลถูกบันทึกเรียบร้อยแล้ว');
        setFormData({
          name: '',
          age: '',
          height: '',
          weight: '',
          zodiac: '',
          status: '',
          chromosome: '',
        }); // Reset the form
        setErrors({});
      },
      onError: (err) => {
        setErrors(err);
        setMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      },
      finally: () => setLoading(false),
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-pink-50 rounded-lg shadow-lg mt-10 relative">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-4">สร้างบุคคลใหม่</h1>

      {message && <p className="text-green-500 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-pink-600">ชื่อ</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border ${errors.name ? 'border-red-500' : 'border-pink-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>

        {/* Chromosome Select */}
        <div>
          <label htmlFor="chromosome" className="block text-pink-600">โครโมโซม</label>
          <select
            id="chromosome"
            name="chromosome"
            value={formData.chromosome}
            onChange={handleChange}
            className={`w-full border ${errors.chromosome ? 'border-red-500' : 'border-pink-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="">เลือกโครโมโซม</option>
            <option value="XX">XX</option>
            <option value="XY">XY</option>
          </select>
          {errors.chromosome && <p className="text-red-500">{errors.chromosome[0]}</p>}
        </div>

        {/* Age Input */}
        <div>
          <label htmlFor="age" className="block text-pink-600">อายุ</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full border ${errors.age ? 'border-red-500' : 'border-pink-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
          {errors.age && <p className="text-red-500">{errors.age[0]}</p>}
        </div>

        {/* Height Input */}
        <div>
          <label htmlFor="height" className="block text-pink-600">ส่วนสูง (ซม.)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className={`w-full border ${errors.height ? 'border-red-500' : 'border-pink-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
          {errors.height && <p className="text-red-500">{errors.height[0]}</p>}
        </div>

        {/* Weight Input */}
        <div>
          <label htmlFor="weight" className="block text-pink-600">น้ำหนัก (กก.)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={`w-full border ${errors.weight ? 'border-red-500' : 'border-pink-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
          {errors.weight && <p className="text-red-500">{errors.weight[0]}</p>}
        </div>

        {/* Zodiac Select */}
        <div>
          <label htmlFor="zodiac" className="block text-pink-600">ราศี</label>
          <select
            id="zodiac"
            name="zodiac"
            value={formData.zodiac}
            onChange={handleChange}
            className={`w-full border ${errors.zodiac ? 'border-red-500' : 'border-pink-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="">เลือก ราศี</option>
            <option value="เมษ">เมษ</option>
            <option value="พฤษภ">พฤษภ</option>
            <option value="มิถุน">มิถุน</option>
            <option value="กรกฎ">กรกฎ</option>
            <option value="สิงห์">สิงห์</option>
            <option value="กันย์">กันย์</option>
            <option value="ตุลย์">ตุลย์</option>
            <option value="พิจิก">พิจิก</option>
            <option value="ธนู">ธนู</option>
            <option value="มังกร">มังกร</option>
            <option value="กุมภ์">กุมภ์</option>
            <option value="มีน">มีน</option>
          </select>
          {errors.zodiac && <p className="text-red-500">{errors.zodiac[0]}</p>}
        </div>

        {/* Status Select */}
        <div>
          <label htmlFor="status" className="block text-pink-600">สถานะ</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`w-full border ${errors.status ? 'border-red-500' : 'border-pink-300'} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="">เลือกสถานะ</option>
            <option value="โสด">โสด</option>
            <option value="ไม่โสด">ไม่โสด</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status[0]}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
        </div>
      </form>

      {/* Falling Rose Effect */}
      {showRoses && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="rose w-12 h-12 bg-cover bg-center bg-no-repeat animate-fall" style={{ backgroundImage: 'url(/path/to/rose-image.png)' }}></div>
        </div>
      )}
    </div>
  );
};

export default PersonCreate;
