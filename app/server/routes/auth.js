const express = require('express');
const bcrypt = require('bcrypt');
const client = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const router = express.Router();

// Ensure 'uploads' folder exists, create it if it doesn't
const uploadFolderPath = path.resolve(__dirname, 'uploads');

// Multer file storage configuration
const storage = multer.diskStorage({
  destination: uploadFolderPath,  // Path to save uploaded files
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Name the file based on current timestamp
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|pdf/; // Allow specific file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only images and PDFs are allowed!');
    }
  },
}).fields([
  { name: 'companyLogo', maxCount: 1 }, // Make sure this name matches the field name in FormData
  { name: 'companyVerification', maxCount: 1 }  // Same for this
]);

// POST /register route to handle registration
router.post('/register', (req, res) => {
  console.log("Request started");

  // Use multer to parse form data and files
  upload(req, res, async (err) => {
    if (err) {
      console.log("Multer error:", err);  // Log any errors from multer
      return res.status(400).json({ message: err.message || err });
    }

    console.log("Files uploaded:", req.files);  // Log uploaded files
    console.log('Destination folder:', uploadFolderPath);  // Log the folder path


    // Destructure the values from req.body
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
      companySector,
      companyUsername,
      companyEmail,
      companyPassword,
      companyConfirmPassword,
      companyDescription,
      registrationStatus,
    } = req.body;


    // If no files are uploaded
    const verificationFilePath = req.files && req.files.companyVerification ? req.files.companyVerification[0].path : null;
    const logoFilePath = req.files && req.files.companyLogo ? req.files.companyLogo[0].path : null;

    try {
      await client.connect();
      const db = client.db('App');
      const sessionCollection = db.collection('SessionData');
      const studentCollection = db.collection('StudentData');
      const companyCollection = db.collection('CompanyData');

      if (userType === 'student') {

        if (!username || !email || !password || !confirmPassword) {
          console.log("Missing fields:", { username, email, password, confirmPassword });
          return res.status(400).json({ message: 'All fields are required' });
        }

        const existingStudent = await studentCollection.findOne({ username });
        if (existingStudent) {
          return res.status(400).json({ message: 'Student already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

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
        // Handle company registration
        if (!companyUsername || !companyEmail || !companyPassword || !companyConfirmPassword) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        if (companyPassword !== companyConfirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingCompany = await companyCollection.findOne({ companyUsername });
        if (existingCompany) {
          return res.status(400).json({ message: 'Company already exists' });
        }

        const hashedPassword = await bcrypt.hash(companyPassword, 10);

        await companyCollection.insertOne({
          companyName,
          companySector,
          companyUsername,
          companyEmail,
          companyPassword: hashedPassword,
          companyDescription,
          verificationFilePath,
          logoFilePath,
          registrationStatus: 'pending', // New companies are in 'pending' state
        });

        return res.status(200).json({
          message: 'Company registered successfully! Awaiting approval.',
        });
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
});


// POST /api/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("App");
    const sessionCollection = db.collection("SessionData");
    const studentCollection = db.collection("StudentData");

    // Find the user by username in SessionData
    const user = await sessionCollection.findOne({ username });

    if (user) {
      let isMatch = false;

      const isHashedPassword = user.password.startsWith("$2b$");
      if (isHashedPassword) {
        isMatch = await bcrypt.compare(password, user.password);
      } else {
        isMatch = password === user.password;
      }

      if (isMatch) {
        // If user is a student, get their full information
        if (user.userType === "student") {
          const studentInfo = await studentCollection.findOne({ username });
          if (studentInfo) {
            res.status(200).json({
              message: "Login successful",
              userType: user.userType,
              userId: user._id.toString(),
              username: user.username,
              fullName: studentInfo.fullName,
              email: studentInfo.email,
            });
          } else {
            res.status(500).json({ message: "Student information not found" });
          }
        } else {
          // For non-student users, return basic info
          res.status(200).json({
            message: "Login successful",
            userType: user.userType,
            userId: user._id.toString(),
            username: user.username,
          });
        }      } else {
        // Incorrect password
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});

module.exports = router;
