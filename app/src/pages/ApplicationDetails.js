import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DetailsSt from "../components/DetailsSt";
import StudentNavBar from "../StudentNavBar";

function ApplicationDetailWrapper() {
  const { id } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}/api/applications/${id}`
        );
        if (!response.ok) {
          throw new Error("Application not found");
        }
        const data = await response.json();
        setApplicationData(data.application);
        setQuestions(data.questions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [id]);

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

  if (error) {
    return (
      <>
        <StudentNavBar />
        <div className="text-center text-danger mt-5">Error: {error}</div>
      </>
    );
  }

  if (!applicationData) {
    return (
      <>
        <StudentNavBar />
        <div className="text-center mt-5">No application found</div>
      </>
    );
  }

  return (
    <>
      <DetailsSt
        name={applicationData.contactInformation.fullName}
        email={applicationData.contactInformation.email}
        cv_path={applicationData.contactInformation.resume}
        phone={applicationData.contactInformation.phone}
        linkedin={applicationData.contactInformation.linkedin}
        location={applicationData.contactInformation.location}
        gpa={applicationData.contactInformation.gpa}
        university={applicationData.contactInformation.university}
        major={applicationData.contactInformation.major}
        generalInfo={applicationData.generalInformation}
        questions={questions}
      />
    </>
  );
}

export default function ApplicationDetails() {
  return (
    <Routes>
      <Route path="/:id" element={<ApplicationDetailWrapper />} />
    </Routes>
  );
}
