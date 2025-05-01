import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Details from "../components/Details";

function ApplicationDetailWrapper() {
  const { id } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/applications/${id}`);
        if (!response.ok) {
          throw new Error('Application not found');
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!applicationData) return <div>No application found</div>;

  return (
    <Details 
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
  );
}

export default function ApplicantDetails() {
  return (
    <Routes>
      <Route path="/:id" element={<ApplicationDetailWrapper />} />
    </Routes>
  );
}
