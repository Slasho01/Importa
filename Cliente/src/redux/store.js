import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'), // Verifica si hay un token almacenado
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    loading: false,
    error: null
};

const store = createStore(
    reducer, 
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;