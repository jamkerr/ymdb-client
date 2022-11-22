import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    // Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');


    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Pick a Username');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('You need a password');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Chuck an Email Address in here');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('You sure that email is correct?');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send a request to the server for authentication */
            props.onRegistered(username);
        }
    };

    return (
        <Container className='login-container d-flex justify-content-center align-items-center'>
            <Row className='margin-auto'>
                <Col md={8}>
                    <Card bg='secondary' className='login-card'>
                        <Card.Body>
                            <Card.Title>Create Account</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                    {usernameErr && <p>{usernameErr}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    {passwordErr && <p>{passwordErr}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required  
                                    />
                                    {emailErr && <p>{emailErr}</p>}
                                </Form.Group>
                                <Button className='mt-2' variant="info" type="submit" onClick={handleSubmit}>Create account</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func.isRequired
};