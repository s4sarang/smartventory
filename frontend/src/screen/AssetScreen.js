import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ListGroup, Col, Row, Button, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AssetScreen = ({ match }) => {
  const [asset, setAssets] = useState({});

  useEffect(() => {
    const fetchAssets = async () => {
      const { data } = await axios.get(`/api/assets/${match.params.dlink}`);

      setAssets(data);
    };

    fetchAssets();
  });

  return (
    <>
      <LinkContainer to='/'>
        <Button className='my-3' variant='light'>
          Back
        </Button>
      </LinkContainer>
      <Row>
        <Col xs={6} md={4}>
          <Image src={asset.path} rounded />
        </Col>
        <Col xs={6} md={4}>
          <ListGroup>
            <ListGroup.Item variant='success'>
              Brand : {asset.brand}
            </ListGroup.Item>
            <ListGroup.Item variant='light'>
              Model : {asset.model}
            </ListGroup.Item>
            <ListGroup.Item variant='success'>
              Launch Year : {asset.launch}
            </ListGroup.Item>
            <ListGroup.Item variant='light'>
              Price : {asset.price}
            </ListGroup.Item>
            <ListGroup.Item variant='success'>
              Category : {asset.category}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={6} md={4}></Col>
      </Row>

      {/* <ListGroup className='my-3'>
        <ListGroup.Item>IMEI:</ListGroup.Item>
        <ListGroup.Item>
          {assets.map((a) => (asset.link === a.link ? a.unit.serialno : ''))}
        </ListGroup.Item>
        <ListGroup.Item>Team:</ListGroup.Item>
        <ListGroup.Item>
          {assets.map((a) => (asset.link === a.link ? a.unit.team : ''))}
        </ListGroup.Item>
        <ListGroup.Item>Accessories:</ListGroup.Item>
        <ListGroup.Item>
          {assets.map((a) => (asset.link === a.link ? a.unit.accessories : ''))}
        </ListGroup.Item>
        <ListGroup.Item>Reason:</ListGroup.Item>
        <ListGroup.Item>
          {assets.map((a) => (asset.link === a.link ? a.unit.reason : ''))}
        </ListGroup.Item>
      </ListGroup> */}
      {/* <ListGroup>
        {assets.map((a, id) =>
          asset.link === a.link ? (
            <ListGroup horizontal={a.unit.serialno} className='my-2' key={id}>
              <ListGroup.Item>Serial No: {a.unit.serialno} </ListGroup.Item>
              <ListGroup.Item>Team: {a.unit.team}</ListGroup.Item>
              <ListGroup.Item>Accessories: {a.unit.accessories}</ListGroup.Item>
              <ListGroup.Item>Reason: {a.unit.reason}</ListGroup.Item>
            </ListGroup>
          ) : (
            ''
          )
        )}
      </ListGroup> */}
    </>
  );
};
export default AssetScreen;
