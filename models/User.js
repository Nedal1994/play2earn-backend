const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Add this line
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.methods.setPassword = async function(password) {
    this.password = await bcrypt.hash(password, 10);
};

UserSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
