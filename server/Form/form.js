const mongoose = require("mongoose");



const formSchema = new mongoose.Schema({
    formName: {
        type: String,
        required: true
    },
    patternNumber: {
        type: Number,
        default: 1
    },
    formFields: [{
        type: mongoose.Schema.Types.ObjectId, ref: "FormField"
    }]
});

module.exports = mongoose.model("Form", formSchema);