import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listAssets, deleteAsset, createAsset } from '../actions/assetActions';
import { ASSET_CREATE_RESET } from '../constants/assetConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AssetListScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const assetList = useSelector((state) => state.assetList);
  const { loading, assets, error } = assetList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const assetDelete = useSelector((state) => state.assetDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = assetDelete;

  const assetCreate = useSelector((state) => state.assetCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    asset: createdAsset,
  } = assetCreate;

  useEffect(() => {
    dispatch({ type: ASSET_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/assets/${createdAsset.link}`);
    } else {
      dispatch(listAssets());
    }
  }, [dispatch, userInfo, history, successDelete, successCreate, createdAsset]);

  const deleteAssetHandler = (dlink) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteAsset(dlink));
    }
  };
  const createAssetHandler = () => {
    dispatch(createAsset());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Assets</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createAssetHandler}>
            <i className='zmdi zmdi-plus'></i> Create Asset
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table bordered hover responsive striped className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>BRAND</th>
              <th>MODEL</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>OPTION</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.link}>
                <td>{asset.link}</td>
                <td>{asset.brand}</td>
                <td>{asset.model}</td>
                <td>{asset.category}</td>
                <td>{asset.price}</td>
                <td>
                  <LinkContainer to={`/admin/assets/${asset.link}/edit`}>
                    <Button variant='warning' className='btn-sm'>
                      <i className='zmdi zmdi-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteAssetHandler(asset.link)}
                  >
                    <i className='zmdi zmdi-delete'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AssetListScreen;
