import { getCookie } from '../utils/lsc';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    isAuthenticated: !!getCookie('token'), // Verifica si hay un token almacenado
    token: getCookie('token'),
    refreshToken: getCookie('refreshToken'),
    loading: false,
    error: null
};

const store = createStore(
    reducer, 
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;