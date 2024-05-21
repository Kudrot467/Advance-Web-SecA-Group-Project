"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../globals.css"; // Assuming this is where your Tailwind CSS is imported
import { FaAd, FaList } from "react-icons/fa";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
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
        setUserData(response.data);
      } catch (error) {
        setError("You are logged out, please login again");
        router.push("/login");
      }
    };
    fetchUserData();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#38B6FF]">
        {" "}
        {/* Added Tailwind CSS classes */}
        {error && <p>{error}</p>}
        {userData.usertype === "admin" && (
          <nav>
            <ul className="menu">
              <li>
                <Link
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                  href="/dashboard/view-all-users"
                >
                  View All Users
                </Link>
              </li>
              <li>
                <Link
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                  href="/dashboard/AllPost"
                >
                  <FaAd></FaAd>
                  Add Post--
                </Link>
              </li>
              <hr />
              <hr />
              <li>
                <Link
                  href="/dashboard/MyPosts"
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                >
                  <FaList></FaList>
                  My Posts--
                </Link>
              </li>
              <hr />
              <hr />
              <li>
                <Link
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                  href="/dashboard/update-user"
                >
                  Update User
                </Link>
              </li>
              <li>
                <Link
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                  href="/dashboard/add-admin"
                >
                  Add Admin
                </Link>
              </li>
              <li>
                <Link
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                  href="/dashboard/delete-user"
                >
                  Delete User
                </Link>
              </li>
              <li>
                <Link
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                  href="/dashboard/Faq/addfaq"
                >
                  Add FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                  href="/dashboard/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                  href="/dashboard/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        )}
        {userData.usertype === "agency" && (
          <ul className="menu">
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/AllPost"
              >
                <FaAd></FaAd>
                Add Post--
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                href="/dashboard/MyPosts"
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
              >
                <FaList></FaList>
                My Posts--
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                href="/dashboard/AddWishList"
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
              >
                <FaList></FaList>
                Create WishList
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                href="/dashboard/WishLists"
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
              >
                <FaList></FaList>
                WishLists
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/add-hotel"
              >
                Add Hotel
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/add-room"
              >
                Add Room
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/add-flight"
              >
                Add Flight
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/add-vehicle"
              >
                Add Vehicle
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/view-added-rooms"
              >
                view Added Rooms
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/view-added-flights"
              >
                view Added Flights
              </Link>
            </li>
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/view-added-vehicles"
              >
                view Added Vehicles
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/add-post"
              >
                Add Post
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/profile"
              >
                Profile
              </Link>
            </li>
            <hr />
            <hr />
            {/* <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/Faq/showfaq"
              >
                Show FAQ
              </Link>
            </li>
            <hr />
            <hr /> */}
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/about"
              >
                About
              </Link>
            </li>
            <hr />
            <hr />
          </ul>
        )}
        {userData.usertype === "user" && (
          <ul className="menu">
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/profile"
              >
                Profile
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/Booking"
              >
                Booking
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/AllPost"
              >
                <FaAd></FaAd>
                Add Post--
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                href="/dashboard/MyPosts"
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
              >
                <FaList></FaList>
                My Posts--
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                href="/dashboard/AddWishList"
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
              >
                <FaList></FaList>
                Create WishList
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                href="/dashboard/WishLists"
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
              >
                <FaList></FaList>
                WishLists
              </Link>
            </li>
            <hr />
            <hr />

            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/deposit-money"
              >
                Deposit Money
              </Link>
            </li>
            <hr />
            <hr />

            <li>
              <Link
                href="/dashboard/payment"
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
              >
                Make Payment
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/Faq/showfaq"
              >
                Show FAQ
              </Link>
            </li>
            <hr />
            <hr />
            <li>
              <Link
                className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
                href="/dashboard/about"
              >
                About
              </Link>
            </li>
            <hr />
            <hr />
          </ul>
        )}
        <button
          onClick={handleLogout}
          className="bg-white text-red-500 mt-4 px-4 py-2 rounded-md"
        >
          Logout
        </button>{" "}
        {/* Added Tailwind CSS classes */}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
