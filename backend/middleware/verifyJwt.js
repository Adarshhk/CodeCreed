import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

const verifyJwt = async (req , _ , next) => {
    const { authToken } = req.cookies;
    const {id} = jwt.verify(authToken , process.env.JWT_SECRET)
    const user = await User.findById(id).select("-password");
    if(!user) throw Error("Unauthorized Access")

    req.user = user;

    next();
}

export default verifyJwt