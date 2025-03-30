import React, { useContext, useEffect, useRef, useState } from 'react'
import './profile.css'
import AuthContext from '../context/authProvider'
import profileImg from '../assets/images/svg/profile.svg'
import useWindowSize from '../hooks/useWindowSize'
import { Blur, Grow, Slide } from 'transitions-kit'
import axios from '../api/axios'
import Feed from './feed'
import Posts from './posts'
import { AsyncImage } from 'loadable-image'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AllProfilePosts ,ProfilePostAdded } from './slices/profilePostsSlice'
let formData
formData = new FormData();
const ProfileEdit = () => {
    const navigator =useNavigate()
  const {auth,cook,cookies2,setIm,setImgUrl , setFnp,userAuth,setSideNav ,setBooleanErrHome,setHomeErr,setCook,setCookies2, setAllowCookies,displayHeader,setDisplayHeader} =useContext(AuthContext)
  const {width}=useWindowSize()
  const [userPosts,setUserPosts] = useState([])
  const [profileEdit,setProfileEdit] =useState(false)
  const [pLoader,setPloader]=useState(true)
  const [np,SetNp]=useState([])
  const [hro,setHro] =useState(false)
  const [selectedFiles, setSelectedFiles] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [editProfile,setEditProfile]=useState(false)
  const [bio,setBio] =useState(userAuth.user.bio)
  const [website,setWebsite] =useState("")
  const [location,setLocation] =useState(userAuth.user.location)
  const [ready,setReady]=useState(false)
  const profilePost=useSelector(AllProfilePosts)
  const dispatch=useDispatch()
  const [name,setName] =useState(userAuth.user.name)
  const handleFileChange = (event) => {
    event.preventDefault();
    setSelectedFiles(event.target.files[0]);
    
  };
  let formData
  formData = new FormData();
  const signedCookies = { 
    refreshToken:cook,
    accessToken:cookies2
}; 
useEffect(()=>{
        if(!name.length){
          setReady(false)
        }else{
          setReady(true)
        }
       },[name])
       const uploadPostToBackend= async ()=>{
        if (name){
            formData.append("name",name) 
        }
        if (location){
          formData.append("location",location) 
        }
        if (bio){
          formData.append("bio",bio) 
        }
        if (website){
          formData.append("website",website) 
        }
        formData.append('signedCookies', JSON.stringify(signedCookies))
        if (selectedFiles){
          formData.append('coverImg', selectedFiles) 
        }
        if (selectedFile2){
            
                
          formData.append('profileImg', selectedFile2) 
          
        }
    
        try {
            const request =await axios.post('/users/update',formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
            const response=await request
            console.log(response)
            if (request.status===200){
               
                setBooleanErrHome(true)
                setHomeErr(`Post uploaded successfully`)
                userAuth.user.name=name
                userAuth.user.bio=bio
                if (selectedFile2){
                  userAuth.user.profileImage=response.data.profileImage
                }
                if (selectedFiles){
                  userAuth.user.coverImage=response.data.coverImage
                }
            }
        } catch (error) {
            console.log(error)
            setBooleanErrHome(true)
            setHomeErr(`Failed to uploaded post`)
        }
       
       
           }
  const handleFileChange2 = (event) => {
    event.preventDefault();
    setSelectedFile2(event.target.files[0]);
    
  };
  return (
    <div className={`profile-data-edit ${true? "active" :""}`}>
            <div className='p-edit-header'>
              <div className='arrow-back' onClick={()=>navigator(-1)}>
                <div className='arw-bck-profile custm-fja'>
                  <svg viewBox="0 0 24 24" fill="none"   ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
              </div>
              <div className='mre-edata-con'>
                <p>Edit Profile</p>
                <button onClick={()=>{
                  if(ready){
                    uploadPostToBackend()
                  }
                }}>Save Changes</button>
              </div>
            </div>
            <div className='cover_image'>
                  <div className='cvr-img'>
                    <input id='file' type='file' onChange={handleFileChange} className='file-selector' accept='image/jpeg,image/png,image/webp,video/mp4,video/quicktime'  tabIndex={'-1'} />
                            
                    <label htmlFor='file' className='edit-pen'>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokewidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" ></path> </g></svg>
                    </label>
                      {!selectedFiles?( userAuth.user.coverImage ? <img src={userAuth.user.coverImage} className='img'/> :<></>) :<img src={URL.createObjectURL(selectedFiles)} className='img'/>}
    
                    <div className='profile_image'>
                    <input id='file2' type='file' onChange={handleFileChange2} className='file-selector' accept='image/jpeg,image/png,image/webp,video/mp4,video/quicktime'  tabIndex={'-1'} />
                      <div className='prf-img'>
                      <label htmlFor='file2' className='edit-pen2'>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokewidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" ></path> </g></svg>
                      </label>
                      
                        {!selectedFile2 ? (userAuth.user.profileImage ?  <AsyncImage
                          
                            src={userAuth.user.profileImage}
                            Transition={Blur}
                            style={{ width: "96%", height: "96%", borderRadius: "50%" }}
                            loader={<div style={{ background: '#888' }} />}
                        />: <img style={ width <= 550 ? {width:"90px", height:"90px"}: {width:"100%", height:"100%"} } src={profileImg}/> ) :<img src={URL.createObjectURL(selectedFile2)} className='img'/>}
                      </div>
                      
                    </div>
                  </div>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className='login_form'>
                  <div className="password_wrapper">
                      <p className='text-sm'>Name</p>
                      <input
                          type="text"
                          placeholder="" 
                          name="name" 
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          aria-describedby="uidnote"
                          autoComplete="on"
                      />
                  
                  </div>
                  
                  <div className="password_wrapper pp-wrp-bio">
                      <p className='text-sm'>BIO</p>
                      <textarea
                          type="text"
                          placeholder="" 
                          name="name" 
                          value={bio}
                          onChange={(e)=>setBio(e.target.value)}
                          aria-describedby="uidnote"
                          autoComplete="on"
                      ></textarea>
                  
                  </div>
                  <div className="password_wrapper">
                      <p className='text-sm'>Location</p>
                      <input
                          type="text"
                          placeholder="" 
                          name="name" 
                          value={location}
                          onChange={(e)=>setLocation(e.target.value)}
                          aria-describedby="uidnote"
                          autoComplete="on"
                      />
                  
                  </div>
                  <div className="password_wrapper">
                      <p className='text-sm'>Website</p>
                      <input
                          type="text"
                          placeholder="" 
                          name="name" 
                          value={website}
                          onChange={(e)=>setWebsite(e.target.value)}
                          aria-describedby="uidnote"
                          autoComplete="on"
                      />
                  
                  </div>
              </form>
          </div>
  )
}

export default ProfileEdit