const express = require('express');

const helmet = require("helmet");

const projectsRouter = require("./routers/projectRouter.js");

const actionsRouter = require("./routers/actionRouter.js");

const server = express();

server.use(express.json()); 

server.use(helmet());


server.use("/api/projects", logger, projectsRouter);

server.use("/api/actions", logger, actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge!</h2>`);
});


//custom middleware

function logger(req, res, next) {

  const today = new Date().toISOString(); // YYYY-MM-DD
    console.log(`[${today}] ${req.method} to ${req.originalUrl}`);
  
   next();
}

module.exports = server;
