import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/authProvider'
import './home.css'
import Header from './header'
import Navigation_Menu from './navigation'
import home from '../assets/images/svg/home.svg'
import explore from '../assets/images/svg/explore.svg'
import '../styles/other_styles/media_query/media.css'
import Botttom_nav from './bottom_nav'
import useWindowSize from '../hooks/useWindowSize'
import { Outlet } from 'react-router-dom'
import Access_Loader from '../loading_component/access_loader'
const Home = () => {
    const {width}=useWindowSize()
    const {auth, homeErr,booleanErrHome,setBooleanErrHome,setHomeErr,sidenav,setSideNav,setImgUrl, imgUrl,im,setIm}=useContext(AuthContext)

    let mobile
    useEffect(()=>{
        // console.log(deviceType);
        mobile=width<=450
    },[])
    
    
    const [post,setPost]=useState(false)
     return (
        <div className='main_data_extractor'>
            <div className={`css083yewe ${sidenav? "collapse" :""}`}>
                <div className='side-navigation' tabIndex={1}>
                    <div className='sd-nav'>
                        <div className='sd-nav-header'>
                            <div className='sd-nav-logo'></div>
                            <div className='sd-nav-close' onClick={()=>setSideNav(false)}>
                                <svg  viewBox="0 0 512 512" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="#000000" transform="translate(91.520000, 91.520000)"> <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"> </polygon> </g> </g> </g></svg>
                            </div>
                        </div>
                        <div className='sd-nav-body'>
                            <div className='nav-cnt-cont'>
                                
                            </div>
                            <div className="main-sd-nav-lnk">
                                <div className='sd-nv-lnk-container'>
                                    <div className='sd-nv-lnk-cnt'>
                                        <div className='sd-nv-lnk-slc'>
                                            <div className='sd-nv-lnk-opt'>
                                            <svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"></path></g></svg>
                                                <p>
                                                    <span>Settings</span>
                                                </p>
                                            </div>
                                            <div className='sd-nv-lnk-opt'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
                                                <p>
                                                    <span>Bookmarks</span>
                                                </p>
                                            </div>
                                            <div className='sd-nv-lnk-opt'>
                                            <svg className='sd-notification' viewBox="-1.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>notification_bell [#1394]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-301.000000, -720.000000)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M257.75,574 L249.25,574 L249.25,568 C249.25,565.334 251.375,564 253.498937,564 L253.501063,564 C255.625,564 257.75,565.334 257.75,568 L257.75,574 Z M254.5625,577 C254.5625,577.552 254.0865,578 253.5,578 C252.9135,578 252.4375,577.552 252.4375,577 L252.4375,576 L254.5625,576 L254.5625,577 Z M259.875,574 L259.875,568 C259.875,564.447 257.359,562.475 254.5625,562.079 L254.5625,560 L252.4375,560 L252.4375,562.079 C249.641,562.475 247.125,564.447 247.125,568 L247.125,574 L245,574 L245,576 L250.3125,576 L250.3125,577 C250.3125,578.657 251.739437,580 253.5,580 C255.260563,580 256.6875,578.657 256.6875,577 L256.6875,576 L262,576 L262,574 L259.875,574 Z" > </path> </g> </g> </g> </g></svg>
                                                <p>
                                                    <span>Notification</span>
                                                </p>
                                            </div>
                                            <div className='sd-nv-lnk-opt'>
                                                <svg className="bookmars-svg" viewBox="0 0 24 24">
                                                    <g>
                                                        <path d="M3 9H9.5M21 9H9.5M9.5 9L14.5 4M14.5 4H17.8C18.8467 4 19.4044 4 19.8221 4.1779M14.5 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.07989 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.88 4.20371 19.8514 4.19037 19.8221 4.1779M9 4L4 9M15 9.00015L19.8221 4.1779M15 14.5L10 17.5V11.5L15 14.5Z"></path>
                                                        
                                                    </g>
                                                </svg>
                                                <p>
                                                    <span>Premium</span>
                                                </p>
                                            </div>
                                            <div className='sd-nv-lnk-opt'>
                                                <svg className='sd-notification' viewBox="0 -2.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -922.000000)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M262,764.291 L254,771.318 L246,764.281 L246,764 L262,764 L262,764.291 Z M246,775 L246,766.945 L254,773.98 L262,766.953 L262,775 L246,775 Z M244,777 L264,777 L264,762 L244,762 L244,777 Z"> </path> </g> </g> </g> </g></svg>
                                                <p>
                                                    <span>Messages</span>
                                                </p>
                                            </div>
                                            <div className='sd-nv-lnk-opt'>
                                            <svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3M12 21C9.4651 18.3899 8 15.3051 8 12C8 8.69488 9.4651 5.61005 12 3M12 21C14.5349 18.3899 16 15.3051 16 12C16 8.69488 14.5349 5.61005 12 3M20 9H4M20 15H4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                <p>
                                                    <span>communites</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container_size'>
                
                {/* <Header/> */}
                <div className='main'>
                    <div className='hmmmshit'>
                    
                    {width <=450 ? <></> : <nav className='route_nav_wrapper'>
                        
                        <Navigation_Menu/>
                        
                    </nav>}
                    <div className='css0000_main'>
                    
                        <div className='vdv'>
                        <div className='add_posts'></div>
                            <div className={`error-succes ${booleanErrHome ? "load2" :""}`}>{homeErr}</div>
                            
                            <Outlet/>
                            <div className={`photo_viewer ${im ? "active" :""}`} tabIndex={5}>
                                <div className='viewer-container'>
                                    <div className='viewer-wrapper'>
                                        
                                        <div className='viewer-content'>
                                        <div className='viewer-details'>
                                           
                                           <div className='viewer-options'>
                                               <div className='viewer-cancel' onClick={ ()=>{
                                                    setIm(false)
                                                    setImgUrl("")
                                               }}>
                                               <svg width="25px" height="25px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="#ffffff" transform="translate(91.520000, 91.520000)"> <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"> </polygon> </g> </g> </g></svg>
                                               </div>
                                               <div className='viewer-select'>

                                               </div>
                                           </div>
                                       </div>
                                            <img src={imgUrl}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {width >450? <div className='css0001_mre'>
                            <div className='chck_sm'>
                                
                            </div>
                        </div>:
                        <></>
                        }
                    </div>
                    </div>
                </div>
                {width <=450 ? <Botttom_nav/> : <></>}
               
            </div>
        </div>
    )
}

export default Home