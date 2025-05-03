import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function OpportunityDetailModal({ show, handleClose, opportunity }) {
  if (!opportunity) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{opportunity.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Location:</strong> {opportunity.location}</p>
        <p><strong>Description:</strong> {opportunity.description}</p>
        <p><strong>Qualifications:</strong> {opportunity.qualifications}</p>
        <p><strong>Responsibilities:</strong> {opportunity.responsibilities}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className='second-btn' onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OpportunityDetailModal;



//this might be deleteddd ;rawan
