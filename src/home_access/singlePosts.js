    import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./posts.css"
import profileImg from '../assets/images/svg/profile.svg'
import useWindowSize from '../hooks/useWindowSize'
import AuthContext from '../context/authProvider'
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import Feed from './feed'
import { AsyncImage } from 'loadable-image'
import { Blur, Grow, Slide } from 'transitions-kit'
import Access_Loader from '../loading_component/access_loader'
import ReplyCommments from './replyComment'

const SinglePosts = () => {
    const [selectedFiles,setSelectedFiles]=useState([])
    const fRef=useRef(null)
    const textRef=useRef(null)
    const navigate = useNavigate();
    const [posts,setPosts]=useState([])
    const [loader,setLoader]=useState(true)
    const data= useParams()
    const [comment ,setComment]=useState("")
    const [commentsText ,setCommentsText]=useState("")
    const [commentData,setCommentData]=useState([])
    const formData = new FormData();
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
    const signedCookies = { 
        refreshToken:cook,
        accessToken:cookies2
    };
    const uploadPostToBackend= async (postId)=>{
            setSelectedFiles([])
            textRef.current.innerHTML=""
            setCommentsText("")
            if (commentsText){
                formData.append("text",commentsText) 
            }
            formData.append('signedCookies', JSON.stringify(signedCookies))
            if (selectedFiles.length){
                selectedFiles.forEach((file) => {
                    file.type.startsWith('image/')? formData.append('image', file) : formData.append('video', file) ;
                });
            }
            try {
                const request =await axios.post(`https://tweatflash.onrender.com/api/v1/posts/commentOrReply/${postId}`,formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
                const response=await request
                console.log(response)
                
                if (request.status===200){
                    setCommentData([response.data,...commentData])
                    setBooleanErrHome(true)
                    
                    setHomeErr(`Post uploaded successfully`)

                    
                }else{
                    setBooleanErrHome(true)
                    setHomeErr(response.data.msg)
                }
            } catch (error) {
                console.log(error)
                setBooleanErrHome(true)
                setHomeErr(`Failed to uploaded post`)
            }
       
       
        }
    const handleFileChange = (event) => {
        event.preventDefault();
        setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
        
    };
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
              setLoader(false)
            //   console.log(response.data.posts[0].comments)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
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
            posts? <>
                
                <div className='posts-container'>
                <div className='general-header'>
                    <div className='arrow-back' onClick={()=> navigate(-1)}>
                    <div className='arw-bck-profile custm-fja'>
                        <svg viewBox="0 0 24 24" fill="none"   ><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>
                    </div>
                    <div className='mre-edata-con'>
                    <p>Tweat</p>
                    
                    </div>
                </div>
                {
                    loader ?<Access_Loader/> : <div className='posts-wrapper'>
                        
                        <div className='post-list'>
                        
                        
                            <div className='posts-order-wrapper'>
                                {posts.map((item,index)=>(<Feed item={item}/>))}                                                                                                                                                                                                                                                                                                                                                                 
                                {auth  ?
                                    <div className="prompt-footer ps-1">
                                        <div className="footer-content">
                                            {selectedFiles.length ?  <div className="images-uploaded">
                                                {
                                                    selectedFiles.map(fileItem=>(
                                                        <div className='img-cmtr-hld'>
                                                            {
                                                                fileItem.type.startsWith('image/') ? <img src={URL.createObjectURL(fileItem)}/> :<video  src={URL.createObjectURL(fileItem)} ></video>
                                                            }
                                                            <div className='img-cnc' onClick={()=>setSelectedFiles([])}>
                                                                <svg  viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="work-case" fill="#ffffff" transform="translate(91.520000, 91.520000)"> <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"> </polygon> </g> </g> </g></svg>
            
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                
                                            </div> :<></>}
                                            <div className="comments-action">
                                                <div className="cmtr-photo">
                                                    {
                                                        userAuth.user.profileImage ? <AsyncImage            
                                                        src={userAuth.user.profileImage}
                                                        Transition={Blur}
                                                        style={{ width: "100%", height: "100%", borderRadius: 50 }}
                                                        loader={<div style={{ background: '#888' }} />}
                                                    /> :<img src={profileImg}/>
                                                    }
                                                </div>
                                                <div className="cmtr-input">
                                                    <div className='cmtr-i-cn'>
                                                        {commentsText.length ? <></> :<span className='plh-comments'>What is on your mind</span>}
                                                        <p className="comments-text" contentEditable="true" role="textbox"  ref={textRef} onKeyUp={(e)=>{
                                                            setCommentsText(e.target.textContent)
                                                        }}>
                                                            
                                                            
                                                        </p>
                                                        <div className='comments-option'>
                                                            <div className='cmtr-upld-opt'>
                                                                {
                                                                    !selectedFiles.length ? <div className='upld-opts'>
                                                                    <input  id='img-upload2' type='file' ref={fRef} onChange={handleFileChange} className='file-selector' accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime' tabIndex={'-1'} />
                                                                    <div className='upld-opt'>
                                                                        <label htmlFor='img-upload2'></label>
                                                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                                                        
                                                                    </div>
                                                                </div> :<div></div>
                                                                }
                                                                <div className='upld-opts'>
                                                                    
                                                                    <div className='upld-opt' onClick={()=>uploadPostToBackend(posts[0]._id)}>
                                                                        <svg fill="#4070f4" viewBox="0 0 256 256" id="Flat"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M231.626,128a16.015,16.015,0,0,1-8.18262,13.96094L54.53027,236.55273a15.87654,15.87654,0,0,1-18.14648-1.74023,15.87132,15.87132,0,0,1-4.74024-17.60156L60.64746,136H136a8,8,0,0,0,0-16H60.64746L31.64355,38.78906A16.00042,16.00042,0,0,1,54.5293,19.44727l168.915,94.59179A16.01613,16.01613,0,0,1,231.626,128Z"></path> </g></svg>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> :<></>
                                }
                                <div className={`btm-nav-cvr`} >
                                    <div className='comments-container'>
                                        {!commentData.length && posts?
                                        <>
                                            
                                        </> : 
                                            <>
                                                <div className="prompt-content">
                                                    <ul>
                                                        {commentData.map(item=>(
                                                            <ReplyCommments item={item} postId={posts[0]._id}/>
                                                        ))}
                                                        
                                                    </ul>
                                                </div>
                                                
                                            </>
                                        
                                        }
                                    </div>
                                </div>
                                <div className={`btm-nav-cvr ${width <=550 ? "av-und-spc" :""}`} ></div>
                            </div>
                        
                        
                        </div>
                    
                    </div> 
                }
                    
                    
                </div>
                
            </> :
            <></>
        }
    </>
  )
}

export default SinglePosts