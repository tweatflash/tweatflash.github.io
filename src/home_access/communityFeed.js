import React, { useContext, useEffect, useRef, useState } from 'react'
import "./posts.css"
import "./communityfeed.css"
import profileImg from '../assets/images/svg/profile.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import useWindowSize from '../hooks/useWindowSize'
import AuthContext from '../context/authProvider'
import { AsyncImage } from 'loadable-image'
import { Blur, Grow, Slide } from 'transitions-kit'
import Content_wrapper from './content_wrapper'
const CommunityFeed = ({item,index ,type,setComments}) => {
    const postsRef =useRef(null)
    const navRef=useRef(null)
    const {width}=useWindowSize()
    const [myNav,SetMyNav] =useState(false)
    let counter = 0,
    indexing = 0,
    newPosts=[]
    const {auth,cook,cookies2 , imgUrl,setImgUrl,userAuth,setBooleanErrHome,setEOption,setECordinate,setHomeErr,setCook,setCookies2, setAllowCookies,im,setIm,setCommentsPrawler,setShowComments,setPostId} =useContext(AuthContext)
    const [postClick,setPostClick]=useState(true)
    const navigate= useNavigate()
    function time(date) {
        const now = new Date();
        const past = new Date(date);
        const diff = now - past;
      
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        if (days > 0) {
          return days + (days === 1 ? ' day ago' : ' days ago');
        } else if (hours > 0) {
          return hours + (hours === 1 ? ' hour ago' : ' hours ago');
        } else if (minutes > 0) {
          return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
        } else {
          return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
        }
    }
    const likePost =async (postId)=>{
        try {
            const request=await axios.post(`/communityPosts/like/${postId}`,{
            signedCookies:JSON.stringify({
                refreshToken: cook,
                accessToken:cookies2
            })
            })
            const response=await request
            console.log(response)
            if (response.data.refreshTokenJWT && response.data.accessTokenJWT){
            setAllowCookies(true)
            setCook(response.data.refreshTokenJWT)
            setCookies2(response.data.accessTokenJWT)
            }
            setBooleanErrHome(true)
            setHomeErr(`${response.data.msg}`)

            // console.log(userAuth)
        } catch (error) {
            setBooleanErrHome(true)
            setHomeErr(`Sorry an unexpected error occured`)
        }
    }
    const sendATweatstar =async (postId,userId)=>{
        try {
            const request=await axios.post(`payment/tweatstars/send`,{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                }),
                contentId:postId,
                recieverId:userId,
                content:'post',
                tweatcoins:1
            
            })
            const response=await request
            if (response.status===200){
                setBooleanErrHome(true)
                setHomeErr(`you successfully gifted 1 tweatstars`)

            }

        } catch (error) {
            console(error)
        }
    }
    return (
        <div className='posts' tabIndex={"0"} onClick={()=>{
            if (postClick){
                // `)
            }
            
            console.log(item)
        
        }} key={item._id}>
                <div className='post-contain'>
                <div className='post-wrap'>
                
                    <div className='post-head'>
                       
                    <div className='p-header-content'>
                        
                        <div className='pp-content'>
                        <div className='pp-image' tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)}>
                            {item.user.profileImage ? <AsyncImage
                                key={index}
                                src={item.communityDetails.profileImage}
                                Transition={Blur}
                                style={{ width: "100%", height: "100%", borderRadius: 50 }}
                                loader={<div style={{ background: '#888' }} />}
                            /> : <img src={profileImg}/>}
                        </div>
                        
                        </div>
                        
                        <div className='nu-content'>
                        
                        <div className='profile-details'>
                            
                            <p className='post-name cmm-feed-pm' >
                                <span className='cmm-pstnme'>
                                    <Link to={`/community/${item.communityDetails._id}`}>
                                        {item.communityDetails.name}
                                    </Link>
                                    
                                </span>
                               <button>Join </button>
                            </p>  
                           <div className='feed-dtl'>
                                <div className='feed-comm-mem'>
                                    {
                                        item.communityDetails.followers.length >=4 ? <>
                                            <div className='feed-mem-comm'></div>
                                            <div className='feed-mem-comm'></div>
                                            <div className='feed-mem-comm'></div>
                                            <div className='feed-mem-comm'></div>
                                        </> :<></>
                                    }
                                        
                                    <span>
                                    {item.communityDetails.followers.length} Members
                                    </span>
                                </div>
                           </div>
                        </div>
                        </div>  
                    </div>
                    <div className='elipsis' onClick={(e)=>{
                        e.preventDefault()
                        setEOption(true)
                        setECordinate([e.pageX,e.pageY])
                        // SetMyNav(!myNav)
                        // setFocusMagic(!focusMagic)
                    }} > 
                    {/* <svg  viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g><path d="M10 10h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z"></path></g></svg> */}
                    <svg className='svg_elipsis' viewBox="0 0 24 24" version="1.1"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="web-app" stroke="none" strokeWidth="1" fill-rule="evenodd"> <g id="elipsis-v" > <path d="M12,20 C10.8954305,20 10,19.1045695 10,18 C10,16.8954305 10.8954305,16 12,16 C13.1045695,16 14,16.8954305 14,18 C14,19.1045695 13.1045695,20 12,20 Z M12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 Z M12,8 C10.8954305,8 10,7.1045695 10,6 C10,4.8954305 10.8954305,4 12,4 C13.1045695,4 14,4.8954305 14,6 C14,7.1045695 13.1045695,8 12,8 Z" id="Shape"> </path> </g> </g> </g></svg>
                    {/* <svg className='svg_elipsis' viewBox="0 0 24 24"><g  strokeWidth="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg> */}
                    </div>
                    </div>
                    <div className='post-body'>
                    <div className='post-content'>
                        {item.text ? <div className={`posts-text-content ${(!item.img || !item.img.length ) &&(!item.video || !item.video.length ) && item.text ? "post-main-text" :""}`}>
                        <p>
                            <span className='psts_text p-g-bold'>{`${item.text.slice(0,300 )}${item.text.length >300 ? "..." :""}`}</span>
                        </p>
                        </div> :<></>}
                        <Content_wrapper item={item} setPostClick={setPostClick}  imgUrl={imgUrl} setIm={setIm} im={im} setImgUrl={setImgUrl} />
                    </div>
                    <div className='post-reaction'>
                        <div className='reaction-posts'>
                            <div className='post-act-action'>
                            <div className={`svg-wrpr like_btn ${auth && userAuth.user.likedPosts.includes(item._id) ? "liked" : ""}`} tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)} onClick={(e)=>{
                                likePost(item._id)
                                e.target.classList.toggle("liked")
                            }}>
                                <svg className='z-ndx' viewBox="0 0 24 24" stroke='#f4144c' fill= {"none"} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>&nbsp; <span className='z-ndx'>{item.likes ===null || !item.likes.length ? 0 :item.likes.length} </span>
                                
                            </div>
                            <div className='svg-wrpr' onClick={()=>{
                                // navigate(`/${item.user.username}/status/${item._id}`) 
                                setCommentsPrawler(item.comments)
                                setShowComments(true)
                                setPostId(item._id)
                            }}>
                                <svg  fill='#4070f4' viewBox="0 4 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="iconCarrier"><path d="M7.28 24.2c-1.12 0-1.72-1.12-2.2-2-0.2-0.32-0.48-0.92-0.64-1-0.12-0.040-0.32-0.080-0.56-0.080-0.68-0.040-1.68-0.16-2.56-1.44-0.8-1.12-1.68-4.16-1.2-6.84 0.28-1.64 1.040-2.88 2.16-3.64 1.8-1.24 5.080-1.4 6.4-1.4 2.36 0 5.64 0.4 7 1.56 1.36 1.12 1.96 4.040 1.84 6.32-0.080 2.080-0.72 3.64-1.76 4.36-0.64 0.44-1.56 0.68-3 0.68-0.6 0-1.16-0.040-1.76-0.080-0.52-0.040-1-0.040-1.44-0.040-0.8 0-1 0.12-1.040 0.12-0.040 0.12 0.040 0.64 0.12 0.88 0.16 0.68 0.44 2.16-0.96 2.52-0.12 0.040-0.24 0.080-0.4 0.080zM8.68 9.48c-2.44 0-4.48 0.4-5.44 1.080-0.76 0.52-1.24 1.36-1.44 2.52-0.4 2.12 0.28 4.72 0.88 5.6 0.48 0.64 0.8 0.68 1.36 0.72 0.32 0.040 0.68 0.040 1.040 0.2 0.68 0.28 1.12 1.040 1.52 1.76 0.12 0.24 0.36 0.64 0.52 0.88-0.040-0.12-0.040-0.24-0.080-0.32-0.16-0.72-0.4-1.84 0.48-2.56 0.52-0.44 1.36-0.48 2.080-0.48 0.48 0 0.96 0.040 1.52 0.040 0.56 0.040 1.12 0.080 1.64 0.080 1 0 1.68-0.12 2.040-0.36 0.6-0.4 1-1.56 1.040-3.080 0.080-2.28-0.56-4.4-1.24-4.96-0.68-0.52-3-1.12-5.92-1.12z"></path> </g></svg><span>{item.comments.length}</span>
                                </div>
                            <div className='svg-wrpr'>
                                <svg fill='green' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z"></path></g></svg><span>0</span>
                                </div>
                                {/* {type==="p"? item.reposts.length : item.quotes.length} */}
                            <div className='svg-wrpr'>
                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#4070f4" fill-rule="evenodd" d="M3.415 10.242c-.067-.086-.13-.167-.186-.242a16.806 16.806 0 011.803-2.025C6.429 6.648 8.187 5.5 10 5.5c1.813 0 3.57 1.148 4.968 2.475A16.816 16.816 0 0116.771 10a16.9 16.9 0 01-1.803 2.025C13.57 13.352 11.813 14.5 10 14.5c-1.813 0-3.57-1.148-4.968-2.475a16.799 16.799 0 01-1.617-1.783zm15.423-.788L18 10l.838.546-.002.003-.003.004-.01.016-.037.054a17.123 17.123 0 01-.628.854 18.805 18.805 0 01-1.812 1.998C14.848 14.898 12.606 16.5 10 16.5s-4.848-1.602-6.346-3.025a18.806 18.806 0 01-2.44-2.852 6.01 6.01 0 01-.037-.054l-.01-.016-.003-.004-.001-.002c0-.001-.001-.001.837-.547l-.838-.546.002-.003.003-.004.01-.016a6.84 6.84 0 01.17-.245 18.804 18.804 0 012.308-2.66C5.151 5.1 7.394 3.499 10 3.499s4.848 1.602 6.346 3.025a18.803 18.803 0 012.44 2.852l.037.054.01.016.003.004.001.002zM18 10l.838-.546.355.546-.355.546L18 10zM1.162 9.454L2 10l-.838.546L.807 10l.355-.546zM9 10a1 1 0 112 0 1 1 0 01-2 0zm1-3a3 3 0 100 6 3 3 0 000-6z"></path> </g></svg>&nbsp;<span>2m</span>
                                </div>
                                <div className='svg-wrpr' onClick={()=>sendATweatstar(item._id,item.user._id)}>
                                    <svg viewBox="0 0 24 24" stroke='orange' fill="orange"><g strokeWidth="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C5.6655 12 8.06036 10.8412 9.70832 9"  strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>&nbsp;<span>{item.tweatstars}</span>
                                
                                {/* {item.views.length} */}
                            </div>
                                {/* {item.views.length} */}
                            </div>
                           
                            <div className='svg-wrpr wrpr-svgs'>
                               
                                {/* <div className='mre-svg-wrpr'><svg fill="#4070f4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M665.6 768L512 614.4 358.4 768V256h307.2v512zM512 537.6L614.4 640V307.2H409.6V640L512 537.6z"></path></g></svg></div> */}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default CommunityFeed