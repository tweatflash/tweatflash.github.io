import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    
]
const forYouPostsSlice=createSlice({
    name:"forYouPosts",
    initialState,
    reducers:{
        forYouPostadded(state,action){
            return [...state, ...action.payload];
        }
    }
})
export const  {forYouPostadded}=forYouPostsSlice.actions
export const selectAllPosts=(state)=> state.forYouPosts
export default forYouPostsSlice.reducer 