import React from 'react'
import { Outlet } from 'react-router-dom'

const ExploreCommunity = () => {
  return (
    <div className='community-page'>
        <div className='bookmark_header community-header'>
            <button>
            <svg viewBox="0 0 24 24" fill="none" ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            back
            </button>
            <h2><span><svg className="bookmars-svg" style={{width:"25px",marginRight:"5px"}} viewBox="0 0 24 24">
                <g style={{strokeWidth:"2",stroke:"#ffffff",fill:"none"}}>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path>
                    <path d="M12.0625 21C9.57126 18.8012 8 15.5841 8 12C8 8.41592 9.57126 5.19883 12.0625 3"></path>
                    <path d="M3 12H21"></path>
                </g>
            </svg></span>Community</h2>
        </div>
        <Outlet/>
    </div>
    
  )
}

export default ExploreCommunity