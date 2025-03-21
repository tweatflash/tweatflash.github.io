import React from 'react'
import './bookmark.css'
const Bookmark = () => {
  return (
    <div className='bookmarks_page'>
        <div className='container_bookmarks'>
            <div className='bookmark_header'>
                <button>
                <svg viewBox="0 0 24 24" fill="none" ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                
                </button>
                <h2><span><svg className="bookmars-svg" viewBox="0 0 1024 1024">    
                    <g>
                        <path d="M665.6 768L512 614.4 358.4 768V256h307.2v512zM512 537.6L614.4 640V307.2H409.6V640L512 537.6z"></path>
                    </g>
                </svg></span>Bookmarks</h2>
            </div>
            <div className='no_bookmarks'>
                <div className='b-svg'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" strokeWidth="2" stroke-linejoin="round"></path> </g></svg>
                    <p>No Posts saved</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Bookmark