import React, { useContext, useEffect, useState } from 'react'
import './userppl.css'
import AuthContext from '../context/authProvider'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../api/axios'
import FollowDetails from './follow'

const UserPeople = () => {
    const {auth,displayBottomNav,cook,cookies2}=useContext(AuthContext)
    const user=useParams()
    const navigate=useNavigate()
    const g="*"
    const {setShowBm} =useContext(AuthContext)
    const [loader,setLoader]=useState(false)
    const [followers,setFollowers]=useState([])
    const [following,setFollowing]=useState([])
    const fetchPosts1=async ()=>{
        try {
          const request =await axios.post(`/users/profile/${user["*"].split('/')[0]}`,{
            signedCookies:JSON.stringify({
              refreshToken: cook,
              accessToken:cookies2
            })
          })
          const response=await request
          console.log(response)
          if(response.data.user){
            setFollowers(response.data.user.followers)
            setFollowing(response.data.user.following)
          }
          
        } catch (error) {
          console.log(error)
        }
      }
    useEffect(()=>{
        setShowBm(false)
        const route_data= user["*"].split('/')[0]
        console.log(route_data)
        fetchPosts1()
    },[])
  return (
    <div className='user-ppl'>
        <div className='general-header'>
            <div className='gh-2'>
            <div className='arrow-back' onClick={()=>navigate(-1)}>
              <div className='arw-bck-profile custm-fja'>
                <svg viewBox="0 0 24 24" fill="none"   ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
            </div>
            <div className='mre-edata-con'>
              <p>Followers</p>
              
            </div>
            
          </div>
            <div className='f-flw'>
            <div className='dm-hldr'>
                <div className='dm-cnt active'>
                     <p className='p-g-bold'>Following</p>
                </div>
                <div className='dm-cnt'>
                    <p className='p-g-bold'>Followers</p>
                </div>
            </div>
          </div>
        </div>
        <div className='user-ppl-list'>
            {
                followers.length ? followers.map((item)=>(<FollowDetails item={item} />)) : <></>
            }
        </div>
    </div>
  )
}

export default UserPeople