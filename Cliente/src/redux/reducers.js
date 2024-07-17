// reducers.js
import {
  GET_BILLINGINFO, GET_USERINFO,
  POST_BILLINGINFO, POST_USERINFO,
  PUT_BILLINGINFO, PUT_USERINFO,
  LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGIN_FAILURE, LOGOUT
} from "./actions";
// Asegúrate de declarar las variables antes de usarlas
const initialState = {
  userInfo: [],
  userBilling: [],
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        refreshToken: null,
        loading: false,
        error: null
      };
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
