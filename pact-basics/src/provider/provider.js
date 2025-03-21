const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Repository = require('./repository');

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

const clientRepository = new Repository();

// Load client data into a repository object
const importData = () => {
  const data = require('../data/clientData.json');

  let id = 1;
  for (const item of data) {
    item.id = id++;
    clientRepository.add(item);
  }
};

// get all clients
server.get('/clients', (req, res) => {
  res.json(clientRepository.fetchAll());
});

// find client by ID
server.get('/clients/:id', (req, res) => {
  const response = clientRepository.getById(req.params.id);
  if (response) {
    res.end(JSON.stringify(response));
  } else {
    res.status(404);
    res.send({ message: 'Client not found!' });
    res.end();
  }
});

// add a new client
server.post('/clients', (req, res) => {
  const client = req.body;

  if (!client || !client.firstName) {
    res.status(400);
    res.send({ message: 'Missing first name!', body: req.body });
    res.end();

    return;
  }

  client.id = clientRepository.fetchAll().length + 1;
  clientRepository.add(client);

  res.json(client);
});

module.exports = {
  server,
  importData,
  clientRepository,
};
