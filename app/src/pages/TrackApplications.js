import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApplicantCard from "../components/ApplicantCard.js";
import Header from "../components/Header.js";
import Navbar from "../components/Navbar.js";
export default function TrackApplications(params) {
  const title = "Track Applications";
  const application1 = {
    imgSrc: "/openai.png",
    title: "OpenAI Internship - Summer 2025",
    content: (
      <>
        <p>
          <strong>location:</strong> San Francisco, CA (Hybrid)
        </p>
        <p>
          <strong>applicationStatus:</strong>{" "}
          <span className="pending-badge">pending</span>
        </p>
        <p>
          <strong>applicationDate:</strong> April 1, 2025
        </p>
        <p>
          <strong>description:</strong> Work alongside OpenAI researchers to
          explore deep learning models and real-world AI applications. Must have
          a strong foundation in Python and ML concepts.
        </p>
        <p>
          <strong>requirements:</strong> Currently pursuing a degree in CS or
          related field, Experience with PyTorch or TensorFlow, Solid
          understanding of neural networks, Published research is a plus
        </p>
      </>
    ),
    link: "/application-details/2",
  };
  const application2 = {
    imgSrc: "/pif.png",
    title: "PIF Tech Internship - 2025 Cohort",
    content: (
      <>
        <p>
          <strong>location:</strong> Riyadh, Saudi Arabia (On-site)
        </p>
        <p>
          <strong>applicationStatus:</strong>{" "}
          <span className="reject-badge">rejected</span>
        </p>
        <p>
          <strong>applicationDate:</strong> April 3, 2025
        </p>
        <p>
          <strong>description:</strong> Join the digital transformation team at
          the Public Investment Fund. Interns will contribute to software
          solutions and data analysis projects aimed at supporting national
          development goals.
        </p>
        <p>
          <strong>requirements:</strong> Saudi national, Bachelor's student in
          Software Engineering or IT, knowledge in system analysis and backend
          development, GPA above 3.5
        </p>
      </>
    ),
    link: "/application-details/3",
  };

  const application3 = {
    imgSrc: "/sdaia.jpg",
    title: "SDAIA Data Science Internship - 2025",
    content: (
      <>
        <p>
          <strong>location:</strong> Remote or Riyadh, Saudi Arabia
        </p>
        <p>
          <strong>applicationStatus:</strong>{" "}
          <span className="accept-badge">accepted</span>
        </p>
        <p>
          <strong>applicationDate:</strong> March 20, 2025
        </p>
        <p>
          <strong>description:</strong> Work on real AI-driven projects with the
          Saudi Data and Artificial Intelligence Authority. Gain experience in
          predictive modeling, data visualization, and public sector AI
          initiatives.
        </p>
        <p>
          <strong>requirements:</strong> Strong Python and data analysis skills,
          experience with Pandas/Numpy, basic knowledge of machine learning,
          interest in ethical AI
        </p>
      </>
    ),
    link: "/application-details/1",
  };

  return (
    <Container
      style={{ display: "flex", justifyContent: "center", paddingTop: "80px" }}
    >
      <Row className="justify-content-center">
        <Col>
          <Navbar />
          <Header title={title} />
          <ApplicantCard {...application3} />
          <ApplicantCard {...application1} />
          <ApplicantCard {...application2} />
        </Col>
      </Row>
    </Container>
  );
}
