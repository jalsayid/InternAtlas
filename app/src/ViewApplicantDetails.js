import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function ViewApplicantDetails({ applicantData }) {
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

  const handleDownloadCV = () => {
    // In a real application, this would be the path to the actual CV file
    const cvPath = "/sample-cv.pdf";
    window.open(cvPath, "_blank");
  };

  return (
    <Container style={{ justifyContent: "center", paddingTop: "80px" }}>
      <Row className="justify-content-center w-100">
        <Navbar />
        <Header title={title} />

        <Col md={6} className="mb-4">
          <Card className="p-4">
            <h2 className="h2-joud mb-4">Contact Information</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" value="Fatima Al-Dossari" readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value="fatima@example.com"
                  readOnly
                />
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
                <Form.Label>LinkedIn Profile</Form.Label>
                <Form.Control
                  type="url"
                  value="linkedin.com/in/fatima-dev"
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Curriculum Vitae</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    value="Fatima_Al-Dossari_CV.pdf"
                    readOnly
                    className="me-2"
                  />
                  <button onClick={handleDownloadCV} className="third-btn">
                    <i className="bi bi-download me-2"></i>
                    Download CV
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
          <button className="def-btn">Accept</button>
          <button className="second-btn">Reject</button>
        </Col>
      </Row>
    </Container>
  );
}
