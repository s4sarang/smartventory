import axios from 'axios';
import {
  REQUESTS_ADD_ITEM,
  REQUESTS_REMOVE_ITEM,
  REQUESTS_SHIPPING_ADDRESS,
} from '../constants/requestsConstants';

export const raiseRequests = (dlink, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/assets/${dlink}`);
  dispatch({
    type: REQUESTS_ADD_ITEM,
    payload: {
      link: data.link,
      name: `${(data.brand, data.model)}`,
      image: data.path,
      price: data.price,
      count: data.count,
      qty,
    },
  });

  localStorage.setItem(
    'requestsItems',
    JSON.stringify(getState().requests.requestsItems)
  );
};

export const removeRequests = (link) => (dispatch, getState) => {
  dispatch({
    type: REQUESTS_REMOVE_ITEM,
    payload: link,
  });

  localStorage.setItem(
    'requestsItems',
    JSON.stringify(getState().requests.requestsItems)
  );
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: REQUESTS_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
