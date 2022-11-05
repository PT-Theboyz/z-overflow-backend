const Joi = require('joi')

const createQuestion = {
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      name: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).min(1).required()
    }),
};

module.exports = {
    createQuestion
}