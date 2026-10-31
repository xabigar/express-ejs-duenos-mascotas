const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let owners = [
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

let pets = [
    { id: 1, name: 'Rex', species: 'dog', ownerId: 1 },
    { id: 2, name: 'Mimi', species: 'cat', ownerId: 2 },
    { id: 3, name: 'Luna', species: 'dog', ownerId: 1 }
];

// Página principal
app.get('/', (req, res) => {
    res.render('index', { owners });
});

// Vista de un dueño con sus mascotas
app.get('/owner/:id', (req, res) => {
    const ownerId = parseInt(req.params.id);
    const owner = owners.find(o => o.id === ownerId);
    const ownerPets = pets.filter(p => p.ownerId === ownerId);
    res.render('owner', { owner, ownerPets });
});

// Agregar una nueva mascota
app.post('/pets', (req, res) => {
    const newPet = {
        id: pets.length + 1,
        name: req.body.name,
        species: req.body.species,
        ownerId: parseInt(req.body.ownerId)
    };
    pets.push(newPet);
    res.redirect(`/owner/${newPet.ownerId}`);
});

app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));