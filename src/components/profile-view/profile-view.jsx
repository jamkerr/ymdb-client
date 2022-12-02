import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

import './profile-view.scss';


export function ProfileView({username}) {
    const [ userData, setUserData ] = useState('');

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

    // check if user is logged-in on page-load by checking the accessToken, if they are logged-in, get list of movies
    useEffect(() => {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            getUserData(accessToken)
        }
    }, []);

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
                            {console.log(userData)}
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