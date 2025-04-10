const mongoose =require("mongoose")
//instail npm i dotenv
require("dotenv").config();
const connectwithDB=()=>{
    mongoose.connect(process.env.MONGOOB_URL,{
       /* useNewUrlParser:true,
        useUnifiedTopology:true,*/
        
    })
    .then(()=>{console.log("DB connection is successful")})
    .catch((error)=>{
        console.log("There is an Error");
        console.error(error.message);
        process.exit(1);
    })
}
module.exports=connectwithDB;