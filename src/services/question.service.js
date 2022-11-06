const httpStatus = require('http-status');
const tagService = require('./tag.service')
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a question
 * @param {Object} questionBody
 * @returns {Promise<User>}
 */
const createQuestion = async (userId, questionBody) => {
    let tagProcessing = await tagService.tagProcessing(questionBody.tags);

    let newQuestion = {
        title: questionBody.title,
        description: questionBody.description,
        tags: tagProcessing,
        author: userId
    }

    return Question.create(newQuestion);
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

/**
 * Get question by id
 * @param {ObjectId} id
 * @returns {Promise<Question>}
 */
const getQuestionById = async (id) => {
    return Question.findById(id).populate('author tags')
};


/**
 * Update a question by id
 * @param {ObjectId} questionId
 * @param {ObjectId} userId
 * @param {Object} questionBody
 * @returns {Promise<User>}
 */
const updateQuestionById = async (questionId, userId, questionBody) => {
    const question = await getQuestionById(questionId);

    if (!question){
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }

    if(question.author.id !== userId){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorize on this question');
    }

    let tagProcessing = await tagService.tagProcessing(questionBody.tags);
    let newQuestion = {
        title: questionBody.title,
        description: questionBody.description,
        tags: tagProcessing,
    }

    Object.assign(question, newQuestion)

    await question.save();
    return question;
};


/**
 * Delete question by id
 * @param {ObjectId} questionId
 * @returns {Promise<Question>}
 */
const deleteQuestionById = async (questionId, userId) => {
    const question = await getQuestionById(questionId);

    if (!question) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    if(question.author.id !== userId){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorize on this question');
    }

    await question.remove();
    return question;
};


module.exports = {
    createQuestion,
    queryQuestions,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById
}
  