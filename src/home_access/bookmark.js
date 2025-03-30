import React, { useContext, useEffect, useState } from 'react'
import './bookmark.css'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import AuthContext from '../context/authProvider'
import Feed from './feed'
import Access_Loader from '../loading_component/access_loader'

const Bookmark = () => {
    const {cook,cookies2}=useContext(AuthContext)
    const navigate=useNavigate()
    const [savedPost,setSavedPost] =useState([])
    const [loading,setLoading] =useState(true)
    const fetchPostSaved= async ()=>{
        try {
            const request =await axios.post("/posts/getflags",{
                signedCookies:JSON.stringify({
                refreshToken: cook,
                accessToken:cookies2
                }),
                Ids:[]
            })
            const response=await request
            setSavedPost(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchPostSaved()
    },[])
    
    return (
        <div className='bookmarks_page'>
            <div className='container_bookmarks'>
            <div className='general-header'>
                    <div className='arrow-back' onClick={()=> navigate(-1)}>
                    <div className='arw-bck-profile custm-fja'>
                        <svg viewBox="0 0 24 24" fill="none"   ><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>
                    </div>
                    <div className='mre-edata-con'>
                    <p>Saved Tweats</p>
                    
                    </div>
                </div>
                {
                    loading ? <Access_Loader/> :<>
                        {
                            savedPost.length ?<div className='posts-wrapper'>
                                <div className='post-list'> 
                                    <div className='posts-order-wrapper'>
                                          {savedPost.map(item=>(<Feed item={item} />)) } 
                                    </div> 
                                </div> 
                            </div>:<div className='no_bookmarks'>
                                <div className='b-svg'>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" strokeWidth="2" stroke-linejoin="round"></path> </g></svg>
                                    <p>No Posts saved</p>
                                </div>
                            </div>
                        }
                    </>
                }
               
            </div>
        </div>
    )
}

export default Bookmark