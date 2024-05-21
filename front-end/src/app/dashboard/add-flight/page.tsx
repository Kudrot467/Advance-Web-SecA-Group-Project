"use client"
import axios from 'axios';
import { useState } from 'react';

const AddFlight = () => {
    const [flightData, setFlightData] = useState({
        airline: '',
        departureDateTime: '',
        arrivalDateTime: '',
        origin: '',
        destination: '',
        price: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        // If the input name is price, parse the value to an integer
        const value = e.target.name === 'price' ? parseInt(e.target.value) : e.target.value;
        setFlightData({ ...flightData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Posting JSON:", flightData);
        try {
            const response = await axios.post('http://localhost:3000/agency/add-flight', flightData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Send the access token with the request
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
            });
            console.log(response.data);
            setSuccessMessage('Flight added successfully!');
            // Clear form fields after successful submission
            setFlightData({
                airline: '',
                departureDateTime: '',
                arrivalDateTime: '',
                origin: '',
                destination: '',
                price: ''
            });
        } catch (error) {
            setError('Error posting flight data');
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="airline"
                    placeholder="Airline"
                    value={flightData.airline}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                />
                <input
                    type="datetime-local"
                    name="departureDateTime"
                    placeholder="Departure Date & Time"
                    value={flightData.departureDateTime}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                />
                <input
                    type="datetime-local"
                    name="arrivalDateTime"
                    placeholder="Arrival Date & Time"
                    value={flightData.arrivalDateTime}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                />
                <input
                    type="text"
                    name="origin"
                    placeholder="Origin"
                    value={flightData.origin}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                />
                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={flightData.destination}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={flightData.price}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Add Flight
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default AddFlight;
