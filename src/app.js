import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './main_route/layout'
import Welcome from './welcomepage/welcome'
import Login from './welcomepage/login'
import Signin from './welcomepage/signin'
import Home from './home_access/home'
import Error from './errr/error'
import Profile from './home_access/profile'
import Messages from './home_access/messages'
import Welcome_route_protector from './RouteProtector/welcome_route_protector'
import Main_route_protextor from './RouteProtector/main_route_protextor'
import Loader from './loading_component/loader'
import App from './main_route/App'
import WelcomeXYZ from './welcomepage/welcome_xyz'
import AuthContext from './context/authProvider'
import Indemity from './welcomepage/indemity'
import Home_Route from './main_route/home_route'
import Explore from './home_access/explore'
import SinglePosts from './home_access/singlePosts'
import Monietization from './home_access/wallet'
import Bookmark from './home_access/bookmark'
import OtherProfile from './home_access/otherProfile'
import postCompose from './home_access/postCompose'
import CreatePosts from './home_access/createPost'
import GetOtherProfile from './home_access/getOtherProfile.js'
import Community from './home_access/community.js'
import ExploreCommunity from './home_access/exploreCommunity.js'
import EachCommunity from './home_access/eachCommunity.js'
import Reels from './home_access/reels.js'
import Channels from './home_access/channels.js'
import ExploreQ from './home_access/exploreQ.js'
const Main_App = () => {    
    
    const [data ,setData]=useState(false)
    
    const {otherProfile,auth} =useContext(AuthContext)
     return (
        <Routes> 
            <Route element={<Layout/>}>
                {/* public routes still on conditions sha */}
                <Route path='/' element={<App/>}>
                    <Route index element={<WelcomeXYZ/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='signup' element={<Signin/>}/>
                    <Route path='indemity' element={<Indemity/>}/>

                </Route>
                
                {/* this one would be private */}
                <Route element={<Main_route_protextor/>} >
                    <Route element={<Home/>}>
                        <Route index path='home' element={<Home_Route/>}/>
                        <Route element={<Indemity/>}>
                            <Route path='new-status' element={ <CreatePosts />}/>
                        </Route>
                        <Route path='profile' element={<Profile/>}/> 
                        <Route path='explore' element={<ExploreQ/>}/> 
                        <Route path='messages' element={<Messages/>}/>
                        <Route path='trends' element={<Reels/>}/>
                        <Route path='channels' element={<Channels/>} />
                        <Route path="community" element={<ExploreCommunity/>}>
                        
                            <Route index element={<Community/>}/>
                            <Route path=':id' element={<EachCommunity/>}/>
                        </Route>
                        <Route path='monietization' element={<Monietization/>}/>
                        <Route path='bookmarks' element={<Bookmark/>}/>
                      

                       
                        {
                            auth ?  <Route path=":user" element={<GetOtherProfile/>}>
                            {/* <Route path="" element={<Explore/>}> */}
                                <Route index element={<OtherProfile otherProfile={otherProfile} />}/>
                                <Route path='status/:postId' element={<SinglePosts/>}>  
                                
                                {/* </Route> */}
                            </Route>    
                        </Route> :<></>
                        }
                    </Route>
                    
                </Route>
                
                {/* This is the main route/welcome page */}
                
                
                {/* catch all path */}
                <Route path=":user">
                    <Route path="" element={<Explore/>}>
                        <Route index element={<OtherProfile otherProfile={otherProfile} />}/>
                        <Route path='status/:postId' element={<SinglePosts/>}>  
                        
                        </Route>
                    </Route>    
                </Route>        
            </Route>
            
            <Route path='*' element={<Error/>}/>
            
        </Routes> 
    )
}


export default Main_App