// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config({path: './config.env'});
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const uri = process.env.DB_URI;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     const collections = await client.db("App").collections();
//     collections.forEach((collection) => console.log(collection.collectionName));
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

//danah code:
// server.js (or app.js)
// const express = require('express');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
// require('dotenv').config({ path: './config.env' });
// const cors = require('cors');
// const bcrypt = require('bcrypt');

// const app = express();
// app.use(express.json());

// app.use(cors()); // Allow frontend to call the backend
// const PORT = 3001;

// const uri = process.env.DB_URI;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// //this route is used to fetch Opportunities data
// app.get('/api/internships', async (req, res) => {
//   try {
//     await client.connect();
//     const db = client.db('App');
//     const collection = db.collection('InternshipOpportunitiesData');
//     const data = await collection.find({}).toArray();
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching internship opportunities');
//   } finally {
//     await client.close();
//   }
// });

// //the route is used to fetch inappropriate comments
// app.get('/api/inappropriateComments', async (req, res) => {
//   try {
//     await client.connect();
//     const db = client.db('App');
//     const collection = db.collection('Review');
//     const data = await collection.find({"is_inappropriate": true}).toArray();
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching internship opportunities');
//   } finally {
//     await client.close();
//   }
// });

// // this route is used to delete an opportunity from opportunities data
// app.delete('/api/internships/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   try {
//     await client.connect();
//     const db = client.db('App');
//     const collection = db.collection('InternshipOpportunitiesData');
//     const result = await collection.deleteOne({ _id: id });

//     if (result.deletedCount === 1) {
//       res.status(200).json({ message: 'Application deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Application not found' });
//     }
//   } catch (err) {
//     console.error('Error deleting application:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   } finally {
//     await client.close();
//   }
// });

// // this route is used to delete a comment from Review data
// app.delete('/api/inappropriateComments/:id', async (req, res) => {
//   const id = req.params.id; 
//   try {
//     await client.connect();
//     const db = client.db('App');
//     const collection = db.collection('Review');
    
//     const result = await collection.deleteOne({ _id: (new ObjectId(id)) });

//     if (result.deletedCount === 1) {
//       res.status(200).json({ message: 'Comment deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Comment not found' });
//     }
//   } catch (err) {
//     console.error('Error deleting comment:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   } finally {
//     await client.close();
//   }
// });


// //register as a student and company :aisha
// app.post('/api/register', async (req, res) => {
//   const {
//     userType,
//     fullName,
//     username,
//     email,
//     password,
//     confirmPassword,
//     university,
//     major,
//     location,
//     companyName,
//     sector,
//     verificationFile,
//   } = req.body;

//   // Validation
//   if (!username || !email || !password || !confirmPassword) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     await client.connect();
//     const db = client.db('App');
//     const sessionCollection = db.collection('SessionData'); 
//     const studentCollection = db.collection('StudentData'); 
//     const companyCollection = db.collection('CompanyData'); 

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (userType === 'student') {

//       // Check if the student already exists
//       const existingStudent = await studentCollection.findOne({ username });
//       if (existingStudent) {
//         return res.status(400).json({ message: 'Student already exists' });
//       }

//       // Insert the student into the StudentData collection
//       await studentCollection.insertOne({
//         fullName,
//         username,
//         email,
//         password: hashedPassword,
//         university,
//         major,
//         location,
//       });

//       // Insert student credentials into SessionData for login
//       await sessionCollection.insertOne({
//         userType: 'student',
//         username,
//         password: hashedPassword, 
//       }); 
//       res.status(200).json({ message: 'Student registered successfully!' });

//     } else if (userType === 'company') {

//       // Check if the company already exists
//       const existingCompany = await companyCollection.findOne({ username });
//       if (existingCompany) {
//         return res.status(400).json({ message: 'Company already exists' });
//       }

//       // Insert the company into the CompanyData collection with status 'pending'
//       await companyCollection.insertOne({
//         companyName,
//         sector,
//         username,
//         email,
//         password: hashedPassword,
//         verificationFile,
//         description: '',
//         logo: '',
//         registrationStatus: 'pending', // New companies are in 'pending' state
//       });

//       res.status(200).json({ message: 'Company registered successfully! Awaiting approval.' });

//     } else {
//       return res.status(400).json({ message: 'Invalid user type' });
//     }

//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   } finally {
//     await client.close(); // Ensure the database connection is closed
//   }
// });
// //login:aisha
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
 
//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }
 
//   try {
//     await client.connect();
//     const db = client.db('App');
//     const sessionCollection = db.collection('SessionData'); // The collection where login credentials are stored
 
//     // Find the user in SessionData collection
//     const user = await sessionCollection.findOne({ username });
 
//     if (user) {
//       // Compare the provided password with the stored hashed password
//       const isMatch = await bcrypt.compare(password, user.password); // Compare the hashed password in DB
 
//       if (isMatch) {
//         // Login successful
//         res.status(200).json({ message: 'Login successful', userType: user.userType });
//       } else {
//         // Incorrect password
//         res.status(401).json({ message: 'Invalid username or password' });
//       }
//     } else {
//       // User not found
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   } finally {
//     await client.close();
//   }
// });
// // post internship : aisha
// app.post('/api/internships', async (req, res) => {
//   try {
//     await client.connect();
//     const db = client.db('App');
//     const collection = db.collection('InternshipOpportunitiesData');
 
//     const newInternship = req.body; // Get the data sent from the frontend
//     const result = await collection.insertOne(newInternship); // Insert the data into MongoDB
 
//     res.status(201).json({
//       message: 'Internship Opportunity posted successfully!',
//       internshipId: result.insertedId,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error posting internship opportunity');
//   } finally {
//     await client.close();
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



//Main server entry point
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
