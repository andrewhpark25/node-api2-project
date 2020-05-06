const express = require("express");

const postRouter = require("./router.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({api: 'Up and running!' })
})

server.use("/api/posts", postRouter);

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
