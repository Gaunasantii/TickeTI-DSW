import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de mi API',
      version: '1.0.0',
      description: 'Documentación de los endpoints del backend',
    },
    components:{
      securitySchemes:{
        cookieAuth:{
          type:"apiKey",
          in: 'cookie',
          name: 'AccessToken'
        }
      }
    },

    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: [
  './src/*/*.controller.ts',
  
  // Busca archivos de rutas (usamos *route*.ts para atrapar tanto admin.routes.ts como persona.route.ts)
  './src/*/*route*.ts',
  
  // Busca todos los archivos dentro de la subcarpeta DTO de cada módulo
  './src/*/DTO/*.ts',
  
  // Opcional: si creás un archivo global para el ApiResponseBase, agregalo acá
   './src/utils/api.response.ts'], 
};