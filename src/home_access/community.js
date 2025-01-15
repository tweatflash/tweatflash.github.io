import React, { useEffect, useState } from 'react'
import './community.css'
import axios from '../api/axios'
import AuthContext from '../context/authProvider'
import { useContext } from 'react'
import Posts from './posts'
import Access_Loader from '../loading_component/access_loader'
import profileImg from '../assets/images/svg/profile.svg'
import { useNavigate } from 'react-router-dom'

const Community = () => {
    const {cook,cookies2}=useContext(AuthContext)
    const navigate=useNavigate()
    const [posts,setPosts]=useState([])
    const fetchPosts=async ()=>{
            try {
                const request=await axios.post(`/community/suggested`,{
                    signedCookies:JSON.stringify({
                        refreshToken: cook,
                        accessToken:cookies2
                 })
                })
                const response=await request
                console.log(response)
                setPosts(response.data)
            } catch (error) {
                console.log(error)
            }
    }
    useEffect(()=>{
        fetchPosts()
    },[])
    
  return (
   
    <div className='container-community'>
        <div className='community-wrapper'>
            <div className='community-holder'>
                <div className='community-list'>
                    {
                        posts.length? posts.map(item=>(
                            <div className='community' onClick={()=>navigate(`${item._id}`)}>
                                <div className='header-cmm'>
                                    <div className='c-hw'>
                                        <div className='p-img'>
                                            <img src={item.profileImage}/>
                                        </div>
                                        <div className='cm-usrs'>
                                            
                                            {item.followers.slice(0,3).map((item,index)=>(
                                                <div className='usrs'>
                                                    <img src={item.profileImage?item.profileImage :profileImg}/>
                                                </div>
                                            ))}
                                            <div className='usrs-num'>
                                                + {item.followers.length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='body-cmm'>
                                    <div className='c-bw'>
                                        <h2>{item.name}</h2>
                                        <div className="cmm-wrt">
                                            <p>
                                                <span className='cmm-bio'>
                                                    {item.bio.length > 120 ? `${item.bio.slice(0,120)}...` : item.bio} <span></span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='footer-cmm'>
                                    <div className='c-ftr'>
                                        <div className='ftr-opp'>
                                            <div className='f-opp'></div>
                                            <div className='f-opp'></div>
                                        </div>
                                        <button>Requst Join</button>
                                    </div>
                                </div>
                            </div>
                        )) :<Access_Loader/>
                    }
                    
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Community