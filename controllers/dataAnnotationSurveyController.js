const dataAnnotation = require('../models/dataAnnotationSurvey');
const baseSurveyController = require('./baseSurveyController');

exports.createSurvey = baseSurveyController.createSurvey(dataAnnotation);
exports.getAllSurveys = baseSurveyController.getAllSurveys(dataAnnotation);
exports.getSurveyById = baseSurveyController.getSurveyById(dataAnnotation);
exports.deleteSurvey = baseSurveyController.deleteSurvey(dataAnnotation);
exports.bulkDeleteSurveys = baseSurveyController.bulkDeleteSurveys(dataAnnotation);
