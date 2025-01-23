const axios = require('axios')
const express = require("express")
const server = express()
const getApiEndpoint = "http://localhost:8081"

// get all clients
const getClients = async () => {
  const res = await axios
    .get(`${getApiEndpoint}/clients`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.res
    })
  return res
}

// find client by ID
const getClient = async (id) => {
      const res = await axios
        .get(`${getApiEndpoint}/clients/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.res
        })
    return res
}

// add a new Client
const postClient = async (body) => {
      const res = await axios
      .post(`${getApiEndpoint}/clients`, body, {'Content-Type': 'application/json;charset=utf-8'})
      .then((res) => {
          return res
        })
        .catch((err) => {
          return err.res
        })
    return res
}


module.exports = {
  server,
  getClients,
  postClient,
  getClient,
};