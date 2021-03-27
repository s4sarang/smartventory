import React from 'react';
import {
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Badge,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import CheckOutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  const requests = useSelector((state) => state.requests);

  const totalPrice = requests.requestsItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const placeOrderHandler = () => {
    console.log('order');
  };

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {requests.shippingAddress.address},{' '}
                {requests.shippingAddress.city} -{' '}
                {requests.shippingAddress.pinCode},{' '}
                {requests.shippingAddress.state},{' '}
                {requests.shippingAddress.country}.
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Payment Method: </strong>
              {requests.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Request Items: </h2>
              {requests.requestsItems.length === 0 ? (
                <Message variant='warning'>
                  Please raise asset requests!
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {requests.requestsItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/assets/${item.link}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {requests.requestsItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
                ) items.
              </h2>
              <h5>
                <Badge variant='light'>Total Amount: ₹{totalPrice}</Badge>
              </h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                variant='outline-primary'
                onClick={placeOrderHandler}
                disabled={requests.requestsItems === 0}
              >
                Send Request
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
