import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../api/axios'
import AuthContext from '../context/authProvider'
import profileImg from '../assets/images/svg/profile.svg'
import useWindowSize from '../hooks/useWindowSize'
import Access_Loader from '../loading_component/access_loader'

const EachCommunity = () => {
    const {id}=useParams()
    const [postClick,setPostClick]=useState(true)
    const {width}=useWindowSize()
    const {cook,cookies2 ,userAuth,setUserAuth ,setBooleanErrHome,setHomeErr,setCook,setCookies2, setAllowCookies} =useContext(AuthContext)
    const [l,sL]=useState(true)
    const [pL,setPL]=useState(true)
    const [comm,setComm]=useState({})
    const [eachCommPosts,setEachCommPosts]=useState([])
    const navigate=useNavigate()
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
       const likePost =async (postId)=>{
            try {
              const request=await axios.post(`communityposts/like/${postId}`,{
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
     const fetchPosts2=async ()=>{
        try {
            const request=await axios.post(`/communityPosts/all/${id}`,{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                })
            })
            const response=await request
            console.log(response)
            // setPosts(response.data)
            
            if (response.data){
                // setComm(response.data.community)
                setEachCommPosts(response.data)
                // sL(false)
                setPL(false)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    const fetchPosts=async ()=>{
        try {
            const request=await axios.post(`/community/profile/${id}`,{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                })
            })
            const response=await request
            console.log(response)
            // setPosts(response.data)
            
            if (response.data.community){
                setComm(response.data.community)
                sL(false)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
        useEffect(()=>{
            fetchPosts()
        },[])
   
    useEffect(()=>{
        console.log(id)
        fetchPosts2()
    },[])
    
  return (
     <div className='user_page_wrapper'>
          {/* <div className='nav_block_manager'>
    
          </div> */}
          {
            comm && !l? <div className='profile_data'>
            <div className='profile_wrapper'>
              <div className='cover_image'>
                <div className='cvr-img'>
                  {comm.coverImage ? <img src={comm.coverImage} className='img'/> :<></>}
                  <div className='profile_image comm-prf'>
                    <div className='prf-img '>
                      {comm.profileImage ? <img src={comm.profileImage} /> : <img style={ width <= 450 ? {width:"90px", height:"90px"}: {width:"100%", height:"100%"} } src={profileImg}/>}
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className={`profile-details-data ${ width <= 450 ? "profile-mbl": "profile-nml" }`}>
                <div className='profile-patch'>
                  <button className='commmunity-inv'>Requst join</button>
                </div>
                <div className='profile-details comm-details'>
                  <h3 className='useromin commomin'>{comm.name}<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z" fill="#4070f4"></path> 
                    </g>
                    </svg>
                              <button>public</button>
                    </h3>
                      <div className='comm-bio-wrp'>
                          <span className='comm-bio'>
                              {comm.bio}
                          </span>
                        <div className='comm-info'>
                           {comm.categories.map((cat)=>(
                             <button>{cat}</button>
                           ))}
                           
                            {/* &nbsp; {comm.createdAt} */}
                        </div>
                        <div className='comm-mem'>
                            <div className='mem-comm'></div>
                            <div className='mem-comm'></div>
                            <div className='mem-comm'></div>
                            <div className='mem-comm'></div>
                            <p>{comm.followers.length} members</p>
                        </div>
                      </div>
                      
                </div>
                
                <div className='comm-posts'>
                    <div className='posts-container'>
                        <div className='posts-wrapper'>
                            <div className='post-list'>
                                {eachCommPosts && !pL ? 
                                    <div className='posts-order-wrapper'>
                                        {eachCommPosts.map((item,index)=>(<div className='posts' tabIndex={"0"} onClick={()=>{}} key={item._id}>
                                        <div className='post-contain'>
                                            <div className='post-wrap'>
                                            <div className='post-head'>
                                                
                                                <div className='p-header-content'>
                                                <div className='pp-content'>
                                                    <div className='pp-image' tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)} onClick={()=>navigate(`/${item.user.username}`)}>
                                                    {item.user.profileImage ? <img src={item.user.profileImage} /> : <img src={profileImg}/>}
                                                    </div>
                                                </div>
                                                <div className='nu-content'>
                                                    <div className='profile-details' tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)} onClick={()=>navigate(`/${item.user.username}`)}>
                                                    <p className='post-name' >
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
                                                        <span>@{item.user.username}&nbsp;&nbsp;{time(item.createdAt)}</span> 
                                                    </p>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className='elipsis'>
                                                {/* <svg  viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g><path d="M10 10h4v4h-4zm0-6h4v4h-4zm0 12h4v4h-4z"></path></g></svg> */}
                                                <svg className='svg_elipsis' viewBox="0 0 24 24"><g  stroke-width="0"></g><g  stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M10 10h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4z"></path></g></svg>
                                                </div>
                                            </div>
                                            <div className='post-body'>
                                                <div className='post-content'>
                                                {item.text ? <div className={`posts-text-content ${!item.img && item.text? "post-main-text" :""}`}>
                                                    <p>
                                                    <span className='psts_text'>{`${item.text.slice(0,100 )}${item.text.length >100 ? "..." :""}`}</span>
                                                    </p>
                                                </div> :<></>}
                                                    {item.img ? 
                                                    <div className='posts-img' onClick={(e)=>{
                                                        e.preventDefault()
                                                    
                                                    }}>
                                                        <img src={item.img[0]} tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)}/>
                                                    </div>
                                                    : <></> }
                                                </div>
                                                <div className='post-reaction'>
                                                <div className='reaction-posts'>
                                                    <div className='svg-wrpr like_btn' tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)} onClick={(e)=>{
                                                    likePost(item._id)
                                                    }}><svg className='z-ndx' viewBox="0 0 24 24" stroke='#f4144c' fill={userAuth.user.likedPosts.includes(item._id) ? "#f4144c" :"none"} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>&nbsp; <span className='z-ndx'>{item.likes ===null || !item.likes.length ? 0 :item.likes.length}</span></div>
                                                    <div className='svg-wrpr'><svg  fill='#4070f4' viewBox="0 4 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="iconCarrier"><path d="M7.28 24.2c-1.12 0-1.72-1.12-2.2-2-0.2-0.32-0.48-0.92-0.64-1-0.12-0.040-0.32-0.080-0.56-0.080-0.68-0.040-1.68-0.16-2.56-1.44-0.8-1.12-1.68-4.16-1.2-6.84 0.28-1.64 1.040-2.88 2.16-3.64 1.8-1.24 5.080-1.4 6.4-1.4 2.36 0 5.64 0.4 7 1.56 1.36 1.12 1.96 4.040 1.84 6.32-0.080 2.080-0.72 3.64-1.76 4.36-0.64 0.44-1.56 0.68-3 0.68-0.6 0-1.16-0.040-1.76-0.080-0.52-0.040-1-0.040-1.44-0.040-0.8 0-1 0.12-1.040 0.12-0.040 0.12 0.040 0.64 0.12 0.88 0.16 0.68 0.44 2.16-0.96 2.52-0.12 0.040-0.24 0.080-0.4 0.080zM8.68 9.48c-2.44 0-4.48 0.4-5.44 1.080-0.76 0.52-1.24 1.36-1.44 2.52-0.4 2.12 0.28 4.72 0.88 5.6 0.48 0.64 0.8 0.68 1.36 0.72 0.32 0.040 0.68 0.040 1.040 0.2 0.68 0.28 1.12 1.040 1.52 1.76 0.12 0.24 0.36 0.64 0.52 0.88-0.040-0.12-0.040-0.24-0.080-0.32-0.16-0.72-0.4-1.84 0.48-2.56 0.52-0.44 1.36-0.48 2.080-0.48 0.48 0 0.96 0.040 1.52 0.040 0.56 0.040 1.12 0.080 1.64 0.080 1 0 1.68-0.12 2.040-0.36 0.6-0.4 1-1.56 1.040-3.080 0.080-2.28-0.56-4.4-1.24-4.96-0.68-0.52-3-1.12-5.92-1.12z"></path> </g></svg><span>{item.comments.length}</span></div>
                                                    <div className='svg-wrpr'><svg fill='green' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z"></path></g></svg><span>0</span></div>
                                                    <div className='svg-wrpr'><svg viewBox="0 3 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5" stroke="#4070f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>&nbsp;<span>{item.views.length}</span></div>
                                                    <div className='svg-wrpr wrpr-svgs'>
                                                    <div className='mre-svg-wrpr'><svg viewBox="0 0 24 24" stroke='orange' fill="orange"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <path d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C5.6655 12 8.06036 10.8412 9.70832 9"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
                                                    <div className='mre-svg-wrpr'><svg fill="#4070f4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M665.6 768L512 614.4 358.4 768V256h307.2v512zM512 537.6L614.4 640V307.2H409.6V640L512 537.6z"></path></g></svg></div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>))}                                                                                                                                                                                                                                                                                                                                                                 
                                        
                                        <div className={`btm-nav-cvr ${width <=450 ? "av-und-spc" :""}`} ></div>
                                        
                                    </div>
                                    : <></>}

                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div> :<Access_Loader/>
          }
        </div>
  )
}

export default EachCommunity