// import React, { useState, useEffect } from 'react';
// import { Form, Row, Col, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserDetails } from '../actions/userActions';
// import Loader from '../components/Loader';
// import Message from '../components/Message';

// const ProfileScreen = ({ location, history }) => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailId, setEmailId] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [team, setTeam] = useState('');
//   const [message, setMessage] = useState(null);

//   const { userInfo } = useSelector((state) => state.userLogin);

//   const { user, loading, error } = useSelector((state) => state.userDetails);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!userInfo) {
//       history.push('/login');
//     } else {
//       if (!user.name) {
//         dispatch(getUserDetails('profile'));
//       } else {
//         setUserName(user.name);
//         setEmailId(user.emailId);
//         setTeam(user.team);
//       }
//     }
//   }, [history, userInfo, user, dispatch]);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     password === confirmPassword
//       ? console.log('dispatched')
//       : setMessage('Password do not match!');
//   };

//   return (
//     <Row>
//       <Col md={3}>
//         <h2>Update Profile</h2>
//         {message && <Message variant='danger'>{message}</Message>}
//         {loading && <Loader />}
//         {error && <Message variant='danger'>{error}</Message>}
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId='userName'>
//             <Form.Label>Username:</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter username'
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='emailId'>
//             <Form.Label>Email Address:</Form.Label>
//             <Form.Control
//               type='email'
//               placeholder='Enter email'
//               value={emailId}
//               onChange={(e) => setEmailId(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='password'>
//             <Form.Label>Password:</Form.Label>
//             <Form.Control
//               type='password'
//               placeholder='Enter password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='confirmPassword'>
//             <Form.Label>Confirm Password:</Form.Label>
//             <Form.Control
//               type='password'
//               placeholder='Confirm password'
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='team'>
//             <Form.Label>Team:</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter team'
//               value={team}
//               onChange={(e) => setTeam(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Button type='submit' varint='primary'>
//             Register
//           </Button>
//         </Form>
//       </Col>
//       <Col md={9}>My Requests</Col>
//     </Row>
//   );
// };

// export default ProfileScreen;