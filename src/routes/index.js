const { Router } = require('express');
const sendMenssage = require('./requestMessage');
const cors = require('cors')
const routes = Router();

routes.use(cors())
routes.use('/', sendMenssage);

module.exports =  routes;
