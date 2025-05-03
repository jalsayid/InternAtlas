import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaFileAlt, FaMapMarkerAlt, FaGraduationCap, FaTasks } from 'react-icons/fa';
import Confirmation from './Confirmation';
import Alter from './Alert';
import '../formsStyles.css';
import CompanyNavBar from '../CompanyNavBar';

function PostInternshipForm() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [responsibilities, setResponsibilities] = useState('');

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        location: '',
        duration: '',
        qualifications: '',
        responsibilities: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleClose = () => setShowModal(false);

    const handleSave = () => {
        // After successful form submission
        setTitle('');
        setDescription('');
        setLocation('');
        setDuration('');
        setQualifications('');
        setResponsibilities('');
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
            navigate('/company/applications');
        }, 3000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        let isValid = true;

        // Form validation
        if (!title) {
            newErrors.title = 'Title is required';
            isValid = false;
        }
        if (!description) {
            newErrors.description = 'Description is required';
            isValid = false;
        }
        if (!location) {
            newErrors.location = 'Location is required';
            isValid = false;
        }
        if (!duration) {
            newErrors.duration = 'Duration is required';
            isValid = false;
        }
        if (!qualifications) {
            newErrors.qualifications = 'Qualifications are required';
            isValid = false;
        }
        if (!responsibilities) {
            newErrors.responsibilities = 'Responsibilities are required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            // Show the confirmation modal before proceeding to submit the data to the backend
            setShowModal(true);
        }
    };

    // Handle confirmation and submit data
    const handleConfirmSubmit = async () => {
        try {
            const response = await fetch(`${REACT_APP_API_URL}/api/internships`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company: "dummy", // Replace with dynamic company value if needed
                    title,
                    description,
                    location,
                    type: duration,
                    qualifications,
                    responsibilities,
                    status: 'active', // Default status or modify as needed
                }),
            });

            const data = await response.json();
            if (response.ok) {
                handleSave(); // Show success alert and reset fields
            } else {
                console.error('Error:', data.message);
            }
        } catch (err) {
            console.error('Error:', err);
        }

        setShowModal(false); // Close the modal after submitting the data
    };



    const handleBack = () => navigate(`/dashboard/company`);

    return (
        <>
            <CompanyNavBar />
            <Container className="mt-5">
                <h2 className="page-title">Post a New Internship Opportunity</h2>

                <div style={{
                    position: "fixed",
                    top: "100px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                    width: "50%",
                }}>
                    <Alter
                        show={showAlert}
                        message="Internship Opportunity Submitted Successfully!"
                        variant="success"
                        onClose={() => setShowAlert(false)}
                    />
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle" className="mb-4">
                        <Form.Label><FaPen style={{ color: '#FFB608', marginRight: '8px' }} /> Internship Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter internship title"
                            isInvalid={!!errors.title}
                            minLength={5}
                            maxLength={100}
                        />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        <small className="text-muted">Minimum 5 characters. Current length: {title.length}</small>
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mb-4">
                        <Form.Label><FaFileAlt style={{ color: '#FFB608', marginRight: '8px' }} /> Internship Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter internship description"
                            isInvalid={!!errors.description}
                            minLength={50}
                            maxLength={500}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        <small className="text-muted">Minimum 50 characters. Current length: {description.length}</small>
                    </Form.Group>

                    <Form.Group controlId="formLocation" className="mb-4">
                        <Form.Label><FaMapMarkerAlt style={{ color: '#FFB608', marginRight: '8px' }} /> Location</Form.Label>
                        <Form.Control
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder='Country-Region-City'
                            isInvalid={!!errors.location}
                        />
                        <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formDuration" className="mb-4">
                        <Form.Label><FaMapMarkerAlt style={{ color: '#FFB608', marginRight: '8px' }} /> Duration</Form.Label>
                        <Form.Control
                            as="select"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            isInvalid={!!errors.duration}
                        >
                            <option value="">Select Duration</option>
                            <option value="Internship">Internship</option>
                            <option value="SummerTraining">Summer Training</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formQualifications" className="mb-4">
                        <Form.Label><FaGraduationCap style={{ color: '#FFB608', marginRight: '8px' }} /> Qualifications</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={qualifications}
                            onChange={(e) => setQualifications(e.target.value)}
                            placeholder="Enter internship qualifications"
                            isInvalid={!!errors.qualifications}
                            minLength={50}
                            maxLength={500}
                        />
                        <Form.Control.Feedback type="invalid">{errors.qualifications}</Form.Control.Feedback>
                        <small className="text-muted">Minimum 50 characters. Current length: {qualifications.length}</small>
                    </Form.Group>

                    <Form.Group controlId="formResponsibilities" className="mb-4">
                        <Form.Label><FaTasks style={{ color: '#FFB608', marginRight: '8px' }} /> Responsibilities</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={responsibilities}
                            onChange={(e) => setResponsibilities(e.target.value)}
                            placeholder="Enter internship responsibilities"
                            isInvalid={!!errors.responsibilities}
                            minLength={50}
                            maxLength={500}
                        />
                        <Form.Control.Feedback type="invalid">{errors.responsibilities}</Form.Control.Feedback>
                        <small className="text-muted">Minimum 50 characters. Current length: {responsibilities.length}</small>
                    </Form.Group>

                    {/* Submit Button */}
                    <Form.Group className="d-flex justify-content-between mb-3">
                        <button className='second-btn' onClick={handleBack}>Cancel</button>
                        <button className='def-btn' type="submit">Publish</button>
                    </Form.Group>
                </Form>

                <Confirmation
                    show={showModal}
                    onHide={handleClose}
                    title="Confirmation"
                    bodyText="Do you want to submit this internship opportunity?"
                    closeButtonLabel="Cancel"
                    saveButtonLabel="Yes, Submit"
                    onSave={handleConfirmSubmit}
                />
            </Container>
        </>
    );
}

export default PostInternshipForm;
