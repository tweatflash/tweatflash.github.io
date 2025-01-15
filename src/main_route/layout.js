import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../loading_component/loader'
import AuthContext from '../context/authProvider'
const Layout = () => {
    const {auth , loadingErr ,loading}= useContext(AuthContext)
    
    return (
        <>
            { auth && !loading || !auth  && !loading? <Outlet/> : <Loader loadingErr={loadingErr}/>}
        </>
    )
}

export default Layout