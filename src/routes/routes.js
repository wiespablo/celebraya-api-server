const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const eventoController = require('../controllers/eventoController');
//Son funciones que se ejecutan antes de llegar al controlador tienen las propiedades
//resolve, reject y next lo que permite después de ejecutarse pasar al controlador (el next)
const userMiddleware = require('../middlewares/userMiddleware');
//Llamo a las rutas que se van a motrar
router.post('/register', userController.register)
router.post('/login', userController.login)
router.put('/usuario/actualizar-password', userMiddleware, userController.updatePass);
/**
 * router tiene métodos get put delete, el método recibe como parámetros primero el path 
 * seguido de las funciones que se pueden ejecutra ( middleware o controlador)
 */
router.post('/usuario/buscar', userMiddleware, userController.search);
router.get('/usuario/eventos', userMiddleware, eventoController.misEventos );
router.get('/usuario/invitaciones', userMiddleware, userController.invitaciones );
router.post('/usuario/confirmar:eventId', userMiddleware, userController.confirmarInvitacion );
router.post('/evento/crear', userMiddleware, eventoController.register);
router.get('/evento/ver/:id', userMiddleware, eventoController.verEvento );
router.get('/evento/asignaciones/:id', userMiddleware, eventoController.verAsignaciones );
router.delete('/evento/eliminar/:id', userMiddleware, eventoController.eliminar );
router.put('/evento/editar/:id', userMiddleware, eventoController.editar );
router.put('/evento/agregarinvitado/:id', userMiddleware, eventoController.agregarinvitado );
router.put('/evento/eliminarinvitado/:id', userMiddleware, eventoController.eliminarInvitado );
//rutas PUT actualizar
//rutas GET retorna datos
//rutas POST crear nuevos objetos
//rutas DELETE eliminar objetos
module.exports = router;