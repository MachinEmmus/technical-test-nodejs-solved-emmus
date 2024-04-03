const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const peliculasRoutes = require('./routes/peliculas');
const winston = require('winston');

const app = express();
const PORT = 3000;

// Rutas de la API
app.use(express.json());
app.use('/api', peliculasRoutes);

// 
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/server-run.log' }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API para prueba tecnica proyecto darwin',
            description: 'API CRUD peliculas',
            version: '1.0.0',
        },
    },
    apis: ['./controllers/peliculas.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Iniciar el servidor
app.listen(PORT, () => {
    logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});
