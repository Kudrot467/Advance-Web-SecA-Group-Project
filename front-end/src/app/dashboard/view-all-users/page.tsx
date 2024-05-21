"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const AllUsersProfiles = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all-users/all-user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setAllUsersData(response.data);
      } catch (error) {
        setError('Failed to fetch users data');
      }
    };

    fetchAllUsersData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = allUsersData.filter(user => {
    return Object.values(user).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-md">
           <p className="mb-2"><span className="font-bold">ID:</span> {user.id}</p>
            <p className="mb-2"><span className="font-bold">User Type:</span> {user.usertype}</p>
            <p className="mb-2"><span className="font-bold">First Name:</span> {user.firstname}</p>
            <p className="mb-2"><span className="font-bold">Last Name:</span> {user.lastname}</p>
            <p className="mb-2"><span className="font-bold">Mobile:</span> {user.mobile}</p>
            <p className="mb-2"><span className="font-bold">Email:</span> {user.email}</p>
            <p className="mb-2"><span className="font-bold">Gender:</span> {user.gender}</p>
            <p className="mb-2"><span className="font-bold">Username:</span> {user.username}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersProfiles;
