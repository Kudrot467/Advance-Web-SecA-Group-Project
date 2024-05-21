'use client';
import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const AddAdminPage: React.FC = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post('http://localhost:3000/all-users/add-admin', {
        firstname,
        lastname,
        mobile,
        image_url,
        email,
        gender,
        username,
        password,
      }, { headers });
      setMessage('New admin added successfully.');
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-md bg-blue shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">Add New Admin</h1>
        <div className="">
          <label htmlFor="firstname" className="block mb-1">First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="">
          <label htmlFor="lastname" className="block">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="">
        <label htmlFor="lastname" className="block mb-1">Image Url</label>
                        <input
                            type="text"
                            name="image_url"
                            placeholder="Image Url"
                            value={image_url}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md  text-black`}
                        />
      
                    </div>
        <div className="">
          <label htmlFor="mobile" className="block mb-1">Mobile</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>     
        <div className="">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="">
          <label htmlFor="gender" className="block mb-1">Gender</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="">
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">Add Admin</button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default AddAdminPage;
