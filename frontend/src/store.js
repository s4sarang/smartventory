import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  assetListReducers,
  assetDetailsReducers,
} from './reducers/assetReducers';
import { requestsReducer } from './reducers/requestsReducers';

const reducer = combineReducers({
  assetList: assetListReducers,
  assetDetails: assetDetailsReducers,
  requests: requestsReducer,
});

const requestsItemsFromStorage = localStorage.getItem('requestsItems')
  ? JSON.parse(localStorage.getItem('requestsItems'))
  : [];

const initialState = {
  requests: { requestsItems: requestsItemsFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
