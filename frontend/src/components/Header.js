import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = ({ location }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

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
          <Nav>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Nav>
          <Nav className='ml-auto'>
            <LinkContainer to='/whatsnew'>
              <Nav.Link>
                <i className='zmdi zmdi-trending-up'></i> What's new!
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {userInfo ? (
              <NavDropdown title={userInfo.userName} id='userName'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='zmdi zmdi-account'></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='admin'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/assetlist'>
                  <NavDropdown.Item>Assets</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
