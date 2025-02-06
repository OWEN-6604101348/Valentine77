import React, { useState, useEffect } from 'react';
import FallingRoses from '@/Components/FallingRoses';
import { Head } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import ChartComponent from '@/Components/ChartComponent';
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
  const [editingPerson, setEditingPerson] = useState(null);

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
        setEditingPerson(null);
        alert('Updated successfully');
      })
      .catch((error) => {
        console.error('Error updating person:', error);
        alert('Error updating person');
      });
  };

  
  return (
    <div className="p-6 bg-pink-100 min-h-screen">
      <Head title="Person List" />

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        <FallingRoses />
      </div>

      <div className="bg-white shadow rounded-lg p-6 relative">
        <h2 className="text-xl font-semibold text-pink-700 mb-4">รายชื่อบุคคล</h2>
        <table className="min-w-full bg-white border border-pink-300 rounded-lg overflow-hidden">
          <thead className="bg-pink-200">
            <tr>
              <th className="p-4 text-left border-b">ชื่อ</th>
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
              <tr key={person.id} className={index % 2 === 0 ? 'bg-pink-50' : 'bg-white'}>
                <td className="p-4 border-b">{person.name}</td>
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

      {editingPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Person</h2>
            <input type="text" name="name" value={editingPerson.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="number" name="age" value={editingPerson.age} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="number" name="height" value={editingPerson.height} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="number" name="weight" value={editingPerson.weight} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
            <input type="text" name="zodiac" value={editingPerson.zodiac} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
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
