/*
 *
 *  App Entry 
 *
 */
import 'babel-polyfill'
import $ from 'jquery'
import Tether from 'tether'

import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter } from 'react-router-dom'

import App from '../shared/app'

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from '../shared/selector/selectRepo'
import configureStore from './store'
// Import routes
import createRoutes from './route'

import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'

//[right after all your imports]
// add bootstrap
window.jQuery = $
window.Tether = Tether
require('bootstrap')

//hook up redux to browser devtools
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
//server-side rendering
const preloadedState = window.__PRELOADED_STATE__

//Here we pass redux-thunk to Redux's applyMiddleware function. In order for the Redux Devtools
//to keep working, we also need to use Redux's compose function. 
const store = configureStore({ hello: Immutable.fromJS(preloadedState.hello), global: Immutable.fromJS(preloadedState.global), home: Immutable.fromJS(preloadedState.home)}, browserHistory)

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
})

// Set up the router, wrapping all Routes in the App component
const rootRoute = (App,store) => {
    return {
        component: App,
        childRoutes: createRoutes(store)
    }
}


const jssServerSide = document.querySelector(JSS_SSR_SELECTOR)
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide)

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

//make our App a child of react-hot-loader's AppContainer
const wrapApp = (AppComponent, reduxStore) =>
    <Provider store={reduxStore}>
        <AppContainer>
            <Router
              history={history}
              routes={rootRoute(AppComponent,reduxStore)}
            />
        </AppContainer>
    </Provider>

ReactDOM.render(wrapApp(App, store), rootEl)
//require the next version of our App when hot-reloading
if(module.hot) {
    module.hot.accept('../shared/app', () => {
        const NextApp = require('../shared/app').default
        ReactDOM.render(wrapApp(NextApp, store), rootEl)
    })
}

