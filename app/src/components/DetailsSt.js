import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import StudentNavBar from "../StudentNavBar";

export default function Details({
  name,
  email,
  cv_path,
  generalInfo,
  questions,
}) {
  const title = "Applicant Details";

  const handleDownloadCV = () => {
    window.open(`/docs/pdf-viewer.html?file=${cv_path}`, "_blank");
  };

  return (
    <>
      <StudentNavBar />
      <Container style={{ justifyContent: "center", paddingTop: "80px" }}>
        <Row className="justify-content-center w-100">
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
                  </div>
                </Form.Group>
              </Form>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-4">
              <h2 className="h2-joud mb-4">Questions & Answers</h2>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={generalInfo?.summary || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Skills</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={generalInfo?.skills || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Career Goals</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={generalInfo?.careerGoals || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Availability</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={generalInfo?.availability || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Full Time Interest</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={generalInfo?.fullTimeInterest || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Relocation</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={generalInfo?.relocation || ""}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
