const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define Routes
app.use("/", require("./router/index"));
app.use("/api/url", require("./router/api"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const port = 4000;

app.listen(port, () => console.log(`server running on port: ${port}`));
