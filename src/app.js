const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
 
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } =  request.body;

  const repo = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  };


  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } =  request.body;
  const { id } = request.params;

  const repoindex = repositories.findIndex( repo => repo.id === id);

  if( repoindex < 0){
    return response.status(400).json({ error: "Repository not Found" })
  }
 

  const repo = {
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: repositories[repoindex].likes,
  }

  repositories[repoindex] = repo;

  return response.json(repo);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoindex = repositories.findIndex( repo => repo.id === id);

  if( repoindex < 0){
    return res.status(400).json({ error: "Repository not Found" })
  }

  repositories.splice(repoindex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoindex = repositories.findIndex( repo => repo.id === id);

  if( repoindex < 0){
    return response.status(400).json({ error: "Repository not Found" })
  }

  repositories[repoindex].likes ++;

  return response.json({ likes: repositories[repoindex].likes});
});

module.exports = app;
