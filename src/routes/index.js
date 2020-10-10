const { Router } = require('express');
const sendMenssage = require('./requestMessage');

const routes = Router();

routes.use('/', sendMenssage);

module.exports =  routes;
