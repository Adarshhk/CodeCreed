import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String ,
        required : true
    },
    sample: [
        {
            input: {
                type: String,
                required: true,
            },
            output: {
                type: String,
                required: true,
            },
            explaination: {
                type: String,
                required: true,
            },
        },
    ],
    driverCode : {
        type : String,
        required : true
    },
    testCases: [
        {
            input: {
                type: String,
                required: true,
            },
            output: {
                type: String,
                required: true,
            }
        }
    ],
    submittedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
} , {
    timestamps : true
})

const Problem = new mongoose.model("Problem" , problemSchema);

export default Problem;