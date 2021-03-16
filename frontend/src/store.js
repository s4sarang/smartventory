import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  assetListReducers,
  assetDetailsReducers,
} from './reducers/assetReducers';
import { requestsReducer } from './reducers/requestsReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducer = combineReducers({
  assetList: assetListReducers,
  assetDetails: assetDetailsReducers,
  requests: requestsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const requestsItemsFromStorage = localStorage.getItem('requestsItems')
  ? JSON.parse(localStorage.getItem('requestsItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  requests: { requestsItems: requestsItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
