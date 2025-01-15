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
                    <div className='bookmark_header sp-hd'>
                            <button onClick={() => navigate(-1)}>
                            <svg viewBox="0 0 24 24" fill="none" ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            back
                            </button>
                            <h2><span><svg className="bookmars-svg" viewBox="0 0 1024 1024">
                                <g>
                                    <path d="M665.6 768L512 614.4 358.4 768V256h307.2v512zM512 537.6L614.4 640V307.2H409.6V640L512 537.6z"></path>
                                </g>
                            </svg></span>Posts</h2>
                    </div>
                    {
                        width <=450 ? <div className='mobile-comment'>
                            <div className='add-comments'>
                                        <div className='comments_wrapper'>
                                            <div className='phto_wrapper'>
                                                <div className='user_comments'>
                                                {auth && userAuth.user.profileImage ? <img src={userAuth.user.profileImage} /> : <img src={profileImg}/>}
                                                </div>  
                                            </div>
                                            <div className='comment-inpur'>
                                                <div className='user_reply'>
                                                    <input 
                                                        type='text' 
                                                        placeholder='Write your comments'
                                                        onChange={(e)=>setComment(e.target.value)}
                                                        value={comment}

                                                    />
                                                    <div className='snd-comment' onClick={()=>comment_on_Post()}>
                                                    <svg fill="#4070f4" viewBox="0 0 256 256" id="Flat"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M231.626,128a16.015,16.015,0,0,1-8.18262,13.96094L54.53027,236.55273a15.87654,15.87654,0,0,1-18.14648-1.74023,15.87132,15.87132,0,0,1-4.74024-17.60156L60.64746,136H136a8,8,0,0,0,0-16H60.64746L31.64355,38.78906A16.00042,16.00042,0,0,1,54.5293,19.44727l168.915,94.59179A16.01613,16.01613,0,0,1,231.626,128Z"></path> </g></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </div> : <></>
                    }
                    <div className='posts-wrapper'>
                        
                        <div className='post-list'>
                        
                        {posts ? 
                        <div className='posts-order-wrapper'>
                            {posts.map((item,index)=>(<Feed item={item}/>))}                                                                                                                                                                                                                                                                                                                                                                 
                            {
                                        width>450 ? <div className='add-comments'>
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
                                    </div> : <></>
                                    }
                            <div className={`btm-nav-cvr ${width <=450 ? "av-und-spc" :""}`} >
                                <div className='comments-container'>
                                    {!commentData.length && posts?
                                    <>
                                    <div className='no-comments'>
                                            <h2>No comments to display</h2>
                                            <p>be the first to comment</p>
                                            <button>Create Comment</button>
                                    </div>
                                </> : 
                                        <>
                                            <h2>Comments</h2>
                                            <div className='comments-wrapper'>
                                                    
                                                    {
                                                        commentData.map(item=> (<><div className='comment'>
                                                                <div className='comment-dp'>
                                                                    <div className='comments-user-photo'>
                                                                        <img src={ profileImg} />
                                                                    </div>
                                                                </div>
                                                                <div className='comment-content'>
                                                                    <div className='nu-content'>
                                                                        <div className='profile-details'>
                                                                        <p className='post-name'>
                                                                            {item.user.name}
                                                                            {/* Elon Musk */}
                                                                            <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none">
                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                                            <g id="SVGRepo_iconCarrier">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z" fill="#4070f4"></path> 
                                                                            </g>
                                                                            </svg>
                                                                        </p>  
                                                                        <p className='userName'>
                                                                            <span>@{item.user.username}&nbsp;&nbsp;</span> 
                                                                        </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='co-cnt'>
                                                                        <div className='co-cnt-data'>
                                                                            <div className='cnt-chld'>
                                                                            <p>
                                                                                    <span className='psts_text'>{item.text}</span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>)
                                                        )
                                                            
                                                    }
                                                
                                                

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