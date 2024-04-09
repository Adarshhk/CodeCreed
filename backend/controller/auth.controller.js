import bcrypt from 'bcrypt';
import generateAuthToken from '../middleware/generateToken.js';
import User from '../models/user.model.js';

export const userSignup = async (req, res) => {
    try {
        const { fullName, username, password } = req.body;

        if (!fullName || !username || !password) {
            return res.status(402).json({"error" : "Credentials Empty"})
        }

        const user = await User.findOne({ username })
        if (user) return res.status(402).json({"error" : "Username already taken."})

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName, username, password: hashedPassword
        });
        if (!newUser) return res.status(500).json({"error" : "Error while creating new user."})

        const authToken = await generateAuthToken(req , newUser._id);
        await newUser.save();
        res.cookie("authToken", authToken);
        return res.status(200).json({"authToken" : authToken});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"error" : error.message})
    }
}

export const userLogin = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(402).json({"error" : "Credentials Empty"})
        }

        const user = await User.findOne({username});
        
        if(!user) return res.status(402).json({"error" : "user does not exists."})

        const passwordValid = await bcrypt.compare(password , user.password).then((result) => result);
        
        if(!passwordValid) return res.status(402).json({"error" : "Invalid Credentials"})

        const authToken = await generateAuthToken(req , user._id);
        res.cookie("authToken" , authToken , {httpOnly : true});

        return res.status(200).json({"authToken":authToken})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"error" : "Some error occured while loggin in."})
    }
}

export const userLogout = async (req , res) => {
    try {
        res.cookie("authToken" , "");
        return res.status(200).json({"success" :"logged out successfully."})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({"error" : error.message});
    }

}

