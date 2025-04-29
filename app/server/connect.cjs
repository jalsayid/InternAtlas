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
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
require('dotenv').config({ path: './config.env' });
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend to call the backend
const PORT = 3001;

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// this route is used to fetch Opportunities data
app.get('/api/internships', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('InternshipOpportunitiesData');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching internship opportunities');
  } finally {
    await client.close();
  }
});

//the route is used to fetch inappropriate comments
app.get('/api/inappropriateComments', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('Review');
    const data = await collection.find({"is_inappropriate": true}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching internship opportunities');
  } finally {
    await client.close();
  }
});

// this route is used to delete an opportunity from opportunities data
app.delete('/api/internships/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('InternshipOpportunitiesData');
    const result = await collection.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Application deleted successfully' });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (err) {
    console.error('Error deleting application:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

// this route is used to delete a comment from Review data
app.delete('/api/inappropriateComments/:id', async (req, res) => {
  const id = req.params.id; 
  try {
    await client.connect();
    const db = client.db('App');
    const collection = db.collection('Review');
    
    const result = await collection.deleteOne({ _id: (new ObjectId(id)) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
