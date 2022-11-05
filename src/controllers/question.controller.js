const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');

const createQuestion = catchAsync(async (req, res) => {
    req.body = {
        ...req.body,
        author: req.user.id
    }
    const question = await questionService.createQuestion(req.body);
    res.status(httpStatus.CREATED).send(question);
});


module.exports = {
    createQuestion
}