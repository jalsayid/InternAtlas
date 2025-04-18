import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApplicantCard from "../components/ApplicantCard.js";
import Header from "../components/Header.js";
import StudentNavBar from '../StudentNavBar'; 

export default function TrackApplications() {
  const title = "Track Applications";

  const application1 = {
    imgSrc: "/imgs/openai.png",
    title: "OpenAI Internship - Summer 2025",
    content: (
      <>
        <p><strong>Location:</strong> San Francisco, CA (Hybrid)</p>
        <p><strong>Application Status:</strong> <span className="pending-badge">pending</span></p>
        <p><strong>Application Date:</strong> April 1, 2025</p>
        <p><strong>Description:</strong> Work alongside OpenAI researchers on deep learning models. Python & ML skills needed.</p>
        <p><strong>Requirements:</strong> CS degree, PyTorch/TensorFlow, neural nets, research preferred</p>
      </>
    ),
    link: "/application-details/2",
  };

  const application2 = {
    imgSrc: "/imgs/pif.png",
    title: "PIF Tech Internship - 2025 Cohort",
    content: (
      <>
        <p><strong>Location:</strong> Riyadh, Saudi Arabia (On-site)</p>
        <p><strong>Application Status:</strong> <span className="reject-badge">rejected</span></p>
        <p><strong>Application Date:</strong> April 3, 2025</p>
        <p><strong>Description:</strong> Join PIF’s digital team, develop software, and analyze data for national goals.</p>
        <p><strong>Requirements:</strong> Saudi national, SE/IT student, backend knowledge, GPA ≥ 3.5</p>
      </>
    ),
    link: "/application-details/3",
  };

  const application3 = {
    imgSrc: "/imgs/sdaia.jpg",
    title: "SDAIA Data Science Internship - 2025",
    content: (
      <>
        <p><strong>Location:</strong> Remote or Riyadh</p>
        <p><strong>Application Status:</strong> <span className="accept-badge">accepted</span></p>
        <p><strong>Application Date:</strong> March 20, 2025</p>
        <p><strong>Description:</strong> Work on AI projects with SDAIA. Focus on predictive modeling & ethical AI.</p>
        <p><strong>Requirements:</strong> Python, Pandas/Numpy, ML basics, interest in ethical AI</p>
      </>
    ),
    link: "/application-details/1",
  };

  return (
    <>
      <StudentNavBar />
      <Container className="pt-5" style={{ paddingTop: "100px" }}>
        <Row className="justify-content-center">
          <Col>
            <Header title={title} />
            <ApplicantCard {...application3} />
            <ApplicantCard {...application1} />
            <ApplicantCard {...application2} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
