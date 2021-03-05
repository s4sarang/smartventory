import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ListGroup,
  Col,
  Row,
  Button,
  Image,
  ListGroupItem,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { listAssetDetails } from '../actions/assetActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AssetScreen = ({ match }) => {
  const dispatch = useDispatch();
  const assetDetails = useSelector((state) => state.assetDetails);
  const { asset, loading, error } = assetDetails;
  useEffect(() => {
    dispatch(listAssetDetails(match.params.dlink));
  }, [dispatch, match]);
  return (
    <>
      <LinkContainer to='/'>
        <Button className='my-3' variant='light'>
          Back
        </Button>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col xs={6} md={4}>
            <Image src={asset.path} rounded />
          </Col>
          <Col xs={6} md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Brand:</Col>
                  {asset.brand}
                  <Col></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Model:</Col>
                  {asset.model}
                  <Col></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Launch Year:</Col>
                  {asset.launch}
                  <Col></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Category:</Col>
                  {asset.category}
                  <Col></Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={6} md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col> <Col>{asset.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{asset.count > 0 ? 'In Stock' : 'Out of stock'}</Col>
                </Row>
              </ListGroupItem>
              {asset.count > 0 && (
                <ListGroupItem>
                  <FormGroup>
                    <FormControl size='sm' as='select'>
                      {asset.map((qty) => (
                        <option>{qty.count}</option>
                      ))}
                    </FormControl>
                  </FormGroup>
                </ListGroupItem>
              )}
              <Button
                className='my-3'
                variant='secondary'
                disabled={asset.count > 0 ? false : true}
              >
                Request
              </Button>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};
export default AssetScreen;
