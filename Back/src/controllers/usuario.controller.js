const Usuario = require('../models/usuario');

const usuarioController = {
    // Crear un nuevo Usuario
    create: async (req, res) => {
        try {
            console.log(req.body);
            const nuevoUsuario = await Usuario.create(req.body);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(400).json({ error: 'Error al crear el ticket', details: error.message });
        }
    },

    // Listar todos los usuarios (para el listado con filtro después)
    getAll: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }
};

module.exports = usuarioController;