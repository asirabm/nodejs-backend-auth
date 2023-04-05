const jwt = require("jsonwebtoken");
require('dotenv').config()



module.exports = async (request, response, next) => {
    try {
      const token = await request.headers.auth.split(" ")[1]; 
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      const user = await decodedToken;
      request.user = decodedToken;
      next();
      
    } catch (error) {
      response.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  };
  



   
