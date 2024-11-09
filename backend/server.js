
// backend/server.js

const express = require('express');
const cors = require('cors');



const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors()); // Enable CORS for all routes


app.use(bodyParser.json());
app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});