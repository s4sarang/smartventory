import {
  ASSET_LIST_REQUEST,
  ASSET_LIST_SUCCESS,
  ASSET_LIST_FAIL,
  ASSET_DETAILS_REQUEST,
  ASSET_DETAILS_SUCCESS,
  ASSET_DETAILS_FAIL,
} from '../constants/assetConstants';

export const assetListReducers = (state = { assets: [] }, action) => {
  switch (action.type) {
    case ASSET_LIST_REQUEST:
      return { loading: true, assets: [] };
    case ASSET_LIST_SUCCESS:
      return { loading: false, assets: action.payload };
    case ASSET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const assetDetailsReducers = (state = { asset: {} }, action) => {
  switch (action.type) {
    case ASSET_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ASSET_DETAILS_SUCCESS:
      return { loading: false, asset: action.payload };
    case ASSET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
