const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8084;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, )
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/welcome.html');
});
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/emp', require('./routes/employee'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
