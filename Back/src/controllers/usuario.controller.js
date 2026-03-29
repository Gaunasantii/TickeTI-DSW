const Usuario = require('../models/usuario');

const usuarioController = {
    // Crear un nuevo Usuario
    create: async (req, res) => {
        try {
            const { dni } = req.body;

            // 1. Validación de seguridad: Verificar si el DNI ya existe
            const usuarioExistente = await Usuario.findByPk(dni);

            if (usuarioExistente) {
                return res.status(400).json({ 
                    error: 'Registro duplicado', 
                    details: `Ya existe un usuario registrado con el DNI ${dni}.` 
                });
            }

            // 2. Crear el usuario
            // Al llamar a .create, Sequelize disparará automáticamente el hook 'beforeCreate'
            // que definimos en el modelo para generar el user y el email.
            const nuevoUsuario = await Usuario.create(req.body);

            // Respondemos con el objeto completo (incluyendo el user y email generados)
            res.status(201).json(nuevoUsuario);
            
        } catch (error) {
            console.error("Error al crear usuario:", error);
            res.status(400).json({ 
                error: 'Error al crear el usuario', 
                details: error.message 
            });
        }
    },

    // Listar todos los usuarios
    getAll: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    },

    login: async (req,res)=>{
        try{
            const {email,pass}=req.body;
            const usuario = await Usuario.findOne({
                where:{
                    email:email,
                    pass:pass,
                }
            });

            if (usuario!==null){
                res.json(usuario)
            } else {
                res.status(404).send({message:"usuario no encontrado"})
            }
        } catch (error){
            res.status(500).send({message:"error en el server"})
        }
    },
};

module.exports = usuarioController;