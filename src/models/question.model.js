const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Answer'
            }
        ],
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag'
            }
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        vote: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vote',
            // required: true   
        },
    },
    { timestamps: true }
)


// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

/**
 * @typedef Question
 */

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;