const httpStatus = require('http-status');
const { Tag } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create tag
 * @param {String} tags
 * @returns {Promise<Tag>}
 */
const createTag = async (tagName) => {
    return Tag.create({name: tagName})
}


/**
 * Processing Tag
 * @param {Array<tag>} Tags
 * @returns {Array<tagId>}
 */
const tagProcessing = async (tags) => {
    let results = [];

    for (let item of tags){
        let tagName = item.name.toLowerCase();
        let tag = await getTagByName(tagName);

       
        if(tag){
            results.push(tag.id)
        }else{  // if tag not exist, will create new tag
            let created = await createTag(tagName);

            results.push(created.id)
        }
    }

    return results;
}

/**
 * Get tag by tagName
 * @param {string} tagName
 * @returns {Promise<Tag>}
 */
const getTagByName = async (tagName) => {
    return Tag.findOne({ name: tagName });
};

module.exports = {
    createTag,
    tagProcessing,
    getTagByName
};