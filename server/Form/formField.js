const mongoose = require("mongoose");


const formFieldSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['text', 'email', 'number', 'password', 'date', 'file', 'checkbox', 'radio', 'Select',"tel"]
    },
    label:{
        type:String,       
    },
    placeholder:{
        type:String,
    },
    variant:{
        type: String,
    },
    required:{
        type:Boolean,
    },
    disabled:{
        type:Boolean,
    },
    name:{
        type:String,
        required:true
    },
    edit:{
        type:Boolean,
        default:false
    },
    option:[Object],
    formId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Form",   
    }
})


module.exports = mongoose.model("FormField", formFieldSchema);