import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/authProvider'
import './wallet.css'
const Monietization = () => {
  const {auth,cook,cookies2 , imgUrl,setImgUrl,userAuth} =useContext(AuthContext)
  useEffect(()=>{
    // console.log(userAuth)
  },[])
  return (
    <div className='wallet-page'>
        <div className='general-header'>
            <div className='arrow-back'>
              <div className='arw-bck-profile custm-fja'>
                <svg viewBox="0 0 24 24" fill="none"   ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
            </div>
            <div className='mre-edata-con'>
              <p>Wallet</p>
              
            </div>
          </div>
      <div className='wallet-holder'>
            <div className='w-wb'>
                <p className='wb-text'>Total Balance</p>
                <div className='mw-wb'><svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  fill="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path className="st0" d="M406.195,383.984c-8.391,15.734-19.922,28.859-34.516,39.609c-14.656,10.719-32.188,18.703-52.563,23.969 c-8.906,2.25-18.234,3.813-27.703,5.094V512h-70.828v-58.156c-20.172-1.703-39.453-4.844-57.609-9.844 c-27.719-7.594-64.016-38.25-64.016-38.25c-3.109-1.813-5.172-5-5.609-8.531c-0.453-3.563,0.766-7.156,3.313-9.688l35.484-35.5 c3.828-3.781,9.766-4.5,14.359-1.688c0,0,26.563,23.063,46.688,28.563c20.125,5.469,40.094,8.219,60.016,8.219 c25.125,0,45.891-4.438,62.359-13.313c16.5-8.938,24.719-22.75,24.719-41.625c0-13.594-4.031-24.313-12.172-32.188 c-8.109-7.813-21.828-12.734-41.188-14.891l-63.563-5.469c-37.641-3.672-66.672-14.172-87.063-31.375 c-20.453-17.266-30.609-43.453-30.609-78.453c0-19.375,3.906-36.625,11.766-51.797c7.875-15.172,18.563-27.984,32.172-38.422 c13.594-10.469,29.438-18.313,47.469-23.531c7.547-2.188,15.453-3.625,23.484-4.938V0h70.828v50.094 c16.531,1.625,32.266,4.281,46.906,8.313c24.844,6.781,50.938,27.188,50.938,27.188c3.266,1.688,5.484,4.875,6.047,8.5 c0.563,3.688-0.641,7.313-3.219,9.969l-33.281,33.781c-3.547,3.594-9.031,4.531-13.563,2.188c0,0-19.703-14.031-36.734-18.469 c-17.016-4.438-34.891-6.688-53.719-6.688c-24.609,0-42.797,4.719-54.531,14.109c-11.781,9.453-17.625,21.734-17.625,36.875 c0,13.641,4.109,24.078,12.531,31.359c8.359,7.344,22.469,12.109,42.359,14.125l55.703,4.75 c41.297,3.656,72.563,14.625,93.734,32.922c21.203,18.328,31.781,45.016,31.781,80.016 C418.742,350.016,414.554,368.281,406.195,383.984z"></path> </g> </g></svg> <h1>{(userAuth.user.wallet).toString().slice(0,5)}</h1></div>
               
            </div>
            <div className="wallet-options">
                <button>Send</button>
                <button>Withdraw</button>
            </div>
            <div className="nx-wlt-opt">
                <div className="wlt-opt-wrapper">
                    <div className="wlt-list">
                        <div className="wl-list-lgo"></div>
                        <div className="m-wl-lst">
                            <div className="m-wl-op main">
                                <p  >Tweatcoins</p>
                                <p>{userAuth.user.tweatcoins}</p>
                            </div>
                            <div className="m-wl-op value ">
                                <p>{0.0198019802.toFixed(4)}</p>
                                <p><svg version="1.1" style={{height:"10px", width:"10px"}} id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  fill="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path className="st0" d="M406.195,383.984c-8.391,15.734-19.922,28.859-34.516,39.609c-14.656,10.719-32.188,18.703-52.563,23.969 c-8.906,2.25-18.234,3.813-27.703,5.094V512h-70.828v-58.156c-20.172-1.703-39.453-4.844-57.609-9.844 c-27.719-7.594-64.016-38.25-64.016-38.25c-3.109-1.813-5.172-5-5.609-8.531c-0.453-3.563,0.766-7.156,3.313-9.688l35.484-35.5 c3.828-3.781,9.766-4.5,14.359-1.688c0,0,26.563,23.063,46.688,28.563c20.125,5.469,40.094,8.219,60.016,8.219 c25.125,0,45.891-4.438,62.359-13.313c16.5-8.938,24.719-22.75,24.719-41.625c0-13.594-4.031-24.313-12.172-32.188 c-8.109-7.813-21.828-12.734-41.188-14.891l-63.563-5.469c-37.641-3.672-66.672-14.172-87.063-31.375 c-20.453-17.266-30.609-43.453-30.609-78.453c0-19.375,3.906-36.625,11.766-51.797c7.875-15.172,18.563-27.984,32.172-38.422 c13.594-10.469,29.438-18.313,47.469-23.531c7.547-2.188,15.453-3.625,23.484-4.938V0h70.828v50.094 c16.531,1.625,32.266,4.281,46.906,8.313c24.844,6.781,50.938,27.188,50.938,27.188c3.266,1.688,5.484,4.875,6.047,8.5 c0.563,3.688-0.641,7.313-3.219,9.969l-33.281,33.781c-3.547,3.594-9.031,4.531-13.563,2.188c0,0-19.703-14.031-36.734-18.469 c-17.016-4.438-34.891-6.688-53.719-6.688c-24.609,0-42.797,4.719-54.531,14.109c-11.781,9.453-17.625,21.734-17.625,36.875 c0,13.641,4.109,24.078,12.531,31.359c8.359,7.344,22.469,12.109,42.359,14.125l55.703,4.75 c41.297,3.656,72.563,14.625,93.734,32.922c21.203,18.328,31.781,45.016,31.781,80.016 C418.742,350.016,414.554,368.281,406.195,383.984z"></path> </g> </g></svg>{eval( userAuth.user.tweatcoins * 0.0198019802).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="wlt-list">
                        <div className="wl-list-lgo wl-list-lgo2">

                        </div>
                        <div className="m-wl-lst">
                            <div className="m-wl-op menu">
                                <p>Transaction History</p>
                                <p>👉</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      
     
    </div>
  )
}

export default Monietization