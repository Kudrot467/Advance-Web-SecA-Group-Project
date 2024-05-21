"use client"
import axios from 'axios';
import { useState } from 'react';

const AddRoom = () => {
    const [roomData, setRoomData] = useState({
        name: '',
        description: '',
        capacity: '',
        pricePerNight: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        // If the input name is capacity or pricePerNight, parse the value to an integer
        const value = e.target.name === 'capacity' || e.target.name === 'pricePerNight' ? parseInt(e.target.value) : e.target.value;
        setRoomData({ ...roomData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Posting JSON:", roomData);
        try {
            const response = await axios.post('http://localhost:3000/agency/add-room', roomData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Send the access token with the request
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
            });
            console.log(response.data);
            setSuccessMessage('Room added successfully!');
            console.log("Room added");
            setRoomData({
                name: '',
                description: '',
                capacity: '',
                pricePerNight: ''
            });
        } catch (error) {
            setError('Error posting room data');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <input type="text" name="name" placeholder="Room Name" onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-400" />
                <textarea name="description" placeholder="Description" onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-400"></textarea>
                <input type="number" name="capacity" placeholder="Capacity" onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-400" />
                <input type="number" name="pricePerNight" placeholder="Price Per Night" onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-400" />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Room</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default AddRoom;
