import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_CHROME__ || compose;

const middleware = applyMiddleware(thunk);

export default createStore(rootReducer, composeEnhancers(middleware));
