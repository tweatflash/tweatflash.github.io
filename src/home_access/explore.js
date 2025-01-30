import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'
import profileImg from '../assets/images/svg/profile.svg'
import Home from './home'
import Error from '../errr/error'
import Header from './header'
import Navigation_Menu from './navigation'
import Botttom_nav from './bottom_nav'
import AuthContext from '../context/authProvider'
import axios from '../api/axios'

const Explore = () => {
  const data=useParams()
  const {width}=useWindowSize()
  const [userAuth,setUserAuth]=useState("")
  const mobile=width<=550
  const mobile2=width>=450
  const {auth,setOtherProfile,displayBottomNav,cook,cookies2}=useContext(AuthContext)
  // console.log(data.user)
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
  return (<>
    {userAuth? 
    <>
      <div className='main_data_extractor grip'>
            <div className='container_size'>
                {/* <Header/> */}
                <div className='main'>
                    <div className='hmmmshit'>
                    <div className='css083yewe'>
                        
                    </div>
                    {!mobile? <nav className='route_nav_wrapper'>
                        <Navigation_Menu/>    
                    </nav> :
                    <></>
                    }
                    <div className='css0000_main'>
                        
                        <div className='vdv'>
                            <Outlet/>
                            
                            <div className='photo_viewer'>
                                
                            </div>
                        </div>
                        {!mobile? <div className='css0001_mre'>
                            <div className='chck_sm'>
                                
                            </div>
                        </div>:
                        <></>
                        }
                    </div>
                    </div>
                </div>
                {mobile && displayBottomNav? <Botttom_nav/> : <></>}
            </div>
        </div>
    </>
    :<Error/>
    }
  </>)
}

export default Explore