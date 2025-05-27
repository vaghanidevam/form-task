const mongoose = require("mongoose");

const submitFormSchema = new mongoose.Schema({
    formId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Form',
    },
    data:{
        type: Object,
        required:true
    }
})


module.exports = mongoose.model("FormData", submitFormSchema);