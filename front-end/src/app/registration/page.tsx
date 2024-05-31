"use client"
import Link from 'next/link';
import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const registration = () => {
    const [showPassword, setShowPassWord] = useState(false);
    const [isErr, setisErr] = useState(false);
    const [errch, seterrch] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const router = useRouter();
      // const { createUser, setProfilePicture } = useContext(AuthContext);

      const onSubmit =async (data) => {
        const usertype=data.role;
        const firstname = data.firstName;
        const lastname=data.lastName;
        const mobile=data.contact;
        const image_url = data.image_url;
        const email = data.email;
        const gender=data.gender;
        const username=data.username;
        const password = data.password;
       
    
        const user = {
          usertype,
          firstname,
          lastname,
          mobile,
          image_url,
          email,
          gender,
          username,
          password
        };
        console.log(user);
        try {
          const response = await axios.post('http://localhost:3000/all-users/signup', user, {
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
        });
        console.log(response);
        //   .then((response) => response.json())
        const responseData = response.data;
        console.log(responseData);
        if (response.status === 201) {
          reset();
          Swal.fire("Thank You!", "Registration Successful!", "success");
          router.push("/");
        } else  Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.statusText,
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        }
        catch(error:any){
          console.error("Error:", error);
          // seterrch(
          //   Array.isArray(error.response.data.message)
          //     ? error.response.data.message[0]
          //     : error.response.data.message
          // );
          setisErr(true);
        }
        // createUser(data.email, data.password)
        // .then((result) => {
        //   console.log(result.user);
        //   setProfilePicture(data.username, data.image_url);
        // })
        // .catch((error) => {
        //   console.log(error.message);
        // });
        };
    return (
        <div className="max-w-[1180px] mx-auto">
      <div className="hero bg-base-200 flex">
       
        <div className="hero-content w-full flex flex-col md:flex-row">
        <div>
        <img className='h-full w-full' src="https://i.ibb.co/cxN7XtR/Blue-Modern-Travel-Tour-Agency-Instagram-Post.png" alt="" />
        </div>
          <div className="card flex-shrink-0 w-full md:w-3/4 lg:w-1/2 shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body pl-4">
              <div className="flex flex-col md:flex-col lg:flex-row gap-1">
                <div className="form-control w-full">
                  <div className=" text-[#F7B030] font-medium text-lg text-center flex">
                     <h1 className=" text-[#F7B030] font-bold text-2xl rounded-xl w-full underline">
                      Registration
                    </h1>
                  </div>
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      User Name:
                    </span>
                  </label>
                  <div>
                  <input
                    type="text"
                    {...register("username", { required: true })}
                    placeholder="enter your username"
                    name="username"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.username && (
                    <span className="text-red-700">*User Name is required</span>
                  )}
                  </div>
                </div>
              </div>
              <div>
                <div>
                
                <div>
                <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                     First Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("firstName", { required: true })}
                    placeholder="enter your user type"
                    name="firstName"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.firstName && (
                    <span className="text-red-700">*First Name is required</span>
                  )}
                  </div>
                <div>
                <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                     Last Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("lastName", { required: true })}
                    placeholder="enter your user type"
                    name="lastName"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.lastName && (
                    <span className="text-red-700">*Last Name is required</span>
                  )}
                  </div>
                </div>
              <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                     Contact No.
                    </span>
                  </label>
                  <div>
                  <input
                    type="text"
                    {...register("contact", { required: true })}
                    placeholder="Contact no."
                    name="contact"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.contact && (
                    <span className="text-red-700">*contact number is required</span>
                  )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      Image URL
                    </span>
                  </label>
                 <div>
                 <input
                    type="text"
                    {...register("image_url", { required: true })}
                    placeholder="Image url"
                    name="image_url"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.image_url && (
                    <span className="text-red-700">*image is required</span>
                  )}
                 </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                     Gender
                    </span>
                  </label>
                  <div>
                  <input
                    type="text"
                    {...register("gender", { required: true })}
                    placeholder="Gender"
                    name="gender"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.contact && (
                    <span className="text-red-700">*gender number is required</span>
                  )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      Email
                    </span>
                  </label>
                  <div>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="email"
                    name="email"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.email && (
                    <span className="text-red-700">*Email is required</span>
                  )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                       
                      })}
                      placeholder="password"
                      name="password"
                      className="border-2 border-[#F7B030]"
                    />
                    {errors.password?.type === "required" && (
                      <span className="text-red-700">
                        *Password is required
                      </span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="text-red-700">
                        *Provie a special Character,one capital letter
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-700">
                        *Password must be 6 characters
                      </span>
                    )}
                    <span
                      className="absolute top-3 right-2"
                      onClick={() => setShowPassWord(!showPassword)}
                    >
                      
                    </span>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      Role
                    </span>
                  </label>
                 <div>
                 <input
                    type="text"
                    {...register("role", { required: true })}
                    placeholder="which role ?"
                    name="role"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.role && (
                    <span className="text-red-700">*enter your role</span>
                  )}
                 </div>
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="text-white hover:bg-[#F7B030] bg-[#F7B030] p-2 rounded-lg">
                  Registration
                </button>
              </div>
            </form>
            <p className="text-center font-medium text-lg text-[#F7B030]">
              Already have an account ?{" "}
              <Link className="text-red-400" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default registration;

// "use client"
// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// const SignupPage = () => {
//     const [formData, setFormData] = useState({
//         usertype: '',
//         firstname: '',
//         lastname: '',
//         mobile: '',
//         image_url:'',
//         email: '',
//         gender: '',
//         username: '',
//         password: ''
//     });
//     const [errors, setErrors] = useState({
//         usertype: '',
//         firstname: '',
//         lastname: '',
//         mobile: '',
//         image_url:'',
//         email: '',
//         gender: '',
//         username: '',
//         password: ''
//     });
//     const router = useRouter();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         // Clear the error message for the current field when it's being changed
//         setErrors({ ...errors, [name]: '' });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const newErrors = {};
//         // Check if any field is empty
//         for (const field in formData) {
//             if (formData[field] === '') {
//                 newErrors[field] = 'This field is required';
//             }
//         }

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return; // Exit the function if any field is empty
//         }

//         try {
//             const response = await axios.post('http://localhost:3000/all-users/signup', formData, {
//                 headers: {
//                     'Content-Type': 'application/json' // Specify the content type as JSON
//                 },
//             });
//             console.log(response.data);
//             // Redirect to login page after successful signup
//             router.push('/login');
//         } catch (error) {
//             setErrors({ ...errors, password: 'Email and username should be unique' });
//         }
//     };

// //     return (
// //         <div className="flex justify-center items-center bg-gray-100">
// //             <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
// //                 <h1 className="text-3xl text-center text-blue-500 font-bold mb-6">Signup</h1>
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="mb-4">
// //                         <input
// //                             type="text"
// //                             name="usertype"
// //                             placeholder="User Type"
// //                             value={formData.usertype}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.usertype ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.usertype && <p className="text-red-500 mt-1">{errors.usertype}</p>}
// //                     </div>
// //                     <div className="mb-4">
// //                         <input
// //                             type="text"
// //                             name="firstname"
// //                             placeholder="First Name"
// //                             value={formData.firstname}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.firstname ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.firstname && <p className="text-red-500 mt-1">{errors.firstname}</p>}
// //                     </div>
// //                     <div className="mb-4">
// //                         <input
// //                             type="text"
// //                             name="lastname"
// //                             placeholder="Last Name"
// //                             value={formData.lastname}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.lastname ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.lastname && <p className="text-red-500 mt-1">{errors.lastname}</p>}
// //                     </div>
// //                     <div className="mb-4">
// //                         <input
// //                             type="tel"
// //                             name="mobile"
// //                             placeholder="Mobile"
// //                             value={formData.mobile}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.mobile ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.mobile && <p className="text-red-500 mt-1">{errors.mobile}</p>}
// //                     </div>
// //                     <div className="mb-4">
// //                         <input
// //                             type="tel"
// //                             name="image_url"
// //                             placeholder="image url"
// //                             value={formData.image_url}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.image_url ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.image_url && <p className="text-red-500 mt-1">{errors.image_url}</p>}
// //                     </div>
// //                     <div className="mb-4">
// //                         <input
// //                             type="email"
// //                             name="email"
// //                             placeholder="Email"
// //                             value={formData.email}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.email ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
// //                     </div>
// //                     <div className="mb-4">
// //                         <input
// //                             type="text"
// //                             name="gender"
// //                             placeholder="Gender"
// //                             value={formData.gender}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.gender ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.gender && <p className="text-red-500 mt-1">{errors.gender}</p>}
// //                     </div>
// //                     <div className="mb-4">
// //                         <input
// //                             type="text"
// //                             name="username"
// //                             placeholder="Username"
// //                             value={formData.username}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.username ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.username && <p className="text-red-500 mt-1">{errors.username}</p>}
// //                     </div>
// //                     <div className="mb-4">
// //                         <input
// //                             type="password"
// //                             name="password"
// //                             placeholder="Password"
// //                             value={formData.password}
// //                             onChange={handleInputChange}
// //                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.password ? 'border-red-500' : 'focus:border-blue-500'} text-black`}
// //                         />
// //                         {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
// //                     </div>
// //                     <button
// //                         type="submit"
// //                         className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
// //                     >
// //                         Signup
// //                     </button>
// //                 </form>
// //                 <p className="text-center mt-4">
// //                     <Link className="text-blue-500 hover:underline cursor-pointer" href="/login">Already have an account?</Link>
// //                 </p>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SignupPage;
