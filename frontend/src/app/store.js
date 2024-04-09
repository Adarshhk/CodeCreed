import { configureStore } from "@reduxjs/toolkit";
import problemSlice from "../features/problemSlice.js";
import userSlice from "../features/userSlice.js";
import authSlice from "../features/authSlice.js";
import submissionSlice from "../features/submissionSlice.js";

const store = configureStore({
    reducer : {
        problem : problemSlice ,
        user : userSlice , 
        auth : authSlice,
        submission : submissionSlice
    }
})

export default store