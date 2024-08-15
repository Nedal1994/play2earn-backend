const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    console.log('Transactions found:', transactions);
    res.json(transactions);
  } catch (err) {
    console.error('Detailed error:', err);
    res.status(500).json({ message: 'An error occurred while fetching transactions', error: err.message });
  }
});

module.exports = router;