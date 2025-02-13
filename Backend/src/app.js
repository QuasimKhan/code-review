import express from "express";
import router from "./routes/ai.route.js";
import cors from "cors"
import morgan from "morgan"
const app = express();

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/ai", router)
export default app