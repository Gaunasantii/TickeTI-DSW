const Ticket = require('../models/ticket');
const Usuario = require('../models/usuario');

const ticketController = {
    // Crear un nuevo ticket con validación de DNI
    create: async (req, res) => {
        try {
            const { dni } = req.body;
            
            // 1. Validamos si el usuario existe en la tabla de Usuarios
            const usuario = await Usuario.findByPk(dni);
            
            if (!usuario) {
                // Si no existe, devolvemos error y no creamos el ticket
                return res.status(404).json({ 
                    error: 'Error al crear el ticket', 
                    details: `El DNI ${dni} no está registrado como usuario en el sistema.` 
                });
            }

            // 2. Si el usuario existe, creamos el ticket
            const nuevoTicket = await Ticket.create(req.body);
            res.status(201).json(nuevoTicket);

        } catch (error) {
            res.status(400).json({ 
                error: 'Error al crear el ticket', 
                details: error.message 
            });
        }
    },

    // Listar todos los tickets
    getAll: async (req, res) => {
        try {
            const tickets = await Ticket.findAll();
            res.json(tickets);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener tickets' });
        }
    }
};

module.exports = ticketController;