const mongoose = require('mongoose');


exports.connect = ()=>{
    mongoose.connect("mongodb://localhost:27017/form-t")
    .then(()=>{console.log(" db connected")})
    .catch((error)=>{
        console.log("db connection faild");
        console.error(error);
        process.exit(1);
    })
}
