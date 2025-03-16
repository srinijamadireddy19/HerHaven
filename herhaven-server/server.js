const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const cors = require("cors");
server.use(cors());
server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log("Server is Running at http://localhost:3000");
});