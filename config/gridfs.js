const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config(); // Ensure dotenv is configured


const MONGO_URI = process.env.MONGO_URI; // Ensure MONGO_URI is correctly defined

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Create a storage object with a given configuration
const storage = new GridFsStorage({
    url: MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'audios', // Bucket name
            filename: `${Date.now()}-${file.originalname}`, // Customize the filename
        };
    },
    onError: (err, req, res) => {
        console.log('Error during file upload:', err);
        res.status(500).send({ message: 'Error during file upload', error: err });
    }
});

// Set up multer middleware
const upload = multer({ storage });

module.exports = { upload };
