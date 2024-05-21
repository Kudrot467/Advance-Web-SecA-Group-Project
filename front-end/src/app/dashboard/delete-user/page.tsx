'use client';
import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const DeleteUserPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.delete(`http://localhost:3000/all-users/deleteuser/${email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage(response.data.message);
      setError('');
    } catch (error: any) {
      setMessage('');
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="max-w-md w-full p-6 bg-blue rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Delete User</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">User Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full">Delete User</button>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteUserPage;
