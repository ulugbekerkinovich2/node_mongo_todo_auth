const {Todo} = require('../models/todo.model');
const Joi = require('joi');

const todoSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(5).max(255).required()
});

const getTodos = async (req, res) => {
    try {
        // const users = await Todo.find();
        const todos = await Todo.find();
        // const userId = req.user.payload.id;
        // const user = users.find(user => user.id === userId);
        // if (!user) {
        //     return res.status(403).json({ message: "Unauthorized" });
        // }
        res.json({ message: "Success", data: todos });
    } catch (error) {
        // res.status(500).json({ message: "Internal Server error" });
        res.status(500).json({ message: error.message });
    }
}

const createTodo = async (req, res) => {
    try {
        const { error } = todoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { name, description } = req.body;
        const userId = req.user.payload.id;
        const newTodo = await Todo.find();
        // const newTodo = new Todo({name, description, userId});
        // await todosDB.write(todos);
        res.status(201).json({ message: "Todo created successfully", data: newTodo });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
}

const updateTodo = async (req, res) => {
    try {
        const { error } = todoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { id } = req.params;
        const { name, description } = req.body;
        const todos = await todosDB.read();
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos[todoIndex].name = name;
        todos[todoIndex].description = description;
        await todosDB.write(todos);
        res.json({ message: "Todo updated successfully", data: todos[todoIndex] });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todos = await todosDB.read();
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos.splice(todoIndex, 1);
        await todosDB.write(todos);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
}

const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todos = await todosDB.read();
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Success", data: todo });
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}
