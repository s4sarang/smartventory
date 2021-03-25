import {
  REQUESTS_ADD_ITEM,
  REQUESTS_REMOVE_ITEM,
  REQUESTS_SHIPPING_ADDRESS,
} from '../constants/requestsConstants';

export const requestsReducer = (
  state = { requestsItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case REQUESTS_ADD_ITEM:
      const item = action.payload;

      const existItem = state.requestsItems.find((x) => x.link === item.link);

      if (existItem) {
        return {
          ...state,
          requestsItems: state.requestsItems.map((x) =>
            x.link === existItem.link ? item : x
          ),
        };
      } else {
        return {
          ...state,
          requestsItems: [...state.requestsItems, item],
        };
      }
    case REQUESTS_REMOVE_ITEM:
      return {
        ...state,
        requestsItems: state.requestsItems.filter(
          (x) => x.link !== action.payload
        ),
      };
    case REQUESTS_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
