const { server } = require("./consumer")

server.listen(8080, () => {
  console.log("Client running on http://localhost:8080...")
})