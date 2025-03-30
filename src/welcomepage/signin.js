import { useRef, useState, useEffect, useContext } from "react"
import React from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Indemity from "./indemity";
import AuthContext from "../context/authProvider";
import api from '../api/axios'
import Verification from "./veification";
import counrt from './countryNames.json'
import emailsvg from '../assets/images/svg/email.svg'
import whatsappSvg from '../assets/images/svg/whatsapp.svg'
import DOBPromot from "./dobPrompt";
const userRegex=/^[a-zA-Z]+ [a-zA-Z]+(?:[a-zA-Z]+){1,21}$/
const pwdRegex=/^[a-zA-Z][a-zA-Z0-9-_]{7,23}$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


const Register = () => {
    const navigator=useNavigate("")
    const country_codes=counrt
    const {setSignupModal ,setErr ,setPrawler}=useContext(AuthContext)
    function removeLeadingZerosRegex(str) {
        return str.replace(/^0+(?=\d)/, '');
    }
    
    // const signup=useContext(AuthContext)
    const [mve,setMve]=useState(false)
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [gender,setGender]=useState("")

    const [countryCode, setCountryCode] = useState('');
    const [errMsg, setErrMsg] = useState("4 to 24 characters Must be Letters. numbers, underscores, hyphens and other characters are not allowed.");
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setValidName(userRegex.test(user));
    }, [user])
    useEffect(() => {
        console.log(removeLeadingZerosRegex(phone))
    },[phone])
    useEffect(() => {
        setValidEmail(emailRegex.test(email));
        if (!validEmail){
            setErrMsg("Please enter a valid email.")
        } 
    }, [email])
    useEffect(()=>{
        setSignupModal(true)
    },[])
    const checkValidAuth= async ()=>{
        try { 
            const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/emailAndphoneNumberAuth",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    "email":email
                }) 
            })
            const response=await request
            return response
        } catch (error) {
            setPrawler(`${error}`)
            setErr(true)
            return error
        }
    }
    const submit_code = async ()=>{
       if (!mve){
            try {
                const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/emailAndphoneNumberAuth",{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json',
                        
                    },
                    body: JSON.stringify({
                        "email":email
                    }) 
                })
                const response=await request
                return response
            } catch (error) {
                setPrawler(`${error}`)
                setErr(true)
                return error
            }
       }else{
            try {
                const request = await fetch("https://tweatflash-web-app.onrender.com/api/v1/auth/emailAndphoneNumberAuth",{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "phoneNumber":`${countryCode}${phone.toString()}`
                    }) 
                })
                const response=await request
                return response
            } catch (error) {
                setPrawler(`${error}`)
                setErr(true)
                return error
            }
       }
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if (validEmail){
            const loaderLine=document.querySelector(".loader-line")
            loaderLine.style.visibility="visible"
            const append_direction=document.querySelector(".more-content-layout")
            append_direction.classList.add("dim")
            e.preventDefault()
            const ipt1=userRegex.test(user)
            const ipt2=emailRegex.test(email)
            if (!ipt1 || !ipt2){
                
                
                return;
                
            }else{
                const re=await checkValidAuth()
                if (re){
                    loaderLine.style.visibility="hidden"
                    append_direction.classList.remove("dim")
                    if (re.status===200){
                        submit_code()
                        setSuccess(true)
                    }else if (re.status===400){
                        setErrMsg("Email already taken")
                        setPrawler("its seems like you already have an account try login")
                        setErr(true)
                        
                        setEmailFocus(true)
                        setValidEmail(false)
                    }
                }  
            }
        }
    }
    const fetch_country_codes=()=>{
        document.querySelector(".country_code_selector").classList.add("active")
    }
    const kill_country_codes=()=>{
        document.querySelector(".country_code_selector").classList.remove("active")
    }
    return (
        <>
            { !success?(
                <>
                    <div className="country_code_selector">
                        <div className="country_wrapper">
                        <header>
                            <div className="country_search_holder">
                                <input
                                    type="text"
                                    placeholder="search"
                                />
                            </div>
                            <div className="prompt-exit custom-fja" onClick={kill_country_codes}>
                                <p className="text-md ">Cancel</p>
                            </div>
                        </header>
                        <ul>
                            {country_codes.countries.map(item=>(<li key={ item.name } onClick={()=>{
                                    setCountryCode(item.code)
                                    kill_country_codes()
                                }
                            }>
                                <p className="country_name text-md">{item.name}</p>
                                <p className="country-code text-md">{item.code}</p>
                            </li>))} 
                        </ul>
                        </div>
                    </div>
                    
                    <div className="some_data_stuff">
                        
                        <p className="intro-text pad-1 route_header tx-center">Get started</p>
                        <p className="light-text pad-1 text-md route_body tx-center" >Fill in the requsted details lets get you on board on tweatFlash within a few seconds</p>
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <p className="light-text text-md txt-white">Enter the name you use in real life</p>
                            <input
                                type="text"
                                placeholder="David Thomas" 
                                name="name"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e)=> setUser(e.target.value)}
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={()=> setUserFocus(true)}
                                onBlur={()=>setUserFocus(false)}
                                className="margin-top-1" 
                                id={user && !validName ? "shw-red" : "hide-red"}
                            />
                            <span id="err-text" className={userFocus &&user && !validName ? "show-instn" : "hide-inst"}>4 to 24 characters Must be Letters. numbers, underscores, hyphens and other characters are not allowed.</span>
                            <div className="switch-holder margin-top-1">
                                <div className="switch-details switch-details-1 text-md active" onClick={(e)=>{
                                    setMve(false)
                                    document.querySelector(".switch-details-1").classList.add("active")
                                    document.querySelector(".switch-details-2").classList.remove("active")
                                }}><img src={emailsvg} alt=""/> &nbsp; Email </div>    
                                <div className="switch-details switch-details-2 text-md" onClick={(e)=> {
                                    setMve(true)
                                    document.querySelector(".switch-details-2").classList.add("active")
                                    document.querySelector(".switch-details-1").classList.remove("active")
                                }}><img src={whatsappSvg} alt=""/> &nbsp;Phone</div>    
                            </div>
                            <div className="input_changer_handler">
                                <>  
                                {   
                                    !mve ? (
                                        <>
                                            <div className="input_holder">
                                                <input 
                                                    type="email" 
                                                    placeholder="example@gmail.com" 
                                                    name="email" 
                                                    className="margin-top-1"
                                                    // autoComplete="off"
                                                    required
                                                    value={email}
                                                    onChange={(e)=> setEmail(e.target.value)}
                                                    aria-invalid={validEmail ? "false" : "true"}
                                                    onFocus={()=> setEmailFocus(true)}
                                                    onBlur={()=>setEmailFocus(false)}
                                                    id={email && !validEmail ? "shw-red" : "hide-red"}

                                                /> 
                                        
                                            </div>
                                            <span id="err-text" className={emailFocus &&email && !validEmail ? "show-instn" : "hide-inst"}>{errMsg}</span>
                                        </>
                                    ):(
                                        <div className="phone_num_holder">
                                            <div className="phne_wrapper">
                                                <div className="cnty-code custom-fja" onClick={fetch_country_codes}>
                                                    <p className="text-md txt-white">{countryCode}</p>
                                                </div>
                                                <input 
                                                    type="tel" 
                                                    placeholder="phone number" 
                                                    name="number"
                                                    tabIndex='1'
                                                    value={phone}
                                                    onChange={(e)=>setPhone(removeLeadingZerosRegex(e.target.value))}
                                                    onFocus={()=>setPhoneFocus(true)}
                                                    onBlur={()=>setPhoneFocus(false)}
                                                    // autoComplete="off"
                                                    
                
                                                /> 
                                            </div>
                                
                                        </div>
                                    )
                                }
                                </>
                            </div>
                            <button className="btn-btn1 btn-blue" disabled={ (validName && validEmail) || (validName && phone && countryCode) || (validName && validEmail && phone && countryCode)?  false : true} onClick={handleSubmit} type="submit">Next</button>
                            <Link to={"/login"} className="text-sm">Already have an account ?</Link>
                        </form>
                    </div>
                </>
                ):(
                    <>
                        <DOBPromot user={user} email={email}/>
                        
                    </>
              )
            }
        </>
    
    )
}

export default Register