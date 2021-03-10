import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducerAll from '../reducers';

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducerAll, composeEnhancer(applyMiddleware(thunk)));

export default store;
