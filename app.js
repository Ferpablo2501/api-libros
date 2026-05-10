const express = require('express');

const app = express();

const PORT = 3000;

// Arreglo de libros almacenados en memoria
const libros = [
    {
        id: 1,
        nombre: "Interstellar",
        año: 2014
    },
    {
        id: 2,
        nombre: "Hábitos Atómicos",
        año: 2018
    },
    {
        id: 3,
        nombre: "Padre Rico Padre Pobre",
        año: 1997
    }
];

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a la API de Libros'
    });
});

// Mostrar todos los libros
app.get('/libros', (req, res) => {
    res.json(libros);
});

// Buscar libro por ID
app.get('/libros/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const libro = libros.find(libro => libro.id === id);

    if (!libro) {
        return res.status(404).json({
            error: 'Libro no encontrado'
        });
    }

    res.json(libro);
});

// Buscar libro por nombre
app.get('/buscar', (req, res) => {

    const nombre = req.query.nombre;

    const resultados = libros.filter(libro =>
        libro.nombre.toLowerCase().includes(nombre.toLowerCase())
    );

    if (resultados.length === 0) {
        return res.status(404).json({
            error: 'No se encontraron libros'
        });
    }

    res.json(resultados);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});