// ViewAddedRoomsPage.js
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ViewAddedRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/agency/room', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        setError('Failed to fetch rooms data');
      }
    };

    fetchRooms();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateClick = (roomId) => {
    router.push(`/dashboard/update-room/${roomId}`);
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Added Rooms</h1>
      <input
        type="text"
        placeholder="Search rooms..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      {filteredRooms.length > 0 ? (
        <div>
          {filteredRooms.map(room => (
            <div key={room.id} className="border rounded-md p-4 mb-4">
              <p className="font-bold">ID: {room.id}</p>
              <p>Name: {room.name}</p>
              <p>Description: {room.description}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Price Per Night: {room.pricePerNight}</p>
              <button
                onClick={() => handleUpdateClick(room.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No rooms found</p>
      )}
    </div>
  );
};

export default ViewAddedRoomsPage;
