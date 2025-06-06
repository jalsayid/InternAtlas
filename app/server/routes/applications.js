const express = require("express");
const router = express.Router();
const client = require("../config/db");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Ensure 'uploads' folder exists, create it if it doesn't
const uploadFolderPath = path.resolve(__dirname, 'uploads');

// Multer file storage configuration for handling the resume (CV)
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
}).single('resume'); // This will allow only one file to be uploaded as the resume


// GET route to fetch applications for a specific student with internship details
router.get("/student/:studentName", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("App");
    const applicationCollection = db.collection("ApplicationData");
    const internshipCollection = db.collection("InternshipOpportunitiesData");

    // Get student information from the request query
    const studentName = req.params.studentName;
    const studentEmail = req.query.email;

    if (!studentEmail) {
      return res.status(400).json({ message: "Student email is required" });
    }

    // Find all applications that match the student's fullName and email
    const applications = await applicationCollection
      .find({
        "contactInformation.fullName": studentName,
        "contactInformation.email": studentEmail,
      })
      .toArray();

    // Get internship details for each application
    const applicationsWithDetails = await Promise.all(
      applications.map(async (application) => {
        const internship = await internshipCollection.findOne({
          _id: application.internshipId,
        });

        return {
          ...application,
          internshipDetails: internship,
        };
      })
    );

    res.json(applicationsWithDetails);
  } catch (err) {
    console.error("Error fetching student applications:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  } finally {
    await client.close();
  }
});

// GET route to fetch applications by internship ID
router.get("/internship/:internshipId", async (req, res) => {
  const internshipId = parseInt(req.params.internshipId);
  try {
    await client.connect();
    const db = client.db("App");
    const applicationCollection = db.collection("ApplicationData");

    const applications = await applicationCollection
      .find({ internshipId: internshipId })
      .toArray();
    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  } finally {
    await client.close();
  }
});

// GET route to fetch a specific application by ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await client.connect();
    const db = client.db("App");
    const applicationCollection = db.collection("ApplicationData");
    const questionsCollection = db.collection("Questions");

    // Fetch application data
    const application = await applicationCollection.findOne({ _id: id });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const questions = await questionsCollection.findOne({});
    if (!questions) {
      return res.status(404).json({ message: "Questions not found" });
    }

    const response = {
      application,
      questions,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching application:", err);
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  } finally {
    await client.close();
  }
});

// POST route to save student application
router.post("/", async (req, res) => {
    upload(req, res, async (err) => {

        if (err) {
            console.log("Multer error:", err);  // Log any errors from multer
            return res.status(400).json({ message: err.message || err });
        }

        console.log("Files uploaded:", req.file);  // Log uploaded files

        const { contactInformation, generalInformation, internshipId, studentId } =
            req.body;

            const resumePath = req.file ? req.file.path : null;

            console.log("the resume file: "+ resumePath)

            if (contactInformation && resumePath) {
                contactInformation.resume = resumePath;  // Add resume file path to contactInformation
                console.log("inside if")
            }

        try {
            await client.connect();
            const db = client.db("App");
            const applicationCollection = db.collection("ApplicationData");

            const newApplication = {
                studentId: new ObjectId(studentId),
                internshipId: parseInt(internshipId),
                contactInformation: contactInformation,  // Direct object, no stringifying
                generalInformation: generalInformation,  // Direct object, no stringifying
                status: "pending",
                submittedAt: new Date(),
            };

            const result = await applicationCollection.insertOne(newApplication);
            res.status(201).json({
                message: 'Application submitted successfully!',
                applicationId: result.insertedId
            });
        } catch (err) {
            console.error('Error submitting application:', err);
            res.status(500).send('Internal server error');
        } finally {
            await client.close();
        }

    });

    // const { contactInformation, generalInformation, internshipId, studentId } =
    //     req.body;

    // try {
    //     await client.connect();
    //     const db = client.db("App");
    //     const applicationCollection = db.collection("ApplicationData");

    //     const newApplication = {
    //         studentId: new ObjectId(studentId),
    //         internshipId: parseInt(internshipId),
    //         contactInformation,
    //         generalInformation,
    //         status: "pending",
    //         submittedAt: new Date(),
    //     };

    //     const result = await applicationCollection.insertOne(newApplication);
    //     res.status(201).json({
    //         message: 'Application submitted successfully!',
    //         applicationId: result.insertedId
    //     });
    // } catch (err) {
    //     console.error('Error submitting application:', err);
    //     res.status(500).send('Internal server error');
    // } finally {
    //     await client.close();
    // }
});


//aisha
router.get("/:username", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const student = await db
      .collection("StudentData")
      .findOne({ username: req.params.username });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      student,
    });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
