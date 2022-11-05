const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionService, tagService } = require('../services');

const createQuestion = catchAsync(async (req, res) => {
    let tagProcessing = await tagService.tagProcessing(req.body.tags);

    let newQuestion = {
        title: req.body.title,
        description: req.body.description,
        tags: tagProcessing,
        author: req.user.id,
        createdAt: new Date()
    }

    const question = await questionService.createQuestion(newQuestion);
    res.status(httpStatus.CREATED).send(question);
});


const getQuestions = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['title']);
    let options = pick(req.query, ['sortBy', 'limit', 'page']);
    options['populate'] = "author,tags"
    
    const result = await questionService.queryQuestions(filter, options);
    res.send(result);   
});

const getQuestion = catchAsync(async (req, res) => {
    const question = await questionService.getQuestionById(req.params.questionId);
    if (!question) {
      throw new ApiError(httpStatus.NOT_FOUND, 'question not found');
    }
    res.send(question);
});


module.exports = {
    createQuestion,
    getQuestions,
    getQuestion
}