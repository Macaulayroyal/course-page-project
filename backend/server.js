const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend origin
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

// Routes defined in exampleRoutes.js
const exampleRoutes = express.Router();

exampleRoutes.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API route!' });
});

// Mount exampleRoutes on '/api'
app.use('/api', exampleRoutes);

// Root route for sanity check
app.get('/', (req, res) => {
  res.send('Backend is running on port 3001');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
