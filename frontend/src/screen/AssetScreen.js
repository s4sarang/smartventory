import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ListGroup,
  Col,
  Row,
  Button,
  Image,
  ListGroupItem,
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
            <ListGroup>
              <ListGroup.Item variant='light'>
                Brand : {asset.brand}
              </ListGroup.Item>
              <ListGroup.Item variant='success'>
                Model : {asset.model}
              </ListGroup.Item>
              <ListGroup.Item variant='light'>
                Launch Year : {asset.launch}
              </ListGroup.Item>
              <ListGroup.Item variant='success'>
                Category : {asset.category}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={6} md={2}>
            <ListGroup>
              <ListGroupItem>Price: {asset.price}</ListGroupItem>
              <ListGroupItem>Stock: {asset.count}</ListGroupItem>
              <Button className='my-3' variant='secondary'>
                Add to cart
              </Button>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};
export default AssetScreen;
