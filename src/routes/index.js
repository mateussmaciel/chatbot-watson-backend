const { Router } = require('express');
const sendMenssage = require('./requestMessage');
const cors = require('cors')
const routes = Router();

routes.use(cors())
routes.use('/', sendMenssage);
routes.use('/kill-session',sendMenssage)

module.exports =  routes;
