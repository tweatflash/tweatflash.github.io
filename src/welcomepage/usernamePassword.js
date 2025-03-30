import React, { useContext, useEffect, useState } from 'react'
import eyeopen from "../assets/images/svg/eyeopen.svg"
import eyeclose from "../assets/images/svg/eyeclose.svg"
import Verification from './veification'
import AuthContext from '../context/authProvider'
const UsernamePassword = ({user,email,gender,dobFormat}) => {
    const {auth , setSignupModal, setErr ,setPrawler}=useContext(AuthContext)
    const [username,setUsername]=useState("")
    const [validUsername,setValidUsername]=useState()
    const [password, setPassword] = useState('');
    const [userResponse, setUserResponse]=useState("")
    const loaderLine=document.querySelector(".loader-line")
    const append_direction=document.querySelector(".more-content-layout")
    const [success , setSuccess]=useState(false)
    let [hide,setHide]=useState(true)
    const [token,setToken]=useState("")
    const users=["Micheal","Mic840448474","M837398383"]
    function showLoader(){
        loaderLine.style.visibility="visible"
        append_direction.classList.add("dim")
        // setprogress(true)
    }
    function hideLoader(){
        // setprogress(false)
        loaderLine.style.visibility="hidden"
        append_direction.classList.remove("dim")
    }
    useEffect(()=>{
        console.log(userResponse)
    },[userResponse])
    const inputChange=()=>{
        const password=document.querySelector(".password_wrapper .password")
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
      const printShit=()=>{
        console.log(user,email,dobFormat,gender)
      }
      const registerUser=async ()=>{
        showLoader()
        try {
            const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/register",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    "name":user,
                    "username":username,
                    "email":email,
                    "password":password,
                    "gender":gender,
                    "dateOfBirth":dobFormat
                }) 
            })
            const response=await request.json()
            setToken(response.verificationToken)
            console.log(response)
            hideLoader()
            setSuccess(true)
        } catch (error) {
            setErr(true)
            setPrawler(error)
            hideLoader()
        }
      }
      const checkValidAuth= async ()=>{
        console.log(email)
        showLoader()
        try { 
            const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/usernameAuth",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    "username":username
                }) 
            })
            const response=await request
            const data=await response
            response ? hideLoader(): showLoader()
            console.log(data)
            switch (data.status){
                case 200:
                    console.log("username dosen't exists")
                    registerUser()
                    break
                case 400:
                    setErr(true)
                    setPrawler("Username already taken try another")
                    break
                default:
                    setUserResponse("")
            }
        } catch (error) {
            setErr(true)
            setPrawler(`${error}`)
            hideLoader()
        }
    }
    return (
        <>
            {!success ? (
                <div className="some_data_stuff">
                                
                    <p className="intro-text pad-1 route_header tx-center" >Creating account</p>
                    <p className="light-text pad-1 text-md route_body tx-center">Create a unique username and password to create an account on tweatflash</p>
                    <form onSubmit={(e)=>e.preventDefault()} className='login_form'>
                        <div className="password_wrapper">
                            <p className='text-sm'>Username</p>
                            <input
                                type="text"
                                placeholder="" 
                                name="name" 
                                value={username}
                                onChange ={(e)=> setUsername(e.target.value)}
                                aria-describedby="uidnote"
                                autoComplete="on"
                            />
                        
                        </div>
                        <div className='username_list'>
                            <ul className='username_wrapper'>
                                {users.map((item,index)=>(<li className='text-sm' key={index} onClick={()=>setUsername(item)}>{item}</li>))}
                            </ul>
                        </div>
                        <div className="password_wrapper margin-top-1">
                            <p className='text-sm'>Password</p>
                            <input
                                type="password"
                                placeholder="" 
                                name="password"     
                                value={password}
                                onChange ={(e)=> setPassword(e.target.value)}
                                aria-describedby="uidnote"
                                className='password'
                                autoComplete="on"
                            />
                            <div className="password_reveal" onClick={inputChange}>
                            <img src={eyeopen} alt="eye"/>
                            </div>
                        </div>
                        <button className="btn-btn1 btn-blue" disabled={!username || !password ? true : false} onClick={checkValidAuth}>Next</button>
                    </form>
                </div>
                
            ):(
                <>
                    <Verification email={email} token={token} username={username}/>
                </>
            )}
        </> 
    )

}

export default UsernamePassword