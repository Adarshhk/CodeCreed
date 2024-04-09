import Problem from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import { submitSolution } from "../utils/apiRequest.js";

const changeToUtf = (driverCode) => {
    const data = btoa(driverCode);
    return data;
}

const compareOutput = (stdout, testCases) => {
    let ans = true;
    let output = atob(stdout).split("\n");
    output = output.filter(x => x !== "")
    console.log(output)
    let i = 0;
    testCases.forEach((obj) => {
        if (output[i] != obj.output.replace(/\[|\]|,/g, '').replace(/\s+/g, ' ').trim()) {
            ans = false;
        }
        i++;
    })
    return ans;
}

export const getAll = async (req, res) => {
    try {
        
        // const problems = await Problem.aggregate([
        //     {
        //         $lookup : {
        //             from : 'User',
        //             localField : 'submittedBy',
        //             foreignField : '_id',
        //             as: "submittedByUser"
        //         }
        //     },
        //     {
        //         $unwind : {
        //             path: "$submittedByUser",
        //             preserveNullAndEmptyArrays: true
        //         }
        //     },
        //     {
        //         $skip: (page - 1) * limit,
        //     },
        //     {
        //         $limit: limit,
        //     }

        // ])
        const problems = await Problem.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'submittedBy',
                    foreignField: '_id',
                    as: 'submittedBy'
                },
            },
            {
                $unwind: {
                    path: "$submittedBy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    "submittedBy.createdAt": 0,
                    "submittedBy.password": 0,
                    "submittedBy.updatedAt": 0,

                }
            }
        ]);
        return res.status(200).send(problems)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "error": error.message })
    }
}

export const getProblem = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) return res.status(404).json({ "error": "URL invalid" });
        const problem = await Problem.findById(id);
        if (!problem) return res.status(404).json({ "error": "Problem not found" });

        return res.status(200).send(problem);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "error": error.message })
    }
}

export const submitProblem = async (req, res) => {

    try {
        const questionId = req.params.id;
        if (!questionId) return res.status(401).json({ "error": "Invalid URL" })
        const { code } = req.body;
        const id = req.user?._id;
        if (!code) return res.status(401).json({ "error": "Write solution please" })

        const question = await Problem.findById(questionId);
        if (!question) return res.status(401).json({ "error": "Question Not Found." })

        const testCases = question.testCases;

        let input = `2 ${testCases[0].input.replace(/\[|\]|,|\ /g, "").length} `;
        input = input + testCases[0].input.replace(/\[|\]|,|\ /g, "").split("").join(" ");
        input += ` ${testCases[1].input.replace(/\[|\]|,|\ /g, "").length} `;
        input += testCases[1].input.replace(/\[|\]|,|\ /g, "").split("").join(" ");
        console.log(input)
        const convertedInput = btoa(input)

        const result = await submitSolution(code, convertedInput);

        if (result.stdout === null) {
            return res.status(200).json({ "error": result.compile_output })
        }

        const output = compareOutput(result.stdout, testCases);
        if (output === false) return res.status(200).json({ error: result.stdout })

        const alreadySubmitted = await Submission.find({ questionId, userId: id })

        if (alreadySubmitted.length == 0) {
            const submission = await Submission.create({
                questionId, userId: id
            })
            await submission.save();
        }

        return res.status(200).json({ "success": result.stdout });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "error": error.message })
    }
}

export const addProblem = async (req, res) => {
    try {
        const { title, description, sample, code: driverCode, testCases } = req.body;
        if (!title || !description || !sample || !driverCode || !testCases) return res.status(401).json({ "error": "Fill all fields." })

        const userId = req.user?._id;
        if (!userId) return res.status(403).json({ "error": "Unauthorized request to add problem." })

        const utfDriverCode = changeToUtf(driverCode);

        const newProblem = await Problem.create({
            title,
            description,
            sample,
            submittedBy: userId,
            driverCode: utfDriverCode,
            testCases
        })

        if (!newProblem) return res.status(500).json({ "error": "Error while adding problem" })

        await newProblem.save();
        return res.status(200).json({ "success": "Problem Added Successfully." })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "error": error.message })
    }
}