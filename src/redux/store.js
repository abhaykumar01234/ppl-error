import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;