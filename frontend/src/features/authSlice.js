import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {loading : false , authToken : null},
    reducers: {
        setAuth: (state, action) => {
            
            return action.payload
        }
    }
})

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
