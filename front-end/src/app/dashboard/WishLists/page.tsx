// @ts-nocheck
"use client";
import { AuthContext } from "@/app/utils/Provider/authcontext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const WishLists = () => {
  // const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [wishLists, setWishLists] = useState([]);
  const [items, setItems] = useState([]);
  // const [user,setUsers]=useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/all-users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        // setError('You are logged out, please login again');
        // router.push("/Components/Login");
      }
    };
    fetchUserData();
   
  }, []);
  // const fetchWishLists = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/wishlist/${users.id}`); // Adjust the endpoint URL as needed
  //     setWishLists(res.data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };
 
  useEffect(() => {
    if (users && users.id) {
      const fetchWishLists = async () => {
        try {
          console.log("Fetching wishlists for user ID:", users.id);
          const res = await axios.get(`http://localhost:3000/wishlist/${users.id}`);
          setWishLists(res.data);
        } catch (error) {
          console.error("Error fetching wishlists:", error);
        }
      };

      fetchWishLists();
    }
  }, [users]);

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          // Replace 'your-api-endpoint' with the actual endpoint for deleting data
          axios
            .delete(`http://localhost:3000/wishlist/${id}`)
            .then((res) => {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remaining = items.filter((item) => item.id !== id);
              
              setItems(remaining);
              console.log("Data deleted successfully:", res.data);
            });
        } catch (error) {
          console.error("Error deleting data:", error);
        }
      }
    });
  };
  // console.log("remaining", items);

  return (
    <div className="max-w-6xl mx-auto">
      <h1>
        {wishLists.length === 0 && (
          <span className="text-2xl text-center font-bold text-red-500">
            You have no wishlists
          </span>
        )}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {wishLists.map((wishList) => (
        <div
          key={wishList.id}
          className="card lg:card-side bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">Type :{wishList.type}</h2>
            <p>Item Id:{wishList.itemId}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handleDeleteUser(wishList.itemId)}
                className="btn bg-red-600 text-white hover:bg-white hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default WishLists;
