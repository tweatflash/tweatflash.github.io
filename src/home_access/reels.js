import React, { useContext, useEffect, useRef, useState } from 'react'
import './reels.css'
import Header from './header';
import axios from '../api/axios';
import AuthContext from '../context/authProvider';
import Reallllllllll from './r';
const Reels = () => {
    const [vid,setVid]=useState([])
    const {auth,setOtherProfile,displayBottomNav,cook,cookies2}=useContext(AuthContext)
    
    const [cou,setCou]=useState([])
    const [oo,setOO]=useState(true)
    const count = 10;
    let count2 = 10
    let index = 0,
        index2=0
    
    let job=0
    let jffjfjf=[]
    let hhh=[]
    const myDivRef = useRef(null);
    const fetchPosts=async ()=>{
        try {
            const request =await axios.post(`/posts/trends`,{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                })
            })
            const response=await request
            console.log(response.data.posts)
            if (response.data.posts.length){
                count2 = response.data.posts.length
                console.log(count2, index2)
                for (let i =0;  i<count2; i++){
                    hhh.push(response.data.posts[i])
                   
                }
                console.log(hhh)
                setVid([...vid,...hhh])
                index2 = index2+ count2
            } 

        } catch (error) {
            console.log(error)
        }
    }
   
  function addPoidjd(){
    
    for (let i =index ; i< index + count; i++){
        jffjfjf.push(i)
    }
    
   setTimeout(()=>{
    setCou([...cou,...jffjfjf])
    
   },1000)
    index =index+count

  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
    //   addPoidjd()
      fetchPosts()
    });
  });
  
 useEffect(()=>{
//    document.addEventListener('DOMContentLoaded', () => {
    if (myDivRef.current) { 
        // Access and manipulate myDivRef.current here
        const loader = document.getElementById("loader")
        io.observe(loader);

      }
 },[])
  
    
    return (
        <div className='container-reels'>
            <div className='bookmark_header community-header'>
                <button>
                <svg viewBox="0 0 24 24" fill="none" ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                back
                </button>
                <h2><span><svg className="bookmars-svg" style={{width:"25px",marginRight:"5px"}} viewBox="0 0 24 24">
                    <g style={{strokeWidth:"2",stroke:"#ffffff",fill:"none"}}>
                        <path d="M3 9H9.5M21 9H9.5M9.5 9L14.5 4M14.5 4H17.8C18.8467 4 19.4044 4 19.8221 4.1779M14.5 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.07989 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.88 4.20371 19.8514 4.19037 19.8221 4.1779M9 4L4 9M15 9.00015L19.8221 4.1779M15 14.5L10 17.5V11.5L15 14.5Z"></path>
                        
                    </g>
                </svg></span>Trends</h2>
            </div>

            <div className='reels-container'>
                <div className='reels-wrapper' id="reels-wrapper" dir="ltr">
                    {
                        vid.map((item,index)=>(
                           <Reallllllllll item={item} index={index}/>
                        ))
                    }
                    <div id="loader" ref={myDivRef}>
                        Loading
                </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default Reels