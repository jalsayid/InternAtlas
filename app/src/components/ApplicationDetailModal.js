import React from 'react';
import { Modal, Button, Row, Col} from 'react-bootstrap';

function ApplicationDetailModal({ show, handleClose, app }) {
  if (!app) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Review Job Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h6>Contact Information</h6>
            <p><strong>Full Name:</strong> {app.name}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Location:</strong> {app.location}</p>
            <p><strong>Nationality:</strong> {app.nationality}</p>
            <p><strong>Phone:</strong> {app.phone}</p>
          </Col>
          <Col>
            <h6>Additional Questions</h6>
            {app.questions?.length > 0 ? (
              app.questions.map((q, idx) => (
                <p key={idx}>
                  <strong>{q.question}</strong><br />
                  {q.answer}
                </p>
              ))
            ) : (
              <p className="text-muted">responses</p>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>Back</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ApplicationDetailModal;
