import React, { useEffect } from 'react';
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
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const requests = useSelector((state) => state.requests);

  requests.totalPrice = requests.requestsItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, success, order } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }

    console.log(requests.requestsItems);
    // eslint-disable-next-line
  }, [success, history]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        requestsItems: requests.requestsItems,
        shippingAddress: requests.shippingAddress,
        paymentMethod: requests.paymentMethod,
        totalPrice: requests.totalPrice,
      })
    );
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
                <Badge variant='light'>
                  Total Amount: ₹{requests.totalPrice}
                </Badge>
              </h5>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant='danger'>{error}</Message>}
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
