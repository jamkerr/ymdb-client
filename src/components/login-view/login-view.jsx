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

    const handleSubmit = (e) => {
        e.preventDefault();
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
            console.log('The user or password is incorrect.')
        });
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
                                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button className='mt-2' variant="info" type="submit" onClick={handleSubmit}>Sign in</Button>
                        </Form>
                        <p>Don't have an account yet? <a href="#">Create an account</a>.</p>
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