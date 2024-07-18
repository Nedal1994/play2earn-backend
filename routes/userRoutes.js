const express = require('express');
const { getUserProfile, updateUserProfile, deleteUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/:id', getUserProfile);
router.patch('/:id', updateUserProfile);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);

module.exports = router;