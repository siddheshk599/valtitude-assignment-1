const { getAllRolesCntrl } = require('../controllers/role.controller');

const roleRouter = require('express').Router();

roleRouter
.route('/roles')
.get(getAllRolesCntrl)

module.exports = roleRouter;
