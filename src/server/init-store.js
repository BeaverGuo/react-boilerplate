// @flow

import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import helloReducer from '../shared/reducer/hello'

const sagaMiddleware = createSagaMiddleware()

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState && plainPartialState.hello) {
    // flow-disable-next-line
    preloadedState.hello = helloReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.hello))
  }

  return createStore(combineReducers({ hello: helloReducer }),
    preloadedState, applyMiddleware(sagaMiddleware))
}

export default initStore
