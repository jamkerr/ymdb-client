import React, { useState } from 'react';
import axios from 'axios';
import moment from "moment/moment";

import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { FavoriteMovies } from './favorite-movies';

import { setUser } from '../../redux/reducers/user';

import './profile-view.scss';

export function ProfileView() {

    const user = useSelector((state) => state.user)
    const movies = useSelector((state) => state.movies.list);
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const [ currentUsername, setCurrentUsername ] =  useState(user ? user.Username : null);;
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

    const handleUpdate = async () => {
        const isReq = validate();
        if (isReq) {
            try {
                await axios.put(`https://ymdeebee.herokuapp.com/users/${user.Username}`,
                {
                    Username: currentUsername ? currentUsername : user.Username,
                    Password: password ? password : user.Password,
                    Email: email ? email : user.Email,
                    Birth_Date: birthday ? birthday : user.Birth_Date
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Your account info was updated.');
            } catch (error) {
                console.log(error);
            }

            try {
                await axios.post('https://ymdeebee.herokuapp.com/login', {
                    Username: currentUsername,
                    Password: password
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    dispatch(setUser(response.data.user));
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleDelete = async () => {
        if (username && token) {
            let confirmDelete = confirm('Are you sure you want to permanently delete your account?');
            if (!confirmDelete) return;

            try {
                await axios.delete(`https://ymdeebee.herokuapp.com/users/${currentUsername}`, {
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
            {(!user) ?
                <h2>Loading Your Profile</h2>
                :
                <Row xs={1}>
                    <Row>
                        <h2>Your Profile</h2>
                    </Row>
                    <Col className='mb-4'>
                        <Card bg='dark' className='profile-card'>
                            <Card.Body>
                                <Card.Title>Name: {currentUsername}</Card.Title>
                                <Card.Text>Email: {user.Email}</Card.Text>
                                <Card.Text>Birthday: {moment(user.Birth_Date).format('Do MMMM YYYY')} </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Row>
                        <FavoriteMovies favoriteMoviesList={movies.filter((m) => user.FavoriteMovies.includes(m._id))} />
                    </Row>
                    <Row>
                        <h2>Update Info</h2>
                    </Row>
                    <Col className='mb-4'>
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
                    <Row className='mt-2'>
                        <h2>Delete Account</h2>
                    </Row>
                    <Col className='mb-4'>
                        <Card bg="dark">
                            <Card.Body>
                                <Button variant="danger" onClick={() => { handleDelete() }} >Delete Account</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            }
        </Container>
    );
}
