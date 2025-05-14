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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
