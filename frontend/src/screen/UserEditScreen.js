import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [team, setTeam] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setUserName(user.userName);
        setTeam(user.team);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [history, successUpdate, dispatch, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        team,
        userName,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='team'>
              <Form.Label>Team:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter team'
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin ?'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' varint='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
