import { useState,useEffect, useContext } from 'react';
import AuthContext from '../context/authProvider'
const createCookies =(cname, cvalue)=>{
    // const {cookies,cookies2,setCookies,setCookies2} =useContext(AuthContext)
    

    // const cookiep="uhchchvhkvh"
    // useEffect(()=>{
    //     document.cookie = `RFTFL=${cookies}`; // Create 'username' cookie
    //     document.cookie = `ACTFL=${cookies2}`; // Update, i.e. overwrite, the 'username' cookie to "Chuck"
    // },[cookies2,cookies2])
    // const [cookies,setCookies]=useState("")  
    // function getCookie(cname) {
    //     let name = cname + "=";
    //     let decodedCookie = decodeURIComponent(document.cookie);
    //     let ca = decodedCookie.split(';');
    //     for(let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //         c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }
    // useEffect(()=>{
    //     let user = getCookie("RFTFL");
    //     function checkCookie() {
    //         if (user !== "") {
    //             setCookies(user)
    //         } else {
    //             setCookies("")
    //         }  
    //     }
    //     return checkCookie()
    // },[])
    // return cookiep

}
export default createCookies