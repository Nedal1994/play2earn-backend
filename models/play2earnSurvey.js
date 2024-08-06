const mongoose = require('mongoose');

const play2earnSurveySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    familiar_with_play2earn: { type: String, required: true },
    played_play2earn_games: { type: String, required: true },
    games_played: { type: String, required: true },
    importance_of_crypto_rewards: { type: String, required: true },
    preferred_crypto_rewards: { type: [String], required: true },
    use_of_crypto_rewards: { type: String, required: true },
    desired_dashboard_features: { type: String, required: true },
    interested_game_genres: { type: [String], required: true },
    time_willing_to_spend: { type: String, required: true },
    willing_tasks: { type: [String], required: true },
    playing_frequency: { type: String, required: true },
    preferred_platforms: { type: [String], required: true },
    willing_to_make_purchases: { type: String, required: true },
    social_media_platforms: { type: [String], required: true },
    willing_social_media_engagements: { type: [String], required: true },
    willing_to_create_content: { type: String, required: true },
    types_of_content_to_create: { type: [String], required: true },
    willing_to_participate_in_surveys: { type: String, required: true },
    survey_frequency: { type: String, required: true },
    willing_to_refer_friends: { type: String, required: true },
    recommend_crypto_likelihood: { type: String, required: true },
    considered_crypto_exchange: { type: String, required: true },
    consider_holding_crypto_as_asset: { type: String, required: true },
    interested_in_trading_or_holding: { type: String, required: true },
    important_factor_for_investment: { type: [String], required: true },
    see_potential_uses_for_crypto: { type: String, required: true },
    prefer_individual_or_funds: { type: String, required: true },
    preferred_educational_resources: { type: [String], required: true },
    emerging_technologies_impact: { type: String, required: true },
    additional_comments: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Play2EarnSurvey', play2earnSurveySchema);
