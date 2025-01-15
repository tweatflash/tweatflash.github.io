import React, { useContext, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import googleSvg from '../assets/images/svg/google.svg'
import star from '../assets/images/svg/star2.svg'
import AuthContext from '../context/authProvider'
import './welcom2.css'
import './welcome.css'
import useWindowSize from '../hooks/useWindowSize'

const Welcome = () => {
    const {signupModal , auth ,err,prawler,loading}=useContext(AuthContext)
    const {width}=useWindowSize()
    const navigator =useNavigate()
    return !auth && !loading?<> 
      <header>
            <div className="a">
                <div className="logo">
                    <div className="a1"></div>
                    <div className="a2"><h2>tweatFlash</h2></div>
                </div>
               <>
                {
                    width<=450 ?<></> : <div className="logo" >
                    <div className="switch-continue">
                        <button >Login</button>
                        <button className="active">Join now</button>
                    </div>
                </div>
                }
               </>
            </div>
        </header>
        <div className="main-entry">
            <div className='new_modal_intro'>
                <div className='controller'>
                <img src={star}/>&nbsp; <p className="text-sm">earn tweatstars by by just signing up</p>&nbsp;<img src={star}/>
                </div>
            </div>
            <h1><b  className= "grad">
                tweatFlash</b> Where your thoughts take flight
                </h1>
            <p className="p in-para">From breaking news and entertainment to sports and politics, get the full story with all the live commentary</p>
            <div className="get-started-modal" onClick={()=>document.querySelector(".login").classList.add("preview")}>
                Get Started. it's Free
            </div>
            <p>Free forever no credit card</p>
           
        </div>
        <div className={`login ${signupModal ? "preview" :"" } `}>
            <div className={`response_message ${err ? "load" :""}`}>
                <div className="response-handler">
                    <div className="response-text custom-fja">
                        <p className="response-message-text">
                            {prawler}
                        </p>
                    </div>
                </div>
            </div>
            <div className="holder">
                <div className="fixed-back" onClick={()=>{
                  navigator("/")
                  document.querySelector(".login").classList.remove("preview")
                }}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6L5 12M5 12L11 18M5 12H19" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                <div className="wrapper">
                    <div className='more-content-layout'>
                    <div className="loader_holder">
                      <div className='loader-line hidden'></div>
                    </div>
                    <div className='shit'>
                      <Outlet/>
                    </div>
                    </div>
                </div>
            </div>

        </div>
        
</> : <Navigate to="/home"/>
}

export default Welcome