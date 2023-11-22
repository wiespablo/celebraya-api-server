const { Router } = require('express');
const router = Router();
const adminController = require('../controllers/adminController');
router.get('/index', adminController.index )

module.exports = router;