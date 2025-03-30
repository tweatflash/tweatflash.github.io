import React, { useContext } from 'react'
import "./settings.css"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/authProvider'
import AsyncImg from './asyncImage'

const Settings = () => {
    const {userAuth}=useContext(AuthContext)
    const navigator=useNavigate()
    return (
        <div className='settings-page'>
            <div className='general-header'>
                <div className='arrow-back' onClick={()=> navigator(-1)}>
                <div className='arw-bck-profile custm-fja'>
                    <svg viewBox="0 0 24 24" fill="none"   ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                </div>
                <div className='mre-edata-con'>
                <p>Settings</p>
                
                </div>
            </div>

            <div className='st-cmptmt'>
                <div className='settings-cmpt'>
                    <p className='cmpt-ttl'>Account Informations</p>
                    <div className='cmpt-data'>
                        <div className='st-profile'>
                            <div className='st-profile-dta'>
                                <div className='st-pimg'>
                                    <AsyncImg src={userAuth.user.profileImage} />
                                </div>
                                <div className='st-pun'>
                                    <p>{userAuth.user.name}</p>
                                    <span>@{userAuth.user.username}</span>

                                </div>
                            </div>
                            <div className='edit-btn custm-fja'>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"></path> </g></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='st-cmptmt'>
                <div className='settings-cmpt'>
                    <p className='cmpt-ttl'>General</p>
                    <div className='cmpt-data'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings