const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passwordRoutes = require("./routes/passwordRoutes");

const app = express();
app.use(express.json());
app.use(cors()); // Allow any origin for now

const mongoURI = process.env.MONGO_URI;
const email = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

console.log('MONGO_URI:', mongoURI);
console.log('EMAIL:', email);
console.log('EMAIL_PASSWORD:', emailPassword);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

app.use("/api/password", passwordRoutes);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
