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
  
  
  './src/*/*route*.ts',
  
  
  './src/*/DTO/*.ts',
  
  
   './src/utils/api.response.ts',
   './src/Docs/swagger.unauthorized.ts',
   './src/Docs/swagger.forbidden.ts',
   './src/Docs/swagger.notFound.ts',
   './src/Docs/swagger.InvalidData.ts'
 ], 
   
};