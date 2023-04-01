const mongoose=require('mongoose')
require('dotenv').config()
console.log(process.env.dburl)
 async  function db_connection(){
    try{
        await mongoose.connect(process.env.dburl)
        console.log('successfully connected to MongoDB Atlas!')
    }
    catch(e){
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(e.message);
    }
}
module.exports=db_connection