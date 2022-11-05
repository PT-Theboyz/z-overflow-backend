const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionValidation = require('../../validations/question.validation');
const questionController = require('../../controllers/question.controller');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(questionValidation.createQuestion), questionController.createQuestion)
    // .get(questionValidation.getQuestions)
    

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management and retrieval
 */