import React, { useContext, useEffect, useRef, useState } from 'react'
import './reels.css'
import Header from './header';
import axios from '../api/axios';
import AuthContext from '../context/authProvider';
import Reallllllllll from './r';
import { useNavigate } from 'react-router-dom';
const Reels = () => {
    const [vid,setVid]=useState([])
    const {auth,setOtherProfile,displayBottomNav,cook,cookies2}=useContext(AuthContext)
    const navigator=useNavigate()
    const [cou,setCou]=useState([])
    const [oo,setOO]=useState(true)
    const [job,setJob] =useState([])
      // const cookiep=useCookies()
      let hdhdhdhdhdhdh=[]
    const count = 10;
    let count2 = 10
    let index = 0,
        index2=0
    
    // let job=[]
    let jffjfjf=[]
    let hhh=[]
    const myDivRef = useRef(null);
    const fetchPosts=async ()=>{
        // console.log(job)
        try {
            const request =await axios.post(`/posts/trends`,{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                }),
                Ids:hdhdhdhdhdhdh
            })
            const response=await request
            // console.log(response.data.posts)
            if (response.data.posts.length){
                count2 = response.data.posts.length
                // console.log(count2, index2)
                for (let i =0;  i<count2; i++){
                    hhh.push(response.data.posts[i])
                    hdhdhdhdhdhdh.push(response.data.posts[i]._id)
                }
                // console.log(hhh)
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
  
    useEffect(()=>{
        vid.forEach(item=>{
            job.push(item._id)
        })
        console.log(job)
    },[vid])

    return (
        <div className='container-reels'>
            

            <div className='reels-container'>
                <div className='reels-wrapper' id="reels-wrapper" dir="ltr">
                <div className='viewer-options'>
                    <div className='viewer-cancel' onClick={ ()=>{
                        navigator("/")
                    }}>
                    <svg width="25px" height="25px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="#ffffff" transform="translate(91.520000, 91.520000)"> <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"> </polygon> </g> </g> </g></svg>
                    </div>
                    <div className='viewer-select'>

                    </div>
                </div>
                    {
                        vid.map((item,index)=>(
                           <Reallllllllll item={item} index={index} />
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