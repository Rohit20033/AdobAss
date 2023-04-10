
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connect = require("./config/db")
const port = process.env.PORT
const userRoute = require("./routes/user/user.route")
const postRoute = require("./routes/post/post.route")
const app = express()
app.use(express.json())
app.use(cors())
app.use("/post",postRoute)
app.use("/user",userRoute)


app.get("/",(req,res)=>{
    res.send("Welcome")
})


app.listen(port,async()=>{
    await connect()
    console.log(`http://localhost:${port}/`)
})