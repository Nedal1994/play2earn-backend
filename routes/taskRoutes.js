const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/create', taskController.createTask);
router.post('/:id/participate', taskController.participateInTask); //
router.post('/:id/complete', taskController.completeTask); //
router.get('/', taskController.getAllTasks);
router.get('/game', taskController.getGameTasks); //
router.get('/participating', taskController.getParticipatingTasks); //
router.get('/:id', taskController.getTask);
router.get('/:id/progress', taskController.getTaskProgress); //
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.post('/bulk-delete', taskController.bulkDeleteTasks);

module.exports = router;