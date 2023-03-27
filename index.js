const express = require("express");
const mongoose= require("mongoose");
 var cors = require("cors");
const connected_to_mongoAtlas = require("./confins/db");
const usersRouter = require("./routes/users.routes");
const { auth } = require("./middlewares/auth.middleware");
const postsRouter = require("./routes/posts.route");

 require("dotenv").config(); // 
 const app = express();
 app.use(cors());
 app.use(express.json());


app.use("/users", usersRouter);


app.use(auth)
app.use("/posts", postsRouter)



 app.listen(process.env.port, async() =>{
    try {
        await connected_to_mongoAtlas
        console.log("connected to mongoAtlas")
    } catch (error) {
        console.log(" not connected to mongoAtlas")
        console.log(error);
    }
    console.log(`server is running on port ${process.env.port}`)
 })



 module.exports = app;