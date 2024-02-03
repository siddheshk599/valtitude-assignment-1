const monthlyCountRouter = require('express').Router();
const { getAllMonthlyCountsCntrl }  = require('../controllers/monthly-count.controller');

monthlyCountRouter
.route('/monthly-counts')
.get(getAllMonthlyCountsCntrl);

module.exports = monthlyCountRouter;
