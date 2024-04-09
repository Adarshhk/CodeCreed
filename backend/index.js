import connectToDB from "./database/database.js";
import app from "./app.js";
import 'dotenv/config'


const port = process.env.PORT;
connectToDB().then(app.listen(port , () => {
    console.log("app is listening on port" , port)
}))
