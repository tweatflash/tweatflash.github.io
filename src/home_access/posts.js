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
  const [comments, setComments] =useState(false)
  const [stories,setStories] =useState([])
  const [job,setJob] =useState([])
  // const cookiep=useCookies()
  const [you ,setYou] =useState([])
  let hdhdhdhdhdhdh=[]
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
    
  },[displayHeader])
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
      console.log(job)
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
            console.log(img.naturalWidth, img.naturalHeight);
        }
    }, 10);

    img.onload = function () { console.log('Fully loaded'); }
  return (
    <div className='posts-container'>
      <div className={`comment-wrapper ${comments ? "active" :""}`}>
        <div className={`p-comments-container ${comments ? "active" : ""}`}>
          <div className='p-cmtns-hheader'>
            <div className='pc-hd-cnt'>
              <div>
                {/* <p>Augustine's Post</p> */}
              </div>
              <div className='cmts-cancel' onClick={()=>setComments(false)}>
              <svg width="25px" height="25px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="#ffffff" transform="translate(91.520000, 91.520000)"> <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"> </polygon> </g> </g> </g></svg>
              </div>
            </div>
          </div>
          <div className='p-cmtns-ft'>
             <div className='pc-wrp'>
                <div className='cmts-adm'>
                  <div className='cmt-a-ph'>

                  </div>
                </div>
                <div className='comments-edit' contentEditable placeholder="eshdj jfj"></div>
             </div>
          </div>
        </div>
      </div>
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