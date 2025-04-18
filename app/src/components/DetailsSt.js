import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
import Navbar from "./Navbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export default function Details({ name, email, cv_path, questions }) {
  const title = "Applicant Details";

  const handleDownloadCV = () => {
    window.open(`/pdf-viewer.html?file=${cv_path}`, "_blank");
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
                  <button onClick={handleDownloadCV} className="third-btn">
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
    </Container>
  );
}
