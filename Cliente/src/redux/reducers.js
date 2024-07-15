// reducers.js
import { GET_USERINFO } from "./actions";
// Asegúrate de declarar las variables antes de usarlas
const initialState = {
    userInfo: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERINFO:
        return {
          ...state,
          userInfo: action.payload
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  