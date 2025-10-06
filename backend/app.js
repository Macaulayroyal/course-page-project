const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend origin before defining routes
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api', exampleRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
