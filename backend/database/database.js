import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
    } catch (error) {
        console.log("mongodb connection failed : " , error.message)
    }

}

export default connectToDB;