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
import { useDispatch, useSelector } from 'react-redux'
import { forYouPostadded, selectAllPosts } from './forYouPostsSlice'
// import useCookies from '../hooks/useCookies'
// 
const Posts =  () => {
  const forYouPost=useSelector(selectAllPosts)
  const {width}=useWindowSize()
  const [postPosition,setPostPosition] =useState(1)
  const HeaderRef=useRef(null)
  const dispatch=useDispatch()
  const postsRef =useRef(null)
  const [comments, setComments] =useState(false)
  const [stories,setStories] =useState([])
  const [job,setJob] =useState([])
  const [generalPosts,setGeneralPosts] =useState([])
  // const cookiep=useCookies()
  const [you ,setYou] =useState([])
  let hdhdhdhdhdhdh=[]
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
  let counter = 0,
    indexing = 0,
    newPosts=[]
  const {auth,cook,cookies2 ,setShowBm, uploadPost,setUploadPost ,setFnp,userAuth,setSideNav ,setBooleanErrHome,setHomeErr,setCook,setCookies2, setAllowCookies,displayHeader,setDisplayHeader} =useContext(AuthContext)
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
            
          // console.error(newPosts)
          setJob([...job,...hdhdhdhdhdhdh])
          setDisplayHeader([...displayHeader, ...newPosts]);
          // setGeneralPosts([...displayHeader])
          // dispatch(
          //   forYouPostadded(newPosts)
             
          // )
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
  useEffect(()=>{
    setShowBm(true)
    console.log(auth)
  },[])
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

      // console.log(response)
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
      // console.log(job)
    },[job])
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
            // console.log(img.naturalWidth, img.naturalHeight);
        }
    }, 10);

    // img.onload = function () { console.log('Fully loaded'); }
  return (
    <div className='posts-container'>
       <header>
                <div class='header_navigation'>
                <div class='set1'  >
                    <div class="l-logo" onClick={()=>setSideNav(true)}>
                      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </div>
                    <div class="m-logo">
                      <div class="a1"></div>
                      
                      <p>Home</p>
                      
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
                            <p className='p-g-bold'>{item.name}</p>
                        </div>
                      ))
                    }
                    
                    
                    
                  </div>
                  
                </div>
              </div>  
            </header>
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
      
       <div className='posts-wrapper'>
       
        <div className='post-list'>
        
        {displayHeader ? 
          <div className='posts-order-wrapper'> 
            {displayHeader.map((item,index)=>(<Feed item={item } index={index} type={"p"} setComments={setComments}/>))}                                                                                                                                                                                                                                                                                                                                                                 
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