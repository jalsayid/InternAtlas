const express = require('express');
const bcrypt = require('bcrypt');
const client = require('../config/db');

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  const {
    userType,
    fullName,
    username,
    email,
    password,
    confirmPassword,
    university,
    major,
    location,
    companyName,
    sector,
    verificationFile,
  } = req.body;

  // Validation
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    await client.connect();
    const db = client.db('App');
    const sessionCollection = db.collection('SessionData');
    const studentCollection = db.collection('StudentData');
    const companyCollection = db.collection('CompanyData');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (userType === 'student') {
      const existingStudent = await studentCollection.findOne({ username });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student already exists' });
      }

      // Insert the student into the StudentData collection
      await studentCollection.insertOne({
        fullName,
        username,
        email,
        password: hashedPassword,
        university,
        major,
        location,
      });

      // Insert student credentials into SessionData for login
      await sessionCollection.insertOne({
        userType: 'student',
        username,
        password: hashedPassword,
      });
      res.status(200).json({ message: 'Student registered successfully!' });

    } else if (userType === 'company') {
      const existingCompany = await companyCollection.findOne({ username });
      if (existingCompany) {
        return res.status(400).json({ message: 'Company already exists' });
      }

      // Insert the company into the CompanyData collection with status 'pending'
      await companyCollection.insertOne({
        companyName,
        sector,
        username,
        email,
        password: hashedPassword,
        verificationFile,
        description: '',
        logo: '',
        registrationStatus: 'pending', // New companies are in 'pending' state
      });

      res.status(200).json({ message: 'Company registered successfully! Awaiting approval.' });

    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close(); // Ensure the database connection is closed
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db('App');
    const sessionCollection = db.collection('SessionData'); // The collection where login credentials are stored

    // Find the user by username in SessionData
    const user = await sessionCollection.findOne({ username });

    console.log(user)

    if (user) {

      let isMatch = false;

      const isHashedPassword = user.password.startsWith("$2b$"); // This checks if the password starts with bcrypt's hashed prefix
      console.log("its " + isHashedPassword + " " + user.password);

      if (isHashedPassword) {
        isMatch = await bcrypt.compare(password, user.password);
      } else {
        isMatch = password === user.password;
      }

      console.log(isMatch)

      if (isMatch) {
        // Login successful
        res.status(200).json({ message: 'Login successful', userType: user.userType });
      } else {
        // Incorrect password
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close(); // Ensure the database connection is closed
  }
});

module.exports = router;
