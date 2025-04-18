import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
import Navbar from "./Navbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";

export default function Details({ name, email, cv_path }) {
  const [showAcceptAlert, setShowAcceptAlert] = useState(false);
  const [showRejectAlert, setShowRejectAlert] = useState(false);
  const title = "Applicant Details";

  // Example questions and answers (in real app, these would come from props or API)
  const questions = [
    {
      question: "What do you know about APIs?",
      answer:
        "I have experience working with RESTful APIs, including integration with third-party services. I've built APIs using Node.js and Express, and I understand API security best practices.",
    },
    {
      question: "What can you add to the company?",
      answer:
        "With my background in full-stack development and experience in building scalable applications, I can contribute to both frontend and backend development. I'm also passionate about mentoring junior developers.",
    },
    {
      question: "Describe a challenging project you've worked on.",
      answer:
        "I led the development of a real-time chat application using WebSocket technology, overcoming challenges in maintaining persistent connections and handling high concurrent users.",
    },
  ];

  const handleViewDocument = () => {
    window.open(`/docs/pdf-viewer.html?file=${cv_path}`, "_blank");
  };

  return (
    <Container style={{ justifyContent: "center", paddingTop: "80px" }}>
      <Row className="justify-content-center w-100">
        <Navbar />
        <Header title={title} />

        {/* Alerts positioned at the top */}
        <div
          style={{
            position: "fixed",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            width: "50%",
          }}
        >
          {showAcceptAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAcceptAlert(false)}
              dismissible
              style={{ marginBottom: "10px" }}
            >
              The Applicant is accepted!
            </Alert>
          )}
          {showRejectAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowRejectAlert(false)}
              dismissible
              style={{ marginBottom: "10px" }}
            >
              The Applicant is rejected!
            </Alert>
          )}
        </div>

        <Col md={6} className="mb-4">
          <Card className="p-4">
            <h2 className="h2-joud mb-4">Contact Information</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" value={name} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value="Riyadh, Saudi Arabia"
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Phone</Form.Label>
                <Form.Control type="tel" value="+966 50 123 4567" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Curriculum Vitae</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    value={`${name.replace(/\s+/g, "_")}_CV.pdf`}
                    readOnly
                    className="me-2"
                  />
                  <button onClick={handleViewDocument} className="third-btn">
                    <i className="bi bi-download me-2"></i>CV
                  </button>
                </div>
              </Form.Group>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-4">
            <h2 className="h2-joud mb-4">Questions & Answers</h2>
            {questions.map((qa, index) => (
              <Form.Group key={index} className="mb-4">
                <Form.Label className="fw-bold">{qa.question}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={qa.answer}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
            ))}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex gap-3 mb-5">
          <button
            className="def-btn"
            onClick={() => {
              setShowAcceptAlert(true);
              setShowRejectAlert(false);
            }}
          >
            Accept
          </button>
          <button
            className="second-btn"
            onClick={() => {
              setShowRejectAlert(true);
              setShowAcceptAlert(false);
            }}
          >
            Reject
          </button>
        </Col>
      </Row>
    </Container>
  );
}
