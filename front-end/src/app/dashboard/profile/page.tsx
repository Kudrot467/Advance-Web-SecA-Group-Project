"use client"
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/utils/Provider/authcontext';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  // const {user}=useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all-users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError('You are logged out, please login again');
        router.push("/login");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center text-blue-500 font-bold mb-6">Profile</h1>
        <img src={userData?.image_url} alt="" />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {userData && (
          <div>
            <p className="mb-2"><span className="font-bold">ID:</span> {userData.id}</p>
            <p className="mb-2"><span className="font-bold">User Type:</span> {userData.usertype}</p>
            <p className="mb-2"><span className="font-bold">First Name:</span> {userData.firstname}</p>
            <p className="mb-2"><span className="font-bold">Last Name:</span> {userData.lastname}</p>
            <p className="mb-2"><span className="font-bold">Mobile:</span> {userData.mobile}</p>
            <p className="mb-2"><span className="font-bold">Email:</span> {userData.email}</p>
            <p className="mb-2"><span className="font-bold">Gender:</span> {userData.gender}</p>
            <p className="mb-2"><span className="font-bold">Username:</span> {userData.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
