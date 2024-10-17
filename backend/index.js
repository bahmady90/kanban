import express from "express";
import { config as configDotenv } from "dotenv";
import boardRoutes from "./routes/boardAndTask.js"
import mongoose from "mongoose";
import cors from "cors"




configDotenv();

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors());
app.use("/api/", boardRoutes)

mongoose.connect(process.env.MONGO_URI).
    then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and listening on port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })


