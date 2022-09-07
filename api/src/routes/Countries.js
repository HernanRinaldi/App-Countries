//-------------IMPORTS--------------//
const { Router }= require('express');
const { getAllCountries, getApiId, createActivity } = require('../Controllers.js/index_controller');
const router= Router();

//-----ROUTE GET COUNTRIES-------//
router.get( "/", getAllCountries)
router.get( '/:cca3',getApiId)

//-----ROUTE CREATE ACTIVITY------//
router.post( '/create', createActivity)

module.exports = router;