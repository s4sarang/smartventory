import axios from 'axios';
import { REQUESTS_ADD_ITEM } from '../constants/requestsConstants';

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
