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

    return (
        <Container className='profile-container d-flex justify-content-center align-items-center'>
            <Row className='margin-auto'>
                <Col>
                    <Card bg='secondary' className='profile-card'>
                        <Card.Body>
                            <Card.Title>{username}</Card.Title>
                            <Card.Text>{userData.Email}</Card.Text>
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