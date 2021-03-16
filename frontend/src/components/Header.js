import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
class Header extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>SmartVentory</Navbar.Brand>
            </LinkContainer>
            <Nav className='mr-auto'>
              <LinkContainer to='/myassets'>
                <Nav.Link>
                  <i className='zmdi zmdi-smartphone-setup'></i> MyAssets
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/requests'>
                <Nav.Link>
                  <i className='zmdi zmdi-shopping-cart'></i> Requests
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/procurement'>
                <Nav.Link>
                  <i className='zmdi zmdi-money'></i> Procurement
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ml-auto'>
              <LinkContainer to='/whatsnew'>
                <Nav.Link>
                  <i className='zmdi zmdi-trending-up'></i> What's new!
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='zmdi zmdi-account'></i> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
