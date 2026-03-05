import express from "express";
import dotenv from "dotenv";
import tyreroutes from "./routes/tyreroutes.js";
import connectDB from "./config/db.js";
import dns from "node:dns"
import cors from "cors";
dns.setServers(["1.1.1.1","8.8.8.8"])

dotenv.config();
const app = express();
const port =process.env.PORT || 3000;
app.use(cors(
    {
        // origin:`http://localhost:5173`
    }
))

app.use(express.json());
app.use("/tyres", tyreroutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/tyres`)

    })
})

