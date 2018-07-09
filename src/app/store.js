import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import productReducer from './reducer/productReducer';



export default createStore(combineReducers({
       product: productReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger, promise(), thunk)
);