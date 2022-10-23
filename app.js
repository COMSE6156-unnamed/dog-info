const express = require('express')

const app = express();


require('./config/environments')(app, express)
require('./config/routes')(app)
require('./config/connection')(app)