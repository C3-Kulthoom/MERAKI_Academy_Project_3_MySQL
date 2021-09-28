const express = require("express");
const cors = require('cors');
require("./db/db");
require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// import Routers
const articlesRouter = require("./routers/routes/articles");
const usersRouter = require("./routers/routes/users");
const authenticationRouter = require("./routers/routes/authentication");
const rolesRouter = require("./routers/routes/roles");

app.use(express.json());
// Routers
app.use("/articles", articlesRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use(authenticationRouter);
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
