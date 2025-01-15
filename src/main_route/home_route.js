import React, { useContext, useEffect, useState } from 'react'
import { axiosKindOfPostWithoutAnything, axiosPrivate } from '../api/axios'
import AuthContext from '../context/authProvider'
import Posts from '../home_access/posts'
import PostsLoader from './postsLoader'
import useWindowSize from '../hooks/useWindowSize'
import { useLocation, useNavigate } from 'react-router-dom'
import Access_Loader from '../loading_component/access_loader'
import Header from '../home_access/header'

const Home_Route = () => {
  const {cookies,cookies2,displayHeader,setDisplayHeader} =useContext(AuthContext)
  const [loading,setLoading]=useState(true)
  const [posts,setPosts] =useState([])
  const navigate=useNavigate()
  const {width}=useWindowSize()
  const signedCookies={
      "refreshToken":cookies,
      "accessToken" :cookies2
  }
  
  
      // const location = useLocation();
  
      // useEffect(() => {
      //   document.querySelector("header").classList.remove("hidden"); 
      // }, [location]);
  const fetchPosts=async ()=>{
    try {
      const request =await fetch("https://tweatflash.onrender.com/api/v1/posts/user/tweatflash",{
        method:"POST",
        headers:{
          "Content-Type":'application/json',
        },
        body:JSON.stringify({
          signedCookies:{
            refreshToken:cookies,
            accessToken :cookies2
          }
        })
      })
      const response=await request.json()
      if(response){
        setLoading(false)
        setPosts(response.posts)
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    setPosts(displayHeader)
  },[displayHeader])

  return (
    <div className='css-00010-mainFlow'>
      {
        
      }
        {/*  */}
        <>
          {posts ? <Posts /> :<>
            <Access_Loader/>
            
          </>}
          
        </>
        <>
          {
            width <=800  ? <div className='add-posts'  onClick={()=>navigate("/new-status")}>
              <svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>add</title> <path d="M24 18h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z"></path> </g></svg>
            </div> :<></>
          }
        </>
    </div>
  )
}

export default Home_Route