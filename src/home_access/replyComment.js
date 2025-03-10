import React, { useContext, useRef, useState } from 'react'
import { AsyncImage } from 'loadable-image'
import { Blur, Grow, Slide } from 'transitions-kit'
import profileImg from '../assets/images/svg/profile.svg'
import AuthContext from '../context/authProvider'
import axios from '../api/axios'
const formData = new FormData();
const ReplyCommments = ({item,postId}) => {
    const [replies,setReplies] =useState([])
    const [reply,setReply]= useState(false)
    const {userAuth,auth,cook,cookies2} =useContext(AuthContext)
    const repliesTextRef=useRef(null)
    const [selectedFiles,setSelectedFiles] =useState([])
    const [commentsText,setCommentsText] =useState("")
    const signedCookies = { 
        refreshToken:cook,
        accessToken:cookies2
    };
    const handleFileChange = (event) => {
        event.preventDefault();
        setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
        
    };
    const replyPOstBack= async ()=>{
        setSelectedFiles([])
        repliesTextRef.current.innerHTML=""
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
            const request =axios.post(`/posts/commentOrReply/${postId}?replyTo=${item._id}`,formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
            const response=await request
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <li>
        <div class="comment">
            <div class="profile cm-img-hnd">
            {item.user.profileImage ? <AsyncImage

                src={item.user.profileImage}
                Transition={Blur}
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
                loader={<div style={{ background: '#888' }} />}
            /> : <img src={profileImg}/>}
            </div>
            <div class="main-comments-user-d">
                <div class="comment-text">          
                    <span>{item.user.name}</span>
                    <p>
                        {item.text}
                    </p>
                    {
                        item.img && Array.isArray(item.img) && item.img.length?<div class="img-cmt-hldr">
                        <div class="cmt-img">
                            <img src={item.img[0]} alt="" srcset=""/>
                        </div>
                    </div>:<></>
                    }
                </div>
                <div class="mr-usr-cmt-options">
                    <div class="us-cmt-opt">
                        <div class="cmt-opts">
                            <p>8h</p>
                            <p>{} Likes</p>
                            <p onClick={()=>setReply(!reply)}>Reply</p>
                        </div>
                        <div class="cmt-opts">
                        <svg className='z-ndx' style={{width:"25px",height:"25px"}} viewBox="0 0 24 24" fill='#f4144c'  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </div>
                    </div>
                    {
                        reply ? <div class="footer-content">
                        {selectedFiles.length ?  <div class="images-uploaded">
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
                        <div class="comments-action">
                            <div class="cmtr-photo">
                                {
                                    auth && userAuth.user.profileImage ? <AsyncImage            
                                    src={userAuth.user.profileImage}
                                    Transition={Blur}
                                    style={{ width: "100%", height: "100%", borderRadius: 50 }}
                                    loader={<div style={{ background: '#888' }} />}
                                /> :<img src={profileImg}/>
                                }
                            </div>
                            <div class="cmtr-input">
                                <div className='cmtr-i-cn'>
                                    {commentsText.length? <></> :<span className='plh-comments'>Reply {item.name}</span>}
                                    <p class="comments-text" contentEditable="true" role="textbox"  ref={repliesTextRef} onKeyUp={(e)=>{
                                        setCommentsText(e.target.textContent)
                                    }}>
                                        
                                    </p>
                                    <div className='comments-option'>
                                        <div className='cmtr-upld-opt'>
                                            {
                                                !selectedFiles.length ? <div className='upld-opts'>
                                                <input  id='img-upload3' type='file' className='file-selector' accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime' onChange={handleFileChange} tabIndex={'-1'} />
                                                <div className='upld-opt'>
                                                    <label htmlFor='img-upload3'></label>
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                                    
                                                </div>
                                            </div> :<div></div>
                                            }
                                            <div className='upld-opts'>
                                                
                                                <div className='upld-opt' onClick={()=>replyPOstBack()}>
                                                    <svg fill="#4070f4" viewBox="0 0 256 256" id="Flat"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M231.626,128a16.015,16.015,0,0,1-8.18262,13.96094L54.53027,236.55273a15.87654,15.87654,0,0,1-18.14648-1.74023,15.87132,15.87132,0,0,1-4.74024-17.60156L60.64746,136H136a8,8,0,0,0,0-16H60.64746L31.64355,38.78906A16.00042,16.00042,0,0,1,54.5293,19.44727l168.915,94.59179A16.01613,16.01613,0,0,1,231.626,128Z"></path> </g></svg>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div> :<></>
                    }
                </div>
                {/* <div class="cmt-reply-container">
                    <div class="reply-wrp">
                        <div class="rpy-header">
                            <div class="rpy-photo"></div>
                            <div class="rply-phld">
                                <span class="rply-nm">
                                    Paul Hanson
                                </span>
                                <div class="rply-body">
                                    <div class="rply-text">
                                        <span class="rply-snap-txt">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mr-usr-cmt-options">
                            <div class="us-cmt-opt">
                                <div class="cmt-opts">
                                    <p>8h</p>
                                    <p>1k Likes</p>
                                    <p>Reply</p>
                                </div>
                                <div class="cmt-opts">
                                    <p>❤</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  */}
                {/* <span class="more-replies">
                    <a href="">View 2 more repllies</a>
                </span> */}
            </div>
        </div>
    </li>
  )
}

export default ReplyCommments