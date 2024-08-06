const mongoose = require('mongoose');

const userDetailSurveySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country_of_residence: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    income_level: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('UserDetailSurvey', userDetailSurveySchema);
