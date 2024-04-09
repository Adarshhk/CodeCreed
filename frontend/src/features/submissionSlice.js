import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const submissionSlice = createSlice({
    name : "submission",
    initialState,
    reducers : {
        setSubmission : (state , action) => {

            
            return action.payload
        }
    }
})

export const {setSubmission} = submissionSlice.actions;
export default submissionSlice.reducer;