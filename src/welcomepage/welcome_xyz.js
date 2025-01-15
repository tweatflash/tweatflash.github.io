import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import googleSvg from '../assets/images/svg/google.svg'
import axios from 'axios'
import api from '../api/axios'
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import DOBPromot from './dobPrompt'
import AuthContext from '../context/authProvider'
const WelcomeXYZ = () => {
    const [authData, setAuthData ]=useState({})
    const [googleLogin,setGoogleLogin]=useState(false)
    const [progress,setprogress]=useState(false)
    const {setErr ,setPrawler ,setAllowCookies,setCook,setCookies2}=useContext(AuthContext)
    function showLoader(){
      const loaderLine=document.querySelector(".loader-line")
      const append_direction=document.querySelector(".more-content-layout")
      loaderLine.classList.remove("hidden")
        append_direction.classList.add("dim")
        setprogress(true)   
    }
    function hideLoader(){
      const loaderLine=document.querySelector(".loader-line")
      const append_direction=document.querySelector(".more-content-layout")
        setprogress(false) 
        loaderLine.classList.add("hidden")
        append_direction.classList.remove("dim")
    }

    const month = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
    let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();
    const [day,setDay]=useState("")
    const [currMonth,setCurrMonth]=useState()
    const [currYear,setCurrYear]=useState("")
    const [days,setDays]=useState([])
    const [gender,setGender]=useState("")
    const [genderw,setGenderw]=useState("Please select your gender")    
    const [success,setSuccess]=useState(false)
    const years=[]
    const daysStuff=[]
    const minYear=currentYear-7
    let dobFormat=`${currYear}-${currMonth}-${day}`
    const daysOfMonth=(a,b)=>{
        const template=[] 
        for (let i = a; i <=b; i++) {
        template.push(i)
        setDays(template)
        }
    }
    useEffect(()=>{
        let lastDateofMonth = new Date(currYear, currMonth, 0).getDate()
        daysOfMonth(1,lastDateofMonth)
    },[currMonth])
    useEffect(()=>{
        let lastDateofMonth = new Date(currYear, currMonth, 0).getDate()
        daysOfMonth(1,lastDateofMonth)
    },[currYear])
    for (let i = 100; i > -1; i--) {
        years.push(minYear-i)
    }
    const createGoogleAccount =async ()=>{
        showLoader()
        try {
            const request = await fetch("https://tweatflash.onrender.com/api/v1/auth/google",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    "name":authData.name,
                    "email":authData.email,
                    "dateOfBirth":dobFormat,
                    "token":authData.token,
                    "profileImage":authData.picture,
                    "sub":authData.sub,
                }) 
            })
            // hideLoader()
            const response=await request.json()
            console.log(response)
            if (response.refreshTokenJWT==undefined && response.accessTokenJWT==undefined){
              setPrawler("Sorry, you didn't use google to signup try login with your email and password ")
              setErr(true)
              hideLoader()
              setGoogleLogin(false)
            }else{
              setAllowCookies(true)
              setCook(response.refreshTokenJWT)
              setCookies2(response.accessTokenJWT)
              setTimeout(()=>{
                window.location.reload()
              },500)
            }
           
            
            
        } catch (error) {
            hideLoader()
            setPrawler(`${error}`)
            setErr(true)
            
        }
    }
  
    const login = useGoogleLogin({

        onSuccess: async (response) =>{
            showLoader()
            try {
                const res =await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{
                    headers:{
                        Authorization:`Bearer ${response.access_token}`,
                    },
                })
                const dat=await res.json()
                console.log(dat)
                setGoogleLogin(true)
                setAuthData({ ...dat ,"token" :response.access_token})
               hideLoader()
            } catch (error) {
              hideLoader()
              setPrawler(`${error}`)
              setErr(true)
            }
        }
      });
      
  return (
    <>
        {!googleLogin? 
            <div className="form-data">
                <p className="intro-text pad-1 tx-center">Happening now</p>
                <p className="light-text pad-1 text-md tx-center">We are excited to have you on board! <br/>Please choose either to <Link to="signup">sign up</Link> or <Link to="login">log in</Link>.</p>
                <div className="options">
                    <button className="btn-btn1 btn-btn2 btn-dark-ripple" onClick={login}> <img src={googleSvg}/> &nbsp;&nbsp;Continue with Google </button>
                    
                    <button className="btn-btn1 btn-blue btn-blue-ripple" >
                        <Link to="signup" className="flx-center">Create Account</Link>
                    </button>
                    <p className="light-text text-md mt-1 tx-center" >Already have an account ?</p>
                    <button className="btn-btn1 btn-gray">
                        <Link to="login" className="flx-center">Log in</Link>
                    </button>
                    <span className="light-text text-sm">By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">Cookie  Use.</a></span>
                </div>
            </div>
        :
        <>
        <p className="intro-text pad-1 route_header tx-center">Almost done</p>
        <p className="light-text pad-1 text-md route_body tx-center">Enter and select your date of birth and gender so we can verify your registration process
        </p>
        <form onSubmit={(e)=>e.preventDefault()}>
            <p className="light-text text-md txt-white">Date of birth</p>
            <div className='select_holder'>
              <div className='month_select select_wrapper'>
                <label htmlFor='months'>
                  <p className='text-md'>Month</p>
                </label>
                <select onChange={(e)=>setCurrMonth(e.target.value)} id='months'>
                  <option value=""></option>
                  {month.map((item,index)=>(<option key={item} value={eval(index +1)}>{item}</option>))}
                </select>
              </div>
              <div className='days_select select_wrapper'>
                <label htmlFor='days'>
                  <p className='text-md'>Day</p>
                </label>
                <select onChange={(e)=>setDay(e.target.value)} id='days'> 
                  <option value=""></option>
                  {days.map(item=>(<option key={item}>{item}</option>))}
                </select>
              </div>
              <div className='year_select select_wrapper'>
                <label htmlFor='year'>
                  <p className='text-md'>Year</p>
                </label>
                <select onChange={(e)=>setCurrYear(e.target.value)} id='year'>
                  <option value=""></option>
                  {years.map(item=>(<option value={item} key={item}>{item}</option>))}
                </select>
              </div>
            </div>
            
            <p className="light-text text-md txt-white margin-top-2">Select your Gender</p>
            <div className="gender_selection">
              <div className='gender_select'>
                {/* <label>
                  <p className='text-md'>Gender</p>
                </label> */}
                <div className='selector_gender'>
                  <select onChange={(e)=>setGender(e.target.value)} aria-placeholder='hi jdjd'>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>
              
            </div>
            <button className="btn-btn1 btn-blue" disabled={!currMonth || !day || !currYear || !gender? true :false} type="submit" onClick={createGoogleAccount}>Next</button>
            {/* <Link to={"/welcome/login"}>Already have an account ?</Link> */}
        </form>
      </>
   
        }
    </>
  )
}

export default WelcomeXYZ