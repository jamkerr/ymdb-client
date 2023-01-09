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
                <Link to='/'>
                    <Navbar.Brand className='navbar-logo'>YMDB</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse>
                    <Nav className='ms-auto'>
                        {isLoggedIn() && (
                            <Link to={`/users/${user.Username}`}>
                                <Nav.Link as={Button}>{user.Username}</Nav.Link>
                            </Link>
                        )}
                        {isLoggedIn() && (
                            <Button variant='link' onClick={onLoggedOut}>Sign out</Button>
                        )}
                        {!isLoggedIn() && (
                            <Nav.Link href='/register'>Create account</Nav.Link>
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