import React, { useState, useEffect } from 'react';
import { Modal, Row, Col} from 'react-bootstrap';




function ProfileDetailModal({ show, handleClose, app }) {
  const [postCount, setPostCount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && app?.companyName) {
      async function fetchCount() {
        setLoading(true); // Start loading
        try {
          const response = await fetch(`http://localhost:3001/api/internships/${app.companyName}`);
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          setPostCount(data.length); // Set count
        } catch (err) {
          console.error('Error fetching post count:', err);
          setPostCount(0); // Fallback to 0
        } finally {
          setLoading(false); // End loading
        }
      }

      fetchCount();
    }
  }, [show, app]);

  if (!app) return null;


  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{app.companyName} Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <h6>Contact Information</h6>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Industry:</strong> {app.sector}</p>
            <p><strong>Description:</strong> {app.description}</p>
            <p><strong>Active Posted Jobs:</strong> {' '}
            {!loading && postCount !== null ? postCount : ''}</p>
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
