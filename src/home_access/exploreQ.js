import React, { useContext, useEffect, useState } from 'react'
import './explore.css'
import AuthContext from '../context/authProvider'
import axios from '../api/axios'
import { Blur, Grow, Slide } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'
const ExploreQ = () => {
    const [searchFocus,setSearchFocus] =useState(false)
    const [exploreUsers,setExploreUsers] =useState([])
    const {auth,cook,cookies2 , setFnp,userAuth,setSideNav ,setBooleanErrHome,setHomeErr,setCook,setCookies2, setAllowCookies,displayHeader,setDisplayHeader} =useContext(AuthContext)
    const searchFetch= async ()=>{
        try {
            const request =await axios.post("/explore",{
                signedCookies:JSON.stringify({
                    refreshToken: cook,
                    accessToken:cookies2
                })
            })
            const response=await request
            console.log(response)
            setExploreUsers(response.data.users)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        searchFetch()
    },[])
    return (
        <div className='explore-page'>
            <div className='bookmark_header sp-hd explore-header-i'>
            <div className='explore-header'>
                <div className='explore-header-container'>
                    <div className='search-explore'>
                        <div className='search-explore'>
                            <input 
                                type='text'
                                placeholder='Search anything'
                                onBlur={(e)=> setSearchFocus(false)}
                                onFocus={(e)=>setSearchFocus(true)}
                            />
                            {searchFocus ?
                                <div className='explore-cancel custm-fja'>
                                <div className='c-ex'>
                                    <svg viewBox="-28 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>cancel</title><path d="M64 388L196 256 64 124 96 92 228 224 360 92 392 124 260 256 392 388 360 420 228 288 96 420 64 388Z"></path></g></svg>
                                </div>
                            </div>:
                            <></>}
                        </div>
                    </div>
                    <div className='explore-settings custm-fja'>
                        <div className='ex-filter custm-fja'>
                        <svg version="1.1" id="XMLID_306_" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="filter"> <path d="M11.3926 4.5166C10.5723 4.5166 9.86914 4.01855 9.56152 3.31543H1.64404C1.21191 3.31543 0.867676 2.94189 0.867676 2.52441C0.867676 2.09229 1.21191 1.72607 1.64404 1.72607H9.5542C9.86182 1.01562 10.5723 0.517578 11.3926 0.517578C12.2129 0.517578 12.916 1.01562 13.2236 1.72607H15.5381C15.9556 1.72607 16.2998 2.08496 16.2998 2.52441C16.2998 2.94922 15.9556 3.31543 15.5381 3.31543H13.2236C12.916 4.01855 12.2129 4.5166 11.3926 4.5166ZM11.3926 3.45459C11.9199 3.45459 12.3301 3.03711 12.3301 2.51709C12.3301 1.98242 11.9199 1.57959 11.3926 1.57959C10.8726 1.57959 10.4551 1.98242 10.4551 2.51709C10.4551 3.03711 10.8726 3.45459 11.3926 3.45459ZM1.62207 6.36963H4.03174C4.33936 5.6665 5.04248 5.16846 5.86279 5.16846C6.68311 5.16846 7.38623 5.6665 7.69385 6.36963H15.5161C15.9556 6.36963 16.2998 6.72852 16.2998 7.16064C16.2998 7.59277 15.9556 7.95898 15.5161 7.95898H7.69385C7.38623 8.66211 6.67578 9.16016 5.86279 9.16016C5.04248 9.16016 4.33203 8.66211 4.02441 7.95898H1.62207C1.21191 7.95898 0.867676 7.58545 0.867676 7.16064C0.867676 6.72852 1.21191 6.36963 1.62207 6.36963ZM5.86279 8.10547C6.39746 8.10547 6.80029 7.68066 6.80029 7.16064C6.80029 6.6333 6.39746 6.22314 5.86279 6.22314C5.34277 6.22314 4.92529 6.6333 4.92529 7.16064C4.92529 7.68066 5.34277 8.10547 5.86279 8.10547ZM11.3926 13.8037C10.5723 13.8037 9.86182 13.3057 9.5542 12.5952H1.64404C1.21191 12.5952 0.867676 12.229 0.867676 11.8042C0.867676 11.3721 1.21191 11.0132 1.64404 11.0132H9.5542C9.86914 10.3027 10.5723 9.80469 11.3926 9.80469C12.2129 9.80469 12.916 10.3027 13.2236 11.0132H15.5381C15.9556 11.0132 16.2998 11.3647 16.2998 11.8042C16.2998 12.2363 15.9556 12.5952 15.5381 12.5952H13.2236C12.916 13.3057 12.2129 13.8037 11.3926 13.8037ZM11.3926 12.7417C11.9199 12.7417 12.3301 12.3242 12.3301 11.8042C12.3301 11.2769 11.9199 10.8667 11.3926 10.8667C10.8726 10.8667 10.4551 11.2769 10.4551 11.8042C10.4551 12.3242 10.8726 12.7417 11.3926 12.7417Z"></path> </g> </g></svg>
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
            <div className='explore-cont'>
                <div className='explore-wrpr'>
                    <div className='explore-sections'>
                        {
                            exploreUsers.length ? 
                            <div className='ex-sec-user'>
                                <h2>Who to follow</h2>
                                <div className='usersfl-container'>
                                    <div className='ex-us-c'>
                                        {
                                        
                                            exploreUsers.map(item=>(
                                                <div className='ex-users'>
                                                    <div className='ex-usr-phto'>
                                                        <AsyncImage
                                                            key={1}
                                                            src={item.profileImage}
                                                            Transition={Blur}
                                                            style={{ width: "100%", height: "100%", borderRadius: 50 }}
                                                            loader={<div style={{ background: '#888' }} />}
                                                        />
                                                    </div>
                                                    <div className='ex-user-mre-data'>
                                                    
                                                        <div className='ex-user-desc'>
                                                                <p className='post-name'>{item.name}</p>
                                                                <p className='userName'>
                                                                    <span className='userName'>
                                                                        @groeubfi 
                                                                    </span>
                                                                </p>
                                                        </div>
                                                        <button>
                                                            Follow
                                                        </button>
                                                </div>
                                                </div>
                                            ))
                                            
                                        }
                                        <div>
                                            
                                        </div>
                                    </div>
                                </div> 
                            </div> :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExploreQ