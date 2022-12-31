const mongoose = require('mongoose')

const ScammersSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'Scammer',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active',
    },

    reported: {
        type: String,
        enum: [true, false],
        default: 'false',
    },

    cronStatus: {
        type: String,
        enum: ['success', 'fail'],
    }

    

   
},{ timestamps: true }, 
)

module.exports = mongoose.model('Scammer', ScammersSchema);
