import React, { useContext, useEffect, useState } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import AuthContext from '../context/authProvider'
import profileImg from '../assets/images/svg/profile.svg'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { Blur, Grow, Slide } from 'transitions-kit'
import './header.css'
import { AsyncImage } from 'loadable-image';
import axios from '../api/axios';
const Header = ({generalPosts ,setGeneralPosts}) => {
    const [postPosition,setPostPosition] =useState(1)
    const {width}=useWindowSize()
    const {userAuth,cook,cookies2,setBooleanErrHome,setHomeErr ,setFnp,setSideNav ,displayHeader ,setDisplayHeader}=useContext(AuthContext)
    const navigate=useNavigate()
    const [job,setJob] =useState([])
    const [you ,setYou] =useState([])
    const dhhdhdhd= [
      {
        "name":"Suggested for you",
        "id":1
      },
      {
        "name":"From Following",
        "id":2
      },
      {
        "name":"Newest Tweats",
        "id":3
      },
      {
        "name":"Saved Tweats",
        "id":4
      },
      {
        "name":"Posted by you",
        "id":5
      },
      {
        "name":"Liked Posts",
        "id":6
      }
  ]
    let hdhdhdhdhdhdh=[]
    let counter = 0,
      indexing = 0,
      newPosts=[]
    useEffect(()=>{
      // console.log(userAuth)
    },[])
     const fetchPosts2=async ()=>{
       
          try {
            
            const request =await axios.post("/posts/all",{
              signedCookies:JSON.stringify({
                refreshToken: cook,
                accessToken:cookies2
              }),
              // body:{
                Ids:hdhdhdhdhdhdh
              
              // }
            })
            const response=await request
            
            if(response.data.posts.length){
              counter = response.data.posts.length
              for (let i =0;  i<counter; i++){
                // for (let i = 0; i < displayHeader.length; i++) {
                //   const element = array[i];
                // }
                // displayHeader.forEach(item=>{
                  // console.log('displayHeader')
                  // console.log(displayHeader)
                  newPosts.push(response.data.posts[i])
                  hdhdhdhdhdhdh.push(response.data.posts[i]._id)
                // })k
              }
                
              console.error(newPosts)
              setJob([...job,...hdhdhdhdhdhdh])
              setDisplayHeader([...displayHeader, ...newPosts]);
              setGeneralPosts([...generalPosts, ...displayHeader])
              
              // newPosts=[]
              indexing = indexing+ counter
      
            }
          } catch (error) {
            // console.log(error)
            setHomeErr(`${error}`)
            setBooleanErrHome(true)
          }finally{
            setFnp(false)
          }
      
      }
    const fetchPostNewest= async ()=>{
      try {
        const request =await axios.post("/posts/newest",{
          signedCookies:JSON.stringify({
            refreshToken: cook,
            accessToken:cookies2
          }),
          Ids:[]
          
        })
        const response=await request
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
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
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchPostProfile= async ()=>{
      try {
        const request =await axios.post(`/posts/user/${userAuth.user.username}`,{
          signedCookies:JSON.stringify({
            refreshToken: cook,
            accessToken:cookies2
          }),
          skipCount:0
        })
        const response=await request
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchPostFollowing= async ()=>{
      try {
        const request =await axios.post(`/posts/following`,{
          signedCookies:JSON.stringify({
            refreshToken: cook,
            accessToken:cookies2
          }),
          skipCount:0
        })
        const response=await request
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchPostLiked=async ()=>{
      try {
        const request =await axios.post(`/posts/likePosts`,{
          signedCookies:JSON.stringify({
            refreshToken: cook,
            accessToken:cookies2
          }),
          Ids :[]
        })
        const response=await request
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      console.log(postPosition)
      switch (postPosition){
        case 1:
          fetchPosts2()
          break
        case 2:
          fetchPostFollowing()
          break
        case 3:
          fetchPostNewest()
          break
        case 4:
          fetchPostSaved()
          break
        case 5:
          fetchPostProfile()
          break
        case 6:
          fetchPostLiked()
          break

      }
    },[postPosition])
    return (
      <header>
                 <div class='header_navigation'>
                  <div class='set1'  >
                      <div class="l-logo" onClick={()=>setSideNav(true)}>
                      <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" ></path> <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" ></path> <path d="M3 17C2.44772 17 2 17.4477 2 18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18C22 17.4477 21.5523 17 21 17H3Z" ></path> </g></svg>
                      </div>
                      <div class="m-logo">
                        <div class="a1"></div>
                        <div class="a2">
                            <p>tweatFlash </p>
                        </div>
                      </div> 
                  </div>
                  <div class='set2'>
                    <div class='notification'>
                        <div class="notification-counter">
                            10
                        </div>
                        <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.16"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M28.3 22.247c-1.167-1.419-2.765-3.429-2.765-5.48v-6.53c0-5.625-4.207-10.202-9.584-10.202-5.378 0-9.552 4.577-9.552 10.202v6.53c0 2.016-1.734 3.921-2.833 5.4-0.989 1.328-1.77 2.378-1.242 3.427 0.463 0.923 1.624 1.041 2.583 1.041h5.73c0.002 2.944 2.389 5.331 5.333 5.331s5.333-2.386 5.334-5.331h5.864c0.61 0 2.036 0 2.527-1.038 0.495-1.050-0.297-2.016-1.395-3.351zM15.969 29.871c-1.788 0-3.239-1.448-3.241-3.235h6.482c-0.003 1.787-1.452 3.235-3.241 3.235zM27.168 24.506h-22.262c-0.153 0-0.281-0.005-0.386-0.012 0.206-0.319 0.508-0.727 0.755-1.058 1.218-1.637 3.255-3.949 3.255-6.669v-6.53c0-4.452 3.22-8.073 7.423-8.073s7.455 3.622 7.455 8.073v6.53c0 2.813 1.878 5.164 3.249 6.832 0.231 0.281 0.507 0.617 0.722 0.905-0.064 0.002-0.134 0.003-0.209 0.003z"></path> </g></svg>
                      </div>
                    <div class='profile-dp'>
                     {userAuth.user.profileImage ?  <AsyncImage
                                           
                              src={userAuth.user.profileImage}
                              Transition={Blur}
                              style={{ width: "96%", height: "96%", borderRadius: "50%" }}
                              loader={<div style={{ background: '#888' }} />}
                          /> :<img src={profileImg}/>
                     }    
                    </div>
                     
                  </div>
                </div>
                <div class='filter_posts'>

                  <div class='filter_holder'>
                    <div class='filter_select'>
                      {
                        dhhdhdhd.map(item=>(
                          <div class='filter_option' onClick={(e)=>setPostPosition(item.id)}>
                            <p>{item.name}</p>
                          </div>
                        ))
                      }
                      
                      
                      
                    </div>
                    
                  </div>
                </div>  
      </header>
    )
}

export default Header