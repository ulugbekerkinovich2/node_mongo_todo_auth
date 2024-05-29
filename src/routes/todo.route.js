const {Router} = require('express');
const router = Router();
const isAuthMiddleware = require('../middlewares/is-auth.middleware');


const {getTodos, createTodo, updateTodo, deleteTodo, getTodo} = require('../controllers/todo.controller');

router.get('/',isAuthMiddleware, getTodos);
router.post('/',isAuthMiddleware, createTodo);
router.put('/:id',isAuthMiddleware, updateTodo);
router.delete('/:id',isAuthMiddleware, deleteTodo);
router.get('/:id',isAuthMiddleware, getTodo);

module.exports = router;