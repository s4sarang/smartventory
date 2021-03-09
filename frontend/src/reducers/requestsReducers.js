import {
  REQUESTS_ADD_ITEM,
  REQUESTS_REMOVE_ITEM,
} from '../constants/requestsConstants';

export const requestsReducer = (state = { requestsItems: [] }, action) => {
  switch (action.type) {
    case REQUESTS_ADD_ITEM:
      const item = action.payload;

      const existItem = state.requestsItems.find((x) => x.asset === item.asset);

      if (existItem) {
        return {
          ...state,
          requestsItems: state.requestsItems.map((x) =>
            x.asset === existItem.asset ? item : x
          ),
        };
      } else {
        return {
          ...state,
          requestsItems: [...state.requestsItems, item],
        };
      }

    default:
      return state;
  }
};
