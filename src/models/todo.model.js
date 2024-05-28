const TodoSchema = require("../schema/todo.schema");
const {model} = require("mongoose");

const Todo = model("Todo", TodoSchema);

module.exports = {
    Todo
}