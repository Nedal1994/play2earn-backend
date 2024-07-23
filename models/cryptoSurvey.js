const mongoose = require('mongoose');

const cryptoSurveySchema = new mongoose.Schema({
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
        enum: ['18 - 24', '25 - 34', '35 - 44', '44 - 55', '55 - above'],
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
        enum: ['$0 - $20,000', '$20,000 - $50,000', '$50,000 - $100,000', '$100,000 - above'],
        required: true
    },
    knowledge_level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Expert'],
        required: true
    },
    primary_source_of_info: {
        type: String,
        required: true
    },
    own_crypto: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    owned_cryptos: {
        type: [String],
        required: true
    },
    frequency_of_transactions: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Never'],
        required: true
    },
    trading_platforms: {
        type: [String],
        required: true
    },
    benefits_of_crypto: {
        type: String,
        required: true
    },
    involvement_duration: {
        type: String,
        enum: ['Less than 1 year', '1-3 years', 'More than 3 years'],
        required: true
    },
    investment_factors: {
        type: [String],
        required: true
    },
    adoption_barriers: {
        type: [String],
        required: true
    },
    investment_reason: {
        type: String,
        required: true
    },
    main_concerns: {
        type: [String],
        required: true
    },
    monthly_investment: {
        type: String,
        enum: ['Less than $100', '$100-$500', '$500-$1000', 'More than $1000'],
        required: true
    },
    price_check_frequency: {
        type: String,
        enum: ['Multiple times a day', 'Once a day', 'A few times a week', 'Once a week', 'Less than once a week'],
        required: true
    },
    illegal_activities_concern: {
        type: String,
        enum: ['Not Concerned', 'Somewhat Concerned', 'Very Concerned'],
        required: true
    },
    investment_risk_perception: {
        type: String,
        enum: ['Low', 'Moderate', 'High'],
        required: true
    },
    investment_security_concern: {
        type: String,
        enum: ['Not concerned at all', 'Slightly concerned', 'Moderately concerned', 'Very concerned', 'Extremely concerned'],
        required: true
    },
    experienced_issues: {
        type: [String],
        required: true
    },
    preferred_security_measures: {
        type: [String],
        required: true
    },
    plan_to_increase_investment: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    influencing_factors: {
        type: [String],
        required: true
    },
    metaverse_impact: {
        type: String,
        enum: ['Positive Impact', 'Negative Impact', 'Neutral'],
        required: true
    },
    future_of_finance: {
        type: String,
        required: true
    },
    additional_comments: {
        type: String
    }
}, { timestamps: true });

const CryptoSurvey = mongoose.model('CryptoSurvey', cryptoSurveySchema);

module.exports = CryptoSurvey;
