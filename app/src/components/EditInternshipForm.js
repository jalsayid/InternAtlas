import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Confirmation from './Confirmation';
import Alter from './Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPen, FaFileAlt, FaMapMarkerAlt, FaGraduationCap, FaTasks } from 'react-icons/fa';

const EditInternshipForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get internship ID from URL

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [responsibilities, setResponsibilities] = useState('');

    // State to store error messages
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        location: '',
        qualifications: '',
        responsibilities: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Fetch internship data when component is mounted
    useEffect(() => {
        // Fetch the internship data using the ID from the URL
        fetch(`http://localhost:3001/api/internships/id/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title || '');
                setDescription(data.description || '');
                setLocation(data.location || '');
                setQualifications(data.qualifications || '');
                setResponsibilities(data.responsibilities || '');
            })
            .catch((err) => {
                console.error('Error fetching internship:', err);
            });
    }, [id]);

    const handleClose = () => setShowModal(false);

    const handleSave = () => {
        handleClose(); // Close the modal after saving
        // Show success alert
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate('/company/applications');
        }, 2500); // Delay navigation to show alert
    };

    // Handlers to update state on input change
    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleLocationChange = (event) => setLocation(event.target.value);
    const handleQualificationsChange = (event) => setQualifications(event.target.value);
    const handleResponsibilitiesChange = (event) => setResponsibilities(event.target.value);

    const handleSaveChanges = (event) => {
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
            const updatedInternship = {
                title,
                description,
                location,
                qualifications,
                responsibilities,
            };

            // Sending the updated data to the server using PUT request
            fetch(`http://localhost:3001/api/internships/id/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedInternship),
            })
                .then((res) => res.json())
                .then(() => {
                    setShowModal(true);
                    handleSave();
                })
                .catch((err) => {
                    console.error('Error updating internship:', err);
                });
        }
    };

    const handleBack = () => {
        navigate(`/company/applications`);
    };

    return (
        <Container className="mt-5">
            <div className='text-center'>
                <h1>Edit Internship Opportunity</h1>
                <h2>{title || 'Internship Information'}</h2>
            </div>
            <br />

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
                <Alter
                    show={showAlert}
                    message="Application is updated successfully!"
                    variant="success"
                    onClose={() => setShowAlert(false)}
                />
            </div>

            <Form onSubmit={handleSaveChanges}>
                {/* Title */}
                <Form.Group controlId="formTitle" className="mb-4">
                    <Form.Label><FaPen style={{ color: '#FFB608', marginRight: '8px' }} /> Internship Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter internship title"
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Description */}
                <Form.Group controlId="formDescription" className="mb-4">
                    <Form.Label><FaFileAlt style={{ color: '#FFB608', marginRight: '8px' }} /> Internship Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter internship description"
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Location */}
                <Form.Group controlId="formLocation" className="mb-4">
                    <Form.Label><FaMapMarkerAlt style={{ color: '#FFB608', marginRight: '8px' }} /> Location</Form.Label>
                    <Form.Control
                        type="text"
                        rows={3}
                        value={location}
                        onChange={handleLocationChange}
                        placeholder='Country-Region-City'
                        isInvalid={!!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                </Form.Group>

                {/* Qualifications */}
                <Form.Group controlId="formQualifications" className="mb-4">
                    <Form.Label><FaGraduationCap style={{ color: '#FFB608', marginRight: '8px' }} /> Qualifications</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={qualifications}
                        onChange={handleQualificationsChange}
                        placeholder="Enter internship qualifications"
                        isInvalid={!!errors.qualifications}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.qualifications}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Responsibilities */}
                <Form.Group controlId="formResponsibilities" className="mb-4">
                    <Form.Label><FaTasks style={{ color: '#FFB608', marginRight: '8px' }} /> Responsibilities</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={responsibilities}
                        onChange={handleResponsibilitiesChange}
                        placeholder="Enter internship responsibilities"
                        isInvalid={!!errors.responsibilities}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.responsibilities}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Save Button */}
                <Form.Group className="d-flex justify-content-between mb-4">
                    <button className='second-btn' onClick={handleBack} >Cancel</button>
                    <button className='def-btn' type="submit">
                        Save
                    </button>
                </Form.Group>

            </Form>

            {/* Confirmation Modal */}
            <Confirmation
                show={showModal}
                onHide={handleClose}
                title="Confirmation"
                bodyText="Do you want to update this internship opportunity?"
                closeButtonLabel="Cancel"
                saveButtonLabel="Yes, Submit"
                onSave={handleSave}
            />

        </Container>
    );
};

export default EditInternshipForm;
