const Router = require("express");
const UserModel = require("../model/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userRouter = Router();


userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const newUser = new UserModel({ name, email, gender, password: hash });
        await newUser.save();
        res.send("New User Registered");
      } 
    });
  } catch (err) {
    res.send("Error in Registration");
  }
});

userRouter.post("/login", async (req, res) => {
    const { email,password } = req.body;
    try {
       const user=await UserModel.find({email})
       if(user.length>0){
         bcrypt.compare(password,user[0].password,async (err,result)=>{
            if(result){
                 const token=jwt.sign({ foo: 'bar' }, process.env.key)
                 res.send(token)
            }
            else{
                res.send("Wrong CREDS")
            }
         })
       }
       else{
        res.send("Wrong CREDS")
       }
    } catch (err) {
      res.send("Error in Login");
    }
  });

module.exports = userRouter;
