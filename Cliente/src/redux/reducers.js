// reducers.js
import {
  GET_BILLINGINFO, GET_USERINFO,
  POST_BILLINGINFO, POST_USERINFO,
  PUT_BILLINGINFO, PUT_USERINFO,
} from "./actions";
// Asegúrate de declarar las variables antes de usarlas
const initialState = {
  userInfo: [],
  userBilling: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case POST_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case PUT_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case GET_BILLINGINFO:
      return {
        ...state,
        userBilling: action.payload
      };
    case POST_BILLINGINFO:
      return {
        ...state,
        userBilling: action.payload
      };
    case PUT_BILLINGINFO:
      return {
        ...state,
        userBilling: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
