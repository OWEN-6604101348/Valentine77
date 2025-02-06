import React, { useState, useEffect } from 'react';
import FallingRoses from '@/Components/FallingRoses';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const PersonIndex = () => {
  const [people, setPeople] = useState([]);
  const [editingPerson, setEditingPerson] = useState(null); // เพิ่ม state สำหรับ editingPerson

  useEffect(() => {
    fetch('/api/persons')
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/persons/${id}`)
      .then((response) => {
        setPeople(people.filter((person) => person.id !== id));
        alert(response.data.message);
      })
      .catch((error) => {
        console.error('Error deleting person:', error);
        alert('Error deleting person');
      });
  };

  const handleEdit = (person) => {
    setEditingPerson({ ...person });
  };

  const handleChange = (e) => {
    setEditingPerson({ ...editingPerson, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`/api/persons/${editingPerson.id}`, editingPerson)
      .then((response) => {
        setPeople(people.map((person) => (person.id === editingPerson.id ? editingPerson : person)));
        setEditingPerson(null);  // Close modal after saving
        alert('Updated successfully');
      })
      .catch((error) => {
        console.error('Error updating person:', error);
        alert('Error updating person');
      });
  };

  const groupByAgeRangeAndStatus = (data) => {
    const ageGroups = {};
    data.forEach((person) => {
      const range = `${Math.floor(person.age / 5) * 5}-${Math.floor(person.age / 5) * 5 + 4}`;
      if (!ageGroups[range]) {
        ageGroups[range] = { single: 0, notSingle: 0 };
      }
      if (person.status === 'โสด') {
        ageGroups[range].single += 1;
      } else {
        ageGroups[range].notSingle += 1;
      }
    });
    return ageGroups;
  };

  const ageGroups = groupByAgeRangeAndStatus(people);
  const sortedAgeGroups = Object.keys(ageGroups).sort(
    (a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0])
  );

  const data = {
    labels: sortedAgeGroups,
    datasets: [
      {
        label: 'จำนวนคนโสด',
        data: sortedAgeGroups.map((range) => ageGroups[range].single),
        borderColor: '#FF6B6B',
        backgroundColor: '#FF6B6B',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'จำนวนคนไม่โสด',
        data: sortedAgeGroups.map((range) => ageGroups[range].notSingle),
        borderColor: '#FFB6C1',
        backgroundColor: '#FFB6C1',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          padding: 20,
          color: '#FF69B4',
        },
      },
      title: {
        display: true,
        text: 'จำนวนคนโสดและไม่โสดตามช่วงอายุ',
        font: {
          size: 20,
        },
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'ช่วงอายุ',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'จำนวนคน',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          stepSize: 1,
        },
        grid: {
          color: '#FFE4E1',
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <div className="p-6 bg-pink-100 min-h-screen">
      <Head title="Person List" />
      {/* กราฟ */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 relative">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">จำนวนคนโสดและไม่โสดตามช่วงอายุ</h2>
        <Line data={data} options={options} />
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        <FallingRoses />
      </div>

      {/* ตารางรายชื่อบุคคล */}
      <div className="bg-white shadow rounded-lg p-6 relative">
        <h2 className="text-xl font-semibold text-pink-700 mb-4">รายชื่อบุคคล</h2>
        <table className="min-w-full bg-white border border-pink-300 rounded-lg overflow-hidden">
          <thead className="bg-pink-200">
            <tr>
              <th className="p-4 text-left border-b">ชื่อ</th>
              <th className="p-4 text-left border-b">Chromosome</th>
              <th className="p-4 text-left border-b">อายุ</th>
              <th className="p-4 text-left border-b">ส่วนสูง</th>
              <th className="p-4 text-left border-b">น้ำหนัก</th>
              <th className="p-4 text-left border-b">ราศี</th>
              <th className="p-4 text-left border-b">สถานะ</th>
              <th className="p-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr
                key={person.id}
                className={index % 2 === 0 ? 'bg-pink-50' : 'bg-white'}
              >
                <td className="p-4 border-b">{person.name}</td>
                <td className="p-4 border-b">{person.chromosome}</td>
                <td className="p-4 border-b">{person.age}</td>
                <td className="p-4 border-b">{person.height}</td>
                <td className="p-4 border-b">{person.weight}</td>
                <td className="p-4 border-b">{person.zodiac}</td>
                <td className="p-4 border-b">{person.status}</td>

                <td className="p-4 border-b flex gap-2">
                  <button onClick={() => handleEdit(person)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                  <button onClick={() => handleDelete(person.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal สำหรับแก้ไขข้อมูล */}
      {editingPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Person</h2>
            <input type="text" name="name" value={editingPerson.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <select name="chromosome" value={editingPerson.chromosome} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="XX">XX</option>
              <option value="XY">XY</option>
            </select>
            <input type="number" name="age" value={editingPerson.age} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="number" name="height" value={editingPerson.height} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="number" name="weight" value={editingPerson.weight} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <select name="zodiac" value={editingPerson.zodiac} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
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

            <select name="status" value={editingPerson.status} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
              <option value="โสด">โสด</option>
              <option value="ไม่โสด">ไม่โสด</option>
            </select>
            
            <div className="flex gap-2 mt-4">
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
              <button onClick={() => setEditingPerson(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonIndex;
