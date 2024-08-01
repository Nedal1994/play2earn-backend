// routes/surveyRoutes.js
const express = require('express');
const router = express.Router();

const cryptoSurveyController = require('../controllers/cryptoSurveyController');
const aiSurveyController = require('../controllers/aiSurveyController');
const dataAnnotationSurveyController = require('../controllers/dataAnnotationSurveyController');
const play2earnSurveyController = require('../controllers/play2EarnSurveyController');

router.post('/cryptoSurvey/create', cryptoSurveyController.createSurvey);
router.get('/cryptoSurvey/', cryptoSurveyController.getAllSurveys);
router.get('/cryptoSurvey/:id', cryptoSurveyController.getSurveyById);
router.delete('/cryptoSurvey/:id', cryptoSurveyController.deleteSurvey);
router.post('/cryptoSurvey/bulk-delete', cryptoSurveyController.bulkDeleteSurveys);

router.post('/aiSurvey/create', aiSurveyController.createSurvey);
router.get('/aiSurvey/', aiSurveyController.getAllSurveys);
router.get('/aiSurvey/:id', aiSurveyController.getSurveyById);
router.delete('/aiSurvey/:id', aiSurveyController.deleteSurvey);
router.post('/aiSurvey/bulk-delete', aiSurveyController.bulkDeleteSurveys);

router.post('/dataAnnotationSurvey/create', dataAnnotationSurveyController.createSurvey);
router.get('/dataAnnotationSurvey/', dataAnnotationSurveyController.getAllSurveys);
router.get('/dataAnnotationSurvey/:id', dataAnnotationSurveyController.getSurveyById);
router.delete('/dataAnnotationSurvey/:id', dataAnnotationSurveyController.deleteSurvey);
router.post('/dataAnnotationSurvey/bulk-delete', dataAnnotationSurveyController.bulkDeleteSurveys);

router.post('/play2EarnSurvey/create', play2earnSurveyController.createSurvey);
router.get('/play2EarnSurvey/', play2earnSurveyController.getAllSurveys);
router.get('/play2EarnSurvey/:id', play2earnSurveyController.getSurveyById);
router.delete('/play2EarnSurvey/:id', play2earnSurveyController.deleteSurvey);
router.post('/play2EarnSurvey/bulk-delete', play2earnSurveyController.bulkDeleteSurveys);

module.exports = router;
