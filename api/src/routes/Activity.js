//-------------IMPORTS--------------//
const { Router }= require('express');
const { createActivity } = require('../Controllers.js/index_controller');
const router= Router();

//-----ROUTE ACTIVITY------//
router.post( '/create', createActivity)

module.exports = router;