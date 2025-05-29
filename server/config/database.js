const mongoose = require('mongoose');


exports.connect = ()=>{
    mongoose.connect("mongodb+srv://admin:e3yCfqZgD6.ves6@cluster0.jkuesug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{console.log(" db connected")})
    .catch((error)=>{
        console.log("db connection faild");
        console.error(error);
        process.exit(1);
    })
}
