const {TodoSchema} = require("../schema/schema");
const {model} = require("mongoose");

const Todo = model("Todo", TodoSchema);


module.exports = {
    Todo
}