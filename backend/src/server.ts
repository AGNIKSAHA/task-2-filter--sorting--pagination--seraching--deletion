import express, {Express,Request, Response} from "express";
import {config} from "dotenv";
import cors from "cors";
import { connectDb } from "./utils/db";
import bookRouter from "./routes/bookRoute";
import routes from "./routes";

const app:Express = express();

config();

const port=process.env.PORT || 8080;

//DB Connect

connectDb();

//middlewares
app.use(cors({
    origin:process.env.HOST_URL || "*"
}))

app.use(express.json());

// app.use("/api", bookRouter);
app.use("/api",routes);

app.get("/",(req:Request,res:Response)=>{
    // res.send("Hello World");
    res.json({success:true, message:"Hello World"});
});

app.listen(port,()=>console.log(`Server running on port ${port} `));



//status codes
//1xx: Informational
//2xx: success
//3xx: redirectional
//4xx: client side
//5xx: server side