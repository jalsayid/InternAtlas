import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import TrackCommentsCard from './TrackCommentsCard.js';
import Confirmation from './Confirmation.js';
import SubmissionAlert from './Alert.js';

function TrackComments() {
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // ✅ refresh function
  const refreshComments = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/inappropriateComments')
      .then(res => res.json())
      .then(data => {
        console.log("Loaded inappropriate comments:", data);
        setComments(data);
      })
      .catch(err => console.error("Failed to fetch comments:", err))
      .finally(() => setLoading(false));
  };

  // ✅ initial load
  useEffect(() => {
    refreshComments();
  }, []);

  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDeletion = () => {
    fetch(`http://localhost:3001/api/inappropriateComments/${pendingDeleteId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete comment");
        refreshComments(); // ✅ reload after delete
        setShowAlert(true);
      })
      .catch(err => console.error("Error during deletion:", err))
      .finally(() => {
        setShowConfirm(false);
        setPendingDeleteId(null);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const filtered = comments.filter(app =>
    app.studentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
      <h2 className="page-title" style={{ fontFamily: 'Roboto' }}>Reported Comments</h2>

      <Form className="mb-3 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Search for a user"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "300px", margin: "20px 20px" }}
        />
      </Form>

      <SubmissionAlert
        show={showAlert}
        message="Comment deleted successfully"
        variant="success"
        onClose={() => setShowAlert(false)}
      />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted">No inappropriate comments found.</div>
      ) : (
        filtered.map(app => (
          <TrackCommentsCard
            key={app._id}
            app={app}
            onDelete={handleDelete}
          />
        ))
      )}

      <Confirmation
        show={showConfirm}
        onHide={() => {
          setShowConfirm(false);
          setPendingDeleteId(null);
        }}
        title="Confirm Deletion"
        bodyText="Are you sure you want to delete this comment?"
        closeButtonLabel="Cancel"
        saveButtonLabel="Delete"
        onSave={confirmDeletion}
      />
    </Container>
  );
}

export default TrackComments;
