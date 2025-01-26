const express = require('express');
const cors = require('cors');
const calculateEstimate = require('./calculateEstimate');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/calculate', (req, res) => {
  const inputData = req.body;
  const estimate = calculateEstimate(inputData);
  res.json({ estimate });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));