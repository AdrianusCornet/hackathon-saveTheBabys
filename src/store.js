import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers'

const middleware = applyMiddleware(reduxThunk)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancer(middleware)

export default createStore(reducers, enhancer)