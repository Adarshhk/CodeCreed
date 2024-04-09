import jwt from 'jsonwebtoken';

const generateAuthToken = async (req , id) => {

    const authToken =  jwt.sign({id} , process.env.JWT_SECRET)
    return authToken
}

export default generateAuthToken;