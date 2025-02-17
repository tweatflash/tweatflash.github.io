    import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./posts.css"
import profileImg from '../assets/images/svg/profile.svg'
import useWindowSize from '../hooks/useWindowSize'
import AuthContext from '../context/authProvider'
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import Feed from './feed'

const SinglePosts = () => {
    const navigate = useNavigate();
    const [posts,setPosts]=useState([])
    const data= useParams()
    const [comment ,setComment]=useState("")

    const [commentData,setCommentData]=useState([])
    useEffect(()=>{
        
    },[comment])
    const {width}=useWindowSize()
    const {cook,cookies2 ,userAuth,auth,setDisplayBottomNav,setBooleanErrHome,setHomeErr} =useContext(AuthContext)
    function  time(change_time_format){
        var d = new Date(change_time_format);
        let hours,
        minutes,
        seconds
        hours =d.getUTCHours(); // Hours
        minutes =d.getUTCMinutes(); //Minutes
        seconds =d.getUTCSeconds(); //Seconds
        if (hours <=24){
            return `${hours} hrs ago`
        }else if(hours ===0 && minutes !==0){
            return `${minutes} min ago`
        }
    }  
    const fetchPosts=async ()=>{
        try {
            const request=await axios.post(`posts/singlePost/${data.postId}`,{
                signedCookies:JSON.stringify({
                    refreshToken: null,
                    accessToken:null
             })
            })
            const response=await request
            console.log(response)
            if(response.data.posts){
              // setOtherProfile(response)
              // setUserAuth(response)
            //   
              setPosts(response.data.posts)      
              setCommentData(response.data.posts[0].comments)
            //   console.log(response.data.posts[0].comments)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const comment_on_Post=async ()=>{
        if (comment){
            // setComment("")
            try {
                const request=await axios.post(`/posts/commentOrReply/${data.postId}`,{
                    signedCookies:JSON.stringify({
                        refreshToken: cook,
                        accessToken:cookies2
                    }),
                    text:comment
                })
                const response=await request
                console.log(response)
                if (response.status===200){
                    setBooleanErrHome(true)
                    setHomeErr(`comment sent succesfully`)
                    setComment("")
                }
            } catch (error) {
                setBooleanErrHome(true)
                setHomeErr(`failed to send comment`)
                console.log(error)
            }
        }
    }
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
//         headers:{
//           "Content-Type":'application/json',
//         },
//         body:JSON.stringify({
//           signedCookies:{
//             refreshToken:null,
//             accessToken :null
//           }
//         })
//       })
//       const response=await request.json()
//       if(response.posts){
//         // setOtherProfile(response)
//         // setUserAuth(response)
//         setPosts(response.posts)      
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
  const likePost=(postId)=>{

  }
  useEffect(()=>{
    fetchPosts()
    setDisplayBottomNav(false)
  },[])
  return (
    <>
        {
            posts && userAuth? <>
            
                <div className='posts-container'>
                    
                    
                    <div className='posts-wrapper'>
                        
                        <div className='post-list'>
                        
                        {posts ? 
                        <div className='posts-order-wrapper'>
                            {posts.map((item,index)=>(<Feed item={item}/>))}                                                                                                                                                                                                                                                                                                                                                                 
                            {
                                       <div className='add-comments'>
                                        <div className='comments_wrapper'>
                                            <div className='phto_wrapper'>
                                                <div className='user_comments'>
                                                {auth ? <img src={userAuth.user.profileImage} /> : <img src={profileImg}/>}
                                                </div>
                                            </div>
                                            <div className='comment-inpur'>
                                                <div className='user_reply'>
                                                    <input 
                                                        type='text' 
                                                        placeholder='Write your comments'
                                                        onChange={(e)=>setComment(e.target.value)}
                                                        value={comment}
                                                        onSubmit={()=>comment_on_Post()}
                                                    />
                                                    <div className='snd-comment' onClick={()=>comment_on_Post()}>
                                                    <svg fill="#4070f4" viewBox="0 0 256 256" id="Flat"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M231.626,128a16.015,16.015,0,0,1-8.18262,13.96094L54.53027,236.55273a15.87654,15.87654,0,0,1-18.14648-1.74023,15.87132,15.87132,0,0,1-4.74024-17.60156L60.64746,136H136a8,8,0,0,0,0-16H60.64746L31.64355,38.78906A16.00042,16.00042,0,0,1,54.5293,19.44727l168.915,94.59179A16.01613,16.01613,0,0,1,231.626,128Z"></path> </g></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                            <div className={`btm-nav-cvr`} >
                                <div className='comments-container'>
                                    {!commentData.length && posts?
                                    <>
                                        
                                    </> : 
                                        <>
                                            <div class="prompt-content">
                                                <ul>
                                                    {commentData.map(item=>(
                                                        <li>
                                                            <div class="comment">
                                                                <div class="profile cm-img-hnd"></div>
                                                                <div class="main-comments-user-d">
                                                                    <div class="comment-text">
                                                                        <span>{item.user.name}</span>
                                                                        <p>
                                                                            {item.text}
                                                                        </p>
                                                                        {/* <div class="img-cmt-hldr">
                                                                            <div class="cmt-img">
                                                                                <img src="sss.webp" alt="" srcset=""/>
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                    <div class="mr-usr-cmt-options">
                                                                        <div class="us-cmt-opt">
                                                                            <div class="cmt-opts">
                                                                                <p>8h</p>
                                                                                <p>290 Likes</p>
                                                                                <p>Reply</p>
                                                                            </div>
                                                                            <div class="cmt-opts">
                                                                                <p>❤</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                    
                                                </ul>
                                            </div>
                                            
                                        </>
                                    
                                    }
                                </div>
                            </div>
                            
                        </div>
                        : <></>}
                        </div>
                        
                    </div>
                    
                </div>
            </> :
            <></>
        }
    </>
  )
}

export default SinglePosts