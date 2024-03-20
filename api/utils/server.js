const express = require('express');
const app = express();
const PORT = 8800;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to log item_id
app.get('/api/hotels', (req, res) => {
  // Log the item_id
  console.log('Received request with item_id:', req.query.item_id);

  // Send a response
  res.send('Logging item_id');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});