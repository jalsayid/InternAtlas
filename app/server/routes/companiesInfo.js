const express = require("express");
const router = express.Router();
const client = require("../config/db");

// GET all companies data
router.get("/", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("App")
      .collection("CompanyData")
      .find({registrationStatus: "accepted"})
      .toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching company data");
  } finally {
    await client.close();
  }
});

// GET pending companies
router.get("/pending", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("App")
      .collection("CompanyData")
      .find({ registrationStatus: "pending" })
      .toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching pending companies");
  } finally {
    await client.close();
  }
});

// GET company by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await client.connect();
    const company = await client
      .db("App")
      .collection("CompanyData")
      .findOne({ _id: id });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (err) {
    console.error("Error fetching company:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});

// DELETE company profile by name
router.delete("/:companyName", async (req, res) => {
  const name = req.params.companyName;
  console.log(name);
  try {
    await client.connect();
    const db = client.db("App");

    const companyCollection = db.collection("CompanyData");
    const internshipCollection = db.collection("InternshipOpportunitiesData");
    const applicationCollection = db.collection("ApplicationData");
    const reviewCollection = db.collection("Review");

    // Step 1: Delete the company profile
    const companyResult = await companyCollection.deleteOne({
      companyName: name,
    });

    if (companyResult.deletedCount === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Step 2: Find all internships by this company
    const internships = await internshipCollection
      .find({ company: name })
      .toArray();
    const internshipIds = internships.map((post) => post._id);

    // Step 3: Delete all internships
    await internshipCollection.deleteMany({ company: name });

    // Step 4: Delete all related applications
    await applicationCollection.deleteMany({
      internshipId: { $in: internshipIds },
    });

    // Step 5: Delete all comments related to the company
    await reviewCollection.deleteMany({ company: name });

    res
      .status(200)
      .json({ message: "Company and related data deleted successfully" });
  } catch (err) {
    console.error("Error deleting company:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});

// Update company status
router.put("/:companyName/status", async (req, res) => {
  const { companyName } = req.params;
  const { status } = req.body;

  try {
    await client.connect();
    const result = await client
      .db("App")
      .collection("CompanyData")
      .updateOne(
        { companyName: companyName },
        { $set: { registrationStatus: status } }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company status updated successfully" });
  } catch (err) {
    console.error("Error updating company status:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
});

module.exports = router;
