import {createContext , useContext, useEffect, useState } from "react";
import axios, { axiosPrivate } from "../api/axios";
import Cookies from 'universal-cookie'
import useCookies from "../hooks/createCookies";
const AuthContext=createContext({})
export const AuthProvider= ({children})=>{
    const [signupModal,setSignupModal]=useState(false)
    const [err,setErr]=useState(false)
    const [cook,setCook]=useState("")
    const [cookies2,setCookies2]=useState("")
    const [auth,setAuth]=useState(false)
    const [signup, setSignup]=useState({})
    const [userDetails, setUserDetails]=useState({})
    const [prawler,setPrawler]=useState("")
    const [loadingErr, setLoadingErr]= useState("")
    const [loading,setLoading]=useState(true)
    const [userAuth,setUserAuth]=useState({})
    const [otherProfile,setOtherProfile]=useState("")
    const [displayHeader,setDisplayHeader]=useState([])
    const [displayBottomNav, setDisplayBottomNav]=useState(true)
    const [homeErr,setHomeErr] =useState("")
    const [booleanErrHome, setBooleanErrHome]=useState(false)
    const [allowCookies,setAllowCookies]=useState(false)
    const [sidenav,setSideNav]=useState(false)
    const [viewhd,setViewhd]=useState(true)
    const [imgUrl,setImgUrl]=useState([])
    const [fnp,setFnp] =useState(true)
    const [uploadPost,setUploadPost] =useState(false)
    const [focusMagic,setFocusMagic] =useState(false)
    const [im,setIm]=useState(false)
    const [commentsPrawler,setCommentsPrawler] =useState([])
    const [showComments,setShowComments] =useState(false)
    const [eOption,setEOption] =useState(false)
    const [eCordinate,setECordinate]=useState([])
    const [postId,setPostId]=useState("")
    const [showTweatstar , setShowTweatstar]=useState(false)
    const [tweatstarID,setTweatstarID] =useState("")
    const cookies = new Cookies();
    let counter = 0
    let indexing = 0
    let newPosts=[]
    useEffect(()=>{
      if (err){
        setTimeout(()=>{
          setErr('')
        },2000)
      }
    },[err])
    useEffect(()=>{
      if (homeErr && booleanErrHome){
        setTimeout(()=>{
          setBooleanErrHome(false)
        },2000)
      }
    },[homeErr,booleanErrHome])
    function GetCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
          c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
          }
      }
      return "";
  }
      
  
  function settleCookies(){
    const refreshTokenJWT=GetCookie("RFTFL")
    const accessTokenJWT=GetCookie("ACTFL")
    if (refreshTokenJWT !=="" && accessTokenJWT !==""){
      
      setAllowCookies(true)
      setCook(refreshTokenJWT)
      setCookies2(accessTokenJWT)
      setAuth(true)
      setAllowCookies(false)
      return true
    }else{
      setAuth(false)
    }
  }

  useEffect(()=>{
    // settleCookies()
  },[cook,cookies2])
  const checkIfLoggedIn= async (c1,c2)=>{
    setLoading(true)
    try {
      const response =await axios.post('/auth',{
        signedCookies:JSON.stringify({
          refreshToken: c1,
          accessToken:c2
        })
      })
      const drew =await response
      // console.log(response)
     
      if(drew.data.user){
        setAuth(true)
        setUserAuth(drew.data)
        setLoadingErr("") 
        setLoading(false)
        // return "i am logged in"
      }
     
    } catch (error) {
      
      console.log(error)
       if (error.status ==500){
        setLoadingErr("")
        setLoading(false)
       }else if (error.code==="ERR_NETWORK"){
        setLoadingErr(`${error.message} please check your internet connection or try reloading this page`)
        
        setLoading(true)
       }else{
        setLoadingErr(`Sorry an unexpected error occured try reloading this page`)
        
        setLoading(true)
       }
      //  return "i will give error"
    }
  }
  useEffect(()=>{
    const storedToken = cookies.get('RFTFL'); 
    const storedToken2 = cookies.get('ACTFL'); 
    if (storedToken && storedToken2) {
      setCook(storedToken)
      setCookies2(storedToken2)
      checkIfLoggedIn(storedToken , storedToken2)
      //   .then((data) => {
      //     setAuth(true);
      //     console.log("ksjhsh dhdbdh dujdbdj")
      //   })
      //   .catch((data) => {
      //     setAuth(true); 
      //     cookies.remove('RFTFL'); 
      //     cookies.remove('ACTFL'); 
      //   });
    }else{
      console.log("bullshit dhdhd")
      setAuth(false)
      setLoadingErr("") 
      setLoading(false)
    }
  },[])
  
  useEffect(()=>{
    
    if (allowCookies){
      var date = new Date();
      date.setTime(date.getTime() + (60*1000*20));
      let expires
      expires = "; expires=" + date.toUTCString();
      let data=cook.slice(0,100)
      // document.cookie = `user=${data}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/`;
      document.cookie = "ACTFL" + "=" + cookies2 + ";" + expires + ";path=/";
      document.cookie = "RFTFL" + "=" + cook + ";" + expires + ";path=/";
      setAllowCookies(false)
    }
  },[cook , cookies2])
  
  useEffect(()=>{
  //  console.log(imgUrl)
  },[imgUrl])
  
  useEffect(()=>{
    if (auth && fnp){
      // fetchPosts2()
    }
  },[auth])
  useEffect(()=>{
    if (fnp){
      // fetchPosts2()
    }
  },[fnp])
    return (
        <AuthContext.Provider value={
            {
              auth,
              setAuth,
              signup,
              setSignup,
              signupModal,
              setSignupModal,
              err,
              setErr ,
              prawler,
              setPrawler,
              cook,
              cookies2,
              setCook,
              setCookies2,
              userDetails,
              setUserDetails,
              loadingErr,
              loading,
              userAuth,
              setUserAuth,
              setOtherProfile,
              otherProfile,
              displayHeader,
              setDisplayHeader,
              displayBottomNav,
              setDisplayBottomNav,
              homeErr,
              setHomeErr,
              booleanErrHome, 
              setBooleanErrHome,
              viewhd,
              setViewhd,
              setAllowCookies,
              sidenav,
              setSideNav,
              setFnp,
              uploadPost,
              setUploadPost,
              imgUrl,
              setImgUrl,
              im,
              setIm,
              focusMagic,
              setFocusMagic,
              commentsPrawler,
              setCommentsPrawler,
              showComments,
              setShowComments,
              postId,
              setPostId,
              eOption,
              setEOption,
              eCordinate,
              setECordinate
            }
          }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;