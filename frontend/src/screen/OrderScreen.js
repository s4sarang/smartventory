import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const PlaceOrderScreen = ({ match }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  // const requests = useSelector((state) => state.requests);

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    order.totalPrice = order.requestsItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, successPay, orderId]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order: {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>User Name: </strong>
                {order.user}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} -
                {order.shippingAddress.pinCode}, {order.shippingAddress.state},
                {order.shippingAddress.country}.
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Order is delivered.</Message>
              ) : (
                <Message variant='danger'>Order is not delivered.</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Order is paid at {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>Order is not paid.</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Request Items: </h2>
              {order.requestsItems.length === 0 ? (
                <Message variant='warning'>
                  Please raise asset requests!
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.requestsItems.map((item, index) => (
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
                {order.requestsItems.reduce((acc, item) => acc + item.qty, 0)})
                items.
              </h2>
              <h5>
                <Badge variant='light'>Total Amount: ₹{order.totalPrice}</Badge>
              </h5>
            </ListGroup.Item>
            {loadingPay && <Loader />}
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton
                amount={order.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
