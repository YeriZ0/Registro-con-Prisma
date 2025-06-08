const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para registrar usuarios
router.post('/registro', usuarioController.registraUsuario);

// Ruta para iniciar sesión
router.post('/login', usuarioController.iniciaUsuario);

// Ruta para obtener los datos de los usuarios
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Ruta para eliminar a los usuarios
router.delete('/:id', usuarioController.eliminarUsuario);

// Ruta para actualizar datos de un usuario, se utiliza el PUT
router.put('/:id', usuarioController.actualizarUsuario);

module.exports = router;