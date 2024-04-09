import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    questionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Problem',
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
} , {
    timestamps : true
})

const Submission = new mongoose.model("Submission" , submissionSchema);

export default Submission;