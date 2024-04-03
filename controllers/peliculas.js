const sql = require('../config/database');
const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/api.log' }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});

/**
 * @swagger
 * /api/peliculas:
 *   get:
 *     summary: Obtener todas las películas.
 *     description: Endpoint para obtener todas las películas disponibles.
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: integer
 *         description: Número máximo de películas a retornar.
 *     responses:
 *       200:
 *         description: Éxito, devuelve la lista de películas.
 *       500:
 *         description: Error interno del servidor.
 */
const obtenerPeliculas = async (req, res) => {
    const query = req.query;
    let result = null;
    console.log(query.filter)
    try {
        if (query.filter && !isNaN(query.filter)) {
            result = await sql`SELECT film_id, title, description, rental_rate FROM film LIMIT ${parseInt(query.filter, 10)}`;
        } else {
            result = await sql`SELECT film_id, title, description, rental_rate FROM film`;
        }
        res.json(result);
        logger.info('Endpoint de obtener todas las películas llamado correctamente');
    } catch (error) {
        logger.error(`Error al obtener todas las películas: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

};

/**
 * @swagger
 * /api/peliculas/{id}:
 *   get:
 *     summary: Obtener una película por ID.
 *     description: Endpoint para obtener una película específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la película a obtener.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Éxito, devuelve la película solicitada.
 *       404:
 *         description: Película no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
const obtenerPeliculaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql`SELECT film_id, title, description, rental_rate FROM film WHERE film_id = ${parseInt(id, 10)}`;
        if (result.length > 0) {
            res.json(result[0]);
            logger.info('Endpoint de obtener una película por ID llamado correctamente');
        } else {
            res.status(404).json({ error: 'Película no encontrada' });
        }
    } catch (error) {
        logger.error(`Error al obtener película por ID: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

/**
 * @swagger
 * /api/peliculas:
 *   post:
 *     summary: Crear una nueva película.
 *     description: Endpoint para crear una nueva película.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               rental_rate:
 *                 type: number
 *     responses:
 *       201:
 *         description: Película creada con éxito.
 *       400:
 *         description: Datos incompletos o incorrectos para crear la película.
 *       500:
 *         description: Error interno del servidor.
 */
const crearPelicula = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            throw new Error('No se envió ningún cuerpo de solicitud (req.body)');
        }

        const { title, description, rental_rate } = req.body;

        // Verificar si req.body tiene los datos necesarios
        if (!title || !description || !rental_rate) {
            throw new Error('Faltan datos requeridos para crear la película');
        }

        // Imprimir los valores para depurar
        console.log('Valores de la película:', title, description, rental_rate);

        // Ejecutar la consulta SQL
        const result = await sql`INSERT INTO film (title, description, rental_rate) VALUES (${title}, ${description}, ${rental_rate}) RETURNING *`;

        // Devolver el resultado de la consulta
        res.status(201).json(result);
        logger.info('Endpoint de crear una película llamado correctamente');
    } catch (error) {
        logger.error(`Error al crear película: ${error.message}`);
        res.status(400).json({ error: error.message }); // Cambiar el código de estado a 400 para indicar un error de cliente
    }
};


/**
 * @swagger
 * /api/peliculas/{id}:
 *   put:
 *     summary: Actualizar una película por ID.
 *     description: Endpoint para actualizar una película existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la película a actualizar.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               rental_rate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Película actualizada con éxito.
 *       404:
 *         description: Película no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
const actualizarPelicula = async (req, res) => {
    const { id } = req.params;
    let pelicula_existente = null;
    let pelicula_encontrada = null;
    if (id) {
        pelicula_existente = await sql`SELECT film_id, title, description, rental_rate FROM film WHERE film_id = ${parseInt(id, 10)}`;
        if (pelicula_existente.length > 0) {
            pelicula_encontrada = pelicula_existente[0]
        }
    }
    console.log(pelicula_existente)
    const pelicula = req.body;
    try {
        const result = await sql`UPDATE film SET title = ${pelicula?.title ? pelicula.title : pelicula_encontrada?.title}, description = ${pelicula?.description ? pelicula.description : pelicula_encontrada?.description} , rental_rate = ${pelicula?.rental_rate ? pelicula.rental_rate : pelicula_encontrada?.rental_rate} WHERE film_id = ${id} RETURNING *`;
        if (result.length > 0) {
            res.json(result[0]);
            logger.info('Endpoint de actualizar una película llamado correctamente');
        } else {
            res.status(404).json({ error: 'Película no encontrada' });
        }
    } catch (error) {
        logger.error(`Error al actualizar película: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

/**
 * @swagger
 * /api/peliculas/{id}:
 *   delete:
 *     summary: Eliminar una película por ID.
 *     description: Endpoint para eliminar una película por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la película a eliminar.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Película eliminada con éxito.
 *       404:
 *         description: Película no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
const eliminarPelicula = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql`DELETE FROM film WHERE film_id = ${id} RETURNING *`;
        if (result.length > 0) {
            res.json({ message: 'Película eliminada correctamente' });
            logger.info('Endpoint de eliminar una película llamado correctamente');
        } else {
            res.status(404).json({ error: 'Película no encontrada' });
        }
    } catch (error) {
        logger.error(`Error al eliminar película: ${error.message}`);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula,
};
