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
let formData
formData = new FormData();
const Profile = () => {
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
  const handleFileChange2 = (event) => {
    event.preventDefault();
    setSelectedFile2(event.target.files[0]);
    
  };
  let gwghwhgwh=0
  let postRemain
  // console.log(userAuth)
  const postsRef =useRef(null)
    // const cookiep=useCookies()
    let counter = 0,
      indexing = 0,
      newPosts=[]
  let user={}
  useEffect(()=>{
    // console.log(np)
  },[np])
   const fetchPosts=async ()=>{
    console.log(gwghwhgwh)
      try {
        const request =await axios.post(`/posts/user/${userAuth.user.username}`,{
          signedCookies:JSON.stringify({
            refreshToken: cook,
            accessToken:cookies2
          }),
          skipCount:gwghwhgwh
        })
        const response=await request
        // console.log(response.data.posts )
        if(!response.data.posts.length){
          setHro(true)
          
        }else{
          setHro(false)
        }
        if(response.data.posts.length){
          
          counter = response.data.posts.length
          gwghwhgwh =gwghwhgwh + counter
          for (let i =0;  i<counter; i++){
              newPosts.push(response.data.posts[i])
              
            
          }
          setUserPosts([...userPosts, ...newPosts])
          // newPosts=[]
          indexing = indexing+ counter
          setPloader(false)
          postRemain=response.data.posts.length
        }
      } catch (error) {
        console.log(error)
      }
    }
    function appendUniqueData(arrayA, arrayB) {
      // Create a Set to store unique IDs
      const uniqueIds = new Set(arrayA.map(obj => obj.id));
    
      // Filter arrayB to only include objects with unique IDs
      const newObjects = arrayB.filter(obj => !uniqueIds.has(obj.id));
    
      // Append new objects to arrayA
      // arrayA.push(...newObjects);
      setUserPosts([...userPosts,...newObjects])
      
      // Update unique IDs
      newObjects.forEach(obj => uniqueIds.add(obj.id));
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        setPloader(true)
        fetchPosts()
      });
    });
    
       useEffect(()=>{
          if (postsRef.current) { 
              const loader = document.getElementById("posts-rld")
              io.observe(loader);
           
            }
       },[])
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
  return (
    <div className='user_page_wrapper'>
      <div className={`profile-data-edit ${editProfile? "active" :""}`}>
        <div className='p-edit-header'>
          <div className='arrow-back' onClick={()=>setEditProfile(false)}>
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
                <input id='file' type='file' onChange={handleFileChange} className='file-selector' accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime'  tabIndex={'-1'} />
                        
                <label htmlFor='file' className='edit-pen'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokewidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" ></path> </g></svg>
                </label>
                  {!selectedFiles?( userAuth.user.coverImage ? <img src={userAuth.user.coverImage} className='img'/> :<></>) :<img src={URL.createObjectURL(selectedFiles)} className='img'/>}

                <div className='profile_image'>
                <input id='file2' type='file' onChange={handleFileChange2} className='file-selector' accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime'  tabIndex={'-1'} />
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
      
      <div className='profile_data'>
          <div className='general-header'>
            <div className='arrow-back' onClick={()=> navigator(-1)}>
              <div className='arw-bck-profile custm-fja'>
                <svg viewBox="0 0 24 24" fill="none"   ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
            </div>
            <div className='mre-edata-con'>
              <p>Profile</p>
              
            </div>
          </div>
          <div className='profile_wrapper'>
            <div className='cover_image'>
              <div className='cvr-img'>
                {userAuth.user.coverImage ? <AsyncImage
                    onClick={()=>{
                      setIm(true)
                      setImgUrl([userAuth.user.coverImage])
                    }}
                      src={userAuth.user.coverImage}
                      Transition={Blur}
                      style={{ width: "100%", height: "100%", borderRadius: "0%" }}
                      loader={<div style={{ background: '#888' }}></div>}/> :<></>
                }
                <div className='profile_image'>
                  <div className='prf-img' onClick={()=>{
                          setIm(true)
                          setImgUrl([userAuth.user.profileImage])
                        }}>
                    {userAuth.user.profileImage ?  <AsyncImage
                         
                        src={userAuth.user.profileImage}
                        Transition={Blur}
                        style={{ width: "96%", height: "96%", borderRadius: "50%" }}
                        loader={<div style={{ background: '#888' }} />}
                    />: <img style={ width <= 550 ? {width:"90px", height:"90px"}: {width:"100%", height:"100%"} } src={profileImg}/>}
                  </div>
                  
                </div>
              </div>
            </div>
            <div className={`profile-details-data ${ width <= 550 ? "profile-mbl": "profile-nml" }`}>
              <div className='profile-patch'>
                <button onClick={()=>setEditProfile(true)}>Edit Profile</button>
              </div>
              <div className='profile-details'>
                <h3 className='useromin'>{userAuth.user.name} <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                              <g id="SVGRepo_bgCarrier" strokewidth="0"></g>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z" fill="#4070f4"></path> 
                              </g>
                            </svg></h3>
                <p className='userName'>
                  <span>@{userAuth.user.username.toLowerCase()}</span>
                </p>
                <div className='user_e_dta'>
                <div className='user_engaugement'>
                  <div className='user-eng'>{userAuth.user.following.length} &nbsp;
                    <p className='userName'>
                      <span>Following</span>
                    </p>

                  </div>
                  <div className='user-eng'>{userAuth.user.followers.length} &nbsp;
                    <p className='userName'>
                      <span>Followers</span>
                    </p>
                  </div>
                  <div className='user-eng'>{userAuth.user.friends.length} &nbsp;
                  <p className='userName'>
                      <span>Friends</span>
                    </p>
                  </div>
                </div>
              </div>
              {
                userAuth.user.bio ? <div className='bio-dtl'>
                <div className='bio'>
                  <span>
                    {userAuth.user.bio}
                  </span>
                </div>
              </div> :<></>
              }
              </div>
              
              <div className='posts_profile'>
              <div className='filter_posts'>
                  <div className='filter_holder'>
                    <div className='filter_select'>
                      <div className='filter_option active'>
                        <p>Suggested</p>
                      </div>
                      <div className='filter_option'>
                        <p>Following</p>
                      </div>
                      <div className='filter_option'>
                        <p>spaceX community</p>
                      </div>
                      <div className='filter_option'>
                        <p>Tapswap community</p>
                      </div>
                      <div className='filter_option'>
                        <p>mentions</p>
                      </div>
                      <div className='filter_option'>
                        <p>liked posts</p>
                      </div>
                      <div className='filter_option'>
                        <p>bookmark</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
                





                {userPosts? 
                  <div className='posts-container'>
                    <div className='posts-wrapper'>
                      <div className='post-list'>
                        <div className='posts-order-wrapper'>
                          {
                            userPosts.map((item,index)=>(<Feed item={item} index={index} type={"p"}/>))
                          }
                          <>
                            { !hro ?
                               <div className='btm-ssf' id ="posts-rld" ref={postsRef}><div class="spinner-4"></div></div> : <p className='userName f-psts'>No posts to display</p>
                            }
                          </>
                          <div className={`btm-nav-cvr ${width <=550 ? "av-und-spc" :""}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                : <></>}







              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Profile