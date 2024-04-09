import Submission from '../models/submission.model.js'
import Problem from '../models/problem.model.js';
import mongoose from 'mongoose';

export const userInfo = async (req, res) => {
    try {

        const user = req.user;
        if (!user) return res.status(404).json({ "error": "User not found" })
        return res.status(200).json({ "success": user });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ "error": error.message })
    }

}

export const userSubmissions = async (req, res) => {
    try {

        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ "error": "user not found" });
        const submissions = await Submission.aggregate([
            {
                $match : {userId}
            },
            {
                $lookup:
                  {
                    from: 'problems',
                    localField: 'questionId',
                    foreignField: '_id',
                    as: 'question'
                  }
            },
            {
                $unwind : {
                    path : '$question'
                }
            }
        ]);
        return res.status(200).send(submissions);

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ "error": error.message })
    }
}

export const userQuestions = async (req , res) => {
    try {

        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ "error": "user not found" });
       
        const questions = await Problem.aggregate([
            {
                $match : {submittedBy : userId}
            },
        ])
        
        return res.status(200).send(questions);

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ "error": error.message })
    } 
}