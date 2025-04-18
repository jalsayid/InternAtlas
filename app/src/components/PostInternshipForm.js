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
        handleClose();
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};
        let isValid = true;

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

        if (isValid) setShowModal(true);
    };

    const handleBack = () => navigate(`/dashboard/company`);

    return (
        <>
            <CompanyNavBar /> {}

            <Container className="mt-5">
                <h2>Post a New Internship Opportunity</h2>

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
                        <Form.Label><FaPen /> Internship Title</Form.Label>
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
                        <Form.Label><FaFileAlt /> Internship Description</Form.Label>
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
                        <Form.Label><FaMapMarkerAlt /> Location</Form.Label>
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
                        <Form.Label><FaMapMarkerAlt /> Duration</Form.Label>
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
                        <Form.Label><FaGraduationCap /> Qualifications</Form.Label>
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
                        <Form.Label><FaTasks /> Responsibilities</Form.Label>
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

                    <Form.Group className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleBack} style={{ width: '120px' }}>Cancel</Button>
                        <Button variant="primary" type="submit" style={{ width: '120px' }}>Publish</Button>
                    </Form.Group>
                </Form>

                <Confirmation
                    show={showModal}
                    onHide={handleClose}
                    title="Confirmation"
                    bodyText="Do you want to submit this internship opportunity?"
                    closeButtonLabel="Cancel"
                    saveButtonLabel="Yes, Submit"
                    onSave={handleSave}
                />
            </Container>
        </>
    );
}

export default PostInternshipForm;
