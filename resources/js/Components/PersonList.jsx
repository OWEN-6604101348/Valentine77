import React, { useState, useEffect } from 'react';

const PersonList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('/api/persons')
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>รายชื่อบุคคล</h1>
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

export default PersonList;
