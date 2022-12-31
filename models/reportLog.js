const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'Scammer',
        required: true,
    },

    message: {
        type: String,
        required: true,
    }
   
},{ timestamps: true }, 
)

module.exports = mongoose.model('Report', ReportSchema);
