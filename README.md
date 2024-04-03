# Desafío Técnico Nodejs

La evaluación implica acceder a una base de datos PostgreSQL y devolver resultados a través de una API que se construirá mediante el uso de JavaScript. Solo hay algunos requisitos que deben cumplirse al completar la evaluación:

1. Se puede usar cualquier entorno de ejecución de JavaScript (Nodejs en este caso).
2. Use un administrador de paquetes como pnpm, bun, npm o yarn.
3. Se debe usar PostgreSQL (puede instalar una DB localmente o de manera remota <https://neon.tech/>).

## Detalles de la Evaluación

El modelo relacional contendrá múltiples tablas.

![imagen](https://user-images.githubusercontent.com/21364333/197232749-2ad14346-40a1-4b21-94a1-713ed23cdd5f.png)

No todas las tablas en este diagrama serán necesarias, pero preste atención al interactuar con las diversas tablas, especialmente al escribir, para no tener efectos secundarios no deseados.

## Requisitos

Los siguientes requisitos deben cumplirse mediante su API. Para esta evaluación, se deben desarrollar cuatro puntos finales separados, uno para cada requisito.

### Punto 1: Películas

- **Obtener todas las películas:** Devuelve una lista de películas. Deben devolverse el `film_id`, `title`, `description` y `rental_rate`.
- **Obtener una película por ID:** Devuelve una película por `film_id`.
- **Crear una película:** Crea una película con los campos: `film_id`, `title`, `description` y `rental_rate`.
- **Actualizar una película:** Actualiza una película con los campos: `film_id`, `title`, `description` y `rental_rate`.
- **Eliminar una película:** Elimina una película por `film_id`.

### Punto 2: Búsqueda de Películas con Filtrado

- **Filtrado por cantidad de registros:** Se requiere agregar un filtro por cantidad de registros al endpoint de búsqueda de películas en nuestra API Node.js.

### Punto 3: Guarde logs al consumir un endpoint

- **Crear logs en todos los endpoints:** La API creada debe guardar un log despues de consumir algun endpoint y guarde dichos logs en un archivo local, puede usar la libreria `winston`.

### Punto 4: Documente su API

- **Documentar los endpoints:** La API creada con los puntos anteriores debe estar documentada, puede usar Swagger o cualquier otra libreria de documentacion.

## Criterios

En general, los criterios para la evaluación son relativamente flexibles, revisaremos cualquier trabajo que produzca/nos proporcione. Evaluaremos la calidad del código, el uso de paquetes, el diseño y la estructura general, y el cumplimiento con las expectativas generales de la industria.

Esté preparado para discutir su solución en la entrevista, ya que es probable que tomemos algunos puntos interesantes y solicitemos una explicación sobre por qué se usó ese método en particular en la solución.

Finalmente, no piense demasiado/trabaje en esta evaluación, esperamos tener una idea de cómo aborda el problema, pero si alguna parte resulta ser demasiado difícil, trabaje en otros componentes, evaluaremos todo lo que nos proporcione.

## Configuración

Puede utilizar la siguiente imagen de Docker para crear una base de datos PostgreSQL restaurada con datos funcionales: [sensoteq/tech-assessment-db](https://hub.docker.com/r/sensoteq/tech-assessment-db) o crear su propia DB con el mismo formato del modelo anterior.

Por ejemplo:
Esto creará un contenedor de Docker accesible a través del puerto 8989 y un usuario con las credenciales de inicio de sesión de postgres:postgres.
# technical-test-nodejs-solved-emmus
