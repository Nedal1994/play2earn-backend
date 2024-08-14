const fs = require('fs');
const path = require('path');
const { MongoClient, GridFSBucket } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb+srv://sanchu2804kb:AnEsX5m1OWl7amK8@cluster0.mgjqmsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
const client = new MongoClient(uri);

// Database name
const dbName = "test";

// Directory containing the audio files
const audioDir = "/Users/sanaayub/play2earn-backend/audios/";

async function uploadToGridFS() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const bucket = new GridFSBucket(db, { bucketName: 'audios' });

        // Read all files in the directory
        const files = fs.readdirSync(audioDir);

        for (const file of files) {
            const filePath = path.join(audioDir, file);

            console.log(`Uploading ${file}...`);

            // Create a readable stream from the file
            const readableStream = fs.createReadStream(filePath);

            // Upload the file to GridFS
            const uploadStream = bucket.openUploadStream(file);
            readableStream.pipe(uploadStream);

            await new Promise((resolve, reject) => {
                uploadStream.on('finish', () => {
                    console.log(`Successfully uploaded ${file} to GridFS.`);
                    resolve();
                });

                uploadStream.on('error', (error) => {
                    console.error(`Failed to upload ${file} to GridFS.`, error);
                    reject(error);
                });
            });
        }

    } catch (err) {
        console.error('Error during upload:', err);
    } finally {
        await client.close();
        console.log("Connection to MongoDB closed");
    }
}

uploadToGridFS().catch(console.dir);
