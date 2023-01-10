import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";

import './navbar.scss';

export function MenuBar() {

    const user = useSelector((state) => state.user);

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    const isLoggedIn = () => {
        if ( user ) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Navbar variant='dark' bg='dark' sticky='top'>
            <Container>
                <Link to='/' className='logo-button'>
                    <Navbar.Brand className='navbar-logo'>YMDB</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse>
                    <Nav className='ms-auto gap-2'>
                        {isLoggedIn() && (
                            <Link to={`/users/${user.Username}`} className='profile-button'>
                                <Nav.Link as={Button} variant='dark'>{user.Username}</Nav.Link>
                            </Link>
                        )}
                        {isLoggedIn() && (
                            <Button variant='outline-light' onClick={onLoggedOut}>Sign out</Button>
                        )}
                        {!isLoggedIn() && (
                            <Button variant='outline-light' href='/register'>Create account</Button>
                        )}
                        {!isLoggedIn() && (
                            <Nav.Link href='/'>Sign in</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}