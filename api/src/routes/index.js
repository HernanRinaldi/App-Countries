//----------------IMPORTS------------------//
const { Router } = require('express');
const routerAllCountries = require('./Countries');
const routerAllActivity= require('./Activity');

const router = Router();

//------------MIDDLERARE----------------//

router.use('/countries', routerAllCountries)
router.use('/activity', routerAllActivity) 

module.exports = router;
