const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/create', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.post('/bulk-delete', taskController.bulkDeleteTasks);

module.exports = router;
