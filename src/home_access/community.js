import React, { useEffect, useState } from 'react'
import './community.css'
import axios from '../api/axios'
import AuthContext from '../context/authProvider'
import { useContext } from 'react'
import Access_Loader from '../loading_component/access_loader'
import profileImg from '../assets/images/svg/profile.svg'
import { useNavigate } from 'react-router-dom'
import CommunityFeed from './communityFeed'
import { AsyncImage } from 'loadable-image'
import { Blur, Grow, Slide } from 'transitions-kit'

const Community = () => {
    const {cook,cookies2,setSideNav}=useContext(AuthContext)
    const navigate=useNavigate()
    const [cmm,setCmm]=useState([])
    const [posts,setPosts]=useState([])
    const [ld,setLD] =useState(true)
    const [lp,setLP] =useState(true)
    const [placeComm,setPlaceComm] = useState("")
    const fetchPosts=async ()=>{
        try {
            // /community/suggested
            const request=await axios.post(`/community/myCommunity`,{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                }),
                Ids:[]
            })
            const response=await request
            console.log(response)
            
            setCmm(response.data.community)
            if(response.data.community.length){
                setPlaceComm(cmm[0]._id)
            }
            setLP(true)
            
        } catch (error) {
            // console.log(error)
        }
    }
    const fetchCommunityPosts=async ()=>{
        try {
            // /community/suggested
            const request=await axios.post(`/communityposts/exploreCommunity`,{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                }),
                Ids:[]

            })
            const response=await request
            console.log(response)
            setPosts(response.data)
           
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchPosts()
    },[])
    useEffect(()=>{
       
        fetchCommunityPosts()
        
    },[])
    
  return (
   <>
   <header>
   <div class='header_navigation'>
               <div class='set1'  >
                <div class="l-logo" onClick={()=>setSideNav(true)}>
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                      </div>
                <h3>Communites</h3>
               </div>
               <div class='set2'>
               <div class='notification' onClick={()=>navigate("explore")}>
                     
                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                 <div class='notification add-cmm' onClick={()=>navigate("create")}>
                    <svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm8.999-8.921c-3.264 0-6.816 2.358-7 8.977L9.471 21h4.528v-2h-2.438c.367-3.781 2.17-6.004 4.938-6.004 1.089 0 2.022.356 2.784 1.004h2.632c-1.376-2.136-3.446-3.004-5.415-3.004zm0-.996c-.799 0-1.527-.279-2.116-.73C13.548 8.63 13 7.632 13 6.5 13 4.57 14.567 3 16.5 3S20 4.57 20 6.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zM15 6.5c0 .827.673 1.5 1.5 1.5S18 7.327 18 6.5 17.327 5 16.5 5 15 5.673 15 6.5zm-11 0C4 4.57 5.567 3 7.5 3S11 4.57 11 6.5 9.433 10 7.5 10 4 8.43 4 6.5zm2 0C6 7.327 6.673 8 7.5 8S9 7.327 9 6.5 8.327 5 7.5 5 6 5.673 6 6.5zM21 21h3v-2h-3v-3h-2v3h-3v2h3v3h2v-3z" fill-rule="evenodd"></path> </g></svg>
                   </div>
                 
                  
               </div>
             </div> 
   
             <div class='filter_posts'>


               <div class='filter_holder'>
                 <div class='filter_select'>
                    <div class='filter_option'>
                     <p>Suggested for you</p>
                   </div>
                   <>
                    {
                        cmm.length ? cmm.map(cmmmenu=>(
                            <div class='filter_option' onClick={()=>setPlaceComm(cmmmenu._id)}  >
                                <div class="cm-rndr">
                                <div class="rndr-img">
                                    {cmmmenu.profileImage ?  <AsyncImage
                                    
                                        src={cmmmenu.profileImage}
                                        Transition={Blur}
                                        style={{ width: "100%", height: "100%", borderRadius: 50 }}
                                        loader={<div style={{ background: '#888' }} />}
                                    /> : <img src={profileImg}/>}
                                </div>
                                </div>
                                <p>{cmmmenu.name}</p>
                                {/* <div class="ntfy-rndr">
                                1
                                </div> */}
                            </div>
                        )) :<></>
                    }
                   </>
                   
                   <div class='filter_option'>
                     <p>Entertaiment</p>
                   </div>
                   <div class='filter_option'>
                     <p>Trending Communites</p>
                   </div>
                   
                   
                 </div>
                 
               </div>
             </div> 
            </header>
            <div className='container-community'>
                
                <div className='posts-wrapper'>
                    
                    <div className='post-list'>
                        
                        <div className='posts-order-wrapper'>
                            {
                                posts.length && ld? posts.map((item , index)=>(
                                    <>
                                        <CommunityFeed item={item} index={index} type={"c"}/>
                                    </>
                                    
                                    
                                )) :<Access_Loader/>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Community