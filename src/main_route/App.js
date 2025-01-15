import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/authProvider'
import Welcome from '../welcomepage/welcome'
import Loader from '../loading_component/loader'
const App = () => {
    const {auth}= useContext(AuthContext)
    
    return auth ?<Navigate to="/home"/>: <Welcome/>
}

export default App  