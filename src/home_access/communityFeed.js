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
                                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.9998 15.8369C19.4557 16.5683 20.704 17.742 21.6151 19.2096C21.7955 19.5003 21.8857 19.6456 21.9169 19.8468C21.9803 20.2558 21.7006 20.7585 21.3198 20.9204C21.1323 21 20.9215 21 20.4998 21M15.9998 11.5322C17.4816 10.7959 18.4998 9.26686 18.4998 7.5C18.4998 5.73314 17.4816 4.20411 15.9998 3.46776M13.9998 7.5C13.9998 9.98528 11.9851 12 9.49984 12C7.01455 12 4.99984 9.98528 4.99984 7.5C4.99984 5.01472 7.01455 3 9.49984 3C11.9851 3 13.9998 5.01472 13.9998 7.5ZM2.55907 18.9383C4.15337 16.5446 6.66921 15 9.49984 15C12.3305 15 14.8463 16.5446 16.4406 18.9383C16.7899 19.4628 16.9645 19.725 16.9444 20.0599C16.9287 20.3207 16.7578 20.64 16.5494 20.7976C16.2818 21 15.9137 21 15.1775 21H3.82219C3.08601 21 2.71791 21 2.45028 20.7976C2.24189 20.64 2.07092 20.3207 2.05527 20.0599C2.03517 19.725 2.2098 19.4628 2.55907 18.9383Z" stroke="#4070f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        
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
                            <div className='post-act-action' onClick={()=> setPostClick(false)}>
                            <div className={`svg-wrpr like_btn ${auth && userAuth.user.likedPosts.includes(item._id) ? "liked" : ""}`} tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)} onClick={(e)=>{
                                setPostClick(false)
                                likePost(item._id)

                                e.target.classList.toggle("liked")
                                if (userAuth.user.likedPosts.includes(item._id)){
                                    return
                                }else{
                                    item.likes=[...item.likes, userAuth]
                                }
                                
                            }}>
                                {/* <svg className='z-ndx' stroke='#f4144c' viewBox="0 0 18 18"  fill= {"none"} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M-18.65625 7.53125L1.34375 7.54043C1.34374 8.04211 1.34372 8.76295 1.6611 9.65585C1.9795 10.5516 2.60026 11.5779 3.77681 12.7544C5.59273 14.5704 7.58105 16.0215 8.33387 16.5497C8.73525 16.8313 9.26573 16.8313 9.66705 16.5496C10.4197 16.0213 12.4074 14.5703 14.2232 12.7544C15.3997 11.5779 16.0205 10.5516 16.3389 9.65585C16.6563 8.76296 16.6563 8.04211 16.6562 7.54043V7.53125C16.6562 5.23466 15.0849 3.25 12.6562 3.25C11.5214 3.25 10.6433 3.78244 9.99228 4.45476C9.59009 4.87012 9.26356 5.3491 9 5.81533C8.73645 5.3491 8.40991 4.87012 8.00772 4.45476C7.35672 3.78244 6.47861 3.25 5.34375 3.25C2.9151 3.25 1.34375 5.23466 1.34375 7.53125Z" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>  */}
                                <svg fill='#f4144c' viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"><g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                                
                                <span className='z-ndx'>{item.likes ===null || !item.likes.length ? 0 :item.likes.length} </span>
                                
                            </div>
                            <div className='svg-wrpr' onClick={()=>{
                               
                                setCommentsPrawler(item.comments)
                                setShowComments(true)
                                setPostId(item._id)
                            }}>
                                {/* <svg stroke='#4070f4' strokeWidth="1.3" fill='var(--main-color2)' viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="iconCarrier"><path d="M15.376 13.2177L16.2861 16.7955L12.7106 15.8848C12.6781 15.8848 12.6131 15.8848 12.5806 15.8848C11.3779 16.5678 9.94767 16.8931 8.41995 16.7955C4.94194 16.5353 2.08152 13.7381 1.72397 10.2578C1.2689 5.63919 5.13697 1.76863 9.75264 2.22399C13.2307 2.58177 16.0261 5.41151 16.2861 8.92429C16.4161 10.453 16.0586 11.8841 15.376 13.0876C15.376 13.1526 15.376 13.1852 15.376 13.2177Z"></path> </g></svg> */}
                                <svg viewBox="0 0 24 24" fill='#4070f4' aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                                <span>{item.comments.length}</span>
                                </div>
                            <div className='svg-wrpr' onClick={()=>{
                                setPostClick(false)
                                // repost(item._id)
                            }
                            }>
                                {/* <svg fill="green" strokeWidth="1.5" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.41256 1.23531C6.6349 0.971277 7.02918 0.937481 7.29321 1.15982L9.96509 3.40982C10.1022 3.52528 10.1831 3.69404 10.1873 3.87324C10.1915 4.05243 10.1186 4.2248 9.98706 4.34656L7.31518 6.81971C7.06186 7.05419 6.66643 7.03892 6.43196 6.7856C6.19748 6.53228 6.21275 6.13685 6.46607 5.90237L7.9672 4.51289H5.20312C3.68434 4.51289 2.45312 5.74411 2.45312 7.26289V9.51289V11.7629C2.45312 13.2817 3.68434 14.5129 5.20312 14.5129C5.5483 14.5129 5.82812 14.7927 5.82812 15.1379C5.82812 15.4831 5.5483 15.7629 5.20312 15.7629C2.99399 15.7629 1.20312 13.972 1.20312 11.7629V9.51289V7.26289C1.20312 5.05375 2.99399 3.26289 5.20312 3.26289H7.85002L6.48804 2.11596C6.22401 1.89362 6.19021 1.49934 6.41256 1.23531Z"></path><path d='M11.5874 17.7904C11.3651 18.0545 10.9708 18.0883 10.7068 17.8659L8.03491 15.6159C7.89781 15.5005 7.81687 15.3317 7.81267 15.1525C7.80847 14.9733 7.8814 14.801 8.01294 14.6792L10.6848 12.206C10.9381 11.9716 11.3336 11.9868 11.568 12.2402C11.8025 12.4935 11.7872 12.8889 11.5339 13.1234L10.0328 14.5129H12.7969C14.3157 14.5129 15.5469 13.2816 15.5469 11.7629V9.51286V7.26286C15.5469 5.74408 14.3157 4.51286 12.7969 4.51286C12.4517 4.51286 12.1719 4.23304 12.1719 3.88786C12.1719 3.54269 12.4517 3.26286 12.7969 3.26286C15.006 3.26286 16.7969 5.05373 16.7969 7.26286V9.51286V11.7629C16.7969 13.972 15.006 15.7629 12.7969 15.7629H10.15L11.512 16.9098C11.776 17.1321 11.8098 17.5264 11.5874 17.7904Z'></path></g></svg> */}
                                <svg viewBox="0 0 24 24" fill="green" aria-hidden="true" ><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
                                <span>0</span>
                                </div>
                                {/* {type==="p"? item.reposts.length : item.quotes.length} */}
                            
                                <div className='svg-wrpr' onClick={()=>{
                                    setPostClick(false)
                                    sendATweatstar(item._id,item.user._id)}}>
                                    <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2L10.6985 7.20599C10.4445 8.22185 10.3176 8.72978 10.0531 9.14309C9.81915 9.50868 9.50868 9.81915 9.14309 10.0531C8.72978 10.3176 8.22185 10.4445 7.20599 10.6985L2 12L7.20599 13.3015C8.22185 13.5555 8.72978 13.6824 9.14309 13.9469C9.50868 14.1808 9.81915 14.4913 10.0531 14.8569C10.3176 15.2702 10.4445 15.7782 10.6985 16.794L12 22L13.3015 16.794C13.5555 15.7782 13.6824 15.2702 13.9469 14.8569C14.1808 14.4913 14.4913 14.1808 14.8569 13.9469C15.2702 13.6824 15.7782 13.5555 16.794 13.3015L22 12L16.794 10.6985C15.7782 10.4445 15.2702 10.3176 14.8569 10.0531C14.4913 9.81915 14.1808 9.50868 13.9469 9.14309C13.6824 8.72978 13.5555 8.22185 13.3015 7.20599L12 2Z" stroke="orange" stroke-width="1.3679999999999999" stroke-linecap="round" fill='orange' stroke-linejoin="round"></path> </g></svg><span>{item.tweatstars}</span>
                                
                               
                            </div>
                            

                            
                            </div>
                            <div className='other-psts-rct'>
                            <div className='svg-wrpr' onClick={()=>{
                                setPostClick(false)
                            }}>
                            <svg className='r-svg-fll wrp-vg' version="1.1" id="XMLID_236_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="bookmark"> <g> <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path> </g> </g> </g></svg>
                                {/* <div className='mre-svg-wrpr'><svg fill="#4070f4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M665.6 768L512 614.4 358.4 768V256h307.2v512zM512 537.6L614.4 640V307.2H409.6V640L512 537.6z"></path></g></svg></div> */}
                            </div>
                            <div className='svg-wrpr' onClick={()=>{
                                setPostClick(false)
                            }}>
                           
                            
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20 5.5C20 7.433 18.433 9 16.5 9C15.598 9 14.7757 8.6588 14.1551 8.09843L8.88613 11.6111C8.96044 11.8949 9 12.1929 9 12.5C9 12.8071 8.96044 13.1051 8.88613 13.3889L13.6039 16.5341C14.2336 15.6081 15.2958 15 16.5 15C18.433 15 20 16.567 20 18.5C20 20.433 18.433 22 16.5 22C14.5788 22 13.0191 20.452 13.0002 18.5353L7.84486 15.0984C7.22429 15.6588 6.40199 16 5.5 16C3.567 16 2 14.433 2 12.5C2 10.567 3.567 9 5.5 9C6.40199 9 7.22429 9.3412 7.84486 9.90157L13.1139 6.3889C13.0396 6.10505 13 5.80715 13 5.5C13 3.567 14.567 2 16.5 2C18.433 2 20 3.567 20 5.5ZM16.5 7C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4C15.6716 4 15 4.67157 15 5.5C15 6.32843 15.6716 7 16.5 7ZM5.5 14C6.32843 14 7 13.3284 7 12.5C7 11.6716 6.32843 11 5.5 11C4.67157 11 4 11.6716 4 12.5C4 13.3284 4.67157 14 5.5 14ZM18 18.5C18 19.3284 17.3284 20 16.5 20C15.6716 20 15 19.3284 15 18.5C15 17.6716 15.6716 17 16.5 17C17.3284 17 18 17.6716 18 18.5Z" className='r-svg-fll wrp-vg'></path> </g></svg>
                            </div>
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