const express = require('express');
const connectDB = require('./config/db');
const productRoute = require('./routes/productRoute');
const cors = require("cors");

const app = express();

const port = 8000

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/api",productRoute);

// Database Connection
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})