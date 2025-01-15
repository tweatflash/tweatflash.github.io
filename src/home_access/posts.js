import React, { useContext, useEffect, useRef, useState } from 'react'
import "./posts.css"
import profileImg from '../assets/images/svg/profile.svg'
import useWindowSize from '../hooks/useWindowSize'
import AuthContext from '../context/authProvider'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Header from './header'
import Feed from './feed'
// import useCookies from '../hooks/useCookies'
// 
const Posts = () => {
  const {width}=useWindowSize()
  const HeaderRef=useRef(null)
  const postsRef =useRef(null)
  const [stories,setStories] =useState([])
  // const cookiep=useCookies()
  let counter = 0,
    indexing = 0,
    newPosts=[]
  const {auth,cook,cookies2 , setFnp,userAuth,setSideNav ,setBooleanErrHome,setHomeErr,setCook,setCookies2, setAllowCookies,displayHeader,setDisplayHeader} =useContext(AuthContext)
  const [postClick,setPostClick]=useState(true)
  const navigate= useNavigate()
  const fetchPosts2=async ()=>{
      try {
        const request =await axios.post("/posts/all",{
          signedCookies:JSON.stringify({
            refreshToken: cook,
            accessToken:cookies2
          })
        })
        const response=await request
        if(response.data.posts.length){
          counter = response.data.posts.length
          for (let i =0;  i<counter; i++){
             newPosts.push(response.data.posts[i])
          }
          // newPosts = newPosts.filter(item => displayHeader.includes(item));
          // console.log(filteredArrayB)
          setDisplayHeader([...displayHeader,...newPosts])
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
  window.onscroll=()=>{
    if (HeaderRef.current){
      var prevScrollpos = window.scrollY; 
      window.onscroll = function() { 
          if (width<=450){
            var currentScrollPos = window.scrollY; 
            // console.log(eval(prevScrollpos - currentScrollPos))

            if (eval(prevScrollpos - currentScrollPos )>=5  && width<=450) { 
              document.querySelector("header").classList.remove("hidden"); 
            } else if (eval(prevScrollpos - currentScrollPos )<= -10  && width<=450) { 
              document.querySelector("header").classList.add("hidden"); 
            } else{
              
            }
          prevScrollpos = currentScrollPos; 
        }else if(width>450){
          
          // document.querySelector("header").classList.remove("hidden"); 
        }
      }
    }
  }
  window.onresize=()=>{
    if (width>450 && HeaderRef.current){
      document.querySelector("header").classList.remove("hidden"); 
      // console.log(location)
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
      <header ref={HeaderRef}>
                <div className='header_navigation'>
                  <div className='set1'  onClick={()=>setSideNav(true)}>
                      <div className="l-logo">
                          <svg viewBox="0 0 24 24" ><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                      </div>
                      {/* <div className="m-logo">
                        <div className="a1"></div>
                        <div className="a2"><h2>tweatFlash </h2>
                        </div>
                      </div> */}
                      <h2 className='page-leader'>Homepage</h2>
                  </div>
                  <div className='set2'>
                    <div className='profile-dp'>
                      {auth && userAuth ? <img src={userAuth.user.profileImage} /> : <img style={{width:"100%"}} src={profileImg}/>}
                    </div>
                    {
                      width<=450? <div className='notification'>
                        <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.16"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M28.3 22.247c-1.167-1.419-2.765-3.429-2.765-5.48v-6.53c0-5.625-4.207-10.202-9.584-10.202-5.378 0-9.552 4.577-9.552 10.202v6.53c0 2.016-1.734 3.921-2.833 5.4-0.989 1.328-1.77 2.378-1.242 3.427 0.463 0.923 1.624 1.041 2.583 1.041h5.73c0.002 2.944 2.389 5.331 5.333 5.331s5.333-2.386 5.334-5.331h5.864c0.61 0 2.036 0 2.527-1.038 0.495-1.050-0.297-2.016-1.395-3.351zM15.969 29.871c-1.788 0-3.239-1.448-3.241-3.235h6.482c-0.003 1.787-1.452 3.235-3.241 3.235zM27.168 24.506h-22.262c-0.153 0-0.281-0.005-0.386-0.012 0.206-0.319 0.508-0.727 0.755-1.058 1.218-1.637 3.255-3.949 3.255-6.669v-6.53c0-4.452 3.22-8.073 7.423-8.073s7.455 3.622 7.455 8.073v6.53c0 2.813 1.878 5.164 3.249 6.832 0.231 0.281 0.507 0.617 0.722 0.905-0.064 0.002-0.134 0.003-0.209 0.003z"></path> </g></svg>
                      </div> : <></>
                    }
                  </div>
                </div>
                <div className='filter_posts'>
                  <div className='filter_holder'>
                    <div className='filter_select'>
                      <div className='filter_option active'>
                        <p>Suggested</p>
                      </div>
                      <div className='filter_option'>
                        <p>Following</p>
                      </div>
                      <div className='filter_option'>
                        <p>spaceX community</p>
                      </div>
                      <div className='filter_option'>
                        <p>Tapswap community</p>
                      </div>
                      <div className='filter_option'>
                        <p>mentions</p>
                      </div>
                      <div className='filter_option'>
                        <p>liked posts</p>
                      </div>
                      <div className='filter_option'>
                        <p>bookmark</p>
                      </div>
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
      <div className='photo-viewer'>

      </div>
       <div className='posts-wrapper'>
       
        <div className='post-list'>
        
        {displayHeader ? 
          <div className='posts-order-wrapper'> 
            {displayHeader.map((item,index)=>(<Feed item={item } index={index}/>))}                                                                                                                                                                                                                                                                                                                                                                 
            <div className='btm-ssf' id ="posts-rld" ref={postsRef}>
              <div class="spinner-4"></div>
            </div>
  
            <div className={`btm-nav-cvr ${width <=450 ? "av-und-spc" :""}`} ></div>
            
          </div>
          : <></>}
        </div>
       </div>
    </div>
  )
}

export default Posts