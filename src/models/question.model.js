const { string } = require('joi');
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

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
            required: true
        }
    }
)

/**
 * @typedef Question
 */

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;