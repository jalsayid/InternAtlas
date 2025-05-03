import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApplicantCard from "../components/ApplicantCard.js";
import CompanyNavBar from "../CompanyNavBar";
import Header from "../components/Header.js";
export default function ViewApplications() {
  const { internshipId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}/api/applications/internship/${internshipId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setApplications(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (internshipId) {
      fetchApplications();
    }
  }, [internshipId]);

  if (!internshipId) return <div>No internship ID provided</div>;
  if (loading) {
    return (
      <>
        <CompanyNavBar />
        <Container>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <CompanyNavBar />
      <Container>
        <Row className="justify-content-center mt-4">
          <Col>
            <Header title="Job Applicants" />
            {applications.map((application) => (
              <ApplicantCard
                key={application._id}
                imgSrc={`/imgs/applicant${application.studentId}.png`}
                title={application.contactInformation.fullName}
                content={
                  <>
                    <p>
                      <strong>Field:</strong>{" "}
                      {application.contactInformation.major}
                    </p>
                    <p>
                      <strong>University:</strong>{" "}
                      {application.contactInformation.university}
                    </p>
                    <p>
                      <strong>Summary:</strong>{" "}
                      {application.generalInformation.summary}
                    </p>
                    <p>
                      <strong>Skills:</strong>{" "}
                      {application.generalInformation.skills}
                    </p>
                  </>
                }
                link={`/applicant-details/${application._id}`}
              />
            ))}
            {applications.length === 0 && (
              <p className="text-center">No applications found.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
