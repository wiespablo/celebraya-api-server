const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

//Llamo a las rutas que se van a motrar
router.get('/index', userController.index )
router.post('/register', userController.register)
router.post('/login', userController.login)



module.exports = router;