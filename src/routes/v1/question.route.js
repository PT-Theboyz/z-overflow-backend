const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
    .router('/')
    // .post(auth(), )
    

module.exports = router;

