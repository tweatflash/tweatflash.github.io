import { Link } from "react-router-dom";
import googleSvg from "../assets/images/svg/google.svg"
import eyeopen from "../assets/images/svg/eyeopen.svg"
import eyeclose from "../assets/images/svg/eyeclose.svg"
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios, { axiosPrivate } from "../api/axios";
import AuthContext from '../context/authProvider'

const Login = () => {
  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const loaderLine=document.querySelector(".loader-line")
    const append_direction=document.querySelector(".more-content-layout")
    const {auth ,setAuth, setSignupModal,signupModal, setErr ,setPrawler ,setCook ,setCookies2,setAllowCookies}=useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [emailErr,setEnailErr] =useState("")
    const [progress, setprogress]=useState(false)
    const [password, setPassword] = useState('');
    let [move,setMove]=useState(false)
    const emailRef=useRef()
    const passwordRef=useRef()
    let [hide,setHide]=useState(true)
    
    const [passwordFocus, setPasswordfocus]=useState(false)
    useEffect(()=>{
      setSignupModal(true)
      
    },[signupModal])
    useEffect(() => {
      if (email.length){
        setValidEmail(true)
      }else{
        setValidEmail(false)
      }
     
    }, [email])
  const longerDay =1000 *60*60*24*30
  const shorterDay =1000 *60*60*24
  const shorter =60 *1000 *5
  // function setCookie(cname, cname2,  cvalue, cvalue2, exdays) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + exdays);
  //   let expires = "expires="+d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  //   document.cookie = cname2 + "=" + cvalue2 + ";" + expires + ";path=/";
  // }
  
  function showLoader(){
    loaderLine.style.visibility="visible"
    append_direction.classList.add("dim")
    setprogress(true)
  }
  function hideLoader(){
    setprogress(false)
    loaderLine.style.visibility="hidden"
    append_direction.classList.remove("dim")
  }
  const handleSubmit= async (e)=>{
    if (validEmail && !progress){
        showLoader()
        e.preventDefault()
        const ipt2=email
        if (!ipt2){

            return;
            
        }else{
          try {
            const request = await fetch("https://tweatflash.onrender.com/api/v1/auth/emailAndphoneNumberAuth",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
  
                body: JSON.stringify({
                    "email":email
                }) 
            })
            const response=await request
            console.warn(response)
            hideLoader()
            if (response.status===200){
              setEmailFocus(true)
              setValidEmail(false)
              setEnailErr("No user with the provided email")
              setErr(true)
              setPrawler("Sorry, we couldn't find your account")
            }else if(response.status===400){
              setMove(true)
            }else{
              hideLoader()
            }
            
        } catch (error) {
          setPrawler(`${error}`)
          setErr(true)
          hideLoader()
        }
        }
    }
}
const inputChange=()=>{
  const password=document.querySelector(".password_wrapper input")
  const imgPassword=document.querySelector(".password_wrapper img")
  
  if (password.type==="password"){
    setHide(true)
    password.type="text"
    imgPassword.setAttribute("src",eyeclose)
  }else{
    password.type="password"
    setHide(false)
    imgPassword.setAttribute("src",eyeopen)
  }
}

const lets_go_login=async ()=>{
  showLoader()
  try {
    const request= await fetch(`https://tweatflash.onrender.com/api/v1/auth/login/`,{
      method:"POST",  
      headers: {
        'Content-Type': 'application/json',                                                                                                                                                                                                                       
      },
      body:JSON.stringify({
        "email":email,
        "password":password
      })
      
      }
    )
    const response=await request
    const data=await response.json()
    console.log(data)
    
    if(response.status === 500){
      hideLoader()
      setEmailFocus(true)
      setValidEmail(false)
      setEnailErr("No user with the provided email")
    }
    else if(response.status === 200){
      setAllowCookies(true)
      setCook(data.refreshTokenJWT)
      setCookies2(data.accessTokenJWT)

      setTimeout(()=>{
        window.location.reload()
      },500)
      // setAuth(true)
    }
  } catch (error) {
    setPrawler(`${error}`)
    setErr(true)
    hideLoader()
  }
}


  return (
    <>
    {!move ? (
      <div>
         <p className="intro-text pad-1 page_intro_header">Welcome back</p>
         <p className="light-text pad-1 text-md page_intro">Fill in the requsted details lets get you on board on tweatFlash within a few seconds</p>
         <button className="btn-btn1 btn-btn2 btn-dark-ripple"> <img src={googleSvg}/> &nbsp;&nbsp;Continue with Google</button>
         <form onSubmit={(e)=>e.preventDefault()}>
           <p className="light-text text-md padding-top-1">Enter your phone, email or username</p>
              <input
                  type="text"
                  placeholder="email, phone or username" 
                  name="email" 
                  value={email}
                  
                  ref={ emailRef }
                  onChange ={(e)=> setEmail(e.target.value)}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={()=> setEmailFocus(true)}
                  onBlur={()=>setEmailFocus(false)}
                  className="margin-top-1" 
                  id={email && !validEmail ? "shw-red" : "hide-red"}
              />
              <span id="err-text" className={emailFocus &&!validEmail ? "show-instn" : "hide-inst"}>{emailErr}</span>
              
              <button className="btn-btn1 btn-blue" disabled={!validEmail} onClick={handleSubmit}type="submit">Next</button>
              
          <Link to={"/"}>Don't have an account ?</Link>
         </form> 
    </div>
    ) : (
      <div>
         <p className="intro-text pad-1 page_intro_header">Finish up</p>
         <p className="light-text pad-1 text-md page_intro">Enter your password for {email} or continue with google if you used Google to Signin </p>
         <button className="btn-btn1 btn-btn2 btn-dark-ripple"> <img src={googleSvg}/> &nbsp;&nbsp;Continue with Google</button>
         <form onSubmit={(e)=>e.preventDefault()}>
           <p className="light-text text-md padding-top-1">Enter your password</p>
              
              <div className="password_wrapper">
                <input
                    type="password"
                    placeholder="Password" 
                    ref={passwordRef}
                    name="password" 
                    value={password}
                    onChange ={(e)=> setPassword(e.target.value)}
                    aria-describedby="uidnote"
                    className="margin-top-1"
                    autoComplete="on"
                    onFocus={()=> setPasswordfocus(true)}
                    onBlur={()=>setPasswordfocus(false)}
                />
                <div className="password_reveal" onClick={inputChange}>
                  <img src={eyeopen} alt="eye"/>
                </div>
              </div>
             
              <button className="btn-btn1 btn-blue" disabled={!password} onClick={lets_go_login}type="submit">Login</button>
          <Link to={"/"}>Forgot password?</Link>
         </form>
    </div>
    )}
    </>
  )
}

export default Login