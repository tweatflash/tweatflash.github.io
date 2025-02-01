import { Blur, Grow, Slide } from 'transitions-kit'
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./posts.css"
import profileImg from '../assets/images/svg/profile.svg'
import useWindowSize from '../hooks/useWindowSize'
import AuthContext from '../context/authProvider'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Header from './header'
import Feed from './feed'
import { AsyncImage } from 'loadable-image'
// import useCookies from '../hooks/useCookies'
// 
const Posts = () => {
  const {width}=useWindowSize()
  const HeaderRef=useRef(null)
  const postsRef =useRef(null)
  const [stories,setStories] =useState([])
  // const cookiep=useCookies()
  const [you ,setYou] =useState([])
  let counter = 0,
    indexing = 0,
    newPosts=[]
  const {auth,cook,cookies2 , uploadPost,setUploadPost ,setFnp,userAuth,setSideNav ,setBooleanErrHome,setHomeErr,setCook,setCookies2, setAllowCookies,displayHeader,setDisplayHeader} =useContext(AuthContext)
  const [postClick,setPostClick]=useState(true)
  const navigate= useNavigate()
  const fetchPosts2=async ()=>{
      try {
        const request =await axios.post("/posts/all",{
          signedCookies:JSON.stringify({
            refreshToken: cook,
            accessToken:cookies2
          }),
          // body:{
            Ids:[]
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
            // })
          }
         
          
          setDisplayHeader([...displayHeader, ...newPosts]);
          // newPosts=[]
          indexing = indexing+ counter
  
        }
      } catch (error) {
        console.log(error)
        setHomeErr(`${error}`)
        setBooleanErrHome(true)
      }finally{
        setFnp(false)
      }
  
  }
  let itemToRemove=[]
  // const result = newArray.filter((item) => postArray.some(data=> data.id === item.id))
  const fetchStories=async ()=>{
    try {
      const request =await axios.post("/stories/following",{
        signedCookies:JSON.stringify({
          refreshToken: cook,
          accessToken:cookies2
        })
      })
      const response=await request
      console.log(response)
      setStories(response.data)
    } catch (error) {
      console.log(error)
    }
  }
      
   const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        // setFnp(true)
        fetchPosts2()
      });
    });
    
   useEffect(()=>{
      if (postsRef.current) { 
          const loader = document.getElementById("posts-rld")
          io.observe(loader);
       
        }
        fetchStories()
   },[])
   var img = document.createElement('img');

    img.src = 'some-image.jpg';

    var poll = setInterval(function () {
        if (img.naturalWidth) {
            clearInterval(poll);
            console.log(img.naturalWidth, img.naturalHeight);
        }
    }, 10);

    img.onload = function () { console.log('Fully loaded'); }
  return (
    <div className='posts-container'>
      
      <>
          {stories.length?<div className='status'>
        <div className='status-options'>
          <p>Status</p>
          <button>more</button>
        </div>
         <div className='s-cnt'>
          <div className='status-wrapper'>
                <div className='ststus-i'>
                  <div className='status-prof'>

                  </div>
                </div>
                <div className='ststus-i'>
                  <div className='status-prof'>
                    
                  </div>
                </div>  
                <div className='ststus-i'>
                  <div className='status-prof'>

                  </div>
                </div>
                <div className='ststus-i'>
                  <div className='status-prof'>
                    
                  </div>
                </div>  
                <div className='ststus-i'>
                  <div className='status-prof'>

                  </div>
                </div>
                <div className='ststus-i'>
                  <div className='status-prof'>
                    
                  </div>
                </div>  
          </div>
         </div>
      </div>:<></>

          }
      </>
      <div className='photo-viewer'>

      </div>
       <div className='posts-wrapper'>
       
        <div className='post-list'>
        
        {displayHeader ? 
          <div className='posts-order-wrapper'> 
            {displayHeader.map((item,index)=>(<Feed item={item } index={index} type={"p"}/>))}                                                                                                                                                                                                                                                                                                                                                                 
            <div className='btm-ssf' id ="posts-rld" ref={postsRef}>
              <div class="spinner-4"></div>
            </div>
  
            <div className={`btm-nav-cvr ${width <=550 ? "av-und-spc" :""}`} ></div>
            
          </div>
          : <></>}
        </div>
       </div>
    </div>
  )
}



export default Posts