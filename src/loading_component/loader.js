import React from 'react'
import "./loader.css"
const Loader = ({loadingErr}) => {
  return (
    <div className="wrapper_loader">
      <div className='container_loader'>
        <svg className='svg' version="1.1" viewBox="0 0 1000 996" xmlns="http://www.w3.org/2000/svg">
          <path transform="translate(478,8)" d="m0 0h54l25 2 29 4 24 5 22 5 21 6 8 3 10 3 7 3 14 5 10 5 8 3 30 15 10 6 9 5 16 10 12 8 14 10 13 10 8 6v2l4 2 10 8v2h2v2l4 2 7 7 8 7 12 13 1 3h2v2h2l9 11 1 3h2l11 14 11 15 8 12 13 20 8 14 9 16 9 20 3 5 5 13 5 12 4 10 3 11 3 7 6 21 5 22 3 13 3 21 1 3 2 16 1 19 1 8v50l-1 8-1 19-2 16-3 16-3 18-3 11-5 21-4 14-3 7-3 10-10 26-5 11-11 23-8 15-8 14-10 16-13 19-10 13-9 12-4 5h-2l-2 5-9 9-1 2h-2l-2 4-22 22h-2v2h-2v2l-8 7-6 5h-2v2l-10 8-12 9-15 11-23 15-14 8-12 7-19 9-9 5-8 3-11 5-14 5-7 3-10 3-7 3-14 4-13 3-10 3-17 3-13 3-14 2-13 1-2 1h-105l-1-1-13-1-25-4-12-3-15-3-9-3-13-3-13-4-7-3-10-3-11-5-14-5-5-3-8-3-17-9-14-7-14-8-16-10-19-13-10-7v-2l-5-2-11-9-13-11-7-6v-2h-2v-2l-4-2-22-22v-2h-2l-7-8-12-14-7-9-10-13-22-33-6-11-6-10-14-28-6-13-5-13-6-16-3-7-5-17-5-16-5-22-3-13-4-24-2-16-1-18-1-7v-54l2-25 1-4 1-13 3-15 1-9 3-12 3-14 5-17 3-12 3-8 3-10 3-7 5-14 5-10 4-10 9-19 7-12 6-11 7-12 10-16 11-15 9-12 8-10 9-11 3-4h2v-2h2l2-4 15-16 8-8 8-7 3-3h2v-2l11-9 3-1v-2l11-8 5-4h2v-2l13-9 16-11 9-5 11-7 11-6 15-8 12-6 8-3 10-5 14-5 7-3 23-8 12-3 9-3 25-6 9-2 21-3 20-3z" fill="#4074F6"/>
          <path transform="translate(537,216)" d="m0 0h7l1 23 1 148 24 10 11 7 12 9 12 11 10 11 10 15 8 16 5 15 5 22 1 6v9l-1 1-14 1-84 1 1 112 3 9 7 13 9 11 7 6 11 7 13 5h35l14-5 11-7 10-9 10-14h2l4 29v16l-3 22-5 18-7 15-6 11-9 12-9 10-11 10-18 13-16 8-16 6-20 4-21 1-25-3-15-4-15-6-16-9-11-8-12-11-7-7-10-13-10-18-8-19-3-14-2-36-1-157-16-2-15-5-18-10-12-9-13-13-9-13-8-16-4-13-3-16-2-28v-11l1-1h99v-21l1-17 4-23 6-19 10-20 10-13 12-14 13-11 15-10 19-9 16-5z" fill="#FEFEFE"/>
        </svg>
        <>
          {loadingErr ? <div className='loading_response' style={{display:`${loadingErr ? "flex" :"none"}`}}>
            <div className='err-wrapper'>
              {/* <svg fill="#ffffff" version="1.1" id="Capa_1" viewBox="0 0 329.562 329.562" stroke="#ffffff" strokeWidth="0.0032956200000000004"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M326.174,272.923l-139.5-241.568c-4.516-7.821-12.861-12.638-21.893-12.638c-9.031,0-17.377,4.816-21.893,12.638 L3.388,272.923c-4.518,7.821-4.518,17.46-0.002,25.282c4.516,7.822,12.862,12.641,21.895,12.641h279 c9.032,0,17.379-4.818,21.895-12.641C330.691,290.383,330.691,280.744,326.174,272.923z M25.281,285.565l139.5-241.568 l139.5,241.568H25.281z"></path> <path d="M147.281,131.031l7.25,83c0.423,4.886,4.301,8.913,9.355,9.355c5.661,0.495,10.651-3.694,11.145-9.355l7.25-83 c0.078-0.97,0.088-2.057,0-3.057c-0.844-9.666-9.363-16.816-19.028-15.973C153.588,112.846,146.437,121.367,147.281,131.031z"></path> <circle cx="164.781" cy="243.031" r="14.5"></circle> </g> </g></svg> &nbsp; */}
                <p>{loadingErr}</p>
              {/* <svg fill="#ffffff" version="1.1" id="Capa_1" viewBox="0 0 329.562 329.562" stroke="#ffffff" strokeWidth="0.0032956200000000004"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M326.174,272.923l-139.5-241.568c-4.516-7.821-12.861-12.638-21.893-12.638c-9.031,0-17.377,4.816-21.893,12.638 L3.388,272.923c-4.518,7.821-4.518,17.46-0.002,25.282c4.516,7.822,12.862,12.641,21.895,12.641h279 c9.032,0,17.379-4.818,21.895-12.641C330.691,290.383,330.691,280.744,326.174,272.923z M25.281,285.565l139.5-241.568 l139.5,241.568H25.281z"></path> <path d="M147.281,131.031l7.25,83c0.423,4.886,4.301,8.913,9.355,9.355c5.661,0.495,10.651-3.694,11.145-9.355l7.25-83 c0.078-0.97,0.088-2.057,0-3.057c-0.844-9.666-9.363-16.816-19.028-15.973C153.588,112.846,146.437,121.367,147.281,131.031z"></path> <circle cx="164.781" cy="243.031" r="14.5"></circle> </g> </g></svg>  */}
            </div>
        </div> :
          <div className='small-loader'>
            {/* <svg className="spinner" style={{display:"relative"}} viewBox="0 0 50 50">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg> */}
    <div class="spinner-4"></div>

          </div>
        }
        </>
      </div>
    </div>
  )
}

export default Loader