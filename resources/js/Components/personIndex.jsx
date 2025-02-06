import React, { useState, useEffect } from 'react';

const PersonIndex = () => {
  const [people, setPeople] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    zodiac: '',
    status: 'โสด',
  });

  useEffect(() => {
    fetch('/api/persons')
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/persons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setPeople([...people, data.person]);
        setFormData({ name: '', age: '', height: '', weight: '', zodiac: '', status: 'โสด' });
      })
      .catch((error) => console.error('Error posting data:', error));
  };

  return (
    <div>
      <h1>รายชื่อบุคคล</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="ชื่อ" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="number" placeholder="อายุ" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} required />
        <input type="number" placeholder="ส่วนสูง" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} required />
        <input type="number" placeholder="น้ำหนัก" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} required />
        <input type="text" placeholder="ราศี" value={formData.zodiac} onChange={(e) => setFormData({ ...formData, zodiac: e.target.value })} required />
        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
          <option value="โสด">โสด</option>
          <option value="ไม่โสด">ไม่โสด</option>
        </select>
        <button type="submit">บันทึกข้อมูล</button>
      </form>

      <h2>รายชื่อที่บันทึกไว้</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>อายุ</th>
            <th>ส่วนสูง</th>
            <th>น้ำหนัก</th>
            <th>ราศี</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.height}</td>
              <td>{person.weight}</td>
              <td>{person.zodiac}</td>
              <td>{person.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonIndex;
