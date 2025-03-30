
import React, { useContext, useState } from 'react'
import './createCommunity.css'

import AuthContext from '../context/authProvider'
import axios from '../api/axios'

const CreateCommunity = () => {
  const {cook,cookies2,setBooleanErrHome,setHomeErr}=useContext(AuthContext)
  const [name,setName] =useState("")
  const [bio,setBio] =useState("")
  const [stepA,setStepA] =useState(true)
  const [cmE,setCmE]=useState(false)
  const [load,setLoad]=useState(false)
  const checkCmmName=async ()=>{
    setStepA(false)
    try {
      const request=await axios.post('community/create',{
      signedCookies:JSON.stringify({
        refreshToken:cook,
        accessToken:cookies2
      }),
      name:name,
      bio:bio,
  })
      const response=await request
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const checkCommName=async ()=>{
    setLoad(true)
    try {
      const request=await axios.post('community/communityAuth',{
        signedCookies:JSON.stringify({
          refreshToken:cook,
          accessToken:cookies2
        }),
        communityname:name,
      })
      const response=await request
      setLoad(false)
      if(response.status===200){
        setBooleanErrHome(true)
        setHomeErr(`Your community ${name} has been created`)
        setCmE(false)
      }
    } catch (error) {
      setLoad(false)
      if(error.status===400){
        setBooleanErrHome(true)
        setHomeErr("A community with this name already exists")
        setCmE(true)
      }else{
        setBooleanErrHome(true)
        setHomeErr(`An Unexpected error occured try again`)
      }
     
    }
  }
  return (
    <div className='create-community'>
        <div className='general-header'>
            <div className='arrow-back'>
              <div className='arw-bck-profile custm-fja'>
                <svg viewBox="0 0 24 24" fill="none"   ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
            </div>
            <div className='mre-edata-con'>
              <p>Create Community</p>
              
            </div>
        </div>
          {load ? <div className='loader-line'></div> : <></>}
        
        {
          stepA ?  <div className='create-community-form'>
            <h2>Tell us about your community</h2>
            <p className='crt-cmm-des p-g-bold'>A name and description help people understand what your community is all about.</p>

            <form onSubmit={(e)=>e.preventDefault()} className='login_form'>
                  <div className="password_wrapper">
                      <p className='text-sm'>Name</p>
                      <input
                          type="text"
                          placeholder="" 
                          name="name" 
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          aria-describedby="uidnote"
                          autoComplete="on"
                      />
                    <span id="err-text" className={cmE ? "show-instn" : "hide-inst"}>A community with this name already Exists</span>
                  </div>
                  
                  <div className="password_wrapper pp-wrp-bio">
                      <p className='text-sm'>Community Description</p>
                      <textarea
                          type="text"
                          placeholder="" 
                          name="name" 
                          value={bio}
                          onChange={(e)=>setBio(e.target.value)}
                          aria-describedby="uidnote"
                          autoComplete="on"
                      ></textarea>
                  
                  </div>
                  <div className='cc-cmty-btn'>
                    <button className='cc-btn'>Back</button>
                    <button className='cc-btn-cn' onClick={()=>checkCommName()} disabled={name.length ? false :true}>Next step</button>
                  </div>
              </form>
              </div> :<></>
          }
        
      </div>
  )
}

export default CreateCommunity