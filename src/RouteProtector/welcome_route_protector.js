import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import api from '../api/axios'
const Welcome_route_protector = ({children}) => {
  const [err,setErr]=useState("")
  const [success, setSuccess] = useState(true)
    
  // async function checkLoginLogout(){
  //   try {
  //       const request = await api.get("/auth")
  //       const response=await request.json()
  //       console.warn(response.msg)
        
  //       console.log(response.status)
  //       setSuccess(response.status)
  //   } catch (error) {
  //       console.log(error.status)
  //       setErr(error.status)
  //   }
  // }
  // useEffect(()=>{
  //   checkLoginLogout()
  // },[])
  return success ? <Navigate to={"/welcome"}/>: <Navigate to={"/home"}/>
}

export default Welcome_route_protector