# 📦 Pokedex API
Uma API RESTful simples construída com Node.js, Express e Prisma ORM, utilizando SQLite como banco de dados.
O projeto simula uma Pokédex, permitindo cadastrar, listar e consultar pokémons de forma eficiente, com suporte a paginação e busca por nome.

# ✨ Funcionalidades
=> Buscar Pokémon por nome (case-insensitive)

=> Listar todos os pokémons com paginação (offset e limit)

=> Adicionar novos pokémons ao banco de dados

=> Validação de dados e tratamento de erros HTTP (404, 400, 409)

=> Tecnologias usadas:
Node.js, Express, Prisma ORM, SQLite
```
| Método | Rota            | Descrição                    |
| ------ | --------------- | ---------------------------- |
| GET    | /list           | Lista pokémons com paginação |
| GET    | /pokemons/:name | Retorna um pokémon pelo nome |
| POST   | /create         | Cria um novo pokémon         |
```
