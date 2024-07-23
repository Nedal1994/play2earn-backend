const CryptoSurvey = require('../models/cryptoSurvey');
const baseSurveyController = require('./baseSurveyController');

exports.createSurvey = baseSurveyController.createSurvey(CryptoSurvey);
exports.getAllSurveys = baseSurveyController.getAllSurveys(CryptoSurvey);
exports.getSurveyById = baseSurveyController.getSurveyById(CryptoSurvey);
exports.deleteSurvey = baseSurveyController.deleteSurvey(CryptoSurvey);
exports.bulkDeleteSurveys = baseSurveyController.bulkDeleteSurveys(CryptoSurvey);
