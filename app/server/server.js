const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/config.env' });

const internshipRoutes = require('./routes/internships');
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comments');
const companiesInfo = require('./routes/companiesInfo');
const applicationsRoutes = require('./routes/applications');

const app = express();
app.use(express.json());
app.use(cors());// Allow frontend to call the backend

const PORT = 3001;

// Routes
app.use('/api/internships', internshipRoutes);
app.use('/api', authRoutes); // handles /login and /register
app.use('/api/inappropriateComments', commentRoutes);
app.use('/api/companiesdata', companiesInfo);
app.use('/api/applications', applicationsRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
