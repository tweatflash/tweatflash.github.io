import {configureStore} from '@reduxjs/toolkit'
import forYouPostsReducer from '../home_access/forYouPostsSlice'
import profilePostReducer from '../home_access/slices/profilePostsSlice'
export const store=()=>configureStore({
    reducer:{
        forYouPosts:forYouPostsReducer,
        profilePosts:profilePostReducer
    },
})