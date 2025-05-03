import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Form } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import './CompanyPageReview.css';
import CompanyNavBar from '../../../CompanyNavBar';

const CompanyPageReviews = () => {
  const { companyName, position } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/reviews/${companyName}/${position}`);
        const data = await res.json();

        const mapped = data.map((r) => ({
          id: r._id,
          rating: r.rating,
          text: r.reviewText,
          response: r.companyResponse,
          isEditing: false,
          editText: r.companyResponse || '',
        }));

        setReviews(mapped);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [companyName, position]);

  const toggleEditing = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isEditing: !r.isEditing } : r))
    );
  };

  const handleResponseChange = (id, text) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, editText: text } : r))
    );
  };

  const handleSave = async (id) => {
    const review = reviews.find((r) => r.id === id);
    try {
      await fetch(`http://localhost:3001/api/reviews/${id}/response`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responseText: review.editText }),
      });

      setReviews((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, response: r.editText, isEditing: false } : r
        )
      );
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/reviews/${id}/response`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responseText: null }),
      });

      setReviews((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, response: null, editText: '', isEditing: false } : r
        )
      );
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const renderStars = (count) =>
    [...Array(5)].map((_, i) => (
      <StarFill
        key={i}
        className={`me-1 ${i < count ? 'text-warning' : 'text-secondary'}`}
      />
    ));

  return (
    <>
      <CompanyNavBar />

      <Container className="py-4">
        <div className="d-flex align-items-center mt-3 mb-4">
          <i className="bi bi-building fs-3 text-secondary me-3"></i>
          <div>
            <h5 className="mb-0 text-capitalize fw-bold text-dark">{companyName}</h5>
            <small className="text-muted text-capitalize">{position}</small>
          </div>
          <div className="ms-auto text-primary d-flex align-items-center">
            <span className="me-1 fs-5 fw-semibold">4.5</span>
            <StarFill className="text-warning" />
          </div>
        </div>

        <div className="mb-4 d-flex flex-wrap gap-4">
          <div><strong>Reputation</strong> {renderStars(4)}</div>
          <div><strong>Social</strong> {renderStars(5)}</div>
          <div><strong>Opportunities</strong> {renderStars(4)}</div>
          <div><strong>Location</strong> {renderStars(4)}</div>
        </div>

        <h5 className="mb-3">Student Reviews</h5>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to write one!</p>
        ) : (
          reviews.map((r) => (
            <Card key={r.id} className="mb-3 shadow-sm rounded-4">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex mb-2">
                  <i className="bi bi-person-circle fs-2 text-secondary me-3"></i>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-semibold">Anonymous Student</span>
                      <div>{renderStars(r.rating)}</div>
                    </div>
                    <p className="mb-1 text-muted">{r.text}</p>

                    {r.isEditing ? (
                      <>
                        <Alert variant="light" className="mb-3">
                          <strong>Guidelines:</strong>
                          <ul className="mb-0">
                            <li>Be professional and respectful.</li>
                            <li>Responses are visible to students.</li>
                            <li>Admins may review your input.</li>
                          </ul>
                        </Alert>

                        <Form>
                          <Form.Group className="mb-2">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={r.editText}
                              onChange={(e) => handleResponseChange(r.id, e.target.value)}
                            />
                          </Form.Group>
                          <button
                            className="me-2 def-btn"
                            onClick={() => handleSave(r.id)}
                            disabled={!r.editText.trim()}
                          >
                            💾 Save
                          </button>
                          <button
                            className="second-btn"
                            onClick={() => toggleEditing(r.id)}
                          >
                            ❌ Cancel
                          </button>
                        </Form>
                      </>
                    ) : r.response ? (
                      <div className="bg-light border rounded p-3 mt-2">
                        <strong className="d-block mb-1 text-warning">Company Response:</strong>
                        <span>{r.response}</span>
                        <div className="mt-2 d-flex gap-2">
                          <button
                            className="second-btn"
                            onClick={() => toggleEditing(r.id)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="def-btn"
                            onClick={() => handleDelete(r.id)}
                            style={{ width: '120px' }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button className="def-btn" onClick={() => toggleEditing(r.id)}>
                        Respond
                      </button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};

export default CompanyPageReviews;
