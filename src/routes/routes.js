const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const eventoController = require('../controllers/eventoController');
const userMiddleware = require('../middlewares/userMiddleware');
//Llamo a las rutas que se van a motrar
router.get('/index', userController.index )
router.post('/register', userController.register)
router.post('/login', userController.login)
router.put('/usuario/actualizar-password', userMiddleware, userController.updatePass);
router.post('/usuario/buscar', userMiddleware, userController.search);
router.get('/usuario/eventos', userMiddleware, eventoController.misEventos );
router.get('/usuario/invitaciones', userMiddleware, userController.invitaciones );
router.post('/usuario/confirmar:eventId', userMiddleware, userController.confirmarInvitacion );


module.exports = router;