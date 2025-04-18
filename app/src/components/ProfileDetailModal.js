import React from 'react';
import { Modal, Row, Col} from 'react-bootstrap';

function ProfileDetailModal({ show, handleClose, app }) {
  if (!app) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{app.name} Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h6>Contact Information</h6>
            <p><strong>Contact Person:</strong> {app.contactPerson}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Location:</strong> {app.location}</p>
            <p><strong>Industry:</strong> {app.industry}</p>
            <p><strong>Description:</strong> {app.description}</p>
            <p><strong>Active Posted Jobs:</strong> {app.jobsCount}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>

        <button className='second-btn' onClick={handleClose}>Back</button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileDetailModal;
