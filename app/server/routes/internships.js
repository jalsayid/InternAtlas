const express = require('express');
const router = express.Router();
const client = require('../config/db');

// GET all internships
// this route is used to fetch Opportunities data with logos from CompanyData (serachOpportunities) -Rawan
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('App');

    const internships = await db.collection('InternshipOpportunitiesData').find({}).toArray();
    const companies = await db.collection('CompanyData').find({}).toArray();

    // map: companyName (lowercased) → logo to get both -Rawan
    const logoMap = {};
    companies.forEach(c => {
      if (c.companyName && c.logo) {
        logoMap[c.companyName.toLowerCase()] = c.logo;
      }
    });

    // add logo to each internship by matching "company" field -Rawan
    const internshipsWithLogos = internships.map(internship => {
      const logo = logoMap[internship.company?.toLowerCase()] || '';
      return { ...internship, logo };
    });

    res.json(internshipsWithLogos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching internship opportunities');
  } finally {
    await client.close();
  }
});

// Get internship by ID (opportunity details) -Rawan
router.get('/id/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await client.connect();
    const internship = await client
      .db('App')
      .collection('InternshipOpportunitiesData')
      .findOne({ _id: id });

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching internship by ID');
  } finally {
    await client.close();
  }
});



//Get a internship posts for a given compant. return a list of all company posts
router.get('/:companyName', async (req, res) => {
  const companyName = req.params.companyName;
  try {
    await client.connect();
    const data = await client.db('App').collection('InternshipOpportunitiesData').find({company: companyName }).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching internship opportunities for ${companyName}`);
  } finally {
    await client.close();
  }
}); 

//get an internship posts for a given company using userName, return a list of all posts
router.get('/company/:username', async (req, res) => {
  const user = req.params.username;

  try {
    await client.connect();
    const db = client.db('App');

    // Step 1: Get companyName using the username
    const companyDoc = await db.collection('CompanyData').findOne({ username : user });

    if (!companyDoc) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const companyName = companyDoc.companyName;

    // Step 2: Find internships where "company" matches the company name
    const internships = await db
      .collection('InternshipOpportunitiesData')
      .find({ company: companyName })
      .toArray();

    res.status(200).json(internships);

  } catch (err) {
    console.error('Error fetching internships for company:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});


// POST new internship
router.post('/', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db('App').collection('InternshipOpportunitiesData').insertOne(req.body);
    res.status(201).json({ message: 'Posted!', internshipId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error posting internship');
  } finally {
    await client.close();
  }
});

// DELETE internship by ID and delete all submitted applications
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await client.connect();
    const db = client.db('App');

    const internshipCollection = db.collection('InternshipOpportunitiesData');
    const applicationCollection = db.collection('ApplicationData');

    // Delete the internship post
    const internshipResult = await internshipCollection.deleteOne({ _id: id });

    if (internshipResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Delete all applications related to the internship
    const appResult = await applicationCollection.deleteMany({ internshipId: id });
   

    res.status(200).json({
      message: 'Internship and related applications deleted successfully',
      applicationsDeleted: appResult.deletedCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Delete error');
  } finally {
    await client.close();
  }
});
// DELETE company profile by name
router.delete('/:companyName', async (req, res) => {
  const name = req.params.companyName;
  console.log(name);
  try {
    await client.connect();
    const db = client.db('App');

    const companyCollection = db.collection('CompanyData');
    const internshipCollection = db.collection('InternshipOpportunitiesData');
    const applicationCollection = db.collection('ApplicationData');
    const reviewCollection = db.collection('Review');

    // Step 1: Delete the company profile
    const companyResult = await companyCollection.deleteOne({ companyName : name });

    if (companyResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Step 2: Find all internships by this company
    const internships = await internshipCollection.find({ company: name }).toArray();
    const internshipIds = internships.map(post => post._id);

    // Step 3: Delete all internships
    await internshipCollection.deleteMany({ company: name });

    // Step 4: Delete all related applications
    await applicationCollection.deleteMany({
      internshipId: { $in: internshipIds }
    });

    // Step 5: Delete all comments related to the company
    await reviewCollection.deleteMany({ company: name });

    res.status(200).json({ message: 'Company and related data deleted successfully' });

  } catch (err) {
    console.error('Error deleting company:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

//aisha:edit company internship
router.put('/id/:id', async (req, res) => {
  const { id } = req.params;  // Get the internship ID from URL (which is an integer)
  const { title, description, location, qualifications, responsibilities } = req.body;

  try {
      await client.connect();
      const db = client.db('App');
      
      // Find and update the internship data using the integer ID
      const result = await db.collection('InternshipOpportunitiesData').updateOne(
          { _id: parseInt(id) },  // Use the integer id for querying
          {
              $set: {
                  title,
                  description,
                  location,
                  qualifications,
                  responsibilities,
              },
          }
      );

      if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Internship updated successfully' });
      } else {
          res.status(400).json({ message: 'Failed to update internship' });
      }
  } catch (err) {
      console.error('Error updating internship:', err);
      res.status(500).send('Internal server error');
  } finally {
      await client.close();
  }
});





module.exports = router;
