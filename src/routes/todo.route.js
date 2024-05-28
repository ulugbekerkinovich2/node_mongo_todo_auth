const {Router} = require('express');
const router = Router();
const isAuthMiddleware = require('../middlewares/is-auth.middleware');


const {getTodos, createTodo, updateTodo, deleteTodo, getTodo} = require('../controllers/todo.controller');

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.get('/:id', getTodo);

module.exports = router;