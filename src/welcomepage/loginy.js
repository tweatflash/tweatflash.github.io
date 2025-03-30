import { Link } from "react-router-dom";
import googleSvg from "../assets/images/svg/google.svg"
import eyeopen from "../assets/images/svg/eyeopen.svg"
import eyeclose from "../assets/images/svg/eyeclose.svg"
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios, { axiosPrivate } from "../api/axios";
import AuthContext from '../context/authProvider'
const LoginY = () => {
  const [email,setEmail]=useState("")
  const [verificationCode,setVerificationCode] =useState("")
  const [move,setMove]=useState(true)
  const [move2,setMove2] =useState(true)
  const [validToken,setValidToken]=useState(false)
  const [password,setPassword] =useState("")
  const handleSubmit= async (e)=>{
    if (email){
          try {
            const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/forgotPassword",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "email":email
                }) 
            })
            const response=await request
           if(response.status ===200){
            setMove(false)
           }
            
        } catch (error) {
          console.log(error)
         
        }
        
    }
}
  const FinishUpAcc= async (e)=>{
    if (verificationCode){
        setMove2(false)
          try {
            const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/resetPassword",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "resetToken":verificationCode,
                  "password":password
                }) 
            })
            const response=await request.json()
            console.log(response)
            
        } catch (error) {
          console.log(error)
         
        }
        
    }
}
    return (
        <>
          {
            move ? <div>
                     <p className="intro-text pad-1 page_intro_header">Forgot Password</p>
                     <p className="light-text pad-1 text-md page_intro">Enter your email , username or phone number or continue with google if you used Google to Signin </p>
                     <button className="btn-btn1 btn-btn2 btn-dark-ripple"> <img src={googleSvg}/> &nbsp;&nbsp;Continue with Google</button>
                     <form onSubmit={(e)=>e.preventDefault()}>
                       <p className="light-text text-md padding-top-1">Email, username or phone</p>
                          
                          <div className="password_wrapper">
                            <input
                                type="email"
                                placeholder="Email, username or phone" 
                                // ref={passwordRef}
                                name="email" 
                                value={email}
                                onChange ={(e)=> setEmail(e.target.value)}
                                aria-describedby="uidnote"
                                className="margin-top-1"
                                autoComplete="on"
                                // onFocus={()=> setPasswordfocus(true)}
                                // onBlur={()=>setPasswordfocus(false)}
                            />
                            <div className="password_reveal" >
                              <img src={eyeopen} alt="eye"/>
                            </div>
                          </div>
                         
                          <button className="btn-btn1 btn-blue" type="submit" onClick={()=>handleSubmit()}>Next</button>
                      <Link to={"/login/forgotpassword"} className="text-sm">Forgot password?</Link>
                     </form>
                </div>:(move2 ? <>
                      <p className="intro-text pad-1 route_header tx-center">We sent you a code</p>
                      <p className="light-text pad-1 text-md route_body tx-center">Enter the code below to verify {email}.</p>
                      
                        <p className="light-text pad-1 text-md"></p>
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <p className="light-text text-md txt-white">Verification code</p>
                            <input 
                                type="text"
                                value={verificationCode}
                                onChange={(e)=>setVerificationCode((e.target.value))}
                                placeholder="verification code" 
                                name="verification_code"
                                autoComplete="off"
                                className="margin-top-1" 
                            />
                            <span id="err-text" className={!validToken ? "show-instn" : "hide-inst"}>Enter the valid code</span>
                            <p className="light-text text-md mt-1" >Didn't recieve code?</p>
                            {/* <button className="btn-btn1 btn-gray">
                                Use phone instead
                            </button> */}
                            <button className="btn-btn1 btn-blue" onClick={()=>setMove2(false)}>Create Account</button>
                        </form>
                    </> :<>
                    <p className="intro-text pad-1 route_header tx-center">Enter your new Password</p>
                    <p className="light-text pad-1 text-md route_body tx-center">Enter a new password for {email}</p>
                              <form onSubmit={(e)=>e.preventDefault()}>
                                         <p className="light-text text-md padding-top-1">Enter your password</p>
                                            
                                            <div className="password_wrapper">
                                              <input
                                                  type="text"
                                                  placeholder="New Password" 
                                                  // ref={passwordRef}
                                                  name="password" 
                                                  value={password}
                                                  onChange ={(e)=> setPassword(e.target.value)}
                                                  aria-describedby="uidnote"
                                                  className="margin-top-1"
                                                  autoComplete="on"
                                                  // onFocus={()=> setPasswordfocus(true)}
                                                  // onBlur={()=>setPasswordfocus(false)}
                                              />
                                              <div className="password_reveal" >
                                                <img src={eyeopen} alt="eye"/>
                                              </div>
                                            </div>
                                            <p className="light-text text-md padding-top-1">Confrim your password</p>
                                            
                                            <div className="password_wrapper">
                                              <input
                                                  type="text"
                                                  placeholder="New Password" 
                                                  // ref={passwordRef}
                                                  name="password" 
                                                  aria-describedby="uidnote"
                                                  className="margin-top-1"
                                                  autoComplete="on"
                                                  // onFocus={()=> setPasswordfocus(true)}
                                                  // onBlur={()=>setPasswordfocus(false)}
                                              />
                                              <div className="password_reveal" >
                                                <img src={eyeopen} alt="eye"/>
                                              </div>
                                            </div>
                                            <button className="btn-btn1 btn-gray" onClick={()=>setMove2(true)}>
                                                            back
                                                        </button>
                                            <button className="btn-btn1 btn-blue" type="submit" onClick={()=>FinishUpAcc()}>Reset password</button>
                                       </form>
                    </>)
          }
        </>
    )
}

export default LoginY