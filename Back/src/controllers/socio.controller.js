const Socio = require('../models/Socio');

const socioController = {
    // Crear un nuevo socio
    create: async (req, res) => {
        try {
            const nuevoSocio = await Socio.create(req.body);
            res.status(201).json(nuevoSocio);
        } catch (error) {
            res.status(400).json({ error: 'Error al crear el socio', details: error.message });
        }
    },

    // Listar todos los socios (para el listado con filtro después)
    getAll: async (req, res) => {
        try {
            const socios = await Socio.findAll();
            res.json(socios);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener socios' });
        }
    }
};

module.exports = socioController;