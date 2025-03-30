import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './notification.css'
import AuthContext from '../context/authProvider'
import axios from '../api/axios'

const Notification = () => {
    const navigator= useNavigate()
    const {cook,cookies2} = useContext(AuthContext)
    const [notifications,setNotifications] =useState([])
    const fetchPosts1=async ()=>{
        try {
            const request =await axios.post(`/notifications`,{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                }),
                skipCount:0
            })
            const response=await request
            console.log(response)
            if (response.data){
                setNotifications(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchPosts1()
    },[])
    return (
        <div className='notification-page'>
            <div className='general-header'>
                <div className='arrow-back' onClick={()=> navigator(-1)}>
                <div className='arw-bck-profile custm-fja'>
                    <svg viewBox="0 0 24 24" fill="none"   ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                </div>
                <div className='mre-edata-con'>
                <p>Notification</p>
                
                </div>
            </div>
            <div className='notification-wrapper'>

            </div>
        </div>
    )
}

export default Notification