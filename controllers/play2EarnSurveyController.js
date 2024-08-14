const play2earn = require('../models/play2earnSurvey');
const baseSurveyController = require('./baseSurveyController');

exports.createSurvey = baseSurveyController.createSurvey(play2earn);
exports.getAllSurveys = baseSurveyController.getAllSurveys(play2earn);
exports.getSurveyById = baseSurveyController.getSurveyById(play2earn);
exports.deleteSurvey = baseSurveyController.deleteSurvey(play2earn);
exports.bulkDeleteSurveys = baseSurveyController.bulkDeleteSurveys(play2earn);
