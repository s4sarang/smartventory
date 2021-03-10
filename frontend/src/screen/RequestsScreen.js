import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  Card,
  Form,
  ListGroup,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { raiseRequests } from '../actions/requestsActions';
import Message from '../components/Message';

const RequestsScreen = ({ match, location, history }) => {
  const assetLink = match.params.dlink;

  const dispatch = useDispatch();

  const requests = useSelector((state) => state.requests);
  const { requestsItems } = requests;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const removeRequestsHandler = (link) => {
    console.log(`${link} removed!`);
  };

  const sendHandler = () => {
    history.push(`/login?redirect=shipping`);
  };

  useEffect(() => {
    if (assetLink) {
      dispatch(raiseRequests(assetLink, qty));
    }
  }, [dispatch, assetLink, qty]);

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Requests Bucket</h1>
          {requestsItems.length === 0 ? (
            <Message variant='warning'>
              Requests Bucket is empty! <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {requestsItems.map((item) => (
                <ListGroup.Item key={item.link}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/assets/${item.link}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <FormGroup>
                        <FormControl
                          size='sm'
                          as='select'
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              raiseRequests(item.link, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.count).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeRequestsHandler(item.link)}
                      >
                        <i className='zmdi zmdi-delete'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup.Item>
            <h2>
              Subtotal ({requestsItems.reduce((acc, item) => acc + item.qty, 0)}
              ) items.
            </h2>
            Rs.
            {requestsItems.reduce(
              (acc, item) => acc + item.qty * item.price,
              0
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              variant='outline-primary'
              onClick={sendHandler}
              disabled={requestsItems === 0}
            >
              Send Request
            </Button>
          </ListGroup.Item>
        </Col>
      </Row>
    </>
  );
};

export default RequestsScreen;
