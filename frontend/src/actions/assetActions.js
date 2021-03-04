import axios from 'axios';
import {
  ASSET_LIST_REQUEST,
  ASSET_LIST_SUCCESS,
  ASSET_LIST_FAIL,
  ASSET_DETAILS_REQUEST,
  ASSET_DETAILS_SUCCESS,
  ASSET_DETAILS_FAIL,
} from '../constants/assetConstants';

export const listAssets = () => async (dispatch) => {
  try {
    dispatch({ type: ASSET_LIST_REQUEST });

    const { data } = await axios.get('/api/assets');

    dispatch({ type: ASSET_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ASSET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAssetDetails = (dlink) => async (dispatch) => {
  try {
    dispatch({ type: ASSET_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/assets/${dlink}`);
    dispatch({ type: ASSET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ASSET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
