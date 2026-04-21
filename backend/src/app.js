const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const UserModel = require('./models/userModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Service is running' });
});

if (process.env.NODE_ENV !== 'test') {
  UserModel.createTable().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  }).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
}

module.exports = app;