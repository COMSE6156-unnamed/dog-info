const router = require('express').Router();
const controller = require('../controllers/init')

router.get('/', controller.hello);

module.exports = router