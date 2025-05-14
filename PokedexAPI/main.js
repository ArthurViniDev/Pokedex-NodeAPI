const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.use(express.json());

const MAX_PAGINATION_LIMIT = 5;

app.get("/lista", async (req, res) => {
  let offset = parseInt(req.query.offset) || 0;
  let limit = parseInt(req.query.limit) || 5;

  const results = await prisma.pokemon.findMany({
    skip: offset,
    take: limit,
  });

  res.json({ offset, limit, results });
});


app.post("/create", async (req, res) => {
  const { name } = req.body;
  if(!name){
    return res.status(400).json({
      message: "Pokemon name cannot be empty"
    })
  }
  try {
    const created = await prisma.pokemon.create({
      data: { name }
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(409).json({ message: "Pokemon already exists" });
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
