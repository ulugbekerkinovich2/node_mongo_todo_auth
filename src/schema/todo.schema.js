const {Schema} = require("mongoose")

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
})

module.exports = TodoSchema