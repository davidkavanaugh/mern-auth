const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authenticate } = require("./server/config/jwt.config");

// Constants
const PORT = 8000;
const HOST = "0.0.0.0";

app.use(cors({ credentials: true, origin: "http://0.0.0.0:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./server/routes/auth.routes"));
app.use("/api/users", authenticate, require("./server/routes/users.routes"));

require("./server/config/mongoose.config");

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
