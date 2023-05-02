const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const cors=require("cors");
const { auth } = require("./middleware/auth.middleware");
require("dotenv").config();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/users",userRouter);

app.use(auth)

app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB");
        console.log(`Server is running at port ${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
})