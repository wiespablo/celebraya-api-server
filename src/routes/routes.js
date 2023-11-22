const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
router.get('/index', userController.index )

module.exports = router;