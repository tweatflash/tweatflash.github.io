import React, { useContext, useEffect, useState } from 'react'
import './channels.css'
import AuthContext from '../context/authProvider'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import Access_Loader from '../loading_component/access_loader'
const Channels = () => {
    const {cook,cookies2}=useContext(AuthContext)
    const navigate=useNavigate()
    const [posts,setPosts]=useState([])
    const fetchPosts=async ()=>{
            try {
                const request=await axios.post(`/channel/suggested`,{
                    signedCookies:JSON.stringify({
                        refreshToken: cook,
                        accessToken:cookies2
                 })
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
    
    return (
        <div className='container-channels'>
            {
                posts.length ? <>
                    <div className='container_bookmarks'>
                        <div className='bookmark_header'>
                            <button>
                            <svg viewBox="0 0 24 24" fill="none" ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            back
                            </button>
                            <h2><span><svg className="bookmars-svg" viewBox="0 0 1024 1024">
                                <g>
                                    <path d="M22 11.9844C22 12.5853 21.6984 13.1862 21.0953 13.4867C19.0849 14.6886 15.2652 16.7919 12.4506 18.1941C10.0381 19.3959 6.72099 20.7981 4.40903 21.7997C4.20799 21.8998 3.90643 22 3.70539 22C3.30331 22 2.80072 21.7997 2.49916 21.4992C1.99656 20.9984 1.89604 20.2973 2.09708 19.5962L4.20799 13.3865C4.30851 12.9859 4.71059 12.7856 5.11267 12.7856H10.1387C10.5407 12.7856 10.9428 12.4851 10.9428 11.9844C10.9428 11.4836 10.6413 11.1831 10.1387 11.1831H5.11267C4.71059 11.1831 4.30851 10.8826 4.20799 10.482L2.09708 4.2723C1.89604 3.67136 1.99656 2.97027 2.59968 2.46948C3.10227 1.9687 3.80591 1.86854 4.40903 2.16901C6.31891 2.97027 9.93762 4.57277 12.4506 5.77465C15.2652 7.17684 19.0849 9.38028 21.0953 10.482C21.6984 10.7825 22 11.3834 22 11.9844Z"></path>
                                </g>
                            </svg></span>Channels</h2>
                        </div>
                    </div>
                    <div className='channels-wrapper'>
                        <div className='channels-holder'>
                            <div className='channels-list'>
                                {
                                    posts.map((item , index) =>(
                                        <div className='channels'>
                                            <div className='channels-cont'>
                                                <div className='chan-prf'>

                                                </div>
                                                <div className='chan-data'>
                                                    <div className='profile-details'>
                                                        <p className='post-name' >
                                                            {/* {item.user.name} */}
                                                            {item.name}
                                                            <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none">
                                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z" fill="#4070f4"></path> 
                                                            </g>
                                                            </svg>
                                                        </p>  
                                                        <p className='userName'>
                                                            <span>{item.followers.length} Followers</span> 
                                                        </p>
                                                    </div>
                                                    <div className='channels-follow'>
                                                        <button>Follow</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </> :<Access_Loader/>
            }
        </div>
    )
}

export default Channels