import React, { useState } from 'react';
import { Container, Card, Button, Alert, Form } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import './CompanyPageReview.css';


const reviewsData = {
    'sabic_software engineering intern': [
      { id: 1, rating: 5, text: 'Excellent mentorship, engaging tasks.', response: 'Thank you!' },
      { id: 2, rating: 4, text: 'Learned a lot, but onboarding was slow.', response: null },
      { id: 3, rating: 5, text: 'Great learning culture!', response: null }
    ],
    'aramco_ai & machine learning intern': [
      { id: 4, rating: 4, text: 'Loved the datasets and mentorship.', response: 'Glad to hear!' },
      { id: 5, rating: 5, text: 'Exciting work on real models.', response: null },
      { id: 6, rating: 3, text: 'Need better docs.', response: 'We’ll improve that.' }
    ],
    'sdaia_cybersecurity intern': [
      { id: 7, rating: 5, text: 'Challenging and rewarding!', response: null },
      { id: 8, rating: 4, text: 'Real-world firewall tasks.', response: null },
      { id: 9, rating: 4, text: 'Great mentoring.', response: 'Thank you!' }
    ]
  };
  

const CompanyPageReviews = () => {
  const { companyName, position } = useParams();
  const key = `${(companyName || '').toLowerCase()}_${(position || '').toLowerCase()}`;
  const initialReviews = reviewsData[key] || [];

  const [reviews, setReviews] = useState(
    initialReviews.map((r) => ({
      ...r,
      isEditing: false,
      editText: r.response || ''
    }))
  );

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

  const handleSave = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, response: r.editText, isEditing: false } : r
      )
    );
  };

  const handleDelete = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, response: null, editText: '', isEditing: false }
          : r
      )
    );
  };

  const renderStars = (count) =>
    [...Array(5)].map((_, i) => (
      <StarFill
        key={i}
        className={`me-1 ${i < count ? 'text-warning' : 'text-secondary'}`}
      />
    ));

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex align-items-center mt-3 mb-4">
        <i className="bi bi-building fs-3 text-secondary me-3"></i>
        <div>
          <h5 className="mb-0 text-capitalize company-name fw-bold text-dark">
            {companyName}
          </h5>
          <small className="text-muted text-capitalize">{position}</small>
        </div>
        <div className="ms-auto text-primary d-flex align-items-center">
          <span className="me-1 fs-5 fw-semibold">4.5</span>
          <StarFill className="text-warning" />
        </div>
      </div>

      {/* Ratings Summary */}
      <div className="mb-4 d-flex flex-wrap gap-4">
        <div>
          <strong className="rating-label">Reputation</strong> {renderStars(4)}
        </div>
        <div>
          <strong className="rating-label">Social</strong> {renderStars(5)}
        </div>
        <div>
          <strong className="rating-label">Opportunities</strong> {renderStars(4)}
        </div>
        <div>
          <strong className="rating-label">Location</strong> {renderStars(4)}
        </div>
      </div>

      {/* Reviews */}
      <h5 className="mb-3">Student Reviews</h5>

      {reviews.length === 0 ? (
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
                          size="sm"
                          className="me-2 def-btn"
                          onClick={() => handleSave(r.id)}
                          disabled={!r.editText.trim()}
                        >
                          💾 Save
                        </button>
                        <button
                          className='second-btn'
                          size="sm"
                          onClick={() => toggleEditing(r.id)}
                        >
                          ❌ Cancel
                        </button>
                      </Form>
                    </>
                  ) : r.response ? (
                    <div className="bg-light border rounded p-3 mt-2">
                      <strong className="d-block mb-1">Company Response:</strong>
                      <span>{r.response}</span>
                      <div className="mt-2">
                        <button
                          className='second-btn me-2'
                          size="sm"
                          onClick={() => toggleEditing(r.id)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className='def-btn'
                          size="sm"
                          onClick={() => handleDelete(r.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button className='def-btn' onClick={() => toggleEditing(r.id)}>
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
  );
};

export default CompanyPageReviews;

