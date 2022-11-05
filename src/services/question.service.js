const httpStatus = require('http-status');
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a question
 * @param {Object} questionBody
 * @returns {Promise<User>}
 */
const createQuestion = async (questionBody) => {
    return Question.create(questionBody);
};

module.exports = {
    createQuestion
}
  