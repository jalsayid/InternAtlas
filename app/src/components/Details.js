import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompanyNavBar from '../CompanyNavBar'; 
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";

export default function Details({ 
  name, 
  email, 
  cv_path, 
  phone,
  linkedin,
  location,
  gpa,
  university,
  major,
  generalInfo,
  questions
}) {
  const [showAcceptAlert, setShowAcceptAlert] = useState(false);
  const [showRejectAlert, setShowRejectAlert] = useState(false);

  const handleViewDocument = () => {
    window.open(`/docs/pdf-viewer.html?file=${cv_path}`, "_blank");
  };

  return (
    <>
      <CompanyNavBar />
      <Container style={{ justifyContent: "center", paddingTop: "80px" }}>
        <Row className="justify-content-center w-100">
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
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" value={phone} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control type="url" value={linkedin} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" value={location} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>University</Form.Label>
                  <Form.Control type="text" value={university} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Major</Form.Label>
                  <Form.Control type="text" value={major} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>GPA</Form.Label>
                  <Form.Control type="text" value={gpa} readOnly />
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
              <h2 className="h2-joud mb-4">Application Questions</h2>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">{questions.question1}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={generalInfo?.summary || ''}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">{questions.question2}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={generalInfo?.skills || ''}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">{questions.question3}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={generalInfo?.careerGoals || ''}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">{questions.question4}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={generalInfo?.availability || ''}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">{questions.question5}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={generalInfo?.fullTimeInterest || ''}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">{questions.question6}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={generalInfo?.relocation || ''}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
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
    </>
  );
}
