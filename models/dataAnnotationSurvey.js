const mongoose = require('mongoose');

const dataAnnotationSurveySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: true },
    country_of_residence: { type: String, required: true },
    nationality: { type: String, required: true },
    income_level: { type: String, required: true },
    task_preference: { type: String, required: true },
    time_spent_per_task: { type: String, required: true },
    task_repetition_preference: { type: String, required: true },
    interesting_data_types: { type: String, required: true },
    importance_of_task_context: { type: String, required: true },
    task_difficulty_preference: { type: String, required: true },
    handling_difficult_tasks: { type: String, required: true },
    frequency_of_difficult_tasks: { type: String, required: true },
    overall_task_difficulty: { type: String, required: true },
    features_for_improvement: { type: [String], required: true },
    helpful_tools: { type: String, required: true },
    importance_of_examples: { type: String, required: true },
    motivation_for_annotation: { type: String, required: true },
    additional_feedback_on_annotation: { type: String, required: false },
    frequency_of_task_completion: { type: String, required: true },
    motivation_for_task_completion: { type: String, required: true },
    confidence_in_accuracy: { type: String, required: true },
    challenges_in_quality_ensurance: { type: String, required: true },
    feeling_of_impact: { type: String, required: true },
    preferred_impact_information: { type: String, required: true },
    suggestions_for_acknowledgment: { type: String, required: false },
    enjoyable_aspects: { type: String, required: true },
    importance_of_feedback_on_contributions: { type: String, required: true },
    additional_feedback_on_ai_training: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('DataAnnotationSurvey', dataAnnotationSurveySchema);
