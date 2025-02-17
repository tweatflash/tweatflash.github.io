import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import AuthContext from '../context/authProvider'

import axios from '../api/axios'
const GetOtherProfile = () => {
    const [userAuth,setUserAuth]=useState("")
    const data=useParams()
    const {auth,displayBottomNav,cook,cookies2}=useContext(AuthContext)
     
  return (
    <>
        <Outlet/>
    </>
  )
}

export default GetOtherProfile