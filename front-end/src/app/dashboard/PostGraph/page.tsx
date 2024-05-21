// @ts-nocheck
"use client"

import { AuthContext } from '@/app/utils/Provider/authcontext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const PostGraph = () => {
    // const{user}=useContext(AuthContext);
    const[totalPosts,setTotalPosts]=useState(0);
    const[myPosts,setMyPosts]=useState(0);
    const[users,setUsers]=useState([]);
    const[activityComment,setActivityComment]=useState(0);

    const[totalComments,setTotalComments]=useState(0);
    const[myComments,setMyComments]=useState(0);
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

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get('http://localhost:3000/posts'); 
            const posts=res.data;
            setTotalPosts(posts.length);
            const mPosts=posts.filter(post=>post.postedBy==user?.email);
            setMyPosts(mPosts.length);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchPosts();}, []);
        console.log(myPosts)
        console.log(totalPosts)

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const res = await axios.get('http://localhost:3000/comments'); 
            const comments=res.data;
            setTotalComments(comments.length);
            const mCmt=comments.filter(cmt=>cmt.commentedBy==users?.email);
            setMyComments(mCmt.length);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchComments();}, []);
        console.log(myComments)

        const data = [
            ["Activities ", "Post and Comment"],
            ["Total Posts", totalPosts],
            ["My Posts", myPosts],
            ["Total Comments", totalComments],
            ["My Comments", myComments],
          ];

     const options = {
        title: "Activities with Trip Nest",
      };
    return (
        <div>
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
        </div>
    );
};

export default PostGraph;