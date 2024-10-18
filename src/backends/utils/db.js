import mongoose from "mongoose";

const myDb = async ()=>{
    const URL = process.env.dataBaseUrl
    try {
        await mongoose.connect(URL)
        console.log("DataBase Connacted")
    } catch (error) {
        console.log("DataBase not Connacted")
    }
}

export default myDb