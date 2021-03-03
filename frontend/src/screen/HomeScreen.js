import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssetsComponent from '../components/Assets';
import { Container, Col, Row } from 'react-bootstrap';
import { listAssets } from '../actions/assetActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const assetList = useSelector((state) => state.assetList);
  const { loading, error, assets } = assetList;

  useEffect(() => {
    dispatch(listAssets());
  }, [dispatch]);

  return (
    <>
      <h1>Welcome to SmartVentory!</h1>
      {loading ? (
        <h2>Loading..</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Container>
          <Row>
            {assets.map((display) => (
              <Col key={display.link} sm={12} md={6} lg={4} xl={3}>
                <AssetsComponent display={display} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
