import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApplicantCard from "../components/ApplicantCard.js";
import Header from "../components/Header.js";
import StudentNavBar from "../StudentNavBar";
import Alert from "react-bootstrap/Alert";

export default function TrackApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const studentName = sessionStorage.getItem("fullName");
        const studentEmail = sessionStorage.getItem("email");

        if (!studentName || !studentEmail) {
          throw new Error(
            "Student information not found. Please log in again."
          );
        }

        const response = await fetch(
          `http://localhost:3001/api/applications/student/${studentName}?email=${encodeURIComponent(
            studentEmail
          )}`
        );
        console.log("Applications API response:", response);

        const response2 = await fetch(
          "http://localhost:3001/api/companiesdata"
        );
        console.log("Companies API response:", response2);

        if (!response.ok || !response2.ok) {
          const errorText = await response.text();
          throw new Error(
            errorText || "Failed to fetch applications or companies"
          );
        }

        const data = await response.json();
        console.log("Applications data:", data);

        const data2 = await response2.json();
        console.log("Companies data:", data2);

        setApplications(data);
        setCompanies(data2);
        setLoading(false);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching your applications."
        );
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getCompanyLogo = (companyName) => {
    const company = companies.find((c) => c.companyName === companyName);
    return company?.logo || "/imgs/default-company-logo.png";
  };

  if (loading) {
    return (
      <>
        <StudentNavBar />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  console.log("Error state:", error);
  console.log("Applications state:", applications);

  return (
    <>
      <StudentNavBar />
      <Container className="pt-5" style={{ paddingTop: "100px" }}>
        <Row className="justify-content-center">
          <Col>
            <Header title="Track Applications" />
            {applications.map((application) => (
              <ApplicantCard
                key={application._id}
                imgSrc={getCompanyLogo(application.internshipDetails?.company)}
                imgAlt={`${
                  application.internshipDetails?.company || "Company"
                } Logo`}
                title={
                  application.internshipDetails?.title || "Unknown Position"
                }
                content={
                  <>
                    <p>
                      <strong>Company:</strong>{" "}
                      {application.internshipDetails?.company || "N/A"}
                    </p>
                    <p>
                      <strong>Location:</strong>{" "}
                      {application.internshipDetails?.location || "N/A"}
                    </p>
                    <p>
                      <strong>Application Status:</strong>{" "}
                      <span className={`${application.status}-badge`}>
                        {application.status}
                      </span>
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {application.internshipDetails?.description ||
                        "No description available"}
                    </p>
                    <p>
                      <strong>Requirements:</strong>{" "}
                      {application.internshipDetails?.qualifications ||
                        "No requirements listed"}
                    </p>
                  </>
                }
                link={`/application-details/${application._id}`}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
