import { createSlice , nanoid} from '@reduxjs/toolkit';

// const initialState = [{
//     id: nanoid(),
//     title : "Two Sum",
//     description : "Add two Numbers",
//     sample : [{
//         input : "hello",
//         output : "welcome",
//     }],
//     driverCode : "driverCode",
//     testCases : [{'[1 , 2 ,3]' : '5'}]
// }]

const initialState = {loading : false , problems : []}

export const problemSlice = createSlice({
    name : "problem",
    initialState,
    reducers : {
        addProblem : (state , action) => (state = action.payload)
    }
})

export const {addProblem} = problemSlice.actions;
export default problemSlice.reducer;