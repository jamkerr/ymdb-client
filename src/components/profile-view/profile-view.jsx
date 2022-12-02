import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

import './profile-view.scss';


export function ProfileView({username}) {
    const [ userData, setUserData ] = useState('');

    const [ currentUsername, setCurrentUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [ currentUsernameErr, setCurrentUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
    const [ birthdayErr, setBirthdayErr ] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!currentUsername) {
            setCurrentUsernameErr('Pick a Username');
            isReq = false;
        } else if (currentUsername.length < 2) {
            setCurrentUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('You need a password');
            isReq = false;
        } else if (password.length < 8) {
            setPasswordErr('Password must be at least 8 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Chuck an Email Address in here');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('You sure that email is correct?');
            isReq = false;
        }
        if (!birthday) {
            setBirthdayErr('We need to check how old you are');
            isReq = false;
        }

        return isReq;
    }
    
    const getUserData = (token) => {
        axios.get(`https://ymdeebee.herokuapp.com/users/${username}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            getUserData(accessToken)
        }
    }, []);

    const handleUpdate = async () => {
        let token = localStorage.getItem('token');
        const isReq = validate();
        if (isReq) {
            try {
                await axios.put(`https://ymdeebee.herokuapp.com/users/${username}`,
                {
                    Username: currentUsername ? currentUsername : userData.Username,
                    Password: password ? password : userData.Password,
                    Email: email ? email : userData.Email,
                    Birth_Date: birthday ? birthday : userData.Birth_Date
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Your account info was updated.');
                localStorage.setItem('user', currentUsername);
                window.open(`/${currentUsername}`, '_self');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleDelete = async () => {
        let token = localStorage.getItem('token');
        if (username && token) {
            let confirmDelete = confirm('Are you sure you want to permanently delete your account?');
            if (!confirmDelete) return;

            try {
                await axios.delete(`https://ymdeebee.herokuapp.com/users/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Your account was permanently deleted.');
                localStorage.clear();
                window.open('/', '_self');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Container className='profile-container d-flex justify-content-center align-items-center'>
            <Row xs={1} >
                <Row>
                    <h2>Your Profile</h2>
                </Row>
                <Col>
                    <Card bg='secondary' className='profile-card'>
                        <Card.Body>
                            <Card.Title>Name: {username}</Card.Title>
                            <Card.Text>Email: {userData.Email}</Card.Text>
                            <Card.Text>Birthday: {userData.Birth_Date}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Row>
                    <h2>Update Info</h2>
                </Row>
                <Col>
                    <Card bg="dark">
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentUsername}
                                        onChange={e => setCurrentUsername(e.target.value)}
                                    />
                                    {currentUsernameErr && <p>{currentUsernameErr}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    {passwordErr && <p>{passwordErr}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    {emailErr && <p>{emailErr}</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthday}
                                        onChange={e => setBirthday(e.target.value)}
                                    />
                                    {birthdayErr && <p>{birthdayErr}</p>}
                                </Form.Group>
                                <Button className='mt-2' variant="info" onClick={() => { handleUpdate() }} >Update Info</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Row>
                    <h2>Delete Account</h2>
                </Row>
                <Col>
                    <Card bg="dark">
                        <Card.Body>
                            <Button variant="danger" onClick={() => { handleDelete() }} >Delete Account</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

ProfileView.propTypes = {
    onBackClick: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
};