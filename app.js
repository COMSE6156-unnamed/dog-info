const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

require('dotenv').config();
require('./config/environments')(app, express)
require('./config/routes')(app)
require('./config/connection')(app)