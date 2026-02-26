const express = require("express");
const routes = require("./routers/index");
const app = express();
const port = 3000;
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "health-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(routes);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
