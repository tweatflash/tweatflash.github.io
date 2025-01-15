import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/authProvider'
const base_Url="https://tweatflash.onrender.com/api/v1"

let newRefresh=""
let accessToken=""
let signedCookies={}
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
    

function CheckCookie() {
    let user = GetCookie("RFTFL");
    let user2=GetCookie("ACTFL")
    newRefresh=user
    accessToken=user2
    signedCookies={
        "refreshToken":user,
        "accessToken" :user2
    }
    console.log(signedCookies)
}
CheckCookie()
export default axios.create({
    baseURL: base_Url,
    headers:{
        "Accept":'*/*',
        "Content-Type":'application/json',
        "Origin":"https://tweatflash.onrender.com"
    },
    
})
export const axiosPrivate= axios.create({
    
    baseURL: base_Url,  
    withCredentials:true,
    headers:{
        "Content-Type":'application/json',
        // signedCookies:{
            refreshtoken:newRefresh,
            accesstoken :accessToken
        // },
    
    }
})
export const axiosKindOfPostWithoutAnything=axios.create({
    baseURL: base_Url,
    headers:{
        "Content-Type":'application/json',
    },
    body:JSON.stringify({
        signedCookies:{
            refreshToken:newRefresh,
            accessToken :accessToken
        }
    })
})