require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/db');
const users = require('./routes/users');

connectDB();
app.use(express.json());
app.use('/api/users', users);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
