"use client"
import axios from 'axios';
import { useState } from 'react';

const AddVehicle = () => {
    const [vehicleData, setVehicleData] = useState({
        make: '',
        model: '',
        year: '',
        type: '',
        pricePerDay: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        // If the input name is year or pricePerDay, parse the value to an integer
        const value = ['year', 'pricePerDay'].includes(e.target.name) ? parseInt(e.target.value) : e.target.value;
        setVehicleData({ ...vehicleData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Posting JSON:", vehicleData);
        try {
            const response = await axios.post('http://localhost:3000/agency/add-vehicle', vehicleData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Send the access token with the request
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
            });
            console.log(response.data);
            setSuccessMessage('Vehicle added successfully!');
            // Clear form fields after successful submission
            setVehicleData({
                make: '',
                model: '',
                year: '',
                type: '',
                pricePerDay: ''
            });
        } catch (error) {
            setError('Error posting vehicle data');
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="make"
                    placeholder="Make"
                    value={vehicleData.make}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={vehicleData.model}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                />
                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={vehicleData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={vehicleData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                />
                <input
                    type="number"
                    name="pricePerDay"
                    placeholder="Price Per Day"
                    value={vehicleData.pricePerDay}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 text-black"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Add Vehicle
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>

    );
};

export default AddVehicle;
