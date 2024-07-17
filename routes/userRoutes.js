const express = require('express');
const { createUser, getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');

const router = express.Router();

// router.post('/', createUser);
router.get('/:id', getUserProfile);
router.patch('/:id', updateUserProfile);
router.delete('/:id', deleteUser);

module.exports = router;