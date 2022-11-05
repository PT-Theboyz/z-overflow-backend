const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionValidation = require('../../validations/question.validation');

const router = express.Router();

router
    .router('/')
    .post(auth(), validate(questionValidation.createQuestion))
    

module.exports = router;

