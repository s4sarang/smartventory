import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RegisterScreen = ({ location, history }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [team, setTeam] = useState('');
  const [message, setMessage] = useState(null);

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    password === confirmPassword
      ? dispatch(register(team, emailId, userName, password))
      : setMessage('Password do not match!');
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='userName'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='emailId'>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
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
        <Form.Group controlId='team'>
          <Form.Label>Team:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter team'
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' varint='primary'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already have an account?
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
