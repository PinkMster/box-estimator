const express = require('express');
const cors = require('cors');
const calculateEstimate = require('./calculateEstimate');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/calculate', async (req, res) => {
  try {
    const inputData = req.body;
    console.log("Received inputData in server:", inputData);
    const estimate = await calculateEstimate(inputData);
    res.json({ estimate });
  } catch (error) {
    console.error("Error in /api/calculate:", error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));