import React, { useContext, useEffect, useState } from 'react'
import axios from '../api/axios'
import AuthContext from '../context/authProvider'

const Verification = ({email,token,username}) => {
  const [verificationCode, setVerificationCode]=useState("")
  const [progress,setprogress]=useState(false)
  const {auth ,setAuth, setSignupModal, setErr ,setPrawler,setCook,setCookies2 ,setAllowCookies}=useContext(AuthContext)
  const loaderLine=document.querySelector(".loader-line")
  const [validToken,setValidToken]=useState(false)
    const append_direction=document.querySelector(".more-content-layout")
    
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
  const FinishUpAcc= async ()=>{
    showLoader()
     try {
      const request= await axios.post('/auth/verifyEmail/',{   
        verificationToken: verificationCode,
          email: email
        }
      )
      hideLoader()
      const response= await request
      const data=await response
      console.log(response)
      if (response.status==200){
        setPrawler(`Verification success`)
        setErr(true)
        setAllowCookies(true)
        setCook(response.data.refreshTokenJWT)
        setCookies2(response.data.accessTokenJWT)
      }
      console.log(data)
     } catch (error) {
        setPrawler(`${error}`)
        console.log(error)
        setErr(true)
        hideLoader()
     }
  }
  useEffect(()=>{
    if (verificationCode==token){
      setValidToken(true)
    }else{
      setValidToken(false)
    }
  },[verificationCode])
  return (
    <>
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
            <span id="err-text" className={!validToken ? "show-instn" : "hide-inst"}>the code you entered is invalid</span>
             <p className="light-text text-md mt-1" >Didn't recieve code?</p>
            <button className="btn-btn1 btn-gray">
                Use phone instead
            </button>
            <button className="btn-btn1 btn-blue" onClick={()=>FinishUpAcc()}>Create Account</button>
        </form>
    </>
  )
}

export default Verification