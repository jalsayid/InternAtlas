import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Header from "./Header";
import Navbar from "./Navbar";
import { useState } from "react";

export default function CompanyDetails({ name, email, description, documents, logo }) {
  const [showAcceptAlert, setShowAcceptAlert] = useState(false);
  const [showRejectAlert, setShowRejectAlert] = useState(false);

  const handleViewDocument = (docPath) => {
    window.open(`/docs/pdf-viewer.html?file=${docPath}`, "_blank");
  };

  return (
    <Container style={{ justifyContent: "center", paddingTop: "80px" }}>
      <Row className="justify-content-center w-100">
        <Navbar />
        <Header title="Company Details" />

        {/* Alerts */}
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
            >
              Company request has been approved!
            </Alert>
          )}
          {showRejectAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowRejectAlert(false)}
              dismissible
            >
              Company request has been rejected!
            </Alert>
          )}
        </div>

        {/* Company Information */}
        <Col md={6} className="mb-4">
          <Card className="p-4">
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Company Logo"
                style={{ width: "150px", height: "150px", objectFit: "contain" }}
              />
            </div>
            <h2 className="h2-joud mb-4">Company Information</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" value={name} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={description}
                  readOnly
                />
              </Form.Group>
            </Form>
          </Card>
        </Col>

        {/* Verification Documents */}
        <Col md={6}>
          <Card className="p-4">
            <h2 className="h2-joud mb-4">Verification Documents</h2>
            {documents.map((doc, index) => (
              <Form.Group key={index} className="mb-4">
                <Form.Label>{doc.title}</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    value={doc.filename}
                    readOnly
                    className="me-2"
                  />
                  <button
                    onClick={() => handleViewDocument(doc.path)}
                    className="third-btn"
                  >
                    View
                  </button>
                </div>
              </Form.Group>
            ))}
          </Card>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row>
        <Col className="d-flex justify-content-center gap-3 mb-5">
          <button
            className="def-btn"
            onClick={() => {
              setShowAcceptAlert(true);
              setShowRejectAlert(false);
            }}
          >
            Approve Company
          </button>
          <button
            className="second-btn"
            onClick={() => {
              setShowRejectAlert(true);
              setShowAcceptAlert(false);
            }}
          >
            Reject Company
          </button>
        </Col>
      </Row>
    </Container>
  );
}