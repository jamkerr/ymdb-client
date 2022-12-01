import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import './navbar.scss';

export function MenuBar({user}) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    const isLoggedIn = () => {
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    }

    return (
        <Navbar variant='dark' bg='dark' sticky='top'>
            <Container>
                <Navbar.Brand className='navbar-logo' href='/'>YMDB</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse>
                    <Nav className='ms-auto'>
                        {isLoggedIn() && (
                            <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                        )}
                        {isLoggedIn() && (
                            <Button variant='link' onClick={onLoggedOut}>Sign out</Button>
                        )}
                        {!isLoggedIn() && (
                            <Nav.Link href='/register'>Create account</Nav.Link>
                        )}
                        {!isLoggedIn() && (
                            <Nav.Link href='/login'>Sign in</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}