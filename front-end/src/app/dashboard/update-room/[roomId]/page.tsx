"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UpdateRoom = ({ params }: { params: { roomId: string } }) => {
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    capacity: '',
    pricePerNight: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  

  const handleInputChange = (e) => {
    const value = e.target.name === 'capacity' || e.target.name === 'pricePerNight' ? parseInt(e.target.value) : e.target.value;
    setRoomData({ ...roomData, [e.target.name]: value });
  };


  useEffect(() => {
    console.log(params.roomId);
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/agency/room/${params.roomId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          },
        });

        const { name, description, capacity, pricePerNight } = response.data;
        setRoomData({ name, description, capacity, pricePerNight });
        // setRoomData(response.data);
      } catch (error) {
        setError('Failed to fetch room details');
      }
    };

    if (params.roomId) {
      fetchRoomDetails();
    }
  }, [params.roomId]);


  console.log("Posting JSON:", roomData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3000/agency/update-room/${params.roomId}`, roomData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('successfull');
      router.push('/dashboard/view-added-rooms');
    } catch (error) {
      setError('Error updating room data');
      console.error('Error:', error); 
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Room</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          value={roomData.name}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={roomData.description}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={roomData.capacity}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        />
        <input
          type="number"
          name="pricePerNight"
          placeholder="Price Per Night"
          value={roomData.pricePerNight}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Update Room
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateRoom;
