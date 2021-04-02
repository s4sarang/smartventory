import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { listTopAssets } from '../actions/assetActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AssetCarousel = () => {
  const dispatch = useDispatch();

  const assetTop = useSelector((state) => state.assetTop);
  const { loading, error, assets } = assetTop;

  useEffect(() => {
    dispatch(listTopAssets());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {assets.map((asset) => (
        <Carousel.Item key={asset._id}>
          <Link to={`/assets/${asset.link}`}>
            <Image
              src={asset.path}
              alt={`${asset.brand} ${asset.model}`}
              fluid
            />
            <Carousel.Caption className='carousel-caption'>
              <h5>{`${asset.brand} ${asset.model} || ${asset.price}`}</h5>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AssetCarousel;
