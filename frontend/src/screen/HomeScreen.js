import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssetsComponent from '../components/Assets';
import { Container, Col, Row } from 'react-bootstrap';
import { listAssets } from '../actions/assetActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import AssetCarousel from '../components/AssetCarousel';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const assetList = useSelector((state) => state.assetList);
  const { loading, error, assets, page, pages } = assetList;

  useEffect(() => {
    dispatch(listAssets(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Welcome to SmartVentory!</h1>
      {!keyword && <AssetCarousel />}
      <h3>Assets</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error} </Message>
      ) : (
        <>
          <Container>
            <Row>
              {assets.map((display) => (
                <Col key={display.link} sm={12} md={6} lg={4} xl={3}>
                  <AssetsComponent display={display} />
                </Col>
              ))}
            </Row>
          </Container>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
