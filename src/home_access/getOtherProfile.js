import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import AuthContext from '../context/authProvider'

import axios from '../api/axios'
const GetOtherProfile = () => {
    const [userAuth,setUserAuth]=useState("")
    const data=useParams()
    const {auth,setOtherProfile,displayBottomNav,cook,cookies2}=useContext(AuthContext)
     const fetchPosts=async ()=>{
        try {
          const request =await axios.post(`/users/profile/${data.user}`,{
            signedCookies:JSON.stringify({
              refreshToken: cook,
              accessToken:cookies2
            })
          })
          const response=await request
          if(response.data.user){
            setOtherProfile(response.data)
            setUserAuth(response.data)
            // console.log(response)      
          }
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
        fetchPosts()
      },[])
  return (
    <>
        <Outlet/>
    </>
  )
}

export default GetOtherProfile