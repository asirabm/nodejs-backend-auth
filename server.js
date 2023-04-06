const express=require('express')
const app=express()
require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db_connect=require('./db/dbConnect')
const User = require("./db/userModel");
const userModel = require('./db/userModel');
const bodyParser = require('body-parser')
const auth = require("./auth");



console.log(process.env.SECRET_KEY)
db_connect()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.post('/register',async(req,res)=>{
  bcrypt.hash(req.body.password,10).
 then((hashpassword)=>{
   
    const u1=new userModel({
        email:req.body.email,
        password:hashpassword
    })
    u1.save().then((result)=>{
        res.status(201).send({
            message: "User Created Successfully",
            result,
          });
    })
    .catch(e=>{
        console.log(e.message)
       res.status(500).send({
        message:'Error creating user',
        e
       })
    })

 }).catch((error)=>{
    res.status(500).send({
        message:'Password was not hashed successfully',
        error
    })
 })
 
})

app.post('/login',(req,res)=>{
    userModel.findOne({
        email:req.body.email
    }).then(user=>{
        console.log(user)
        bcrypt.compare(req.body.password,user.password)
        .then((pwcheck)=>{
           
            if(!pwcheck){
               // console.log('ksjndjklv')
                return res.status(400).send({
                    message: "Passwords does not match"
                  });
            }
           
         //create JWT token

        const token=jwt.sign(
            { 
            userId:user._id,
            userEmail:user.email
            },
            process.env.SECRET_KEY,
            { expiresIn:"24h"}
            
            )
            console.log(token)
            res.status(201).send({
                message: "Login Successful",
                email: user.email,
                token,
              });


        })
        .catch(er=>{
            res.status(400).send({
               message: "Passwords does not match",
               er
            })
        })
    })
    .catch(e=>{
        res.status(404).send({
        message:'email not found'
        })
    })
})



// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
  app.get("/auth-endpoint",auth, (request, response) => {
    console.log(request.user)
    response.json({ message: "You are authorized to access me" });
  });




app.listen(process.env.PORT,()=>{console.log('connection stablished sucess')})
