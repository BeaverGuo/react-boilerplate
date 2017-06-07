import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router'

import helloReducer from '../shared/reducer/hello'
import appReducer from '../shared/reducer/repo'
import homeReducer from '../shared/reducer/changeUserName'

import configureStore from '../client/store'

const initStore = (plainPartialState) => {
    const preloadedState = plainPartialState ? {} : undefined

    if(plainPartialState && plainPartialState.hello && plainPartialState.global && plainPartialState.home) {
        preloadedState.home = homeReducer(undefined, {})
            .merge(Immutable.fromJS(plainPartialState.home))
            
        preloadedState.global = appReducer(undefined, {})
            .merge(Immutable.fromJS(plainPartialState.global))
        
        preloadedState.hello = helloReducer(undefined, {})
            .merge(Immutable.fromJS(plainPartialState.hello))
    }

    return configureStore(preloadedState, browserHistory)
}

export default initStore
