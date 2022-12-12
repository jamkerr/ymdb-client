import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './login-view.scss';


export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    // Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
        setUsernameErr('Username Required');
        isReq = false;
        } else if (username.length < 2) {
        setUsernameErr('Username must be at least 2 characters long');
        isReq = false;
        }
        if (!password) {
        setPasswordErr('Password Required');
        isReq = false;
        } else if (password.length < 6) {
        setPasswordErr('Password must be at least 6 characters long');
        isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send a request to the server for authentication */
            axios.post('https://ymdeebee.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('The user or password is incorrect.');
            });
        }
    };

    return (
        <Container className='login-container d-flex justify-content-center align-items-center'>
            <Row className='margin-auto'>
                <Col md={8}>
                    <Card bg='secondary' className='login-card'>
                        <Card.Body>
                        <Card.Title>Sign in</Card.Title>
                        <Form>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text"  placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                                {usernameErr && <p>{usernameErr}</p>}
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                {passwordErr && <p>{passwordErr}</p>}
                            </Form.Group>
                            <Button className='mt-2' variant="info" type="submit" onClick={handleSubmit}>Sign in</Button>
                        </Form>
                        <p>Don't have an account yet? <a href="./register">Create an account</a>.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};