const express = require("express");

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { model } = require("mongoose");
const UsersModel = require("../models/users.model");

const usersRouter = express.Router();

//register user route
usersRouter.post("/register", async (req, res) =>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try {
        bcrypt.hash(password, 8, async (err, hash)=>{
            const user=new UsersModel({name,email,gender,password:hash,age,city,is_married})
            try {
                await user.save()
                res.status(200).send({msg:"registration successful"})
            } catch (error) {
                res.status(200).send({msg:"user already registered"})
            }
                
            })

            // res.status(200).send({msg:"registration successful"})
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
});


// login user route

usersRouter.post("/login", async (req, res) => {
    const {email,password} = req.body;
    try {
        const user=await UsersModel.findOne({email})
       
            if(user){
                // compairing the password
               bcrypt.compare(password, user.password, function(err, result) {
                
                   if(result){
                    // creating jwt token for auth
                   const token = jwt.sign({ "userID":user._id }, 'masai');
                   res.status(200).send({"msg":"Login Successfull","token":token})
                   }
                   else {
                    {res.status(400).send({msg:"Wrong Password"})}
                   }
                });
            }
             else {
              res.status(400).send({msg:"Wrong Password"})
            }

   
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
})







module.exports = usersRouter;