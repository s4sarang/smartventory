import {
  ASSET_LIST_REQUEST,
  ASSET_LIST_SUCCESS,
  ASSET_LIST_FAIL,
  ASSET_DETAILS_REQUEST,
  ASSET_DETAILS_SUCCESS,
  ASSET_DETAILS_FAIL,
  ASSET_DELETE_REQUEST,
  ASSET_DELETE_SUCCESS,
  ASSET_DELETE_FAIL,
  ASSET_CREATE_REQUEST,
  ASSET_CREATE_SUCCESS,
  ASSET_CREATE_FAIL,
  ASSET_CREATE_RESET,
  ASSET_UPDATE_REQUEST,
  ASSET_UPDATE_SUCCESS,
  ASSET_UPDATE_FAIL,
  ASSET_UPDATE_RESET,
  ASSET_TOP_REQUEST,
  ASSET_TOP_SUCCESS,
  ASSET_TOP_FAIL,
} from '../constants/assetConstants';

export const assetListReducers = (state = { assets: [] }, action) => {
  switch (action.type) {
    case ASSET_LIST_REQUEST:
      return { loading: true, assets: [] };
    case ASSET_LIST_SUCCESS:
      return {
        loading: false,
        assets: action.payload.assets,
        pages: action.payload.pages,
        page: action.payload.page,
      };
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

export const assetDeleteReducers = (state = { asset: {} }, action) => {
  switch (action.type) {
    case ASSET_DELETE_REQUEST:
      return { loading: true };
    case ASSET_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ASSET_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const assetCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case ASSET_CREATE_REQUEST:
      return { loading: true };
    case ASSET_CREATE_SUCCESS:
      return { loading: false, success: true, asset: action.payload };
    case ASSET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ASSET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const assetUpdateReducers = (state = { asset: {} }, action) => {
  switch (action.type) {
    case ASSET_UPDATE_REQUEST:
      return { loading: true };
    case ASSET_UPDATE_SUCCESS:
      return { loading: false, success: true, asset: action.payload };
    case ASSET_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ASSET_UPDATE_RESET:
      return { asset: {} };
    default:
      return state;
  }
};

export const assetTopReducers = (state = { assets: [] }, action) => {
  switch (action.type) {
    case ASSET_TOP_REQUEST:
      return { loading: true, assets: [] };
    case ASSET_TOP_SUCCESS:
      return { loading: false, assets: action.payload };
    case ASSET_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
