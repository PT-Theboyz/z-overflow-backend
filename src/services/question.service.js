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

/**
 * Query for questions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuestions = async (filter, options) => {
    const questions = await Question.paginate(filter, options);
    return questions;
};

module.exports = {
    createQuestion,
    queryQuestions
}
  