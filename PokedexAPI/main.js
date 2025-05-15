const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.use(express.json());

const MAX_PAGINATION_LIMIT = 5;

app.get("/list", async (req, res) => {
  let offset = parseInt(req.query.offset) || 0;
  let limit = parseInt(req.query.limit) || 5;
  if (limit > MAX_PAGINATION_LIMIT) {
    limit = MAX_PAGINATION_LIMIT;
  }
  const results = await prisma.pokemon.findMany({
    skip: offset,
    take: limit,
  });

  res.json({ offset, limit, results });
});

app.get("/pokemons/:name", async (req, res) => {
  const nameToCheck = req.params.name.toLowerCase();
  const existingPokemon = await prisma.pokemon.findFirst({
    where: {
      name: {
        equals: nameToCheck,
      },
    },
  });

  if (!existingPokemon) {
    return res.status(404).json({ error: "Pokemon does not exist" });
  }
  return res.status(200).json({ pokemon: existingPokemon });
});

app.post("/create", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Pokemon name cannot be empty",
    });
  }
  try {
    const created = await prisma.pokemon.create({
      data: { name: name.toLowerCase() },
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(409).json({ message: "Pokemon already exists" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
