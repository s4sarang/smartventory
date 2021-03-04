import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  assetListReducers,
  assetDetailsReducers,
} from './reducers/assetReducers';

const reducer = combineReducers({
  assetList: assetListReducers,
  assetDetails: assetDetailsReducers,
});
const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
