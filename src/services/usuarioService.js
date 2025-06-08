const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

const crearUsuario = async ({ nombre, email, password }) => {
    const existe = await prisma.usuario.findUnique({ where: { email }});
    if (existe) throw new Error('El Email ya esta registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
        data: {
            nombre,
            email,
            password: hashedPassword
        },
    });

    return usuario;
};

// Login de Usuario
const loginUsuario = async ({ email, password }) => {
    const usuario = await prisma.usuario.findUnique({ 
        where: { email },
        select: {
            id: true,
            nombre: true,
            email: true
        }
    });

    // El hash de la contraseña no se devuelve en ningún momento
    const usuarioPassword = await prisma.usuario.findUnique({
        where: { email },
        select: { password: true }
    })
    
    if (!usuario) throw new Error('El usuario no existe'); 

    const verifyPassword = await bcrypt.compare(password, usuarioPassword.password);
    if (!verifyPassword) throw new Error('Contraseña incorrecta');

    return usuario;
};

// Obtener usuarios
const obtenerUsuarios = async () => {
    // Que obtraiga todo lo que contiene el modelo de usuario
    const usuarios = await prisma.usuario.findMany({
        select: {
            id: true,
            nombre: true,
            email: true,
            creadoEn: true
        },
    });

    return usuarios;
};

const obtenerUsuarioPorId = async (id) => {
    const usuario = await prisma.usuario.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            nombre: true,
            email: true,
            creadoEn: true
        }
    });

    if (!usuario) throw new Error ('Usuario no encontrado');
    
    return usuario;
};


// Eliminar usuarios
const eliminarUsuario = async (id) => {
    const usuario = await prisma.usuario.findUnique({ where: { id: parseInt(id)} });
    if (!usuario) throw new Error('Usuario no encontrado');

    await prisma.usuario.delete({ where: { id: parseInt(id) } });

    return { Mensaje: 'Usuario eliminado correctamente'};
};

// Actualizar usuarios
const actualizarUsuario = async (id, datos) => {
    const usuario = await prisma.usuario.findUnique({ where: { id: parseInt(id) } });
    if (!usuario) throw new Error('Usuario no encontrado');

    const datosActualizados = {
        nombre: datos.nombre,
        email: datos.email
    };

    // Solo si la contraseña viene en los datos a cambiar, haremos un hash en ella
    if (datos.password) {
        const bcrypt = require('bcrypt');
        datosActualizados.password = await bcrypt.hash(datos.password, 10);
    }

    const actualizado = await prisma.usuario.update({
        where: ({ id: parseInt(id) }),
        data: datosActualizados,
    });

    return actualizado;
};

module.exports = {
    crearUsuario,
    loginUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    obtenerUsuarioPorId
};

