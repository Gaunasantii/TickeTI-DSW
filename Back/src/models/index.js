const Usuario = require('./usuario');
const Ticket = require('./ticket');

// Un usuario puede tener muchos tickets
Usuario.hasMany(Ticket, { foreignKey: 'dni', sourceKey: 'dni' });

// Un ticket pertenece a un usuario
Ticket.belongsTo(Usuario, { foreignKey: 'dni', targetKey: 'dni', as: 'solicitante' });