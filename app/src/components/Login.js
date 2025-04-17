import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login({ onSwitchToRegister }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors({});
        const errors = {};

        if (!username) errors.username = 'Username is required';
        if (!password) errors.password = 'Password is required';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            navigate('/welcome'); //it was dashboard for student
            setUsername('');
            setPassword('');
        }
    };

    return (
        <Container className="p-3 my-5 d-flex flex-column w-50">
            <img
                src='./logo.png'
                alt='logo'
                width={200}
                height={200}
                style={{ display: 'block', margin: '0 auto' }} 
            />
            <p>Login with your informations</p>
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

                <Button variant="primary" type="submit" className="w-100">
                    Sign in
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
