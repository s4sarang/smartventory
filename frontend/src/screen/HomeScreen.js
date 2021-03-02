import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssetsComponent from '../components/Assets';
import { Container, Col, Row } from 'react-bootstrap';
const HomeScreen = () => {
  const [Assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const { data } = await axios.get('/api/assets');

      setAssets(data);
    };

    fetchAssets();
  }, []);

  return (
    <>
      <h1>Welcome to SmartVentory!</h1>
      <Container>
        <Row>
          {Assets.map((display) => (
            <Col key={display.link} sm={12} md={6} lg={4} xl={3}>
              <AssetsComponent display={display} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
