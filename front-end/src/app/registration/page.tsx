"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        usertype: '',
        firstname: '',
        lastname: '',
        mobile: '',
        image_url:'',
        email: '',
        gender: '',
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        usertype: '',
        firstname: '',
        lastname: '',
        mobile: '',
        image_url:'',
        email: '',
        gender: '',
        username: '',
        password: ''
    });
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear the error message for the current field when it's being changed
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        // Check if any field is empty
        for (const field in formData) {
            if (formData[field] === '') {
                newErrors[field] = 'This field is required';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Exit the function if any field is empty
        }

        try {
            const response = await axios.post('http://localhost:3000/all-users/signup', formData, {
                headers: {
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
            });
            console.log(response.data);
            Swal.fire("Thank You!", "Registration Successful!", "success");
            // Redirect to login page after successful signup
            router.push('/login');
        } catch (error) {
            setErrors({ ...errors, password: 'Email and username should be unique' });
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl text-center text-blue-500 font-bold mb-6">Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="usertype"
                            placeholder="User Type"
                            value={formData.usertype}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.usertype ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.usertype && <p className="text-red-500 mt-1">{errors.usertype}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="image_url"
                            placeholder="Image Url"
                            value={formData.image_url}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.usertype ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.image_url && <p className="text-red-500 mt-1">{errors.image_url}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.firstname ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.firstname && <p className="text-red-500 mt-1">{errors.firstname}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.lastname ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.lastname && <p className="text-red-500 mt-1">{errors.lastname}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.mobile ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.mobile && <p className="text-red-500 mt-1">{errors.mobile}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.email ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="gender"
                            placeholder="Gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.gender ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.gender && <p className="text-red-500 mt-1">{errors.gender}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.username ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.username && <p className="text-red-500 mt-1">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.password ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
                        />
                        {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Signup
                    </button>
                </form>
                <p className="text-center mt-4">
                    <Link className="text-blue-500 hover:underline cursor-pointer" href="/login">Already have an account?</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;