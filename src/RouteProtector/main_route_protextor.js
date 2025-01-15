import React, { useContext, useEffect, useState } from 'react'
import api from '../api/axios'
import AuthContext from '../context/authProvider'
import { Navigate, Outlet } from 'react-router-dom'
const Main_route_protextor = () => {
    const {auth}=useContext(AuthContext)
    return !auth ? <Navigate to="/"/> :<Outlet/>
}


export default Main_route_protextor