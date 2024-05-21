// view-added-flights/page.tsx
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ViewAddedFlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        // Fetch flights data from the backend
        const response = await axios.get('http://localhost:3000/agency/flight', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Send the access token with the request
          },
        });
        setFlights(response.data);
      } catch (error) {
        setError('Failed to fetch flights data');
      }
    };

    fetchFlights();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFlights = flights.filter(flight =>
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Added Flights</h1>
      <input
        type="text"
        placeholder="Search flights..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      {filteredFlights.length > 0 ? (
        <div>
          {filteredFlights.map(flight => (
            <div key={flight.id} className="border rounded-md p-4 mb-4">
              <p className="font-bold">ID: {flight.id}</p>
              <p>Airline: {flight.airline}</p>
              <p>Departure Date Time: {new Date(flight.departureDateTime).toLocaleString()}</p>
              <p>Arrival Date Time: {new Date(flight.arrivalDateTime).toLocaleString()}</p>
              <p>Origin: {flight.origin}</p>
              <p>Destination: {flight.destination}</p>
              <p>Price: {flight.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No flights found</p>
      )}
    </div>
  );
};

export default ViewAddedFlightsPage;
