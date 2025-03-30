import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    
]
const ProfilePostsSlice=createSlice({
    name:"profilePosts",
    initialState,
    reducers:{
        ProfilePostAdded(state,action){
            return [...state, ...action.payload];
        }
    }
})
export const  {ProfilePostAdded}=ProfilePostsSlice.actions
export const AllProfilePosts=(state)=> state.profilePosts
export default ProfilePostsSlice.reducer 