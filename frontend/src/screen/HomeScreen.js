import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import AssetsComponent from '../components/Assets';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { listAssets } from '../actions/assetActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
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
      <Meta title={'SmartInventory | Home'} />
      <h1>Welcome to SmartVentory!</h1>
      {!keyword ? (
        <AssetCarousel />
      ) : (
        <LinkContainer to='/'>
          <Button className='my-3' variant='light'>
            Back
          </Button>
        </LinkContainer>
      )}
      <h3 id='mini-title'>Assets</h3>
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
