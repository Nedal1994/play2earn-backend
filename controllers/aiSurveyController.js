const aiSurvey = require('../models/aiSurvey');
const baseSurveyController = require('./baseSurveyController');

exports.createSurvey = baseSurveyController.createSurvey(aiSurvey);
exports.getAllSurveys = baseSurveyController.getAllSurveys(aiSurvey);
exports.getSurveyById = baseSurveyController.getSurveyById(aiSurvey);
exports.deleteSurvey = baseSurveyController.deleteSurvey(aiSurvey);
exports.bulkDeleteSurveys = baseSurveyController.bulkDeleteSurveys(aiSurvey);
