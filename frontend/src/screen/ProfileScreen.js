import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = ({ location, history }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // const [emailId, setEmailId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [team, setTeam] = useState('');
  const [message, setMessage] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { user, loading, error } = useSelector((state) => state.userDetails);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.userName) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setUserName(user.userName);
        // setEmailId(user.emailId);
        setTeam(user.team);
      }
    }
  }, [history, userInfo, user, dispatch, loading]);

  const submitHandler = (e) => {
    e.preventDefault();

    password === confirmPassword
      ? dispatch(updateUserProfile({ userName, team, password }))
      : setMessage('Password do not match!');
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Update Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>Profile Updated Successfully!</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='userName'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              placeholder={userName}
              // value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* <Form.Group controlId='emailId'>
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            ></Form.Control>
          </Form.Group> */}
          <Form.Group controlId='team'>
            <Form.Label>Team:</Form.Label>
            <Form.Control
              type='text'
              placeholder={team}
              // value={team}
              onChange={(e) => setTeam(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' varint='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Requests</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isPaid ? (
                      order.totalPrice
                    ) : (
                      <i class='zmdi zmdi-close' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i class='zmdi zmdi-close' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i class='zmdi zmdi-close' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='outline-dark' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
