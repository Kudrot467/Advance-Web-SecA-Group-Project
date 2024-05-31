"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

const LoginPage = () => {
  // const{signIn}=useContext(AuthContext);
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      const { access_token } = response.data;
      // Store the token in localStorage or cookies for future requests
      localStorage.setItem("accessToken", access_token);
      // Redirect to dashboard or any other page upon successful login
      // You can use Next.js router or navigate to do this
      // Example: router.push('/dashboard');

      Swal.fire("Thank You!", "Login Successful!", "success");
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid username or password");
      // router.push('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center text-blue-500 font-bold mb-6">
          Login
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500  text-black"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center mt-4">
          <Link
            className="text-blue-500 hover:underline cursor-pointer"
            href="/registration"
          >
            Don't have an account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
