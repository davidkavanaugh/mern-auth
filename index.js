const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// Constants
const PORT = 8000;
const HOST = "0.0.0.0";

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./server/routes/users.routes"));

require("./server/config/mongoose.config");

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
