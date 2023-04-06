const jwt = require("jsonwebtoken");
require('dotenv').config()



module.exports = async (req,res,next)=>{
  const authHeder=req.headers['auth']
  const token=authHeder && authHeder.split(' ')[1]
  if(token==null) return res.status(404).send({
    message:'Un Autherize access'
  })
  jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
      if(err) res.status(403).send({
        message:err.message
      })
      req.user=user
      next()
  })
}