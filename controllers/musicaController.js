const Musica = require('../models/musica');

// Obtener todos los musicas
exports.getMusicas = (req, res) => {
  Musica.find()
    .then((musicas) => {
      res.json(musicas);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Obtener un musica por su ID
exports.getMusicaById = (req, res) => {
  Musica.findById(req.params.id)
    .then((musica) => {
      if (!musica) {
        return res.status(404).json({ message: 'musica no encontrado' });
      }
      res.json(musica);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Crear un nuevo musica
exports.createMusica = (req, res) => {
  const newMusica = new Musica({
    name: req.body.name,
    description: req.body.description,
    valoracion: req.body.valoracion,
    genero: req.body.genero,
  });
  newMusica.save()
    .then((musica) => {
      res.status(201).json(musica);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Actualizar un musica existente
exports.updateMusica = (req, res) => {
  Musica.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((musica) => {
      if (!musica) {
        return res.status(404).json({ message: 'musica no encontrado' });
      }
      res.json(musica);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Eliminar un musica existente
exports.deleteMusica = (req, res) => {
  Musica.findByIdAndDelete(req.params.id)
    .then((musica) => {
      if (!musica) {
        return res.status(404).json({ message: 'musica no encontrado' });
      }
      res.json({ message: 'musica eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
