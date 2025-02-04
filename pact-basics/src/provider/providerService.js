const { server, importData } = require("./provider")
importData()

server.listen(8081, () => {
  console.log("Provider running on http://localhost:8081...")
})