const express = require('express');
const { getAdminProfile, updateAdminProfile } = require('../controllers/adminController');

const router = express.Router();

router.get('/:id', getAdminProfile);
router.patch('/:id', updateAdminProfile);

module.exports = router;

