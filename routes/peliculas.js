const express = require('express');
const router = express.Router();
const peliculas = require('../controllers/peliculas');

router.get('/peliculas', peliculas.obtenerPeliculas);
router.get('/peliculas/:id', peliculas.obtenerPeliculaPorId);
router.post('/peliculas', peliculas.crearPelicula);
router.put('/peliculas/:id', peliculas.actualizarPelicula);
router.delete('/peliculas/:id', peliculas.eliminarPelicula);

module.exports = router;
