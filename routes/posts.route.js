const express=require("express")
const jwt=require("jsonwebtoken");
const PostSModel = require("../models/posts.model");

const postsRouter = express.Router();

// post route for adding posts
postsRouter.post("/add", async (req,res)=>{
    const payload=req.body
    try {
        const new_post=new PostSModel(req.body)
        await new_post.save()
        res.status(200).send({"msg":"Post Created"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
 })


 // get route for getting all the user
postsRouter.get("/", async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    try {
        if(decoded){
            const posts= await PostSModel.find({"userID":decoded.userID});
            res.status(200).send(posts)
        } else{
            res.status(400).send({msg:"No post has been created by this user"})
        }
        // const notes = await NoteModel.find();
        // res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


// update route for posts
postsRouter.patch("/update/:postID", async(req,res)=>{
    const payload=req.body
    const postID=req.params.postID
    try {
        await PostSModel.findByIdAndUpdate({_id:postID}, payload)
        res.status(200).send({"msg":"post Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// delete route for posts
postsRouter.delete("/delete/:postID", async(req,res)=>{

    const postID=req.params.postID
    try {
        await PostSModel.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"post Deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})



module.exports = postsRouter;