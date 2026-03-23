const Ticket = require('../models/ticket');

const ticketController = {
    // Crear un nuevo ticket
    create: async (req, res) => {
        try {
            const nuevoTicket = await Ticket.create(req.body);
            res.status(201).json(nuevoTicket);
        } catch (error) {
            res.status(400).json({ error: 'Error al crear el ticket', details: error.message });
        }
    },

    // Listar todos los tickets (para el listado con filtro después)
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