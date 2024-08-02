const { connectDB } = require('../config/config');
const { ObjectId } = require('mongodb');

// Controller to get paragraphs
const getParagraphs = async (req, res) => {
  const { level } = req.query;

  if (!level) {
    return res.status(400).json({ message: 'Level is required' });
  }

  try {
    const db = await connectDB();
    const paragraphs = await db.collection('paragraphs').find({ level }).toArray();
    res.json(paragraphs);
  } catch (err) {
    console.error('Error fetching paragraphs:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to submit an answer
const submitAnswer = async (req, res) => {
  const { level, id, word1count, word2count } = req.body;

  if (typeof word1count !== 'number' || (level === 3 && typeof word2count !== 'number')) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const db = await connectDB();
    const paragraph = await db.collection('paragraphs').findOne({ _id: new ObjectId(id) });

    if (!paragraph) {
      return res.status(404).json({ message: 'Paragraph not found' });
    }

    const correctWord1Count = paragraph.word1count;
    const correctWord2Count = paragraph.word2count || 0;
    const isCorrect = word1count === correctWord1Count && (word2count === correctWord2Count || level < 3);

    if (isCorrect) {
      res.json({ correct: true, message: 'Correct!', points: paragraph.points });
    } else {
      res.json({ correct: false, message: 'Incorrect. Try again.' });
    }
  } catch (err) {
    console.error('Error submitting answer:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getParagraphs, submitAnswer };
