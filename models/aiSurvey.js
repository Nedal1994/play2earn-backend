const mongoose = require('mongoose');

const aiSurveySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: true },
    country_of_residence: { type: String, required: true },
    nationality: { type: String, required: true },
    income_level: { type: String, required: true },
    familiar_with_ai: { type: String, required: true },
    participated_in_ai_tasks: { type: String, required: true },
    topics_of_interest: { type: [String], required: true },
    ai_enhance_experience: { type: [String], required: true },
    ai_impact_areas: { type: [String], required: true },
    ai_applications_concern: { type: String, required: false },
    ai_impact_on_jobs: { type: String, required: true },
    thoughts_on_ai_content: { type: String, required: false },
    importance_of_ethical_ai: { type: String, required: true },
    ethical_concerns: { type: [String], required: true },
    concern_about_data_privacy: { type: String, required: true },
    measures_for_data_privacy: { type: String, required: false },
    importance_of_transparency: { type: String, required: true },
    enough_information_provided: { type: String, required: true },
    comfort_with_sharing_data: { type: String, required: true },
    envision_ai_in_play2earn: { type: String, required: false },
    ai_identify_trends: { type: String, required: true },
    ai_create_inclusive_ecosystem: { type: String, required: true },
    minimum_ai_literacy_required: { type: String, required: true },
    role_of_user_feedback: { type: String, required: true },
    prefer_interaction_with_ai: { type: [String], required: true },
    ai_enhance_social_aspects: { type: String, required: true },
    use_of_ai_for_task_difficulty_rewards: { type: String, required: true },
    likelihood_to_continue_using_play2earn: { type: String, required: true },
    ai_create_economic_opportunities: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AiSurvey', aiSurveySchema);
