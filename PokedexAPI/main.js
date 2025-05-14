const express = require("express");
const app = express();
const PORT = 3000;

const pokemons = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander",
  "Charmeleon",
  "Charizard",
  "Squirtle",
  "Wartortle",
  "Blastoise",
  "Caterpie",
  "Metapod",
  "Butterfree",
];

app.use(express.json());

const MAX_PAGINATION_LIMIT = 5;

app.get("/lista", (req, res) => {
  let offset = parseInt(req.query.offset) || 0;
  let limit = parseInt(req.query.limit) || MAX_PAGINATION_LIMIT;
  if (limit > MAX_PAGINATION_LIMIT) {
    limit = MAX_PAGINATION_LIMIT;
  }

  let paginatedList = pokemons.slice(offset, offset + limit);

  res.json({
    offset,
    limit,
    results: paginatedList,
  });
});

app.get("/pokemon/:name", (req, res) => {
  let nameToFind = req.params.name;
  if(pokemons.some(pokemon => pokemon.toLowerCase() === nameToFind.toLowerCase())) {
    res.json({
      name: nameToFind
    })
  }
  else{
    res.status(404).json({
      message: "Pokemon not Found"
    })
  }
})

app.post("/create", (req, res) => {
  const data = req.body;
  const name = req.body?.name.toString();
  if(name) {
    const alreadyExists = pokemons.some(p => p.toLowerCase() === name.toLowerCase());
    if (alreadyExists) {
      return res.status(409).json({ message: "Pokemon already exists" });
    }
    pokemons.push(name);
    res.status(201).json({
      message: `Pokemon ${name} created!`
    })
  }else{
    res.status(400).json({
      message: "Missing pokemon name"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
