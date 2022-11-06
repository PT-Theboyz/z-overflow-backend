const Joi = require('joi')
const { objectId } = require('./custom.validation');

const createQuestion = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().items().min(1).required()
    }),
};

const getQuestions = {
    query: Joi.object().keys({
        title: Joi.string(),
        // tag: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
}

const getQuestion = {
    params: Joi.object().keys({
        questionId: Joi.string().custom(objectId),
    }),
}

const updateQuestion = {
    params: Joi.object().keys({
        questionId: Joi.string().custom(objectId),
    }),
    body: Joi.object()
    .keys({
        title: Joi.string(),
        description: Joi.string(),
        tags: Joi.array().items().min(1)
    })
    .min(1),
}

const deleteQuestion = {
    params: Joi.object().keys({
        questionId: Joi.string().custom(objectId),
    }),
}

module.exports = {
    createQuestion,
    getQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion
}