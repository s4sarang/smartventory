import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listAssetDetails, updateAsset } from '../actions/assetActions';
import { ASSET_UPDATE_RESET } from '../constants/assetConstants';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AssetEditScreen = ({ match, history }) => {
  const assetLink = match.params.dlink;

  const [link, setLink] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [count, setCount] = useState(0);
  const [path, setPath] = useState('');
  const [launch, setlaunch] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');

  const assetDetails = useSelector((state) => state.assetDetails);
  const { loading, error, asset } = assetDetails;

  const assetUpdate = useSelector((state) => state.assetUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = assetUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ASSET_UPDATE_RESET });
      history.push('/admin/assetlist');
    } else {
      if (!asset || asset.link !== assetLink) {
        dispatch(listAssetDetails(assetLink));
      } else {
        setLink(asset.link);
        setBrand(asset.brand);
        setModel(asset.model);
        setCount(asset.count);
        setPath(asset.path);
        setlaunch(asset.launch);
        setPrice(asset.price);
        setCategory(asset.category);
      }
    }
  }, [history, dispatch, asset, assetLink, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAsset({
        dlink: assetLink,
        link,
        brand,
        model,
        count,
        path,
        launch,
        price,
        category,
      })
    );
  };

  return (
    <>
      <Link to='/admin/assetlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Asset</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='userName'>
              <Form.Label>Link:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter link'
                value={link}
                onChange={(e) => setLink(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='model'>
              <Form.Label>Model:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter model'
                value={model}
                onChange={(e) => setModel(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='count'>
              <Form.Label>Count:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count'
                value={count}
                onChange={(e) => setCount(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='path'>
              <Form.Label>Enter image URL:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter url'
                value={path}
                onChange={(e) => setPath(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='launch'>
              <Form.Label>Launch:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter launch year'
                value={launch}
                onChange={(e) => setlaunch(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' varint='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AssetEditScreen;
