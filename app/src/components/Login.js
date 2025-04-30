import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alter from './Alert';

function Login({ onSwitchToRegister }) {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors({});
        const errors = {};

        if (!username) errors.username = 'Username is required';
        if (!password) errors.password = 'Password is required';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            try {
                const response = await fetch('http://localhost:3001/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // If login is successful, store session data or user info
                    sessionStorage.setItem('loggedInUser', username);
                    sessionStorage.setItem('userType', data.userType); // store user type (e.g., student, company)
                    navigate('/welcome'); // Redirect to the welcome page
                } else {
                    // Show error alert if login failed
                    setShowAlert(true);
                }

                // Clear form fields after submission
                setUsername('');
                setPassword('');
            } catch (err) {
                console.error('Error:', err);
                setShowAlert(true);
            }
        }
    };

    return (
        <Container className="p-3 my-5 d-flex flex-column w-50">
            <img
                src='./imgs/logo.png'
                alt='logo'
                width={200}
                height={200}
                style={{ display: 'block', margin: '0 auto' }}
            />
            <p>Login with your informations</p>

            {showAlert && (
                <div
                    style={{
                        position: 'fixed',
                        top: '100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        width: '50%',
                    }}
                >
                    <Alter
                        show={showAlert}
                        message="Wrong username or password"
                        variant="danger"
                        onClose={() => setShowAlert(false)} // Close alert
                    />
                </div>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {formErrors.username && <Form.Text className="text-danger">{formErrors.username}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {formErrors.password && <Form.Text className="text-danger">{formErrors.password}</Form.Text>}
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" className="def-button">
                        Sign in
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Login;
