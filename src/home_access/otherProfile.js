import React from 'react'
import useWindowSize from '../hooks/useWindowSize'
import profileImg from '../assets/images/svg/profile.svg'
import { useNavigate } from 'react-router-dom'
const OtherProfile = ({otherProfile}) => {
  const navigate=useNavigate()
    const {width}=useWindowSize()
  return (
    <>
      { otherProfile? 
          <div className='user_page_wrapper'>
             <div className='bookmark_header sp-hd'>
                            <button onClick={() => navigate(-1)}>
                            <svg viewBox="0 0 24 24" fill="none" ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            back
                            </button>
                            <h2>Profile</h2>
                        </div>
                    
            
            <div className='profile_data'>
                <div className='profile_wrapper'>
                  <div className='cover_image'>
                    <div className='cvr-img'>
                    {otherProfile.user.coverImage ? <img src={otherProfile.user.coverImage} className='img'/> :<></>}
                      <div className='profile_image'>
                        <div className='prf-img'>
                          {otherProfile.user.profileImage ? <img src={otherProfile.user.profileImage} /> : <img style={ width <= 450 ? {width:"90px", height:"90px"}: {width:"100%", height:"100%"} } src={profileImg}/>}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className={`profile-details-data ${ width <= 450 ? "profile-mbl": "profile-nml" }`}>
                    <div className='profile-patch'>
                      {/* <button>Edit Profile</button> */}
                    </div>
                    <div className='profile-details'>
                      <h3 className='useromin'>{otherProfile.user.name}</h3>
                      <p className='userName'>
                        <span>@{otherProfile.user.username.toLowerCase()}</span>
                      </p>
                    </div>
                    <div className='user_engaugement'>
                      <div className='user-eng'>{otherProfile.user.following.length} Following</div>
                      <div className='user-eng'>{otherProfile.user.followers.length} Followers</div>
                      <div className='user-eng'>{otherProfile.user.friends.length} Friends</div>
                    </div>
                    <div className='posts_profile'>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          :<></>
      }
    </>
  )
}

export default OtherProfile