const express = require('express');
const bcrypt = require('bcrypt');
const client = require('../config/db');

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  const {
    userType, fullName, username, email, password, confirmPassword,
    university, major, location,
    companyName, sector, verificationFile,
  } = req.body;

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

    const hashedPassword = await bcrypt.hash(password, 10);

    if (userType === 'student') {
      const existingStudent = await studentCollection.findOne({ username });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student already exists' });
      }

      await studentCollection.insertOne({
        fullName, username, email, password: hashedPassword,
        university, major, location,
      });

      await sessionCollection.insertOne({
        userType: 'student', username, password: hashedPassword,
      });

      res.status(200).json({ message: 'Student registered successfully!' });

    } else if (userType === 'company') {
      const existingCompany = await companyCollection.findOne({ username });
      if (existingCompany) {
        return res.status(400).json({ message: 'Company already exists' });
      }

      await companyCollection.insertOne({
        companyName, sector, username, email,
        password: hashedPassword, verificationFile,
        description: '', logo: '', registrationStatus: 'pending',
      });

      res.status(200).json({ message: 'Company registered successfully! Awaiting approval.' });

    } else {
      res.status(400).json({ message: 'Invalid user type' });
    }

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    await client.connect();
    const db = client.db('App');
    const sessionCollection = db.collection('SessionData');

    const user = await sessionCollection.findOne({ username });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({ message: 'Login successful', userType: user.userType });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

module.exports = router;
