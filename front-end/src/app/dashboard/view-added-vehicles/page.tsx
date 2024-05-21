"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ViewAddedVehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                // Fetch vehicles data from the backend
                const response = await axios.get('http://localhost:3000/agency/vehicle', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Send the access token with the request
                    },
                });
                setVehicles(response.data);
            } catch (error) {
                setError('Failed to fetch vehicles data');
            }
        };

        fetchVehicles();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Added Vehicles</h1>
            <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border rounded"
            />
            {error && <p className="text-red-500">{error}</p>}
            {filteredVehicles.length > 0 ? (
                <div>
                    {filteredVehicles.map(vehicle => (
                        <div key={vehicle.id} className="border rounded-md p-4 mb-4">
                            <p className="font-bold">ID: {vehicle.id}</p>
                            <p>Make: {vehicle.make}</p>
                            <p>Model: {vehicle.model}</p>
                            <p>Year: {vehicle.year}</p>
                            <p>Type: {vehicle.type}</p>
                            <p>Price Per Day: {vehicle.pricePerDay}</p>
                            <p>Username: {vehicle.username}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No vehicles found</p>
            )}
        </div>
    );
};

export default ViewAddedVehiclesPage;
