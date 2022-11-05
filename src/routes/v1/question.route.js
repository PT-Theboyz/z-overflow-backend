const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionValidation = require('../../validations/question.validation');
const questionController = require('../../controllers/question.controller');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(questionValidation.createQuestion), questionController.createQuestion)
    .get(validate(questionValidation.getQuestions), questionController.getQuestions)
router
    .route('/:questionId')
    .get(validate(questionValidation.getQuestion), questionController.getQuestion)
    .patch(auth(), validate(questionValidation.updateQuestion), questionController.updateQuestion)
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management and retrieval
 */