const usuarioService = require('../services/usuarioService');

const registraUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.crearUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ Error: error.message });
    }
};

const iniciaUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.loginUsuario(req.body);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(401).json({ Error: error.message });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.json(usuarios);
    } catch {
        res.status(500).json({ Error: error.message });
    }
}

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.obtenerUsuarioPorId(id);
        res.json(usuario);
    } catch {
        res.status(404).json({ Error: error.message });
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await usuarioService.eliminarUsuario(id);
        res.json(respuesta);
    } catch (error) {
        res.status(404).json({ Error: error.message });
    }
}

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // req.body hace referencia al cuerpo de la petición, y se encuentra en los parametros
        const actualizado = await usuarioService.actualizarUsuario(id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ Error: error.message })
    }
}

module.exports = {
    registraUsuario,
    iniciaUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    obtenerUsuarioPorId
};