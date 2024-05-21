"use client"
// import React, { useState } from 'react';
// import axios from 'axios';

// const AddRoomForm = () => {
//     const [roomName, setRoomName] = useState('');
//     const [price, setPrice] = useState('');
//     const [location, setLocation] = useState('');
//     const [type, setType] = useState('');
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccessMessage('');

//         try {
//             console.log(
//                 "hotelName: ", roomName,
//                 "price: ", price,
//                 "location: ", location,
//                 "type: ", type,
//             );
//             console.log(roomName);
//             console.log(price);
//             console.log(location);
//             console.log(type);
//             await axios.post('http://localhost:3000/admin/addroom', {
//                 "hotelName": {roomName},
//                 "price": price,
//                 "location": location,
//                 "type": type,
//             });
//             console.log(roomName);
//             console.log(price);
//             console.log(location);
//             console.log(type);
//             setSuccessMessage('Room added successfully!');
//             setRoomName('');
//             setPrice('');
//             setLocation('');
//             setType('');
//         } catch (error) {
//             setError('Error adding room. Please try again.');
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Add Room</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">Room Name:</label>
//                     <input type="text" id="roomName" value={roomName} onChange={(e) => setRoomName(e.target.value)} required
//                         className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
//                     <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required
//                         className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
//                     <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required
//                         className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
//                     <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required
//                         className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
//                 </div>
//                 <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
//                     Add Room
//                 </button>
//             </form>
//             {error && <p className="mt-4 text-red-500">{error}</p>}
//             {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
//         </div>
//     );
// };

// export default AddRoomForm;

import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
  // State variables to hold room data
  const [Hotelname, setHotelname] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle room submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending room data to the backend
      await axios.post('http://localhost:3000/admin/addroom', {
        Hotelname,
        price,
        location,
        type
      });
      // Setting success message on successful submission
      setSuccessMessage('Room added successfully!');
    } catch (error) {
      // Handling errors
      setError('Error adding room');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add Room</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="Hotelname" className="sr-only">
                Hotel Name
              </label>
              <input
                id="Hotelname"
                name="Hotelname"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Hotel Name"
                value={Hotelname}
                onChange={(e) => setHotelname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price" className="sr-only">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="type" className="sr-only">
                Type
              </label>
              <input
                id="type"
                name="type"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/check --> */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 14.707a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L10 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;